import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { Escrow } from './entities/escrow.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { CreateEscrowDto } from './dto/create-escrow.dto';
import { PaymentStatus, PaymentMethod, PaymentType, EscrowStatus } from './enums/payment-status.enum';
import { UsersService } from '../users/users.service';
import { MissionsService } from '../missions/missions.service';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private paymentsRepository: Repository<Payment>,
    @InjectRepository(Escrow)
    private escrowsRepository: Repository<Escrow>,
    private usersService: UsersService,
    private missionsService: MissionsService,
  ) {}

  async createPayment(createPaymentDto: CreatePaymentDto, userId: string): Promise<Payment> {
    const user = await this.usersService.findOne(userId);
    
    // Calculer la commission
    const commissionRate = this.getCommissionRate(createPaymentDto.type);
    const commissionAmount = Math.round(createPaymentDto.amount * commissionRate / 100);
    const netAmount = createPaymentDto.amount - commissionAmount;

    const payment = this.paymentsRepository.create({
      ...createPaymentDto,
      userId,
      commissionRate,
      commissionAmount,
      netAmount,
      status: PaymentStatus.PENDING,
    });

    const savedPayment = await this.paymentsRepository.save(payment);

    // Initier le paiement selon la méthode
    await this.initiatePayment(savedPayment);

    return savedPayment;
  }

  async findUserPayments(userId: string, page: number = 1, limit: number = 10): Promise<{ payments: Payment[], total: number }> {
    const queryBuilder = this.paymentsRepository.createQueryBuilder('payment')
      .leftJoinAndSelect('payment.mission', 'mission')
      .where('payment.userId = :userId', { userId });

    // Pagination
    const offset = (page - 1) * limit;
    queryBuilder.skip(offset).take(limit);

    queryBuilder.orderBy('payment.createdAt', 'DESC');

    const [payments, total] = await queryBuilder.getManyAndCount();

    return { payments, total };
  }

  async findPayment(id: string): Promise<Payment> {
    const payment = await this.paymentsRepository.findOne({
      where: { id },
      relations: ['user', 'mission'],
    });

    if (!payment) {
      throw new NotFoundException('Paiement non trouvé');
    }

    return payment;
  }

  async updatePaymentStatus(id: string, status: PaymentStatus, externalTransactionId?: string, errorMessage?: string): Promise<Payment> {
    const payment = await this.findPayment(id);

    payment.status = status;
    payment.updatedAt = new Date();

    if (externalTransactionId) {
      payment.externalTransactionId = externalTransactionId;
    }

    if (status === PaymentStatus.COMPLETED) {
      payment.processedAt = new Date();
    } else if (status === PaymentStatus.FAILED) {
      payment.failedAt = new Date();
      payment.errorMessage = errorMessage;
    }

    return await this.paymentsRepository.save(payment);
  }

  async createEscrow(createEscrowDto: CreateEscrowDto, clientId: string): Promise<Escrow> {
    const mission = await this.missionsService.findOne(createEscrowDto.missionId);

    // Vérifier que l'utilisateur est le propriétaire de la mission
    if (mission.clientId !== clientId) {
      throw new ForbiddenException('Non autorisé à créer un escrow pour cette mission');
    }

    // Vérifier qu'il n'y a pas déjà un escrow pour cette mission
    const existingEscrow = await this.escrowsRepository.findOne({
      where: { missionId: createEscrowDto.missionId },
    });

    if (existingEscrow) {
      throw new BadRequestException('Un escrow existe déjà pour cette mission');
    }

    // Calculer les montants
    const platformCommissionRate = 10; // 10% de commission
    const platformCommissionAmount = Math.round(createEscrowDto.amount * platformCommissionRate / 100);
    const freelanceAmount = createEscrowDto.amount - platformCommissionAmount;

    const escrow = this.escrowsRepository.create({
      ...createEscrowDto,
      clientId,
      freelanceId: mission.assignedFreelanceId,
      platformCommissionRate,
      platformCommissionAmount,
      freelanceAmount,
      autoReleaseDate: createEscrowDto.autoReleaseDate ? new Date(createEscrowDto.autoReleaseDate) : null,
    });

    return await this.escrowsRepository.save(escrow);
  }

  async depositToEscrow(escrowId: string, paymentId: string): Promise<Escrow> {
    const escrow = await this.findEscrow(escrowId);
    const payment = await this.findPayment(paymentId);

    // Vérifier que le paiement est complété
    if (payment.status !== PaymentStatus.COMPLETED) {
      throw new BadRequestException('Le paiement doit être complété avant de déposer en escrow');
    }

    // Vérifier que le montant correspond
    if (payment.amount !== escrow.amount) {
      throw new BadRequestException('Le montant du paiement ne correspond pas au montant de l\'escrow');
    }

    escrow.status = EscrowStatus.DEPOSITED;
    escrow.depositPaymentId = paymentId;
    escrow.depositedAt = new Date();

    return await this.escrowsRepository.save(escrow);
  }

  async releaseEscrow(escrowId: string, clientId: string): Promise<Escrow> {
    const escrow = await this.findEscrow(escrowId);

    // Vérifier que l'utilisateur est le client de l'escrow
    if (escrow.clientId !== clientId) {
      throw new ForbiddenException('Non autorisé à libérer cet escrow');
    }

    // Vérifier que l'escrow est déposé
    if (escrow.status !== EscrowStatus.DEPOSITED) {
      throw new BadRequestException('L\'escrow doit être déposé avant d\'être libéré');
    }

    // Créer le paiement de libération vers le freelance
    const releasePayment = await this.createPayment({
      amount: escrow.freelanceAmount,
      method: PaymentMethod.BANK_TRANSFER, // Par défaut, à adapter selon les préférences du freelance
      type: PaymentType.ESCROW_RELEASE,
      description: `Libération escrow mission ${escrow.mission.title}`,
      missionId: escrow.missionId,
    }, escrow.freelanceId);

    escrow.status = EscrowStatus.RELEASED;
    escrow.releasePaymentId = releasePayment.id;
    escrow.releasedAt = new Date();

    const savedEscrow = await this.escrowsRepository.save(escrow);

    // Ajouter le montant au budget dépensé du client
    await this.usersService.addBudgetSpent(clientId, escrow.amount);

    return savedEscrow;
  }

  async disputeEscrow(escrowId: string, userId: string, reason: string): Promise<Escrow> {
    const escrow = await this.findEscrow(escrowId);

    // Vérifier que l'utilisateur est soit le client soit le freelance
    if (escrow.clientId !== userId && escrow.freelanceId !== userId) {
      throw new ForbiddenException('Non autorisé à disputer cet escrow');
    }

    // Vérifier que l'escrow est déposé
    if (escrow.status !== EscrowStatus.DEPOSITED) {
      throw new BadRequestException('L\'escrow doit être déposé avant d\'être disputé');
    }

    escrow.status = EscrowStatus.DISPUTED;
    escrow.disputeReason = reason;
    escrow.disputedAt = new Date();

    return await this.escrowsRepository.save(escrow);
  }

  async resolveDispute(escrowId: string, adminId: string, resolution: string, releaseToFreelance: boolean): Promise<Escrow> {
    const escrow = await this.findEscrow(escrowId);

    // Vérifier que l'escrow est en dispute
    if (escrow.status !== EscrowStatus.DISPUTED) {
      throw new BadRequestException('L\'escrow n\'est pas en dispute');
    }

    if (releaseToFreelance) {
      // Libérer vers le freelance
      const releasePayment = await this.createPayment({
        amount: escrow.freelanceAmount,
        method: PaymentMethod.BANK_TRANSFER,
        type: PaymentType.ESCROW_RELEASE,
        description: `Résolution dispute - Libération vers freelance`,
        missionId: escrow.missionId,
      }, escrow.freelanceId);

      escrow.status = EscrowStatus.RELEASED;
      escrow.releasePaymentId = releasePayment.id;
      escrow.releasedAt = new Date();
    } else {
      // Rembourser le client
      const refundPayment = await this.createPayment({
        amount: escrow.amount,
        method: PaymentMethod.BANK_TRANSFER,
        type: PaymentType.REFUND,
        description: `Résolution dispute - Remboursement client`,
        missionId: escrow.missionId,
      }, escrow.clientId);

      escrow.status = EscrowStatus.REFUNDED;
      escrow.refundedAt = new Date();
    }

    escrow.disputeResolution = resolution;
    escrow.disputeResolvedBy = adminId;
    escrow.disputeResolvedAt = new Date();

    return await this.escrowsRepository.save(escrow);
  }

  async findEscrow(id: string): Promise<Escrow> {
    const escrow = await this.escrowsRepository.findOne({
      where: { id },
      relations: ['client', 'freelance', 'mission', 'depositPayment', 'releasePayment'],
    });

    if (!escrow) {
      throw new NotFoundException('Escrow non trouvé');
    }

    return escrow;
  }

  async findUserEscrows(userId: string, page: number = 1, limit: number = 10): Promise<{ escrows: Escrow[], total: number }> {
    const queryBuilder = this.escrowsRepository.createQueryBuilder('escrow')
      .leftJoinAndSelect('escrow.mission', 'mission')
      .leftJoinAndSelect('escrow.client', 'client')
      .leftJoinAndSelect('escrow.freelance', 'freelance')
      .where('escrow.clientId = :userId OR escrow.freelanceId = :userId', { userId });

    // Pagination
    const offset = (page - 1) * limit;
    queryBuilder.skip(offset).take(limit);

    queryBuilder.orderBy('escrow.createdAt', 'DESC');

    const [escrows, total] = await queryBuilder.getManyAndCount();

    return { escrows, total };
  }

  async processCallback(paymentId: string, callbackData: any): Promise<Payment> {
    const payment = await this.findPayment(paymentId);

    payment.providerResponse = callbackData;
    payment.isCallbackReceived = true;

    // Traiter selon le provider et la réponse
    const status = this.mapProviderStatusToPaymentStatus(callbackData);
    
    return await this.updatePaymentStatus(
      paymentId, 
      status, 
      callbackData.transactionId,
      callbackData.errorMessage
    );
  }

  private async initiatePayment(payment: Payment): Promise<void> {
    // TODO: Implémenter l'intégration avec les APIs Mobile Money
    // Orange Money, MTN Money, Moov Money, Wave
    
    switch (payment.method) {
      case PaymentMethod.ORANGE_MONEY:
        await this.initiateOrangeMoneyPayment(payment);
        break;
      case PaymentMethod.MTN_MONEY:
        await this.initiateMTNMoneyPayment(payment);
        break;
      case PaymentMethod.MOOV_MONEY:
        await this.initiateMoovMoneyPayment(payment);
        break;
      case PaymentMethod.WAVE:
        await this.initiateWavePayment(payment);
        break;
      default:
        // Pour les autres méthodes, marquer comme en traitement
        await this.updatePaymentStatus(payment.id, PaymentStatus.PROCESSING);
    }
  }

  private async initiateOrangeMoneyPayment(payment: Payment): Promise<void> {
    // TODO: Intégration Orange Money API
    console.log('Initiation paiement Orange Money:', payment.id);
    await this.updatePaymentStatus(payment.id, PaymentStatus.PROCESSING);
  }

  private async initiateMTNMoneyPayment(payment: Payment): Promise<void> {
    // TODO: Intégration MTN Money API
    console.log('Initiation paiement MTN Money:', payment.id);
    await this.updatePaymentStatus(payment.id, PaymentStatus.PROCESSING);
  }

  private async initiateMoovMoneyPayment(payment: Payment): Promise<void> {
    // TODO: Intégration Moov Money API
    console.log('Initiation paiement Moov Money:', payment.id);
    await this.updatePaymentStatus(payment.id, PaymentStatus.PROCESSING);
  }

  private async initiateWavePayment(payment: Payment): Promise<void> {
    // TODO: Intégration Wave API
    console.log('Initiation paiement Wave:', payment.id);
    await this.updatePaymentStatus(payment.id, PaymentStatus.PROCESSING);
  }

  private getCommissionRate(paymentType: PaymentType): number {
    switch (paymentType) {
      case PaymentType.DEPOSIT:
        return 2; // 2% pour les dépôts
      case PaymentType.WITHDRAWAL:
        return 1; // 1% pour les retraits
      case PaymentType.ESCROW_DEPOSIT:
        return 0; // Pas de commission sur les dépôts escrow
      case PaymentType.ESCROW_RELEASE:
        return 0; // Pas de commission sur les libérations escrow
      default:
        return 0;
    }
  }

  private mapProviderStatusToPaymentStatus(callbackData: any): PaymentStatus {
    // TODO: Mapper les statuts des providers vers nos statuts internes
    if (callbackData.status === 'success' || callbackData.status === 'completed') {
      return PaymentStatus.COMPLETED;
    } else if (callbackData.status === 'failed' || callbackData.status === 'error') {
      return PaymentStatus.FAILED;
    } else if (callbackData.status === 'cancelled') {
      return PaymentStatus.CANCELLED;
    }
    
    return PaymentStatus.PROCESSING;
  }
}

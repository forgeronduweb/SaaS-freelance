import { Controller, Get, Post, Body, Patch, Param, Query, UseGuards, Request } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { CreateEscrowDto } from './dto/create-escrow.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/enums/user-role.enum';
import { PaymentStatus } from './enums/payment-status.enum';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createPayment(@Body() createPaymentDto: CreatePaymentDto, @Request() req) {
    return this.paymentsService.createPayment(createPaymentDto, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('my-payments')
  findMyPayments(
    @Request() req,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.paymentsService.findUserPayments(req.user.userId, page, limit);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findPayment(@Param('id') id: string, @Request() req) {
    // TODO: Vérifier que l'utilisateur a le droit de voir ce paiement
    return this.paymentsService.findPayment(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Patch(':id/status')
  updatePaymentStatus(
    @Param('id') id: string,
    @Body('status') status: PaymentStatus,
    @Body('externalTransactionId') externalTransactionId?: string,
    @Body('errorMessage') errorMessage?: string,
  ) {
    return this.paymentsService.updatePaymentStatus(id, status, externalTransactionId, errorMessage);
  }

  // Endpoints Escrow
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.CLIENT)
  @Post('escrow')
  createEscrow(@Body() createEscrowDto: CreateEscrowDto, @Request() req) {
    return this.paymentsService.createEscrow(createEscrowDto, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('escrow/my-escrows')
  findMyEscrows(
    @Request() req,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.paymentsService.findUserEscrows(req.user.userId, page, limit);
  }

  @UseGuards(JwtAuthGuard)
  @Get('escrow/:id')
  findEscrow(@Param('id') id: string) {
    return this.paymentsService.findEscrow(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('escrow/:id/deposit')
  depositToEscrow(
    @Param('id') escrowId: string,
    @Body('paymentId') paymentId: string,
  ) {
    return this.paymentsService.depositToEscrow(escrowId, paymentId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.CLIENT)
  @Patch('escrow/:id/release')
  releaseEscrow(@Param('id') escrowId: string, @Request() req) {
    return this.paymentsService.releaseEscrow(escrowId, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('escrow/:id/dispute')
  disputeEscrow(
    @Param('id') escrowId: string,
    @Body('reason') reason: string,
    @Request() req,
  ) {
    return this.paymentsService.disputeEscrow(escrowId, req.user.userId, reason);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Patch('escrow/:id/resolve-dispute')
  resolveDispute(
    @Param('id') escrowId: string,
    @Body('resolution') resolution: string,
    @Body('releaseToFreelance') releaseToFreelance: boolean,
    @Request() req,
  ) {
    return this.paymentsService.resolveDispute(escrowId, req.user.userId, resolution, releaseToFreelance);
  }

  // Callbacks des providers de paiement
  @Post('callback/:paymentId')
  processCallback(@Param('paymentId') paymentId: string, @Body() callbackData: any) {
    return this.paymentsService.processCallback(paymentId, callbackData);
  }

  // Endpoints pour les webhooks des providers
  @Post('webhook/orange-money')
  orangeMoneyWebhook(@Body() webhookData: any) {
    // TODO: Traiter les webhooks Orange Money
    console.log('Orange Money webhook:', webhookData);
    return { status: 'received' };
  }

  @Post('webhook/mtn-money')
  mtnMoneyWebhook(@Body() webhookData: any) {
    // TODO: Traiter les webhooks MTN Money
    console.log('MTN Money webhook:', webhookData);
    return { status: 'received' };
  }

  @Post('webhook/moov-money')
  moovMoneyWebhook(@Body() webhookData: any) {
    // TODO: Traiter les webhooks Moov Money
    console.log('Moov Money webhook:', webhookData);
    return { status: 'received' };
  }

  @Post('webhook/wave')
  waveWebhook(@Body() webhookData: any) {
    // TODO: Traiter les webhooks Wave
    console.log('Wave webhook:', webhookData);
    return { status: 'received' };
  }
}

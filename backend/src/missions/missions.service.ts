import { Injectable, NotFoundException, ForbiddenException, ConflictException } from '@nestjs/common';
import { CreateMissionDto } from './dto/create-mission.dto';
import { UpdateMissionDto } from './dto/update-mission.dto';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MissionsService {
  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
  ) {}

  async create(createMissionDto: CreateMissionDto, clientId: string): Promise<Mission> {
    // Vérifier que l'utilisateur est un client
    const client = await this.usersService.findOne(clientId);
    if (client.role !== 'CLIENT') {
      throw new ForbiddenException('Seuls les clients peuvent créer des missions');
    }

    const mission = this.missionsRepository.create({
      ...createMissionDto,
      clientId,
      deadline: new Date(createMissionDto.deadline),
    });

    const savedMission = await this.missionsRepository.save(mission);
    
    // Incrémenter le compteur de projets publiés du client
    await this.usersService.incrementPublishedProjects(clientId);

    return savedMission;
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
    filters?: {
      status?: MissionStatus;
      category?: string;
      minBudget?: number;
      maxBudget?: number;
      skills?: string[];
      isRemote?: boolean;
      urgency?: string;
    }
  ): Promise<{ missions: Mission[], total: number }> {
    const queryBuilder = this.missionsRepository.createQueryBuilder('mission')
      .leftJoinAndSelect('mission.client', 'client')
      .where('mission.status = :status', { status: MissionStatus.OPEN });

    // Appliquer les filtres
    if (filters?.category) {
      queryBuilder.andWhere('mission.category = :category', { category: filters.category });
    }

    if (filters?.minBudget) {
      queryBuilder.andWhere('mission.budget >= :minBudget', { minBudget: filters.minBudget });
    }

    if (filters?.maxBudget) {
      queryBuilder.andWhere('mission.budget <= :maxBudget', { maxBudget: filters.maxBudget });
    }

    if (filters?.skills && filters.skills.length > 0) {
      queryBuilder.andWhere('mission.requiredSkills && :skills', { skills: filters.skills });
    }

    if (filters?.isRemote !== undefined) {
      queryBuilder.andWhere('mission.isRemote = :isRemote', { isRemote: filters.isRemote });
    }

    if (filters?.urgency) {
      queryBuilder.andWhere('mission.urgency = :urgency', { urgency: filters.urgency });
    }

    // Pagination
    const offset = (page - 1) * limit;
    queryBuilder.skip(offset).take(limit);

    // Tri par date de création (plus récent en premier) et urgence
    queryBuilder.orderBy('mission.isUrgent', 'DESC')
                .addOrderBy('mission.createdAt', 'DESC');

    const [missions, total] = await queryBuilder.getManyAndCount();

    return { missions, total };
  }

  async findOne(id: string): Promise<Mission> {
    const mission = await this.missionsRepository.findOne({
      where: { id },
      relations: ['client', 'assignedFreelance', 'applications', 'applications.freelance'],
    });

    if (!mission) {
      throw new NotFoundException('Mission non trouvée');
    }

    // Incrémenter le compteur de vues
    await this.missionsRepository.increment({ id }, 'viewsCount', 1);

    return mission;
  }

  async findByClient(clientId: string, page: number = 1, limit: number = 10): Promise<{ missions: Mission[], total: number }> {
    const queryBuilder = this.missionsRepository.createQueryBuilder('mission')
      .leftJoinAndSelect('mission.assignedFreelance', 'freelance')
      .where('mission.clientId = :clientId', { clientId });

    // Pagination
    const offset = (page - 1) * limit;
    queryBuilder.skip(offset).take(limit);

    queryBuilder.orderBy('mission.createdAt', 'DESC');

    const [missions, total] = await queryBuilder.getManyAndCount();

    return { missions, total };
  }

  async update(id: string, updateMissionDto: UpdateMissionDto, userId: string): Promise<Mission> {
    const mission = await this.findOne(id);

    // Vérifier que l'utilisateur est le propriétaire de la mission
    if (mission.clientId !== userId) {
      throw new ForbiddenException('Non autorisé à modifier cette mission');
    }

    // Ne pas permettre la modification si la mission est en cours ou terminée
    if (mission.status === MissionStatus.IN_PROGRESS || mission.status === MissionStatus.COMPLETED) {
      throw new ForbiddenException('Impossible de modifier une mission en cours ou terminée');
    }

    Object.assign(mission, updateMissionDto);

    if (updateMissionDto.deadline) {
      mission.deadline = new Date(updateMissionDto.deadline);
    }

    return await this.missionsRepository.save(mission);
  }

  async remove(id: string, userId: string): Promise<void> {
    const mission = await this.findOne(id);

    // Vérifier que l'utilisateur est le propriétaire de la mission
    if (mission.clientId !== userId) {
      throw new ForbiddenException('Non autorisé à supprimer cette mission');
    }

    // Ne pas permettre la suppression si la mission a des candidatures acceptées
    if (mission.status === MissionStatus.IN_PROGRESS) {
      throw new ForbiddenException('Impossible de supprimer une mission en cours');
    }

    await this.missionsRepository.remove(mission);
  }

  async applyToMission(missionId: string, createApplicationDto: CreateApplicationDto, freelanceId: string): Promise<Application> {
    // Vérifier que l'utilisateur est un freelance
    const freelance = await this.usersService.findOne(freelanceId);
    if (freelance.role !== UserRole.FREELANCE) {
      throw new ForbiddenException('Seuls les freelances peuvent postuler aux missions');
    }

    const mission = await this.findOne(missionId);

    // Vérifier que la mission est ouverte
    if (mission.status !== MissionStatus.OPEN) {
      throw new ForbiddenException('Cette mission n\'accepte plus de candidatures');
    }

    // Vérifier que le freelance n'a pas déjà postulé
    const existingApplication = await this.applicationsRepository.findOne({
      where: { missionId, freelanceId },
    });

    if (existingApplication) {
      throw new ConflictException('Vous avez déjà postulé à cette mission');
    }

    const application = this.applicationsRepository.create({
      ...createApplicationDto,
      missionId,
      freelanceId,
      estimatedDelivery: new Date(createApplicationDto.estimatedDelivery),
    });

    const savedApplication = await this.applicationsRepository.save(application);

    // Incrémenter le compteur de candidatures de la mission
    await this.missionsRepository.increment({ id: missionId }, 'applicationsCount', 1);

    return savedApplication;
  }

  async getApplications(missionId: string, clientId: string): Promise<Application[]> {
    const mission = await this.findOne(missionId);

    // Vérifier que l'utilisateur est le propriétaire de la mission
    if (mission.clientId !== clientId) {
      throw new ForbiddenException('Non autorisé à voir les candidatures de cette mission');
    }

    return await this.applicationsRepository.find({
      where: { missionId },
      relations: ['freelance'],
      order: { appliedAt: 'DESC' },
    });
  }

  async acceptApplication(applicationId: string, clientId: string): Promise<Application> {
    const application = await this.applicationsRepository.findOne({
      where: { id: applicationId },
      relations: ['mission', 'freelance'],
    });

    if (!application) {
      throw new NotFoundException('Candidature non trouvée');
    }

    // Vérifier que l'utilisateur est le propriétaire de la mission
    if (application.mission.clientId !== clientId) {
      throw new ForbiddenException('Non autorisé');
    }

    // Vérifier que la candidature est en attente
    if (application.status !== ApplicationStatus.PENDING) {
      throw new ForbiddenException('Cette candidature ne peut plus être acceptée');
    }

    // Accepter la candidature
    application.status = ApplicationStatus.ACCEPTED;
    application.respondedAt = new Date();

    // Mettre à jour la mission
    await this.missionsRepository.update(application.missionId, {
      status: MissionStatus.IN_PROGRESS,
      assignedFreelanceId: application.freelanceId,
      startedAt: new Date(),
    });

    // Rejeter toutes les autres candidatures
    await this.applicationsRepository.update(
      { missionId: application.missionId, status: ApplicationStatus.PENDING },
      { status: ApplicationStatus.REJECTED, respondedAt: new Date() }
    );

    return await this.applicationsRepository.save(application);
  }

  async rejectApplication(applicationId: string, clientId: string, reason?: string): Promise<Application> {
    const application = await this.applicationsRepository.findOne({
      where: { id: applicationId },
      relations: ['mission'],
    });

    if (!application) {
      throw new NotFoundException('Candidature non trouvée');
    }

    // Vérifier que l'utilisateur est le propriétaire de la mission
    if (application.mission.clientId !== clientId) {
      throw new ForbiddenException('Non autorisé');
    }

    application.status = ApplicationStatus.REJECTED;
    application.respondedAt = new Date();
    if (reason) {
      application.rejectionReason = reason;
    }

    return await this.applicationsRepository.save(application);
  }

  async completeMission(missionId: string, clientId: string): Promise<Mission> {
    const mission = await this.findOne(missionId);

    // Vérifier que l'utilisateur est le propriétaire de la mission
    if (mission.clientId !== clientId) {
      throw new ForbiddenException('Non autorisé');
    }

    // Vérifier que la mission est en cours
    if (mission.status !== MissionStatus.IN_PROGRESS) {
      throw new ForbiddenException('Cette mission ne peut pas être marquée comme terminée');
    }

    mission.status = MissionStatus.COMPLETED;
    mission.completedAt = new Date();

    const savedMission = await this.missionsRepository.save(mission);

    // Incrémenter le compteur de projets terminés du freelance
    if (mission.assignedFreelanceId) {
      await this.usersService.incrementCompletedProjects(mission.assignedFreelanceId);
    }

    return savedMission;
  }

  async cancelMission(missionId: string, clientId: string, reason?: string): Promise<Mission> {
    const mission = await this.findOne(missionId);

    // Vérifier que l'utilisateur est le propriétaire de la mission
    if (mission.clientId !== clientId) {
      throw new ForbiddenException('Non autorisé');
    }

    mission.status = MissionStatus.CANCELLED;
    mission.cancelledAt = new Date();
    if (reason) {
      mission.clientNotes = reason;
    }

    return await this.missionsRepository.save(mission);
  }

  async getFreelanceApplications(freelanceId: string, page: number = 1, limit: number = 10): Promise<{ applications: Application[], total: number }> {
    const queryBuilder = this.applicationsRepository.createQueryBuilder('application')
      .leftJoinAndSelect('application.mission', 'mission')
      .leftJoinAndSelect('mission.client', 'client')
      .where('application.freelanceId = :freelanceId', { freelanceId });

    // Pagination
    const offset = (page - 1) * limit;
    queryBuilder.skip(offset).take(limit);

    queryBuilder.orderBy('application.appliedAt', 'DESC');

    const [applications, total] = await queryBuilder.getManyAndCount();

    return { applications, total };
  }
}

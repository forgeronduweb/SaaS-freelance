import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Request } from '@nestjs/common';
import { MissionsService } from './missions.service';
import { CreateMissionDto } from './dto/create-mission.dto';
import { UpdateMissionDto } from './dto/update-mission.dto';
import { CreateApplicationDto } from './dto/create-application.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/enums/user-role.enum';
import { MissionStatus } from './enums/mission-status.enum';

@Controller('missions')
export class MissionsController {
  constructor(private readonly missionsService: MissionsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.CLIENT)
  @Post()
  create(@Body() createMissionDto: CreateMissionDto, @Request() req) {
    return this.missionsService.create(createMissionDto, req.user.userId);
  }

  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('status') status?: MissionStatus,
    @Query('category') category?: string,
    @Query('minBudget') minBudget?: number,
    @Query('maxBudget') maxBudget?: number,
    @Query('skills') skills?: string,
    @Query('isRemote') isRemote?: boolean,
    @Query('urgency') urgency?: string,
  ) {
    const filters = {
      status,
      category,
      minBudget,
      maxBudget,
      skills: skills ? skills.split(',') : undefined,
      isRemote: isRemote !== undefined ? isRemote === 'true' : undefined,
      urgency,
    };

    return this.missionsService.findAll(page, limit, filters);
  }

  @Get('my-missions')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.CLIENT)
  findMyMissions(
    @Request() req,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.missionsService.findByClient(req.user.userId, page, limit);
  }

  @Get('my-applications')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.FREELANCE)
  findMyApplications(
    @Request() req,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.missionsService.getFreelanceApplications(req.user.userId, page, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.missionsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.CLIENT)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMissionDto: UpdateMissionDto, @Request() req) {
    return this.missionsService.update(id, updateMissionDto, req.user.userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.CLIENT)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.missionsService.remove(id, req.user.userId);
  }

  // Gestion des candidatures
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.FREELANCE)
  @Post(':id/apply')
  applyToMission(
    @Param('id') missionId: string,
    @Body() createApplicationDto: CreateApplicationDto,
    @Request() req,
  ) {
    return this.missionsService.applyToMission(missionId, createApplicationDto, req.user.userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.CLIENT)
  @Get(':id/applications')
  getApplications(@Param('id') missionId: string, @Request() req) {
    return this.missionsService.getApplications(missionId, req.user.userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.CLIENT)
  @Patch('applications/:applicationId/accept')
  acceptApplication(@Param('applicationId') applicationId: string, @Request() req) {
    return this.missionsService.acceptApplication(applicationId, req.user.userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.CLIENT)
  @Patch('applications/:applicationId/reject')
  rejectApplication(
    @Param('applicationId') applicationId: string,
    @Body('reason') reason: string,
    @Request() req,
  ) {
    return this.missionsService.rejectApplication(applicationId, req.user.userId, reason);
  }

  // Gestion du statut des missions
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.CLIENT)
  @Patch(':id/complete')
  completeMission(@Param('id') missionId: string, @Request() req) {
    return this.missionsService.completeMission(missionId, req.user.userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.CLIENT)
  @Patch(':id/cancel')
  cancelMission(
    @Param('id') missionId: string,
    @Body('reason') reason: string,
    @Request() req,
  ) {
    return this.missionsService.cancelMission(missionId, req.user.userId, reason);
  }
}

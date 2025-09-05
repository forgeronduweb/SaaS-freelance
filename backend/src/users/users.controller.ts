import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from './enums/user-role.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('freelances')
  async findFreelances(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('country') country?: string,
    @Query('skills') skills?: string,
    @Query('minRate') minRate?: number,
    @Query('maxRate') maxRate?: number,
  ) {
    const filters = {
      country,
      skills: skills ? skills.split(',') : undefined,
      minRate,
      maxRate,
    };

    return this.usersService.findFreelances(page, limit, filters);
  }

  @Get('clients')
  async findClients(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.usersService.findClients(page, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string, 
    @Body() updateUserDto: UpdateUserDto,
    @Request() req,
  ) {
    // Vérifier que l'utilisateur modifie son propre profil ou est admin
    if (req.user.userId !== id && req.user.role !== UserRole.ADMIN) {
      throw new Error('Non autorisé à modifier ce profil');
    }
    
    return this.usersService.update(id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Patch(':id/deactivate')
  deactivate(@Param('id') id: string) {
    return this.usersService.deactivate(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Patch(':id/activate')
  activate(@Param('id') id: string) {
    return this.usersService.activate(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/verify-email')
  verifyEmail(@Param('id') id: string, @Request() req) {
    // Vérifier que l'utilisateur vérifie son propre email ou est admin
    if (req.user.userId !== id && req.user.role !== UserRole.ADMIN) {
      throw new Error('Non autorisé');
    }
    
    return this.usersService.verifyEmail(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/verify-phone')
  verifyPhone(@Param('id') id: string, @Request() req) {
    // Vérifier que l'utilisateur vérifie son propre téléphone ou est admin
    if (req.user.userId !== id && req.user.role !== UserRole.ADMIN) {
      throw new Error('Non autorisé');
    }
    
    return this.usersService.verifyPhone(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile/me')
  getMyProfile(@Request() req) {
    return this.usersService.findOne(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('profile/me')
  updateMyProfile(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(req.user.userId, updateUserDto);
  }
}

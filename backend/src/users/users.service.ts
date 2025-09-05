import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
// Les enums sont maintenant définis dans le schéma Prisma
// et seront disponibles après génération du client

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await this.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new ConflictException('Un utilisateur avec cet email existe déjà');
    }

    return await this.prisma.user.create({
      data: createUserDto,
    });
  }

  async findAll() {
    return await this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
    });
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        fullName: true,
        phone: true,
        role: true,
        isEmailVerified: true,
        isPhoneVerified: true,
        isActive: true,
        title: true,
        bio: true,
        hourlyRate: true,
        dailyRate: true,
        skills: true,
        country: true,
        city: true,
        profilePhoto: true,
        rating: true,
        totalReviews: true,
        completedProjects: true,
        companyName: true,
        companySize: true,
        sector: true,
        website: true,
        companyLogo: true,
        totalBudgetSpent: true,
        totalProjectsPublished: true,
        createdAt: true,
        lastLoginAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }

    return user;
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findFreelances(page: number = 1, limit: number = 10, filters?: any) {
    const where: any = {
      role: 'FREELANCE',
      isActive: true,
    };

    // Appliquer les filtres
    if (filters?.country) {
      where.country = filters.country;
    }

    if (filters?.skills && filters.skills.length > 0) {
      where.skills = {
        hasEvery: filters.skills,
      };
    }

    if (filters?.minRate || filters?.maxRate) {
      where.hourlyRate = {};
      if (filters?.minRate) {
        where.hourlyRate.gte = filters.minRate;
      }
      if (filters?.maxRate) {
        where.hourlyRate.lte = filters.maxRate;
      }
    }

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        select: {
          id: true,
          fullName: true,
          title: true,
          bio: true,
          hourlyRate: true,
          dailyRate: true,
          skills: true,
          country: true,
          city: true,
          profilePhoto: true,
          rating: true,
          totalReviews: true,
          completedProjects: true,
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: [
          { rating: 'desc' },
          { completedProjects: 'desc' },
        ],
      }),
      this.prisma.user.count({ where }),
    ]);

    return { users, total };
  }

  async findClients(page: number = 1, limit: number = 10) {
    const where = {
      role: 'CLIENT',
      isActive: true,
    };

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        select: {
          id: true,
          fullName: true,
          companyName: true,
          companySize: true,
          sector: true,
          website: true,
          companyLogo: true,
          country: true,
          city: true,
          totalBudgetSpent: true,
          totalProjectsPublished: true,
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: [
          { totalBudgetSpent: 'desc' },
          { totalProjectsPublished: 'desc' },
        ],
      }),
      this.prisma.user.count({ where }),
    ]);

    return { users, total };
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.findOne(id); // Vérifier que l'utilisateur existe
    
    return await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async updateLastLogin(id: string): Promise<void> {
    await this.prisma.user.update({
      where: { id },
      data: {
        lastLoginAt: new Date(),
      },
    });
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id); // Vérifier que l'utilisateur existe
    await this.prisma.user.delete({
      where: { id },
    });
  }

  async deactivate(id: string) {
    return await this.update(id, { isActive: false });
  }

  async activate(id: string) {
    return await this.update(id, { isActive: true });
  }

  async verifyEmail(id: string) {
    return await this.update(id, { isEmailVerified: true });
  }

  async verifyPhone(id: string) {
    return await this.update(id, { isPhoneVerified: true });
  }

  async updateRating(userId: string, newRating: number): Promise<void> {
    const user = await this.findOne(userId);
    
    // Calculer la nouvelle moyenne
    const totalRatings = user.totalReviews;
    const currentTotal = user.rating * totalRatings;
    const newTotal = currentTotal + newRating;
    const newAverage = newTotal / (totalRatings + 1);

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        rating: Math.round(newAverage * 10) / 10, // Arrondir à 1 décimale
        totalReviews: totalRatings + 1,
      },
    });
  }

  async incrementCompletedProjects(userId: string): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        completedProjects: {
          increment: 1,
        },
      },
    });
  }

  async incrementPublishedProjects(userId: string): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        totalProjectsPublished: {
          increment: 1,
        },
      },
    });
  }

  async addBudgetSpent(userId: string, amount: number): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        totalBudgetSpent: {
          increment: amount,
        },
      },
    });
  }
}

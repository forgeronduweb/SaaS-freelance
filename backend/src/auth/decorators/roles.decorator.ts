import { SetMetadata } from '@nestjs/common';
// UserRole sera disponible après génération du client Prisma

export const ROLES_KEY = 'roles';
export const Roles = (...roles: ('FREELANCE' | 'CLIENT' | 'ADMIN')[]) => SetMetadata(ROLES_KEY, roles);

import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
// UserRole sera disponible après génération du client Prisma

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('Utilisateur non authentifié');
    }
    return user && user.role === 'ADMIN';
  }
}

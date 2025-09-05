import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
  private store: RateLimitStore = {};
  private readonly windowMs = 15 * 60 * 1000; // 15 minutes
  private readonly maxRequests = 100; // Max requests per window

  use(req: Request, res: Response, next: NextFunction): void {
    const key = this.generateKey(req);
    const now = Date.now();
    
    // Nettoyer les entrées expirées
    this.cleanup(now);
    
    if (!this.store[key]) {
      this.store[key] = {
        count: 1,
        resetTime: now + this.windowMs,
      };
    } else {
      if (now > this.store[key].resetTime) {
        // Réinitialiser le compteur
        this.store[key] = {
          count: 1,
          resetTime: now + this.windowMs,
        };
      } else {
        this.store[key].count++;
      }
    }

    const { count, resetTime } = this.store[key];
    
    // Ajouter les headers de rate limiting
    res.setHeader('X-RateLimit-Limit', this.maxRequests);
    res.setHeader('X-RateLimit-Remaining', Math.max(0, this.maxRequests - count));
    res.setHeader('X-RateLimit-Reset', Math.ceil(resetTime / 1000));

    if (count > this.maxRequests) {
      throw new HttpException(
        'Trop de requêtes. Veuillez réessayer plus tard.',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    next();
  }

  private generateKey(req: Request): string {
    // Utiliser l'IP + User-Agent pour identifier l'utilisateur
    const ip = req.ip || req.connection.remoteAddress || 'unknown';
    const userAgent = req.get('User-Agent') || 'unknown';
    return `${ip}:${userAgent}`;
  }

  private cleanup(now: number): void {
    Object.keys(this.store).forEach(key => {
      if (now > this.store[key].resetTime) {
        delete this.store[key];
      }
    });
  }
}

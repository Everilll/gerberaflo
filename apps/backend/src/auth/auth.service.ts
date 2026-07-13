import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Admin } from '@prisma/client';
import { HashingService } from '../common/hashing/hashing.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly hashing: HashingService,
  ) {}

  async validateAdmin(email: string, password: string): Promise<Admin> {
    const admin = await this.prisma.admin.findUnique({
      where: { email },
    });

    if (!admin) {
      throw new UnauthorizedException('Email atau password salah');
    }

    if (!admin.isActive || admin.deletedAt !== null) {
      throw new UnauthorizedException('Akun admin tidak aktif');
    }

    const isValid = this.hashing.verify(password, admin.passwordHash);
    if (!isValid) {
      throw new UnauthorizedException('Email atau password salah');
    }

    return admin;
  }

  login(admin: Admin): { accessToken: string } {
    const payload = {
      sub: admin.id,
      email: admin.email,
      role: admin.role,
    };

    return {
      accessToken: this.jwt.sign(payload),
    };
  }
}

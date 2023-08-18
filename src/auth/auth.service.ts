import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { RegisterEntity } from './entities/register.entity';
import { plainToInstance } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable({})
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(body: RegisterDto): Promise<RegisterEntity> {
    const hashedPassword = await bcrypt.hash(body.password, 10);
    try {
      const user = await this.prismaService.user.create({
        data: {
          email: body.email,
          firstName: body.firstName,
          lastName: body.lastName,
          password: hashedPassword,
          username: body.username,
        },
        select: {
          userId: true,
          email: true,
          firstName: true,
          lastName: true,
        },
      });
      return plainToInstance(RegisterEntity, user);
    } catch (error) {
      if (error.code === 'P2002') {
        throw new BadRequestException({
          message: `${error.meta.target.join(', ')} already exists`,
          statusCode: 400,
        });
      }
    }
  }

  async login(body: LoginDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        username: body.username,
      },
    });

    if (!user)
      throw new BadRequestException({
        message: 'incorrect username or password',
        statusCode: 400,
      });

    const match = await bcrypt.compare(body.password, user.password);

    if (!match)
      throw new BadRequestException({
        message: 'incorrect username or password',
        statusCode: 400,
      });

    const accessToken = await this.convertJwt(user.userId);

    return {
      accessToken,
    };
  }

  private async convertJwt(userId: number) {
    const payload = {
      sub: userId,
    };

    return this.jwtService.signAsync(payload, {
      expiresIn: '10m',
      secret: process.env.JWT_SECRET,
    });
  }
}

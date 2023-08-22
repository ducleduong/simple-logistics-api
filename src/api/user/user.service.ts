import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { GetMeEntity } from './entities/get-me.entity';
import { CommonHeader } from 'src/common/header/header.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async getMe(header: CommonHeader): Promise<GetMeEntity> {
    const user = this.prismaService.user.findUnique({
      where: {
        userId: parseInt(header.userId),
      },
    });

    return plainToInstance(GetMeEntity, user);
  }
}

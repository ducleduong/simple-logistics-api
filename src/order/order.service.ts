import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GetOrdersDto } from './dto/get-orders.dto';
import { GetOrdersEntity } from './entities/get-orders.entity';
import { CommonHeader } from '../common/header/header.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class OrderService {
  constructor(private prismaService: PrismaService) {}

  async getOrders(
    header: CommonHeader,
    query: GetOrdersDto,
  ): Promise<GetOrdersEntity> {
    let whereCondition: any = {
      userId: header.userId,
    };

    if (query?.customerName) {
      whereCondition = {
        ...whereCondition,
        customer: {
          OR: [
            { firstName: { contains: query.customerName } },
            { lastName: { contains: query.customerName } },
          ],
        },
      };
    }

    if (query?.orderId) {
      whereCondition = {
        ...whereCondition,
        orderId: query.orderId,
      };
    }

    if (query?.shippingDate) {
      whereCondition = {
        ...whereCondition,
        shippingDate: query.shippingDate,
      };
    }

    const orders = await this.prismaService.order.findMany({
      where: whereCondition,
      take: query?.limit || 20,
      skip: query?.offset * query?.limit || 0,
      orderBy: {
        [query?.orderBy || 'orderId']: query?.asc ? 'asc' : 'desc',
      },
    });

    const total = await this.prismaService.order.count({
      where: whereCondition,
    });

    const result = {
      total,
      orders,
      limit: query?.limit || 20,
      offset: query?.offset * query?.limit || 0,
    };

    return plainToInstance(GetOrdersEntity, result);
  }
}

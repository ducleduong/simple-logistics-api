import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { GetOrdersDto } from './dto/get-orders.dto';
import { GetOrdersEntity } from './entities/get-orders.entity';
import { CommonHeader } from '../../common/header/header.dto';
import { plainToInstance } from 'class-transformer';
import { CreateOrderEntity } from './entities/create-order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderStatus } from '@prisma/client';
import { GetOrderParamDto } from './dto/get-order.dto';
import { GetOrderDetailEntity } from './entities/get-order-details.entity';

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

  async getOrderDetails(
    param: GetOrderParamDto,
  ): Promise<GetOrderDetailEntity> {
    const order = await this.prismaService.order.findFirst({
      where: {
        orderId: param.orderId,
      },
      select: {
        orderId: true,
        customer: true,
        shippingAddress: true,
        recipientAddress: true,
        expectedDeliveryDate: true,
        shippingDate: true,
        status: true,
      },
    });

    if (!order) {
      throw new NotFoundException({
        message: 'Resource not found',
        statusCode: HttpStatus.NOT_FOUND,
      });
    }

    return plainToInstance(GetOrderDetailEntity, {
      orderId: order.orderId,
      customer: order.customer,
      shippingAddress: order.shippingAddress,
      recipientAddress: order.recipientAddress,
      expectedDeliveryDate: order.expectedDeliveryDate,
      shippingDate: order.shippingDate,
      status: order.status,
    });
  }

  async createOrder(
    header: CommonHeader,
    body: CreateOrderDto,
  ): Promise<CreateOrderEntity> {
    const order = await this.prismaService.order.create({
      data: {
        customerId: body.customerId,
        shippingAddressId: body.shippingAddressId,
        recipientAddressId: body.recipientAddressId,
        status: OrderStatus.PENDING,
        expectedDeliveryDate: body.expectedDeliveryDate,
        shippingDate: null,
        userId: parseInt(header.userId),
      },
      select: {
        customer: true,
        shippingAddress: true,
        recipientAddress: true,
        status: true,
        shippingDate: true,
        expectedDeliveryDate: true,
        orderId: true,
      },
    });

    return plainToInstance(CreateOrderEntity, {
      orderId: order.orderId,
      customer: order.customer,
      shippingAddress: order.shippingAddress,
      recipientAddress: order.recipientAddress,
      expectedDeliveryDate: order.expectedDeliveryDate,
      status: order.status,
    });
  }
}

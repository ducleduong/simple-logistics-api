import {
  BadRequestException,
  ForbiddenException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { GetOrdersDto } from './dto/get-orders.dto';
import { GetOrdersEntity } from './entities/get-orders.entity';
import { CommonHeader } from '../../common/header/header.dto';
import { plainToInstance } from 'class-transformer';
import { CreateOrderEntity } from './entities/create-order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderStatus, Role } from '@prisma/client';
import { GetOrderDetailEntity } from './entities/get-order-details.entity';
import { UpdateOrderDto } from './dto/update-order.dto';
import { UpdateOrderEntity } from './entities/update-order.entity';

@Injectable()
export class OrderService {
  constructor(private prismaService: PrismaService) {}

  async getOrders(
    header: CommonHeader,
    query: GetOrdersDto,
  ): Promise<GetOrdersEntity> {
    let whereCondition: any = {};

    const user = await this.prismaService.user.findUnique({
      where: {
        userId: parseInt(header.userId),
      },
    });

    if (user.role === Role.USER)
      whereCondition['userId'] = parseInt(header.userId);

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
      select: {
        orderId: true,
        customer: true,
        shippingDate: true,
        status: true,
      },
    });

    const total = await this.prismaService.order.count({
      where: whereCondition,
    });

    const result = {
      total,
      orders: orders.map(order => ({
        orderId: order.orderId,
        customerFirstName: order.customer.firstName,
        customerLastName: order.customer.lastName,
        shippingDate: order.shippingDate,
        status: order.status,
      })),
      limit: query?.limit || 20,
      offset: query?.offset * query?.limit || 0,
    };

    return plainToInstance(GetOrdersEntity, result);
  }

  async getOrderDetails(
    header: CommonHeader,
    orderId: number,
  ): Promise<GetOrderDetailEntity> {
    const user = await this.prismaService.user.findUnique({
      where: {
        userId: parseInt(header.userId),
      },
    });

    const whereCondition: any = {
      orderId,
    };

    if (user.role === Role.USER)
      whereCondition['userId'] = parseInt(header.userId);

    const order = await this.prismaService.order.findFirst({
      where: whereCondition,
      select: {
        orderId: true,
        customer: true,
        shippingAddress: {
          select: {
            city: { select: { id: true } },
            state: { select: { id: true } },
            country: { select: { id: true } },
            address: true,
            postalCode: true,
          },
        },
        recipientAddress: {
          select: {
            city: { select: { id: true } },
            state: { select: { id: true } },
            country: { select: { id: true } },
            address: true,
            postalCode: true,
          },
        },
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
      shippingAddress: {
        address: order.shippingAddress.address,
        cityId: order.shippingAddress.city.id,
        stateId: order.shippingAddress.state.id,
        countryId: order.shippingAddress.country.id,
        postalCode: order.shippingAddress.postalCode,
      },
      recipientAddress: {
        address: order.recipientAddress.address,
        cityId: order.recipientAddress.city.id,
        stateId: order.recipientAddress.state.id,
        countryId: order.recipientAddress.country.id,
        postalCode: order.recipientAddress.postalCode,
      },
      expectedDeliveryDate: order.expectedDeliveryDate,
      shippingDate: order.shippingDate,
      status: order.status,
    });
  }

  async createOrder(
    header: CommonHeader,
    body: CreateOrderDto,
  ): Promise<CreateOrderEntity> {
    const order = this.prismaService.order.create({
      data: {
        customerId: body.customerId,
        shippingAddressId: body.shippingAddressId,
        recipientAddressId: body.recipientAddressId,
        expectedDeliveryDate: body.expectedDeliveryDate,
        status: OrderStatus.PENDING,
        userId: parseInt(header.userId),
      },
    });

    return plainToInstance(CreateOrderEntity, order);
  }

  async updateOrder(
    header: CommonHeader,
    orderId: number,
    body: UpdateOrderDto,
  ): Promise<UpdateOrderEntity> {
    const order = await this.prismaService.order.findFirst({
      where: { orderId: orderId },
    });

    if (!order)
      throw new NotFoundException({
        message: 'Order not found',
        statusCode: HttpStatus.NOT_FOUND,
      });

    const user = await this.prismaService.user.findUnique({
      where: { userId: parseInt(header.userId) },
    });

    if (
      (order.userId !== parseInt(header.userId) && user.role === Role.USER) ||
      (body.shippingAddressId && user.role !== Role.USER)
    )
      throw new ForbiddenException({
        message: 'Do not have permission',
        statusCode: HttpStatus.FORBIDDEN,
      });

    if (order.status !== OrderStatus.PENDING && user.role === Role.USER)
      throw new BadRequestException({
        message: `Cannot update order while status is ${order.status}`,
        statusCode: HttpStatus.BAD_REQUEST,
      });

    const updatedOrder = await this.prismaService.order.update({
      where: { orderId: orderId },
      data: { ...body },
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

    return plainToInstance(UpdateOrderEntity, {
      orderId: updatedOrder.orderId,
      customer: updatedOrder.customer,
      shippingAddress: updatedOrder.shippingAddress,
      recipientAddress: updatedOrder.recipientAddress,
      expectedDeliveryDate: updatedOrder.expectedDeliveryDate,
      status: updatedOrder.status,
    });
  }

  async deleteOrder(header: CommonHeader, orderId: number) {
    const order = await this.prismaService.order.findFirst({
      where: { orderId: orderId },
    });

    if (!order)
      throw new NotFoundException({
        message: 'Order not found',
        statusCode: HttpStatus.NOT_FOUND,
      });

    if (order.userId !== parseInt(header.userId))
      throw new ForbiddenException({
        message: 'Do not have permission',
        statusCode: HttpStatus.FORBIDDEN,
      });

    await this.prismaService.order.delete({
      where: { orderId: orderId },
    });

    return {
      message: 'successfully deleted order',
      statusCode: HttpStatus.OK,
    };
  }
}

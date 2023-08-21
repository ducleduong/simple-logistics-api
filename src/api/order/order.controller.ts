import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CommonHeader } from '../../common/header/header.dto';
import { GetOrdersDto } from './dto/get-orders.dto';
import { RequestHeader } from '../../decorators/request-header.decorator';
import { CreateOrderDto } from './dto/create-order.dto';
import { AuthGuard } from '@nestjs/passport';
import { CreateOrderEntity } from './entities/create-order.entity';
import { GetOrdersEntity } from './entities/get-orders.entity';
import { GetOrderParamDto } from './dto/get-order.dto';
import { GetOrderDetailEntity } from './entities/get-order-details.entity';

@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getOrder(
    @RequestHeader(CommonHeader) header: CommonHeader,
    @Query() query: GetOrdersDto,
  ): Promise<GetOrdersEntity> {
    return await this.orderService.getOrders(header, query);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createOrder(
    @RequestHeader(CommonHeader) header: CommonHeader,
    @Body() body: CreateOrderDto,
  ): Promise<CreateOrderEntity> {
    return await this.orderService.createOrder(header, body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/:orderId')
  async getOrderDetails(
    @Param() param: GetOrderParamDto,
  ): Promise<GetOrderDetailEntity> {
    return await this.orderService.getOrderDetails(param);
  }
}

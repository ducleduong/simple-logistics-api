import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
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
import { GetOrderDetailEntity } from './entities/get-order-details.entity';
import { UpdateOrderDto } from './dto/update-order.dto';
import { UpdateOrderEntity } from './entities/update-order.entity';

@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getOrders(
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
    @RequestHeader(CommonHeader) header: CommonHeader,
    @Param('orderId', ParseIntPipe) orderId: number,
  ): Promise<GetOrderDetailEntity> {
    return await this.orderService.getOrderDetails(header, orderId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('/:orderId')
  async updateOrder(
    @RequestHeader(CommonHeader) header: CommonHeader,
    @Param('orderId', ParseIntPipe) orderId: number,
    @Body() body: UpdateOrderDto,
  ): Promise<UpdateOrderEntity> {
    return await this.orderService.updateOrder(header, orderId, body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/:orderId')
  async DeleteOrderParamDto(
    @RequestHeader(CommonHeader) header: CommonHeader,
    @Param('orderId', ParseIntPipe) orderId: number,
  ) {
    return await this.orderService.deleteOrder(header, orderId);
  }
}

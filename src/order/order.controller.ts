import { Controller, Get, Query } from '@nestjs/common';
import { OrderService } from './order.service';
import { CommonHeader } from '../common/header/header.dto';
import { GetOrdersDto } from './dto/get-orders.dto';
import { RequestHeader } from '../decorators/request-header.decorator';

@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get()
  async getOrder(
    @RequestHeader(CommonHeader) header: CommonHeader,
    @Query() query: GetOrdersDto,
  ) {
    return await this.orderService.getOrders(header, query);
  }
}

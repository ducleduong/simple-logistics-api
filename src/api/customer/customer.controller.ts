import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { AuthGuard } from '@nestjs/passport';
import { RequestHeader } from 'src/decorators/request-header.decorator';
import { CommonHeader } from 'src/common/header/header.dto';
import { GetCustomerDto } from './dto/get-customer.dto';
import { GetCustomerEntity } from './entities/get-customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CreateCustomerEntity } from './entities/create-customer.entity';

@Controller('customers')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getCustomers(
    @RequestHeader(CommonHeader) header: CommonHeader,
    @Query() query: GetCustomerDto,
  ): Promise<GetCustomerEntity> {
    return await this.customerService.getCustomers(header, query);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createCustomer(
    @RequestHeader(CommonHeader) header: CommonHeader,
    @Body() body: CreateCustomerDto,
  ): Promise<CreateCustomerEntity> {
    return this.customerService.createCustomer(header, body);
  }
}

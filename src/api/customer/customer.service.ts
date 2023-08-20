import { Injectable } from '@nestjs/common';
import { CommonHeader } from '../../common/header/header.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { GetCustomerDto } from './dto/get-customer.dto';
import { GetCustomerEntity } from './entities/get-customer.entity';
import { plainToInstance } from 'class-transformer';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CreateCustomerEntity } from './entities/create-customer.entity';

@Injectable()
export class CustomerService {
  constructor(private prismaService: PrismaService) {}

  //Get Customers
  async getCustomers(
    header: CommonHeader,
    query: GetCustomerDto,
  ): Promise<GetCustomerEntity> {
    let whereCondition: any = {
      userId: parseInt(header.userId),
    };

    if (query?.customerName) {
      whereCondition = {
        ...whereCondition,
        OR: [
          {
            firstName: {
              contains: query.customerName,
            },
          },
          {
            lastName: {
              contains: query.customerName,
            },
          },
        ],
      };
    }

    const customers = this.prismaService.customer.findMany({
      where: whereCondition,
    });

    return plainToInstance(GetCustomerEntity, customers);
  }

  //Create a new customer
  async createCustomer(
    header: CommonHeader,
    body: CreateCustomerDto,
  ): Promise<CreateCustomerEntity> {
    const customer = await this.prismaService.customer.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        userId: parseInt(header.userId),
      },
    });

    return plainToInstance(CreateCustomerEntity, customer);
  }
}

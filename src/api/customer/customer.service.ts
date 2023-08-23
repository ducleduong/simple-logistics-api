import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CommonHeader } from '../../common/header/header.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { GetCustomerDto } from './dto/get-customer.dto';
import { GetCustomerEntity } from './entities/get-customer.entity';
import { plainToInstance } from 'class-transformer';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CreateCustomerEntity } from './entities/create-customer.entity';
import { CheckCustomerDto } from './dto/check-customer.dto';

@Injectable()
export class CustomerService {
  constructor(private prismaService: PrismaService) {}

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
      select: {
        customerId: true,
        firstName: true,
        lastName: true,
        userId: true,
        addresses: {
          select: {
            address: true,
            addressId: true,
            country: true,
            city: true,
            state: true,
            postalCode: true,
          },
        },
      },
    });

    return plainToInstance(GetCustomerEntity, customers);
  }

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

  async checkCustomer(header: CommonHeader, query: CheckCustomerDto) {
    const customer = await this.prismaService.customer.findFirst({
      where: {
        firstName: query.firstName,
        lastName: query.lastName,
        userId: parseInt(header.userId),
      },
      include: {
        addresses: true,
      },
    });

    if (!customer)
      throw new NotFoundException({
        message: 'Customer not found',
        statusCode: HttpStatus.NOT_FOUND,
      });

    return customer;
  }
}

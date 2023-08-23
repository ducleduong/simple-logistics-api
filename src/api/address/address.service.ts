import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { CreateAddressEntity } from './entities/create-address.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AddressService {
  constructor(private prismaService: PrismaService) {}

  async createAddress(body: CreateAddressDto): Promise<CreateAddressEntity> {
    const customer = await this.prismaService.customer.findFirst({
      where: {
        customerId: body.customerId,
      },
    });

    if (!customer) {
      throw new NotFoundException({
        message: 'resource not found',
        statusCode: HttpStatus.NOT_FOUND,
      });
    }

    const address = await this.prismaService.address.create({
      data: {
        address: body.address,
        stateId: body.stateId,
        cityId: body.cityId,
        countryId: body.countryId,
        postalCode: body.postalCode,
        customers: {
          connect: { customerId: customer.customerId },
        },
      },
      select: {
        country: true,
        state: true,
        city: true,
        address: true,
        postalCode: true,
        addressId: true,
      },
    });

    return plainToInstance(CreateAddressEntity, {
      address: address.address,
      country: address.country.name,
      state: address.state.name,
      city: address.city.name,
      postalCode: address.postalCode,
      addressId: address.addressId,
    });
  }

  async getCountries() {
    const countries = await this.prismaService.country.findMany({
      select: {
        id: true,
        name: true,
        states: {
          select: {
            id: true,
            name: true,
            cities: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    return countries;
  }
}

import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AddressService } from './address.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateAddressDto } from './dto/create-address.dto';
import { CreateAddressEntity } from './entities/create-address.entity';

@Controller('address')
export class AddressController {
  constructor(private addressService: AddressService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createAddress(
    @Body() body: CreateAddressDto,
  ): Promise<CreateAddressEntity> {
    return this.addressService.createAddress(body);
  }
}

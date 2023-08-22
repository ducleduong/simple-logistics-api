import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { RequestHeader } from 'src/decorators/request-header.decorator';
import { CommonHeader } from 'src/common/header/header.dto';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('/me')
  async getMe(@RequestHeader(CommonHeader) header: CommonHeader) {
    return await this.userService.getMe(header);
  }
}

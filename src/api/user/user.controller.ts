import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('/me')
  async me() {
    return await this.userService.getMe();
  }
}

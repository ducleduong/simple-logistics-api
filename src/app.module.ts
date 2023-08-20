import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './api/auth/auth.module';
import { UserModule } from './api/user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { OrderModule } from './api/order/order.module';
import { CustomerService } from './api/customer/customer.service';
import { CustomerModule } from './api/customer/customer.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    UserModule,
    PrismaModule,
    OrderModule,
    CustomerModule,
  ],
  controllers: [AppController],
  providers: [AppService, CustomerService],
})
export class AppModule {}

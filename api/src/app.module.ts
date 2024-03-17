import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmConfig } from "./configs/typeorm.config";
import { AuthModule } from './auth/auth.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [AuthModule, TypeOrmModule.forRoot(typeOrmConfig)],
})
export class AppModule {}
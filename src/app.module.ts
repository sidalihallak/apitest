import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ResumeModule } from './resume/resume.module';
import { dataSourceOptions } from "../db/data-source";
import { AuthModule } from './auth/auth.module';
import { AuthInterceptor } from "./interceptor/auth.interceptor";
import { APP_INTERCEPTOR } from "@nestjs/core";


@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    ResumeModule,
    UserModule,
    AuthModule,
  ],
  providers: [{
    provide: APP_INTERCEPTOR,
    useClass: AuthInterceptor,
  }]})
export class AppModule {}

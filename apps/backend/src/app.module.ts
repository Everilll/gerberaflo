import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UploadModule } from './upload/upload.module';
import { AppConfigModule } from './config/config.module';
import { AuthModule } from './auth/auth.module';
import { HashingModule } from './common/hashing/hashing.module';

@Module({
  imports: [
    PrismaModule,
    UploadModule,
    AppConfigModule,
    AuthModule,
    HashingModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

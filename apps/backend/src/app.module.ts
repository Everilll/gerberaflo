import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UploadModule } from './upload/upload.module';
import { AuthModule } from './auth/auth.module';
import { HashingModule } from './common/hashing/hashing.module';
import { AppConfigModule } from './common/config/config.module';
import { ProjectConfigModule } from './config/app-config.module';

@Module({
  imports: [
    PrismaModule,
    UploadModule,
    AppConfigModule,
    AuthModule,
    HashingModule,
    ProjectConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

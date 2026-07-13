import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UploadModule } from './upload/upload.module';
import { ModuleService } from './module/module.service';

@Module({
  imports: [PrismaModule, UploadModule],
  controllers: [AppController],
  providers: [AppService, ModuleService],
})
export class AppModule {}

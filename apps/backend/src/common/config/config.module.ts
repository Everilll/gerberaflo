import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().required(),
        PORT: Joi.number().default(3000),
        FRONTEND_URL: Joi.string().default('*'),
        // JWT
        JWT_SECRET: Joi.string().min(16).required(),
        JWT_EXPIRES_IN: Joi.string().default('7d'),
        // Seed
        SEED_SUPERADMIN_EMAIL: Joi.string().email().default('superadmin@gerberaflo.local'),
        SEED_SUPERADMIN_PASSWORD: Joi.string().min(8).default('SuperAdmin123!'),
        SEED_SUPERADMIN_NAME: Joi.string().default('Super Admin'),
        // Cloudinary
        CLOUDINARY_CLOUD_NAME: Joi.string().required(),
        CLOUDINARY_API_KEY: Joi.string().required(),
        CLOUDINARY_API_SECRET: Joi.string().required(),
      }),
      validationOptions: {
        abortEarly: false,
        allowUnknown: true,
      },
    }),
  ],
})
export class AppConfigModule {}

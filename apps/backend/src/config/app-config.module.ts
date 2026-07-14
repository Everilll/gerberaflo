import * as Joi from 'joi';
import { AppConfigModule } from '../common/config/app-config.module';

export const ProjectConfigModule = AppConfigModule.forProject(
  Joi.object({
    // Seed
    SEED_SUPERADMIN_EMAIL: Joi.string().email().default('superadmin@gerberaflo.local'),
    SEED_SUPERADMIN_PASSWORD: Joi.string().min(8).default('SuperAdmin123!'),
    SEED_SUPERADMIN_NAME: Joi.string().default('Super Admin'),

    // Cloudinary
    CLOUDINARY_CLOUD_NAME: Joi.string().required(),
    CLOUDINARY_API_KEY: Joi.string().required(),
    CLOUDINARY_API_SECRET: Joi.string().required(),
  }),
);

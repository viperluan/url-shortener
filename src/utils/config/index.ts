import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  databaseUrl: process.env.DATABASE_URL || '',
  jwtSecretKey: process.env.JWT_SECRET_KEY || '',
};

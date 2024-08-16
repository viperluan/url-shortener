import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  databaseUrl:
    process.env.DATABASE_URL ||
    'postgresql://shorten_url:1234@localhost:5432/shorten_url?schema=public',
  jwtSecretKey: process.env.JWT_SECRET_KEY || 'default_security_key',
};

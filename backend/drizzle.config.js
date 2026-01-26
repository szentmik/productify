import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
import { ENV } from './src/config/env';

if (!ENV.DB_URL) {
  throw new Error('DATABASE_URL is not set in the .env file');
}

export default defineConfig({
  schema: "./src/db/schema.js", // Your schema file path
  out: './drizzle', // Your migrations folder
  dialect: 'postgresql',
  dbCredentials: {
    url: ENV.DB_URL,
  },
});
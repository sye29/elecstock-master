import * as dotenv from 'dotenv';
import { Config } from './types';

dotenv.config();

export function loadConfig(): Config {
  const requiredEnvVars = [
    'TELEGRAM_BOT_TOKEN',
    'TELEGRAM_CHAT_ID',
    'OPENWEATHER_API_KEY',
    'CITY'
  ];

  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      throw new Error(`Missing required environment variable: ${envVar}`);
    }
  }

  return {
    telegramBotToken: process.env.TELEGRAM_BOT_TOKEN!,
    telegramChatId: process.env.TELEGRAM_CHAT_ID!,
    openWeatherApiKey: process.env.OPENWEATHER_API_KEY!,
    city: process.env.CITY!,
    countryCode: process.env.COUNTRY_CODE || '',
    weatherSchedule: process.env.WEATHER_SCHEDULE || '0 8 * * *',
    temperatureUnit: (process.env.TEMPERATURE_UNIT as 'metric' | 'imperial' | 'kelvin') || 'metric'
  };
}

export const config = loadConfig();
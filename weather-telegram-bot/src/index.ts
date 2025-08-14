#!/usr/bin/env node

import { SchedulerService } from './scheduler';
import { config } from './config';

class WeatherTelegramBot {
  private scheduler: SchedulerService;

  constructor() {
    this.scheduler = new SchedulerService();
  }

  async start(): Promise<void> {
    console.log('🚀 Starting Weather Telegram Bot...');
    console.log('⚙️ Configuration:');
    console.log(`   📍 Location: ${config.city}${config.countryCode ? `, ${config.countryCode}` : ''}`);
    console.log(`   📊 Temperature Unit: ${config.temperatureUnit}`);
    console.log(`   ⏰ Schedule: ${config.weatherSchedule}`);
    console.log(`   💬 Chat ID: ${config.telegramChatId}`);
    console.log('');

    try {
      // Test services before starting
      const servicesOk = await this.scheduler.testServices();
      
      if (!servicesOk) {
        console.error('❌ Service tests failed. Please check your configuration.');
        process.exit(1);
      }

      // Send initial weather update
      console.log('📤 Sending initial weather update...');
      await this.scheduler.sendImmediateUpdate();

      // Start the scheduler
      this.scheduler.start();

      console.log('');
      console.log('✅ Weather Telegram Bot is now running!');
      console.log('📅 Scheduled updates will be sent according to the configured schedule.');
      console.log('🛑 Press Ctrl+C to stop the bot.');
      
    } catch (error) {
      console.error('❌ Failed to start the bot:', error);
      process.exit(1);
    }
  }

  async stop(): Promise<void> {
    console.log('\n🛑 Stopping Weather Telegram Bot...');
    this.scheduler.stop();
    console.log('👋 Bot stopped successfully. Goodbye!');
    process.exit(0);
  }
}

// Handle graceful shutdown
function setupGracefulShutdown(bot: WeatherTelegramBot): void {
  const shutdown = async (signal: string) => {
    console.log(`\n📡 Received ${signal}, shutting down gracefully...`);
    await bot.stop();
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
  
  // Handle unhandled promise rejections
  process.on('unhandledRejection', (reason, promise) => {
    console.error('⚠️ Unhandled Rejection at:', promise, 'reason:', reason);
    // Don't exit the process for unhandled rejections in production
    // process.exit(1);
  });

  // Handle uncaught exceptions
  process.on('uncaughtException', (error) => {
    console.error('💥 Uncaught Exception thrown:', error);
    process.exit(1);
  });
}

// Parse command line arguments
function parseArguments(): { command?: string } {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    return {};
  }

  const command = args[0];
  return { command };
}

async function main(): Promise<void> {
  const bot = new WeatherTelegramBot();
  const { command } = parseArguments();

  setupGracefulShutdown(bot);

  switch (command) {
    case 'test':
      console.log('🧪 Testing bot configuration and services...');
      const scheduler = new SchedulerService();
      const result = await scheduler.testServices();
      process.exit(result ? 0 : 1);
      break;

    case 'send':
      console.log('📤 Sending immediate weather update...');
      const immediateScheduler = new SchedulerService();
      await immediateScheduler.sendImmediateUpdate();
      console.log('✅ Weather update sent successfully!');
      process.exit(0);
      break;

    case 'help':
    case '--help':
    case '-h':
      console.log(`
🌤️ Weather Telegram Bot

Usage:
  npm start           Start the bot with scheduled updates
  npm run dev         Start the bot in development mode
  npm run send        Send immediate weather update
  npm run test        Test bot configuration and services

Commands:
  test               Test configuration and API connections
  send               Send a single weather update
  help               Show this help message

Environment Variables:
  TELEGRAM_BOT_TOKEN     Your Telegram bot token
  TELEGRAM_CHAT_ID       Your Telegram group chat ID
  OPENWEATHER_API_KEY    Your OpenWeatherMap API key
  CITY                   City name for weather updates
  COUNTRY_CODE           Optional country code
  WEATHER_SCHEDULE       Cron schedule (default: "0 8 * * *")
  TEMPERATURE_UNIT       metric, imperial, or kelvin (default: metric)
      `);
      process.exit(0);
      break;

    default:
      if (command) {
        console.error(`❌ Unknown command: ${command}`);
        console.log('Run "npm start help" for usage information.');
        process.exit(1);
      }
      // No command provided, start normally
      await bot.start();
      break;
  }
}

// Start the application
main().catch((error) => {
  console.error('💥 Fatal error:', error);
  process.exit(1);
});
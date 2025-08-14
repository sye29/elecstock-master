import cron from 'node-cron';
import WeatherAgent from './index.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

class WeatherScheduler {
  constructor() {
    this.agent = new WeatherAgent();
    this.schedules = new Map();
  }

  // Schedule daily weather report at 8:00 AM
  scheduleDailyReport(city = null, time = '0 8 * * *') {
    const scheduleId = `daily_${city || 'default'}`;
    
    if (this.schedules.has(scheduleId)) {
      console.log(`Schedule ${scheduleId} already exists`);
      return;
    }

    const task = cron.schedule(time, async () => {
      console.log(`🕐 Executing scheduled daily weather report for ${city || 'default city'}...`);
      await this.agent.sendWeatherReport(city);
    }, {
      scheduled: true,
      timezone: process.env.TIMEZONE || 'UTC'
    });

    this.schedules.set(scheduleId, task);
    console.log(`✅ Scheduled daily weather report for ${city || 'default city'} at ${time}`);
    
    return scheduleId;
  }

  // Schedule weather report every 6 hours
  scheduleEvery6Hours(city = null) {
    const scheduleId = `6hour_${city || 'default'}`;
    
    if (this.schedules.has(scheduleId)) {
      console.log(`Schedule ${scheduleId} already exists`);
      return;
    }

    const task = cron.schedule('0 */6 * * *', async () => {
      console.log(`🕐 Executing scheduled 6-hour weather report for ${city || 'default city'}...`);
      await this.agent.sendWeatherReport(city);
    }, {
      scheduled: true,
      timezone: process.env.TIMEZONE || 'UTC'
    });

    this.schedules.set(scheduleId, task);
    console.log(`✅ Scheduled 6-hour weather report for ${city || 'default city'}`);
    
    return scheduleId;
  }

  // Schedule weather report every 12 hours
  scheduleEvery12Hours(city = null) {
    const scheduleId = `12hour_${city || 'default'}`;
    
    if (this.schedules.has(scheduleId)) {
      console.log(`Schedule ${scheduleId} already exists`);
      return;
    }

    const task = cron.schedule('0 */12 * * *', async () => {
      console.log(`🕐 Executing scheduled 12-hour weather report for ${city || 'default city'}...`);
      await this.agent.sendWeatherReport(city);
    }, {
      scheduled: true,
      timezone: process.env.TIMEZONE || 'UTC'
    });

    this.schedules.set(scheduleId, task);
    console.log(`✅ Scheduled 12-hour weather report for ${city || 'default city'}`);
    
    return scheduleId;
  }

  // Schedule custom cron job
  scheduleCustom(cronExpression, city = null, description = 'custom') {
    const scheduleId = `${description}_${city || 'default'}`;
    
    if (this.schedules.has(scheduleId)) {
      console.log(`Schedule ${scheduleId} already exists`);
      return;
    }

    const task = cron.schedule(cronExpression, async () => {
      console.log(`🕐 Executing scheduled ${description} weather report for ${city || 'default city'}...`);
      await this.agent.sendWeatherReport(city);
    }, {
      scheduled: true,
      timezone: process.env.TIMEZONE || 'UTC'
    });

    this.schedules.set(scheduleId, task);
    console.log(`✅ Scheduled ${description} weather report for ${city || 'default city'} with cron: ${cronExpression}`);
    
    return scheduleId;
  }

  // Stop a specific schedule
  stopSchedule(scheduleId) {
    const task = this.schedules.get(scheduleId);
    if (task) {
      task.stop();
      this.schedules.delete(scheduleId);
      console.log(`⏹️ Stopped schedule: ${scheduleId}`);
      return true;
    }
    console.log(`❌ Schedule not found: ${scheduleId}`);
    return false;
  }

  // Stop all schedules
  stopAllSchedules() {
    for (const [scheduleId, task] of this.schedules) {
      task.stop();
      console.log(`⏹️ Stopped schedule: ${scheduleId}`);
    }
    this.schedules.clear();
    console.log('✅ All schedules stopped');
  }

  // List all active schedules
  listSchedules() {
    if (this.schedules.size === 0) {
      console.log('📋 No active schedules');
      return;
    }
    
    console.log('📋 Active schedules:');
    for (const [scheduleId] of this.schedules) {
      console.log(`  - ${scheduleId}`);
    }
  }

  // Send immediate weather report
  async sendImmediateReport(city = null) {
    console.log(`🚀 Sending immediate weather report for ${city || 'default city'}...`);
    return await this.agent.sendWeatherReport(city);
  }
}

// Main execution
async function main() {
  const scheduler = new WeatherScheduler();
  
  // Check if required environment variables are set
  if (!process.env.TELEGRAM_BOT_TOKEN) {
    console.error('❌ TELEGRAM_BOT_TOKEN is not set in .env file');
    process.exit(1);
  }
  
  if (!process.env.OPENWEATHER_API_KEY) {
    console.error('❌ OPENWEATHER_API_KEY is not set in .env file');
    process.exit(1);
  }
  
  if (!process.env.TELEGRAM_CHAT_ID) {
    console.error('❌ TELEGRAM_CHAT_ID is not set in .env file');
    process.exit(1);
  }

  // Get command line arguments
  const command = process.argv[2];
  const city = process.argv[3];
  const cronExpression = process.argv[4];

  console.log('🚀 Weather Scheduler started...');
  
  switch (command) {
    case 'daily':
      scheduler.scheduleDailyReport(city);
      break;
    case '6hour':
      scheduler.scheduleEvery6Hours(city);
      break;
    case '12hour':
      scheduler.scheduleEvery12Hours(city);
      break;
    case 'custom':
      if (!cronExpression) {
        console.error('❌ Cron expression required for custom schedule');
        console.log('Usage: npm run weather:schedule custom <city> "<cron_expression>"');
        process.exit(1);
      }
      scheduler.scheduleCustom(cronExpression, city, 'custom');
      break;
    case 'immediate':
      await scheduler.sendImmediateReport(city);
      break;
    case 'list':
      scheduler.listSchedules();
      break;
    case 'stop':
      if (city) {
        scheduler.stopSchedule(city);
      } else {
        console.log('❌ Schedule ID required for stop command');
        console.log('Usage: npm run weather:schedule stop <schedule_id>');
      }
      break;
    case 'stopall':
      scheduler.stopAllSchedules();
      break;
    default:
      console.log('📖 Weather Scheduler Commands:');
      console.log('  daily [city]                    - Schedule daily report at 8:00 AM');
      console.log('  6hour [city]                    - Schedule report every 6 hours');
      console.log('  12hour [city]                   - Schedule report every 12 hours');
      console.log('  custom [city] "<cron>"          - Schedule custom cron job');
      console.log('  immediate [city]                - Send immediate report');
      console.log('  list                            - List active schedules');
      console.log('  stop <schedule_id>              - Stop specific schedule');
      console.log('  stopall                         - Stop all schedules');
      console.log('');
      console.log('📝 Examples:');
      console.log('  npm run weather:schedule daily London');
      console.log('  npm run weather:schedule 6hour "New York"');
      console.log('  npm run weather:schedule custom Tokyo "0 6,18 * * *"');
      console.log('  npm run weather:schedule immediate Paris');
      break;
  }

  // Keep the process running if schedules are active
  if (scheduler.schedules.size > 0) {
    console.log('⏰ Scheduler is running. Press Ctrl+C to stop.');
    process.on('SIGINT', () => {
      console.log('\n🛑 Shutting down scheduler...');
      scheduler.stopAllSchedules();
      process.exit(0);
    });
  }
}

// Run if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export default WeatherScheduler;
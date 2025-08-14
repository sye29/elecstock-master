import * as cron from 'node-cron';
import { TelegramService } from './telegramService';
import { config } from './config';

export class SchedulerService {
  private telegramService: TelegramService;
  private scheduledTask: cron.ScheduledTask | null = null;

  constructor() {
    this.telegramService = new TelegramService();
  }

  start(): void {
    if (this.scheduledTask) {
      console.log('⚠️ Scheduler is already running');
      return;
    }

    // Validate cron expression
    if (!cron.validate(config.weatherSchedule)) {
      throw new Error(`Invalid cron expression: ${config.weatherSchedule}`);
    }

    console.log(`🕐 Starting weather bot scheduler with pattern: ${config.weatherSchedule}`);
    console.log(`📅 Next execution time: ${this.getNextExecutionTime()}`);

    this.scheduledTask = cron.schedule(config.weatherSchedule, async () => {
      console.log(`⏰ Scheduled weather update triggered at ${new Date().toISOString()}`);
      await this.telegramService.sendWeatherUpdate();
    }, {
      scheduled: true,
      timezone: 'UTC' // You can change this to your preferred timezone
    });

    console.log('✅ Weather bot scheduler started successfully');
  }

  stop(): void {
    if (this.scheduledTask) {
      this.scheduledTask.stop();
      this.scheduledTask = null;
      console.log('🛑 Weather bot scheduler stopped');
    } else {
      console.log('⚠️ Scheduler is not running');
    }
  }

  async sendImmediateUpdate(): Promise<void> {
    console.log('📤 Sending immediate weather update...');
    await this.telegramService.sendWeatherUpdate();
  }

  getNextExecutionTime(): string {
    if (!this.scheduledTask) {
      return 'Scheduler not running';
    }

    try {
      // This is a simplified way to get next execution time
      // For more accurate results, you might want to use a cron parser library
      const now = new Date();
      const nextRun = new Date(now);
      
      // Parse the cron expression to estimate next run
      const cronParts = config.weatherSchedule.split(' ');
      
      if (cronParts.length >= 5) {
        const [minute, hour] = cronParts;
        
        if (minute !== '*' && hour !== '*') {
          nextRun.setHours(parseInt(hour), parseInt(minute), 0, 0);
          
          // If the time has passed today, move to tomorrow
          if (nextRun <= now) {
            nextRun.setDate(nextRun.getDate() + 1);
          }
        }
      }
      
      return nextRun.toISOString();
    } catch (error) {
      return 'Unable to calculate next execution time';
    }
  }

  isRunning(): boolean {
    return this.scheduledTask !== null;
  }

  getSchedulePattern(): string {
    return config.weatherSchedule;
  }

  async testServices(): Promise<boolean> {
    console.log('🧪 Testing bot services...');
    
    try {
      // Test Telegram connection
      const telegramOk = await this.telegramService.testConnection();
      
      if (!telegramOk) {
        return false;
      }

      console.log('✅ All services are working correctly');
      return true;
    } catch (error) {
      console.error('❌ Service test failed:', error);
      return false;
    }
  }
}
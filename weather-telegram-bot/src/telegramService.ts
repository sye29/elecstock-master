import TelegramBot from 'node-telegram-bot-api';
import { WeatherData } from './types';
import { config } from './config';
import { WeatherService } from './weatherService';

export class TelegramService {
  private bot: TelegramBot;
  private weatherService: WeatherService;

  constructor() {
    this.bot = new TelegramBot(config.telegramBotToken, { polling: false });
    this.weatherService = new WeatherService();
  }

  async sendWeatherUpdate(): Promise<void> {
    try {
      const weatherData = await this.weatherService.getCurrentWeather();
      const message = this.formatWeatherMessage(weatherData);
      
      await this.bot.sendMessage(config.telegramChatId, message, {
        parse_mode: 'HTML',
        disable_web_page_preview: true
      });
      
      console.log(`Weather update sent successfully at ${new Date().toISOString()}`);
    } catch (error) {
      console.error('Failed to send weather update:', error);
      
      // Send error notification to the group
      try {
        await this.bot.sendMessage(
          config.telegramChatId,
          `❌ <b>Weather Bot Error</b>\n\nFailed to fetch weather data. Please check the bot configuration.\n\nError: ${error instanceof Error ? error.message : 'Unknown error'}`,
          { parse_mode: 'HTML' }
        );
      } catch (sendError) {
        console.error('Failed to send error notification:', sendError);
      }
    }
  }

  private formatWeatherMessage(weather: WeatherData): string {
    const tempUnit = this.weatherService.getTemperatureUnit();
    const windUnit = this.weatherService.getWindSpeedUnit();
    
    // Get weather emoji based on weather icon
    const weatherEmoji = this.getWeatherEmoji(weather.icon);
    
    // Format wind direction
    const windDirection = this.getWindDirection(weather.windDirection);
    
    const message = `
${weatherEmoji} <b>Weather Update</b> ${weatherEmoji}

📍 <b>${weather.city}, ${weather.country}</b>
🌡️ <b>Temperature:</b> ${weather.temperature}${tempUnit} (feels like ${weather.feelsLike}${tempUnit})
☁️ <b>Condition:</b> ${this.capitalizeFirstLetter(weather.description)}

💨 <b>Wind:</b> ${weather.windSpeed} ${windUnit} ${windDirection}
💧 <b>Humidity:</b> ${weather.humidity}%
🔽 <b>Pressure:</b> ${weather.pressure} hPa
👁️ <b>Visibility:</b> ${weather.visibility} km

⏰ <i>Updated: ${weather.timestamp.toLocaleString()}</i>
    `.trim();

    return message;
  }

  private getWeatherEmoji(iconCode: string): string {
    const iconMap: { [key: string]: string } = {
      '01d': '☀️', // clear sky day
      '01n': '🌙', // clear sky night
      '02d': '⛅', // few clouds day
      '02n': '☁️', // few clouds night
      '03d': '☁️', // scattered clouds
      '03n': '☁️',
      '04d': '☁️', // broken clouds
      '04n': '☁️',
      '09d': '🌧️', // shower rain
      '09n': '🌧️',
      '10d': '🌦️', // rain day
      '10n': '🌧️', // rain night
      '11d': '⛈️', // thunderstorm
      '11n': '⛈️',
      '13d': '❄️', // snow
      '13n': '❄️',
      '50d': '🌫️', // mist
      '50n': '🌫️'
    };

    return iconMap[iconCode] || '🌤️';
  }

  private getWindDirection(degrees: number): string {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
  }

  private capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  async testConnection(): Promise<boolean> {
    try {
      await this.bot.getMe();
      console.log('✅ Telegram bot connection successful');
      return true;
    } catch (error) {
      console.error('❌ Telegram bot connection failed:', error);
      return false;
    }
  }
}
import TelegramBot from 'node-telegram-bot-api';
import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

class WeatherAgent {
  constructor() {
    this.bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: false });
    this.weatherApiKey = process.env.OPENWEATHER_API_KEY;
    this.chatId = process.env.TELEGRAM_CHAT_ID;
    this.defaultCity = process.env.DEFAULT_CITY || 'London';
  }

  async getWeatherData(city = this.defaultCity) {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.weatherApiKey}&units=metric`
      );
      
      return response.data;
    } catch (error) {
      console.error('Error fetching weather data:', error.message);
      throw error;
    }
  }

  formatWeatherMessage(weatherData) {
    const { name, main, weather, wind, sys } = weatherData;
    const weatherDescription = weather[0].description;
    const temperature = Math.round(main.temp);
    const feelsLike = Math.round(main.feels_like);
    const humidity = main.humidity;
    const windSpeed = Math.round(wind.speed * 3.6); // Convert m/s to km/h
    const sunrise = new Date(sys.sunrise * 1000).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
    const sunset = new Date(sys.sunset * 1000).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });

    const emoji = this.getWeatherEmoji(weather[0].id);
    
    return `🌤️ *Weather Report for ${name}* 🌤️

${emoji} *${weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1)}*
🌡️ *Temperature:* ${temperature}°C (feels like ${feelsLike}°C)
💧 *Humidity:* ${humidity}%
💨 *Wind Speed:* ${windSpeed} km/h
🌅 *Sunrise:* ${sunrise}
🌇 *Sunset:* ${sunset}

⏰ *Report Time:* ${new Date().toLocaleString('en-US', { 
  timeZone: 'UTC',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  hour12: true 
})} UTC`;
  }

  getWeatherEmoji(weatherId) {
    if (weatherId >= 200 && weatherId < 300) return '⛈️'; // Thunderstorm
    if (weatherId >= 300 && weatherId < 400) return '🌧️'; // Drizzle
    if (weatherId >= 500 && weatherId < 600) return '🌧️'; // Rain
    if (weatherId >= 600 && weatherId < 700) return '❄️'; // Snow
    if (weatherId >= 700 && weatherId < 800) return '🌫️'; // Atmosphere
    if (weatherId === 800) return '☀️'; // Clear
    if (weatherId === 801) return '🌤️'; // Few clouds
    if (weatherId === 802) return '⛅'; // Scattered clouds
    if (weatherId === 803) return '☁️'; // Broken clouds
    if (weatherId === 804) return '☁️'; // Overcast clouds
    return '🌤️'; // Default
  }

  async sendWeatherReport(city = this.defaultCity) {
    try {
      console.log(`Fetching weather data for ${city}...`);
      const weatherData = await this.getWeatherData(city);
      const message = this.formatWeatherMessage(weatherData);
      
      console.log('Sending weather report to Telegram...');
      await this.bot.sendMessage(this.chatId, message, { parse_mode: 'Markdown' });
      
      console.log('Weather report sent successfully!');
      return true;
    } catch (error) {
      console.error('Error sending weather report:', error.message);
      await this.bot.sendMessage(
        this.chatId, 
        `❌ *Error sending weather report:* ${error.message}`, 
        { parse_mode: 'Markdown' }
      );
      return false;
    }
  }

  async sendCustomMessage(message) {
    try {
      await this.bot.sendMessage(this.chatId, message, { parse_mode: 'Markdown' });
      console.log('Custom message sent successfully!');
      return true;
    } catch (error) {
      console.error('Error sending custom message:', error.message);
      return false;
    }
  }
}

// Main execution
async function main() {
  const agent = new WeatherAgent();
  
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

  // Get city from command line argument or use default
  const city = process.argv[2] || process.env.DEFAULT_CITY || 'London';
  
  console.log(`🚀 Starting weather agent for ${city}...`);
  await agent.sendWeatherReport(city);
}

// Run if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export default WeatherAgent;
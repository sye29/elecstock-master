import axios from 'axios';
import { WeatherData, WeatherAPIResponse } from './types';
import { config } from './config';

export class WeatherService {
  private readonly baseUrl = 'https://api.openweathermap.org/data/2.5';

  async getCurrentWeather(): Promise<WeatherData> {
    try {
      const url = `${this.baseUrl}/weather`;
      const params = {
        q: config.countryCode ? `${config.city},${config.countryCode}` : config.city,
        appid: config.openWeatherApiKey,
        units: config.temperatureUnit
      };

      const response = await axios.get<WeatherAPIResponse>(url, { params });
      const data = response.data;

      return this.transformWeatherData(data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Weather API error: ${error.response?.data?.message || error.message}`);
      }
      throw new Error(`Failed to fetch weather data: ${error}`);
    }
  }

  private transformWeatherData(apiData: WeatherAPIResponse): WeatherData {
    const weather = apiData.weather[0];
    
    return {
      city: apiData.name,
      country: apiData.sys.country,
      temperature: Math.round(apiData.main.temp),
      feelsLike: Math.round(apiData.main.feels_like),
      description: weather.description,
      humidity: apiData.main.humidity,
      pressure: apiData.main.pressure,
      windSpeed: apiData.wind.speed,
      windDirection: apiData.wind.deg,
      visibility: apiData.visibility / 1000, // Convert to kilometers
      icon: weather.icon,
      timestamp: new Date(apiData.dt * 1000)
    };
  }

  getTemperatureUnit(): string {
    switch (config.temperatureUnit) {
      case 'metric': return '°C';
      case 'imperial': return '°F';
      case 'kelvin': return 'K';
      default: return '°C';
    }
  }

  getWindSpeedUnit(): string {
    switch (config.temperatureUnit) {
      case 'metric': return 'm/s';
      case 'imperial': return 'mph';
      default: return 'm/s';
    }
  }
}
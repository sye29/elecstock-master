export interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  feelsLike: number;
  description: string;
  humidity: number;
  pressure: number;
  windSpeed: number;
  windDirection: number;
  visibility: number;
  uvIndex?: number;
  icon: string;
  timestamp: Date;
}

export interface WeatherAPIResponse {
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  name: string;
  dt: number;
}

export interface Config {
  telegramBotToken: string;
  telegramChatId: string;
  openWeatherApiKey: string;
  city: string;
  countryCode: string;
  weatherSchedule: string;
  temperatureUnit: 'metric' | 'imperial' | 'kelvin';
}
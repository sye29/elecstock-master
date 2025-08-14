# 🌤️ Weather Telegram Bot

A Node.js bot that automatically fetches weather data and sends formatted updates to your Telegram group on a scheduled basis.

## ✨ Features

- 🌡️ **Real-time Weather Data**: Fetches current weather from OpenWeatherMap API
- 📱 **Telegram Integration**: Sends beautifully formatted messages to your Telegram group
- ⏰ **Scheduled Updates**: Automatically sends updates based on cron schedule
- 🎨 **Rich Formatting**: Includes emojis, weather icons, and detailed information
- 🛠️ **Easy Configuration**: Simple environment variable setup
- 🚀 **TypeScript**: Fully typed for better development experience
- 📊 **Multiple Units**: Support for metric, imperial, and kelvin temperature units

## 🏗️ Project Structure

```
weather-telegram-bot/
├── src/
│   ├── types.ts           # TypeScript interfaces
│   ├── config.ts          # Configuration loader
│   ├── weatherService.ts  # Weather API integration
│   ├── telegramService.ts # Telegram bot functionality
│   ├── scheduler.ts       # Cron job scheduler
│   └── index.ts          # Main entry point
├── package.json
├── tsconfig.json
├── .env.example          # Environment variables template
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ installed
- A Telegram bot token
- OpenWeatherMap API key
- Telegram group chat ID

### 1. Setup APIs

#### Create a Telegram Bot

1. Message [@BotFather](https://t.me/botfather) on Telegram
2. Send `/newbot` and follow the instructions
3. Save your bot token

#### Get Your Group Chat ID

1. Add your bot to your Telegram group
2. Send a message to the group
3. Visit `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
4. Look for the `chat.id` in the response (it will be negative for groups)

#### Get OpenWeatherMap API Key

1. Sign up at [OpenWeatherMap](https://openweathermap.org/api)
2. Generate a free API key

### 2. Installation

```bash
# Clone or create the project directory
cd weather-telegram-bot

# Install dependencies
npm install

# Copy environment template
cp .env.example .env
```

### 3. Configuration

Edit the `.env` file with your credentials:

```env
# Telegram Bot Configuration
TELEGRAM_BOT_TOKEN=your_telegram_bot_token_here
TELEGRAM_CHAT_ID=your_telegram_group_chat_id_here

# Weather API Configuration
OPENWEATHER_API_KEY=your_openweather_api_key_here
CITY=London
COUNTRY_CODE=GB

# Schedule Configuration (cron format)
WEATHER_SCHEDULE=0 8 * * *

# Temperature unit (metric, imperial, kelvin)
TEMPERATURE_UNIT=metric
```

### 4. Build & Run

```bash
# Build the project
npm run build

# Test configuration
npm run test

# Send immediate weather update
npm run send

# Start the bot with scheduled updates
npm start
```

## 🔧 Configuration Options

### Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `TELEGRAM_BOT_TOKEN` | ✅ | - | Your Telegram bot token from BotFather |
| `TELEGRAM_CHAT_ID` | ✅ | - | Your Telegram group chat ID (negative number) |
| `OPENWEATHER_API_KEY` | ✅ | - | Your OpenWeatherMap API key |
| `CITY` | ✅ | - | City name for weather updates |
| `COUNTRY_CODE` | ❌ | - | Optional ISO country code (e.g., GB, US) |
| `WEATHER_SCHEDULE` | ❌ | `0 8 * * *` | Cron expression for schedule |
| `TEMPERATURE_UNIT` | ❌ | `metric` | Temperature unit (metric/imperial/kelvin) |

### Schedule Examples

| Cron Expression | Description |
|-----------------|-------------|
| `0 8 * * *` | Every day at 8:00 AM |
| `0 */6 * * *` | Every 6 hours |
| `0 9,17 * * 1-5` | 9 AM and 5 PM on weekdays |
| `30 7 * * 1-5` | 7:30 AM on weekdays |

### Temperature Units

- `metric`: Celsius, m/s wind speed
- `imperial`: Fahrenheit, mph wind speed  
- `kelvin`: Kelvin, m/s wind speed

## 📱 Usage

### Development Mode

```bash
# Run in development mode with auto-reload
npm run dev
```

### Production Mode

```bash
# Build and start
npm run build
npm start
```

### Commands

```bash
# Test configuration and API connections
npm run test

# Send immediate weather update
npm run send

# Show help
npm run help

# Start with arguments
npm run dev send    # Send immediate update in dev mode
npm run dev test    # Test in dev mode
```

## 📋 Sample Output

The bot sends messages like this to your Telegram group:

```
🌤️ Weather Update 🌤️

📍 London, GB
🌡️ Temperature: 18°C (feels like 16°C)
☁️ Condition: Partly cloudy

💨 Wind: 3.2 m/s NW
💧 Humidity: 65%
🔽 Pressure: 1013 hPa
👁️ Visibility: 10 km

⏰ Updated: 1/15/2024, 8:00:00 AM
```

## 🛠️ Development

### Project Structure

- `src/types.ts`: TypeScript interfaces and type definitions
- `src/config.ts`: Configuration management and environment variable loading
- `src/weatherService.ts`: OpenWeatherMap API integration
- `src/telegramService.ts`: Telegram bot API and message formatting
- `src/scheduler.ts`: Cron job management and scheduling
- `src/index.ts`: Main application entry point and CLI interface

### Scripts

- `npm run dev`: Development mode with ts-node
- `npm run build`: Compile TypeScript to JavaScript
- `npm run build:watch`: Watch mode compilation
- `npm start`: Run compiled JavaScript
- `npm run test`: Test bot configuration
- `npm run send`: Send immediate weather update

## 🐛 Troubleshooting

### Common Issues

1. **"Missing required environment variable"**
   - Check that all required variables are set in `.env`
   - Ensure `.env` file is in the project root

2. **"Weather API error: Invalid API key"**
   - Verify your OpenWeatherMap API key
   - Ensure the API key is active (can take a few hours)

3. **"Telegram bot connection failed"**
   - Check your bot token is correct
   - Ensure the bot is not blocked

4. **"Chat not found"**
   - Verify the chat ID is correct (should be negative for groups)
   - Ensure the bot is added to the group

5. **Weather data not found for city**
   - Check the city name spelling
   - Try adding a country code
   - Use the format "City,CountryCode" (e.g., "London,GB")

### Debug Mode

Set `NODE_ENV=development` for more verbose logging:

```bash
NODE_ENV=development npm run dev
```

## 📜 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 🔗 Links

- [OpenWeatherMap API](https://openweathermap.org/api)
- [Telegram Bot API](https://core.telegram.org/bots/api)
- [Node-cron Documentation](https://www.npmjs.com/package/node-cron)
- [Cron Expression Generator](https://crontab.guru/)

---

Made with ❤️ for automated weather updates
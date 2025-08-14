# 🌤️ Weather Agent for Telegram

A Node.js weather agent that fetches weather data from OpenWeather API and sends beautiful formatted reports to your Telegram group or channel.

## ✨ Features

- 🌡️ Real-time weather data from OpenWeather API
- 📱 Beautiful formatted messages with emojis
- ⏰ Scheduled weather reports (daily, every 6/12 hours, or custom cron)
- 🌍 Support for any city worldwide
- 🔄 Automatic error handling and retry
- 📊 Detailed weather information (temperature, humidity, wind, sunrise/sunset)
- 🎯 Easy-to-use command line interface

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Copy the example environment file and fill in your credentials:

```bash
cp .env.example .env
```

Edit `.env` with your actual values:

```env
TELEGRAM_BOT_TOKEN=your_actual_bot_token
TELEGRAM_CHAT_ID=your_actual_chat_id
OPENWEATHER_API_KEY=your_actual_api_key
DEFAULT_CITY=London
TIMEZONE=UTC
```

### 3. Get Required API Keys

#### Telegram Bot Token
1. Message [@BotFather](https://t.me/botfather) on Telegram
2. Send `/newbot` command
3. Follow the instructions to create your bot
4. Copy the bot token

#### Telegram Chat ID
1. Add [@userinfobot](https://t.me/userinfobot) to your group/channel
2. The bot will show you the chat ID
3. Copy the chat ID (it's a number, may be negative for groups)

#### OpenWeather API Key
1. Go to [OpenWeather API](https://openweathermap.org/api)
2. Sign up for a free account
3. Get your API key from the dashboard

### 4. Test the Agent

Send an immediate weather report:

```bash
npm run weather London
```

## 📖 Usage

### Immediate Weather Report

```bash
# Send weather for default city
npm run weather

# Send weather for specific city
npm run weather "New York"
npm run weather Tokyo
npm run weather "San Francisco"
```

### Scheduled Weather Reports

#### Daily Report (8:00 AM)
```bash
npm run weather:schedule daily London
npm run weather:schedule daily "New York"
```

#### Every 6 Hours
```bash
npm run weather:schedule 6hour Tokyo
npm run weather:schedule 6hour Paris
```

#### Every 12 Hours
```bash
npm run weather:schedule 12hour Berlin
npm run weather:schedule 12hour "Los Angeles"
```

#### Custom Schedule (Cron Expression)
```bash
# Every day at 6 AM and 6 PM
npm run weather:schedule custom Tokyo "0 6,18 * * *"

# Every Monday at 9 AM
npm run weather:schedule custom London "0 9 * * 1"

# Every hour
npm run weather:schedule custom "New York" "0 * * * *"
```

### Scheduler Management

```bash
# List active schedules
npm run weather:schedule list

# Stop specific schedule
npm run weather:schedule stop daily_London

# Stop all schedules
npm run weather:schedule stopall
```

## 🔧 Configuration Options

### Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `TELEGRAM_BOT_TOKEN` | Your Telegram bot token | ✅ | - |
| `TELEGRAM_CHAT_ID` | Target chat/group ID | ✅ | - |
| `OPENWEATHER_API_KEY` | OpenWeather API key | ✅ | - |
| `DEFAULT_CITY` | Default city for reports | ❌ | London |
| `TIMEZONE` | Timezone for scheduling | ❌ | UTC |

### Cron Expression Format

The scheduler uses standard cron expressions:

```
* * * * *
│ │ │ │ │
│ │ │ │ └── Day of week (0-7, Sunday is 0 or 7)
│ │ │ └──── Month (1-12)
│ │ └────── Day of month (1-31)
│ └──────── Hour (0-23)
└────────── Minute (0-59)
```

Common examples:
- `0 8 * * *` - Every day at 8:00 AM
- `0 */6 * * *` - Every 6 hours
- `0 9 * * 1` - Every Monday at 9:00 AM
- `0 6,18 * * *` - Every day at 6:00 AM and 6:00 PM

## 📱 Message Format

The weather agent sends beautifully formatted messages with:

- 🌤️ Weather condition with appropriate emoji
- 🌡️ Current temperature and "feels like" temperature
- 💧 Humidity percentage
- 💨 Wind speed in km/h
- 🌅 Sunrise time
- 🌇 Sunset time
- ⏰ Report timestamp

Example message:
```
🌤️ Weather Report for London 🌤️

☁️ Overcast clouds
🌡️ Temperature: 18°C (feels like 16°C)
💧 Humidity: 75%
💨 Wind Speed: 12 km/h
🌅 Sunrise: 07:30 AM
🌇 Sunset: 04:45 PM

⏰ Report Time: December 15, 2024 at 02:30 PM UTC
```

## 🛠️ Development

### Project Structure

```
src/weather-agent/
├── index.js          # Main weather agent class
├── scheduler.js      # Cron-based scheduler
└── README.md         # This file
```

### Adding New Features

The `WeatherAgent` class is easily extensible. You can:

- Add new weather data sources
- Customize message formatting
- Add more scheduling options
- Integrate with other messaging platforms

### Error Handling

The agent includes comprehensive error handling:
- API rate limiting
- Network failures
- Invalid city names
- Missing environment variables

## 🚨 Troubleshooting

### Common Issues

1. **"TELEGRAM_BOT_TOKEN is not set"**
   - Check your `.env` file exists and has the correct variable name
   - Ensure no spaces around the `=` sign

2. **"TELEGRAM_CHAT_ID is not set"**
   - Verify you copied the chat ID correctly
   - Make sure the bot is added to the group/channel

3. **"OpenWeather API key is not set"**
   - Check your API key in the `.env` file
   - Verify the key is active in OpenWeather dashboard

4. **Bot not sending messages**
   - Ensure the bot has permission to send messages in the group
   - Check if the bot is blocked or removed from the group

5. **Weather data not found**
   - Verify the city name spelling
   - Some cities may have multiple names (e.g., "New York" vs "NYC")

### Debug Mode

For debugging, you can add more verbose logging by modifying the console.log statements in the code.

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you encounter any issues or have questions:

1. Check the troubleshooting section above
2. Review the OpenWeather API documentation
3. Check Telegram bot documentation
4. Open an issue in the project repository

---

**Happy Weather Reporting! 🌤️📱**
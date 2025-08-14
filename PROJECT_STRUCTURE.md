# 📁 Weather Agent Project Structure

## 🗂️ Directory Overview

```
workspace/
├── 📄 .env                    # Environment variables (create this)
├── 📄 .env.example           # Example environment file
├── 📄 package.json           # Project dependencies and scripts
├── 📄 QUICK_START.md         # Quick start guide (this file)
├── 📄 WEATHER_AGENT_README.md # Complete documentation
├── 📄 PROJECT_STRUCTURE.md   # This file
└── 📁 src/
    └── 📁 weather-agent/
        ├── 📄 index.js        # Main weather agent class
        ├── 📄 scheduler.js    # Cron-based scheduler
        ├── 📄 test.js         # Test script
        └── 📄 setup.js        # Setup wizard
```

## 🔧 Key Files Explained

### Core Files
- **`index.js`** - Main `WeatherAgent` class that fetches weather and sends to Telegram
- **`scheduler.js`** - `WeatherScheduler` class for automated weather reports
- **`test.js`** - Test script to verify functionality without API keys
- **`setup.js`** - Interactive setup wizard for configuration

### Configuration Files
- **`.env`** - Your actual API keys and settings (not in git)
- **`.env.example`** - Template showing required environment variables
- **`package.json`** - Dependencies and npm scripts

### Documentation
- **`QUICK_START.md`** - Get running in 5 minutes
- **`WEATHER_AGENT_README.md`** - Complete setup and usage guide
- **`PROJECT_STRUCTURE.md`** - This overview

## 🚀 NPM Scripts

| Script | Description |
|--------|-------------|
| `npm run weather` | Send immediate weather report |
| `npm run weather:schedule` | Manage scheduled weather reports |
| `npm run weather:test` | Test the agent functionality |
| `npm run weather:setup` | Interactive setup wizard |

## 🔑 Required Environment Variables

| Variable | Description | Source |
|----------|-------------|---------|
| `TELEGRAM_BOT_TOKEN` | Bot authentication | @BotFather |
| `TELEGRAM_CHAT_ID` | Target group/channel | @userinfobot |
| `OPENWEATHER_API_KEY` | Weather data access | OpenWeather API |

## 🌟 Features by File

### `index.js`
- Weather data fetching from OpenWeather API
- Message formatting with emojis
- Telegram message sending
- Error handling and validation

### `scheduler.js`
- Cron-based scheduling
- Multiple schedule types (daily, 6h, 12h, custom)
- Schedule management (start/stop/list)
- Timezone support

### `test.js`
- Functionality testing without API keys
- Message format preview
- Emoji mapping verification

### `setup.js`
- Interactive configuration wizard
- Environment file creation
- Setup guidance and validation

## 🔄 Data Flow

```
OpenWeather API → WeatherAgent → Format Message → Telegram Bot → Your Group
```

1. **Fetch**: Get weather data from OpenWeather API
2. **Process**: Format data into beautiful message with emojis
3. **Send**: Use Telegram Bot API to send to your group
4. **Schedule**: Optionally automate with cron jobs

## 🛠️ Extending the Agent

The modular design makes it easy to add features:

- **New Weather Sources**: Modify `getWeatherData()` in `index.js`
- **Message Formats**: Customize `formatWeatherMessage()` in `index.js`
- **Scheduling**: Add new methods in `scheduler.js`
- **Platforms**: Create new adapters for other messaging services

## 📊 Dependencies

| Package | Purpose |
|---------|---------|
| `axios` | HTTP requests to OpenWeather API |
| `node-telegram-bot-api` | Telegram Bot API integration |
| `node-cron` | Cron job scheduling |
| `dotenv` | Environment variable management |

---

**Ready to start? See `QUICK_START.md` for the fastest path to success! 🚀**
# 🚀 Weather Agent - Quick Start Guide

## ⚡ Get Running in 5 Minutes

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Your API Keys
```bash
npm run weather:setup
```
Then edit the `.env` file with your actual values:
- `TELEGRAM_BOT_TOKEN` - Get from [@BotFather](https://t.me/botfather)
- `TELEGRAM_CHAT_ID` - Get by adding [@userinfobot](https://t.me/userinfobot) to your group
- `OPENWEATHER_API_KEY` - Get from [OpenWeather](https://openweathermap.org/api)

### 3. Test It Works
```bash
npm run weather London
```

### 4. Set Up Daily Reports
```bash
npm run weather:schedule daily London
```

## 🎯 Common Commands

```bash
# Send immediate weather report
npm run weather "New York"

# Schedule daily at 8 AM
npm run weather:schedule daily Tokyo

# Schedule every 6 hours
npm run weather:schedule 6hour Paris

# Schedule custom (every day at 6 AM and 6 PM)
npm run weather:schedule custom "San Francisco" "0 6,18 * * *"

# List active schedules
npm run weather:schedule list

# Stop all schedules
npm run weather:schedule stopall
```

## 📚 Full Documentation
See `WEATHER_AGENT_README.md` for complete setup and usage instructions.

## 🆘 Need Help?
- Check the troubleshooting section in the README
- Verify your API keys are correct
- Make sure your bot is added to the Telegram group
- Ensure the bot has permission to send messages

---

**Happy Weather Reporting! 🌤️📱**
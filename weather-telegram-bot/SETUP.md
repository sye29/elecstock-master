# 🚀 Quick Setup Guide

Follow these steps to get your Weather Telegram Bot running in minutes!

## Step 1: Create a Telegram Bot

1. Open Telegram and search for `@BotFather`
2. Start a conversation and send `/newbot`
3. Follow the instructions to create your bot
4. Save the **bot token** (looks like `123456789:ABCdefGHijklMNopQRstUVwxYZ`)

## Step 2: Get Your Group Chat ID

1. Add your new bot to your Telegram group
2. Send any message to the group (like "Hello bot!")
3. Open this URL in your browser:
   ```
   https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates
   ```
   Replace `<YOUR_BOT_TOKEN>` with your actual bot token
4. Look for `"chat":{"id":-1234567890` - the negative number is your chat ID

## Step 3: Get OpenWeatherMap API Key

1. Go to [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Go to API keys section
4. Copy your API key

## Step 4: Install and Configure

1. **Install dependencies:**
   ```bash
   cd weather-telegram-bot
   npm install
   ```

2. **Create environment file:**
   ```bash
   cp .env.example .env
   ```

3. **Edit `.env` file with your credentials:**
   ```env
   TELEGRAM_BOT_TOKEN=your_bot_token_here
   TELEGRAM_CHAT_ID=your_negative_chat_id_here
   OPENWEATHER_API_KEY=your_api_key_here
   CITY=Your City Name
   COUNTRY_CODE=US
   ```

## Step 5: Test and Run

1. **Test your setup:**
   ```bash
   npm run test
   ```

2. **Send a test message:**
   ```bash
   npm run send
   ```

3. **Start the bot:**
   ```bash
   npm run build
   npm start
   ```

## ⚡ Common Issues

- **Bot token error**: Make sure you copied the full token from BotFather
- **Chat ID error**: Ensure the chat ID is negative and the bot is in the group
- **API key error**: Wait a few hours for the OpenWeatherMap key to activate
- **City not found**: Try adding a country code or check the spelling

## 🎉 You're Done!

Your bot should now send weather updates to your Telegram group according to the schedule (default: 8 AM daily).

To stop the bot, press `Ctrl+C` in the terminal.
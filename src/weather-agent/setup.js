#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🌤️ Weather Agent Setup Wizard');
console.log('===============================\n');

// Check if .env file already exists
const envPath = path.join(__dirname, '../../.env');
const envExamplePath = path.join(__dirname, '../../.env.example');

if (fs.existsSync(envPath)) {
  console.log('⚠️  .env file already exists!');
  console.log('If you want to reconfigure, please delete the existing .env file first.\n');
  process.exit(0);
}

// Check if .env.example exists
if (!fs.existsSync(envExamplePath)) {
  console.error('❌ .env.example file not found!');
  console.log('Please make sure you have the .env.example file in your project root.');
  process.exit(1);
}

console.log('This wizard will help you set up your weather agent configuration.\n');
console.log('You will need:');
console.log('1. A Telegram bot token (from @BotFather)');
console.log('2. A Telegram chat/group ID');
console.log('3. An OpenWeather API key\n');

// Read the example file
const envExample = fs.readFileSync(envExamplePath, 'utf8');

// Simple prompt simulation (in a real scenario, you'd use readline or a proper CLI library)
console.log('📝 Please fill in the following information:\n');

const config = {
  TELEGRAM_BOT_TOKEN: '',
  TELEGRAM_CHAT_ID: '',
  OPENWEATHER_API_KEY: '',
  DEFAULT_CITY: 'London',
  TIMEZONE: 'UTC'
};

console.log('🔑 Telegram Bot Token:');
console.log('   Get this from @BotFather on Telegram');
console.log('   Format: 123456789:ABCdefGHIjklMNOpqrsTUVwxyz');
console.log('   Enter your bot token: [You need to manually edit the .env file]');
console.log('');

console.log('💬 Telegram Chat ID:');
console.log('   Add @userinfobot to your group/channel to get this');
console.log('   Format: -123456789 (negative for groups)');
console.log('   Enter your chat ID: [You need to manually edit the .env file]');
console.log('');

console.log('🌍 OpenWeather API Key:');
console.log('   Get this from https://openweathermap.org/api');
console.log('   Format: abc123def456ghi789');
console.log('   Enter your API key: [You need to manually edit the .env file]');
console.log('');

console.log('🏙️  Default City (optional):');
console.log('   Default city for weather reports');
console.log('   Format: London, "New York", Tokyo');
console.log('   Enter default city (or press Enter for London): [You need to manually edit the .env file]');
console.log('');

console.log('⏰ Timezone (optional):');
console.log('   Timezone for scheduling (e.g., America/New_York, Europe/London)');
console.log('   Enter timezone (or press Enter for UTC): [You need to manually edit the .env file]');
console.log('');

// Create the .env file
const envContent = `# Weather Agent Configuration

# Telegram Bot Configuration
# Get this from @BotFather on Telegram
TELEGRAM_BOT_TOKEN=${config.TELEGRAM_BOT_TOKEN}

# Telegram Chat ID (Group or Channel ID)
# You can get this by adding @userinfobot to your group
TELEGRAM_CHAT_ID=${config.TELEGRAM_CHAT_ID}

# OpenWeather API Key
# Get this from https://openweathermap.org/api
OPENWEATHER_API_KEY=${config.OPENWEATHER_API_KEY}

# Default city for weather reports
DEFAULT_CITY=${config.DEFAULT_CITY}

# Timezone for scheduling (optional, defaults to UTC)
# Examples: America/New_York, Europe/London, Asia/Tokyo
TIMEZONE=${config.TIMEZONE}
`;

try {
  fs.writeFileSync(envPath, envContent);
  console.log('✅ .env file created successfully!');
  console.log('');
  console.log('📋 Next steps:');
  console.log('1. Edit the .env file and fill in your actual values');
  console.log('2. Test the agent: npm run weather London');
  console.log('3. Set up scheduling: npm run weather:schedule daily London');
  console.log('');
  console.log('📖 For detailed instructions, see WEATHER_AGENT_README.md');
  console.log('');
  console.log('🔧 Need help? Check the troubleshooting section in the README.');
  
} catch (error) {
  console.error('❌ Error creating .env file:', error.message);
  process.exit(1);
}
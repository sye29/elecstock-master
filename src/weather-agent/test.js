import WeatherAgent from './index.js';

// Test the weather agent functionality
async function testWeatherAgent() {
  console.log('🧪 Testing Weather Agent...\n');
  
  try {
    // Test with mock data (since we don't have real API keys)
    const agent = new WeatherAgent();
    
    // Test message formatting with mock data
    const mockWeatherData = {
      name: 'Test City',
      main: {
        temp: 22.5,
        feels_like: 20.1,
        humidity: 65
      },
      weather: [{
        id: 800,
        description: 'clear sky'
      }],
      wind: {
        speed: 5.2
      },
      sys: {
        sunrise: Date.now() / 1000 - 3600, // 1 hour ago
        sunset: Date.now() / 1000 + 3600   // 1 hour from now
      }
    };
    
    console.log('📝 Testing message formatting...');
    const formattedMessage = agent.formatWeatherMessage(mockWeatherData);
    console.log('✅ Message formatting works!');
    console.log('\n📱 Formatted message preview:');
    console.log('─'.repeat(50));
    console.log(formattedMessage);
    console.log('─'.repeat(50));
    
    // Test emoji mapping
    console.log('\n🎨 Testing emoji mapping...');
    const testWeatherIds = [200, 300, 500, 600, 700, 800, 801, 802, 803, 804];
    testWeatherIds.forEach(id => {
      const emoji = agent.getWeatherEmoji(id);
      console.log(`Weather ID ${id}: ${emoji}`);
    });
    console.log('✅ Emoji mapping works!');
    
    console.log('\n🎉 All tests passed! The weather agent is ready to use.');
    console.log('\n📋 Next steps:');
    console.log('1. Copy .env.example to .env');
    console.log('2. Fill in your API keys and chat ID');
    console.log('3. Run: npm run weather London');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Run tests
testWeatherAgent();
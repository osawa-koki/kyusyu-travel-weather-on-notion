import EmojiDescription from "../@types/EmojiDescription"

interface WeatherCode2EmojiProps {
  weatherCode: number
}

// Ref: https://open-meteo.com/en/docs#hourly=&daily=weather_code
export default function weatherCode2Emoji (props: WeatherCode2EmojiProps): EmojiDescription {
  const {
    weatherCode
  } = props

  switch (weatherCode) {
    case 0:
      return { emoji: '☀️', description: 'Clear sky' }
    case 1:
    case 2:
    case 3:
      return { emoji: '🌥', description: 'Mainly clear, partly cloudy, and overcast' }
    case 45:
    case 48:
      return { emoji: '🌫', description: 'Fog and depositing rime fog' }
    case 51:
    case 53:
    case 55:
      return { emoji: '🌧', description: 'Drizzle: Light, moderate, and dense intensity' }
    case 56:
    case 57:
      return { emoji: '🌧', description: 'Freezing Drizzle: Light and dense intensity' }
    case 61:
    case 63:
    case 65:
      return { emoji: '🌧', description: 'Rain: Slight, moderate and heavy intensity' }
    case 66:
    case 67:
      return { emoji: '🌧', description: 'Freezing Rain: Light and heavy intensity' }
    case 71:
    case 73:
    case 75:
      return { emoji: '❄️', description: 'Snow fall: Slight, moderate, and heavy intensity' }
    case 77:
      return { emoji: '❄️', description: 'Snow grains' }
    case 80:
    case 81:
    case 82:
      return { emoji: '🌦', description: 'Rain showers: Slight, moderate, and violent' }
    case 85:
    case 86:
      return { emoji: '🌨', description: 'Snow showers slight and heavy' }
    case 95:
      return { emoji: '⛈', description: 'Thunderstorm: Slight or moderate' }
    case 96:
    case 99:
      return { emoji: '⛈', description: 'Thunderstorm with slight and heavy hail' }
    default:
      return { emoji: '❓', description: 'Unknown weather code' }
  }
}

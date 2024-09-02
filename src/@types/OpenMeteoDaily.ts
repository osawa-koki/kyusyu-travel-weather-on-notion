export default interface OpenMeteoDaily {
  latitude: number
  longitude: number
  generationtime_ms: number
  utc_offset_seconds: number
  timezone: string
  timezone_abbreviation: string
  elevation: number
  daily_units: {
    time: string
    weather_code: string
  }
  daily: {
    time: string[]
    weather_code: number[]
  }
}

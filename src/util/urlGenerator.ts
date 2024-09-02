interface UrlGeneratorProps {
  latitude: number
  longitude: number
  timezone?: string
}

export default function urlGenerator (props: UrlGeneratorProps): string {
  const {
    latitude,
    longitude,
    timezone = 'Asia/Tokyo'
  } = props

  return `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code&timezone=${timezone}`
}

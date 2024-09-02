import OpenMeteoDaily from "../@types/OpenMeteoDaily";

interface GetWeatherProps {
  url: string
}

export default function getWeather (props: GetWeatherProps): OpenMeteoDaily {
  const {
    url
  } = props

  const response = UrlFetchApp.fetch(url)
  const data = response.getContentText()
  const json = JSON.parse(data)

  return json as OpenMeteoDaily
}

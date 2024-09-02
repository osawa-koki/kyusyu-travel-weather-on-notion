import DateWeather from './@types/DateWeather'
import OpenMeteoDaily from './@types/OpenMeteoDaily'
import createWeatherContent from './util/createWeatherContent'
import urlGenerator from './util/urlGenerator'
import weatherCode2Emoji from './util/weatherCode2Emoji'

function main() {
  const properties = PropertiesService.getScriptProperties()

  const { datePlaces } = JSON.parse(properties.getProperty('DATE_PLACES')!)

  const dateWeatherSets: DateWeather[] = []

  for (const datePlace of datePlaces) {
    const { date, latitude, longitude } = datePlace
    const url = urlGenerator({ latitude, longitude })
    const response = UrlFetchApp.fetch(url)
    const json: OpenMeteoDaily = JSON.parse(response.getContentText())
    const dates = json.daily.time
    const index = dates.indexOf(date)
    if (index === -1) {
      Logger.log(`No data for ${date}`)
      continue
    }
    const weatherCode = json.daily.weather_code[index]
    const { emoji, description } = weatherCode2Emoji({ weatherCode })
    dateWeatherSets.push({
      date,
      weather: {
        emoji,
        code: weatherCode,
        description
      },
      place: {
        latitude,
        longitude
      }
    }
    )
    Logger.log(date, emoji, description)
  }

  if (dateWeatherSets.length === 0) {
    Logger.log('No data to update...')
    return
  }

  const sortedDateWeatherSets = dateWeatherSets.sort((a, b) => a.date.localeCompare(b.date))
  Logger.log(JSON.stringify(sortedDateWeatherSets))

  const notionSecret = properties.getProperty('NOTION_SECRET')!
  const notionBlockId = properties.getProperty('NOTION_BLOCK_ID')!

  const url = `https://api.notion.com/v1/blocks/${notionBlockId}`
  Logger.log(`notionSecret: ${notionSecret}`)
  Logger.log(`notionBlockId: ${notionBlockId}`)
  const headers = {
    Authorization: `Bearer ${notionSecret}`,
    'Content-Type': 'application/json',
    'Notion-Version': '2022-06-28'
  }
  const content = createWeatherContent({ dateWeathers: sortedDateWeatherSets })
  const data = {
    "callout": {
      "rich_text": [
        {
          "type": "text",
          "text": {
            "content": content,
          }
        }
      ],
      "icon": {
        "type": "emoji",
        "emoji": "🌲"
      }
    }
  }

  const response = UrlFetchApp.fetch(url, {
    method: 'patch',
    headers,
    payload: JSON.stringify(data)
  })
  Logger.log(response.getContentText())
}

declare let global: { handler: () => void }
global.handler = main

export default main

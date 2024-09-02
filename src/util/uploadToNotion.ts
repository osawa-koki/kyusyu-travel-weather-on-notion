interface UploadToNotionProps {
  notionSecret: string
  notionBlockId: string
  content: string
}

export default function uploadToNotion (props: UploadToNotionProps): void {
  const {
    notionSecret,
    notionBlockId,
    content
  } = props

  const url = `https://api.notion.com/v1/blocks/${notionBlockId}`
  const headers = {
    Authorization: `Bearer ${notionSecret}`,
    'Content-Type': 'application/json',
    'Notion-Version': '2022-06-28'
  }
  const payload = {
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
    method: "patch",
    headers,
    payload: JSON.stringify(payload)
  })
  Logger.log(response.getContentText())
}

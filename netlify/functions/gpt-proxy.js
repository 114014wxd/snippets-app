// netlify/functions/gpt-proxy.ts
import { Handler } from '@netlify/functions'
import OpenAI from 'openai'

const openai = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: process.env.DEEPSEEK_API_KEY
})

const handler = async (event) => {
  try {
    const body = JSON.parse(event.body || '{}')
    const { messages } = body

    const completion = await openai.chat.completions.create({
      model: 'deepseek-chat',
      messages
    })

    return {
      statusCode: 200,
      body: JSON.stringify(completion)
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: '请求失败',
        detail: err.message
      })
    }
  }
}

export { handler }

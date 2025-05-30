// gpt-proxy-dev.js
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import OpenAI from 'openai'

dotenv.config() // ✅ 读取 .env 中的环境变量

const app = express()
app.use(cors({
  origin: true,
  credentials: true
}))
app.use(express.json())

const openai = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: process.env.DEEPSEEK_API_KEY // ✅ 来自 .env 文件
})

app.post('/gpt-proxy', async (req, res) => {
  try {
    const { messages, model = 'deepseek-chat' } = req.body

    if (!Array.isArray(messages)) {
      return res.status(400).json({ error: '参数错误: messages 必须是数组' })
    }

    const completion = await openai.chat.completions.create({
      model,
      messages
    })

    res.json(completion)
  } catch (err) {
    console.error('❌ GPT 请求失败:', err.message)
    res.status(500).json({ error: '请求失败', detail: err.message })
  }
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`✅ 本地代理已启动：http://localhost:${PORT}/gpt-proxy`)
})

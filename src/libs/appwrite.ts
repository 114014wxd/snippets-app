import { Client, Account } from 'appwrite'

const client = new Client()

// 自动拼接完整 endpoint
const rawEndpoint = import.meta.env.VITE_APPWRITE_ENDPOINT
const fullEndpoint = rawEndpoint.startsWith('/')
  ? `${window.location.origin}${rawEndpoint}`
  : rawEndpoint

// ✅ 自定义 fetch，强制带上 Cookie
client.setEndpoint(fullEndpoint)
      .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID)

const account = new Account(client)

export { account }

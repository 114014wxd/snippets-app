import { Client, Account } from 'appwrite'

const client = new Client()

const endpoint = import.meta.env.VITE_APPWRITE_ENDPOINT
const fullEndpoint = endpoint.startsWith('/')
  ? `${window.location.origin}${endpoint}` // ✅ 拼接完整地址
  : endpoint

client
  .setEndpoint(fullEndpoint)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID)

const account = new Account(client)

export { account }

// src/libs/appwrite.ts
import { Client, Account } from 'appwrite'
// ✅ 必须放在 SDK 初始化之前
const rawFetch = window.fetch

window.fetch = (input, init = {}) => {
  return rawFetch(input, {
    ...init,
    credentials: 'include', // ✅ 关键
  })
}
const client = new Client()

client
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID)

const account = new Account(client)

export { account }

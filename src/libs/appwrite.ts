// src/libs/appwrite.ts
import { Client, Account } from 'appwrite'

const client = new Client()

client
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT) // Appwrite 地址
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID) // 项目 ID

const account = new Account(client)

export { account }

// netlify/functions/appwriteProxy.ts
import type { Handler } from '@netlify/functions'
import fetch from 'node-fetch'

const handler: Handler = async (event) => {
  const { httpMethod, body, headers, rawUrl } = event

  // 你要代理的路径，前端请求如 /api/appwrite/account
  const path = rawUrl.split('/api/appwrite')[1] || '/'
  const url = `https://fra.cloud.appwrite.io/v1${path}`

  const response = await fetch(url, {
    method: httpMethod,
    headers: {
      ...headers,
      host: 'fra.cloud.appwrite.io',
      'x-appwrite-project': process.env.VITE_APPWRITE_PROJECT_ID || '',
    },
    body: httpMethod !== 'GET' && body ? body : undefined,
  })

  const data = await response.text()

  return {
    statusCode: response.status,
    body: data,
    headers: {
      'Content-Type': response.headers.get('content-type') || 'application/json'
    },
  }
}

export { handler }

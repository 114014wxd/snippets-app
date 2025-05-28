import type { Handler } from '@netlify/functions'
import fetch from 'node-fetch'

const handler: Handler = async (event) => {
  const { httpMethod, body, headers, rawUrl } = event

  const path = rawUrl.split('/api/appwrite')[1] || '/'
  if (path === '/test') {
    return {
      statusCode: 200,
      body: '✅ appwriteProxy is working!',
    }
  }
  const url = `https://fra.cloud.appwrite.io/v1${path}`

  const filteredHeaders: Record<string, string> = {
    'x-appwrite-project': process.env.VITE_APPWRITE_PROJECT_ID || '',
    'content-type': headers['content-type'] || 'application/json',
  }

  if (headers['authorization']) {
    filteredHeaders['authorization'] = headers['authorization']
  }
  if (headers['cookie']) {
    filteredHeaders['cookie'] = headers['cookie']
  }

  const response = await fetch(url, {
    method: httpMethod,
    headers: filteredHeaders,
    body: httpMethod !== 'GET' && body ? Buffer.from(body) : undefined,
  })

  const resBody = await response.text()

  return {
    statusCode: response.status,
    body: resBody,
    headers: {
      'content-type': response.headers.get('content-type') || 'application/json',
    },
  }
}

export { handler }
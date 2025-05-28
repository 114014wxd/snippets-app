// netlify/functions/appwriteProxy.ts
import type { Handler } from '@netlify/functions'
import fetch from 'node-fetch'

const handler: Handler = async (event) => {
    const { httpMethod, body, headers, rawUrl } = event
    console.log('➡️ Proxy triggered')
    console.log('➡️ Method:', httpMethod)

    console.log('➡️ Headers:', headers)
    // 路径重写
    const path = rawUrl.split('/api/appwrite')[1] || '/'
    const url = `https://fra.cloud.appwrite.io/v1${path}`
    console.log('➡️ Path:', path)
    // 构造新的请求头（只保留关键字段）
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

    // 构造请求
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

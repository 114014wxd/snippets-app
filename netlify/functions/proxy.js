export async function handler(event) {
  const path = event.path.replace('/.netlify/functions/proxy', '')
  const url = `https://fra.cloud.appwrite.io/v1${path}`

  const headers = {
    'Content-Type': 'application/json',
    'X-Appwrite-Project': process.env.APPWRITE_PROJECT_ID,
    'Cookie': event.headers.cookie || '' // ✅ 传入 Cookie
  }

  const response = await fetch(url, {
    method: event.httpMethod,
    headers,
    body: event.httpMethod !== 'GET' && event.body ? event.body : undefined,
  })

  const body = await response.text()

  return {
    statusCode: response.status,
    body,
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': response.headers.get('set-cookie') || '', // ✅ 返回 Set-Cookie
    },
  }
}

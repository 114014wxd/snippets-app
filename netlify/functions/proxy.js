exports.handler = async function (event) {
  const path = event.path.replace('/.netlify/functions/proxy', '')
  const url = `https://fra.cloud.appwrite.io/v1${path}`

  const headers = {
    'Content-Type': 'application/json',
    'X-Appwrite-Project': process.env.APPWRITE_PROJECT_ID,
    'Cookie': event.headers.cookie || ''
  }

  const response = await fetch(url, {
    method: event.httpMethod,
    headers,
    body: event.httpMethod !== 'GET' && event.body ? event.body : undefined
  })

  const responseData = await response.text()

  return {
    statusCode: response.status,
    body: responseData,
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': response.headers.get('set-cookie') || ''
    }
  }
}

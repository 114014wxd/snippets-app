export async function handler(event) {
  const path = event.path.replace("/.netlify/functions/proxy", "");
  const url = `https://fra.cloud.appwrite.io/v1${path}`;

  const headers = {
    "Content-Type": "application/json",
    "X-Appwrite-Project": process.env.APPWRITE_PROJECT_ID,
    Cookie: event.headers.cookie || "", // ✅ 传入 Cookie
  };

  const response = await fetch(url, {
    method: event.httpMethod,
    headers,
    body: event.httpMethod !== "GET" && event.body ? event.body : undefined,
  });

  const body = await response.text();
  // 获取 Appwrite 的原始 Set-Cookie
  let setCookie = response.headers.get("set-cookie") || "";

  // 关键：将 cookie 的 domain 替换为当前站点
  if (setCookie) {
    setCookie = setCookie.replace(
      /domain=\.?[^;]+/gi,
      "domain=snippets.website"
    );
  }
  return {
    statusCode: response.status,
    body,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": setCookie || '1234', // ✅ 返回 Set-Cookie
    },
  };
}

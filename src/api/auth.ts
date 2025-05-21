// src/api/auth.ts
import { account } from '@/libs/appwrite'

/**
 * 登录（创建邮箱会话）
 */
export async function login(email: string, password: string) {
  return await account.createSession(email, password)
}

/**
 * 注册
 */
export async function register(email: string, password: string, ) {
  return await account.create('unique()', email, password)
}

/**
 * 获取当前用户信息
 */
export async function getUser() {
  return await account.get()
}

/**
 * 登出
 */
export async function logout() {
  return await account.deleteSession('current')
}

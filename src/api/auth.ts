// src/api/auth.ts
import { account } from '@/libs/appwrite'
import { withLoading } from '@/utils/withLoading'
/**
 * 登录（创建邮箱会话）
 */
export async function login(email: string, password: string) {
  return await  withLoading(() => account.createEmailPasswordSession(email, password))
}

/**
 * 注册
 */
export async function register(email: string, password: string, ) {
  return await withLoading(() => account.create('unique()', email, password))
}

/**
 * 获取当前用户信息
 */
export async function getUser() {
  return await withLoading(() =>account.get())
}

/**
 * 登出
 */
export async function logout() {
  return await withLoading(() => account.deleteSession('current'))
}

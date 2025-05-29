import { ID, storage, account } from '@/libs/appwrite'
import { withLoading } from '@/utils/withLoading'

/**
 * 上传头像到 Appwrite Storage
 * @param file 头像文件
 */
export const uploadAvatar = async (file: File) => {
  const res = await storage.createFile('avatars', ID.unique(), file)
  return res
}

/**
 * 获取头像预览图 URL
 * @param fileId 文件 ID
 */
export const getAvatarPreview = (fileId: string) => {
  return storage.getFilePreview('avatars', fileId)
}

/**
 * 更新用户 prefs（用户名 + 头像）
 */
export const updateUserProfile = async (data: any) => {
  return await withLoading(() => account.updateName(data))
}

// src/utils/withLoading.ts
import { useLoadingStore } from '@/stores/modules/loading'

/**
 * 自动处理 loading 的函数封装器
 */
export async function withLoading<T>(fn: () => Promise<T>): Promise<T> {
    const loadingStore = useLoadingStore()
    loadingStore.show()
    try {
        return await fn()
    } finally {
        loadingStore.hide()
    }
}

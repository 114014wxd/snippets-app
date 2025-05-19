import { createI18n } from 'vue-i18n'
import messages from './locales/index'

export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: 'zh',
  fallbackLocale: 'en',
  messages
})

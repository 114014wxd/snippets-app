import zhSidebar from './modules/sidebar'
import enSidebar from './modules/sidebar'
import zhCommon from './modules/common'
import enCommon from './modules/common'
import zhSnippet from './modules/snippet'
import enSnippet from './modules/snippet'

export default {
  zh: {
    sidebar: zhSidebar.zh,
    common: zhCommon.zh,
    snippet: zhSnippet.zh,
  },
  en: {
    sidebar: enSidebar.en,
    common: enCommon.en,
    snippet: enSnippet.en,
  },
}
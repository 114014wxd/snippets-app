import common from './modules/common'
import sidebar from './modules/sidebar'
import snippet from './modules/snippet'

export default {
  zh: {
    ...common.zh,
    ...sidebar.zh,
    ...snippet.zh
  },
  en: {
    ...common.en,
    ...sidebar.en,
    ...snippet.en
  }
}

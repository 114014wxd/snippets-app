// src/utils/snippetHelper.ts

/**
 * 从内容中提取关键字作为标签
 * 支持中文和英文关键字，可扩展
 */
export function extractTags(content: string): string[] {
  const keywords = [
    'vue', 'reactive', 'ref', 'watch', 'computed', 'props', 'emits',
    'ts', 'js', 'axios', 'interface', 'type', 'pinia', 'store',
    'hook', 'setup', 'router', 'vite', 'function', 'map', 'filter', 'reduce',
    'class', 'style', 'element', '组件', '生命周期', '钩子', '接口'
  ]
  return keywords.filter(key => content.includes(key))
}

/**
 * Emoji 图标池（100个）
 */
export const iconPool = [
  '🔥','🌈','✨','⚡','🚀','🎯','🎉','📦','📌','🛠️',
  '🧠','📚','🧪','📝','📄','📊','📋','🖋️','🔒','🔧',
  '🔨','🔍','🔑','💡','💻','🖥️','🧰','📁','📂','🗂️',
  '📎','🗃️','🗄️','🗑️','🧾','🧮','🧷','📐','📏','📊',
  '🎨','🖌️','🖍️','🖼️','🎬','🎧','🎵','🎶','🎻','🎺',
  '🎷','🥁','🎸','🕹️','🎲','♟️','🧩','🎯','🎮','🧿',
  '🛡️','🏹','🏆','🥇','🥈','🥉','🏅','🔮','📽️','🎞️',
  '📡','🛰️','💾','💿','📀','📱','📲','☎️','📞','📟',
  '📠','🔋','🔌','💡','🔦','🕯️','🛒','🎁','📬','📮',
  '📤','📥','📦','✉️','📧','📨','📩','📪','📫','📬'
]

/**
 * 随机分配一个 emoji icon
 */
export function getRandomIcon(): string {
  const index = Math.floor(Math.random() * iconPool.length)
  return iconPool[index]
}

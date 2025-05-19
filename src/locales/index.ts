const modules = import.meta.glob('./modules/*.ts', { eager: true }) as Record<string, any>

const langMap: Record<string, any> = { zh: {}, en: {} }

Object.entries(modules).forEach(([path, mod]) => {
  const fileName = path.match(/\.\/modules\/(.*)\.ts$/)?.[1]
  if (fileName) {
    langMap.zh[fileName] = mod.default.zh
    langMap.en[fileName] = mod.default.en
  }
})

export default langMap
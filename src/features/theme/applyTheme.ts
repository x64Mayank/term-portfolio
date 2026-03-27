import type { ThemeValues } from './themes'

export function applyTheme(values: ThemeValues) {
  const root = document.documentElement
  Object.entries(values).forEach(([key, val]) => {
    root.style.setProperty(key, val)
  })
}

export default applyTheme

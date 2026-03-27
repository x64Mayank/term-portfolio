import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import themes, { themeNames } from './themes'

type ThemeState = {
  current: string
  available: string[]
}

const initialTheme = (localStorage.getItem('terminal:theme') as string) || 'default'

const initialState: ThemeState = {
  current: themeNames.includes(initialTheme) ? initialTheme : 'default',
  available: themeNames,
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<string>) {
      if (themes[action.payload]) {
        state.current = action.payload
        try {
          localStorage.setItem('terminal:theme', action.payload)
        } catch {}
      }
    },
    toggleTheme(state) {
      const idx = state.available.indexOf(state.current)
      const next = (idx + 1) % state.available.length
      state.current = state.available[next]
      try {
        localStorage.setItem('terminal:theme', state.current)
      } catch {}
    },
  },
})

export const { setTheme, toggleTheme } = themeSlice.actions

export default themeSlice.reducer

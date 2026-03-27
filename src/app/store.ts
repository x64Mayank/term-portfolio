import { configureStore } from '@reduxjs/toolkit'
import terminalReducer from '../features/terminal/terminalSlice'
import themeReducer from '../features/theme/themeSlice'

export const store = configureStore({
  reducer: {
    terminal: terminalReducer,
    theme: themeReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

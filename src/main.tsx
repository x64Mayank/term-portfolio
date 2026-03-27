import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import './index.css'
import App from './App.tsx'
import { store } from './app/store'
import applyTheme from './features/theme/applyTheme'
import themes from './features/theme/themes'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)

// Apply current theme on startup and subscribe to changes
try {
  const current = store.getState().theme?.current
  if (current && themes[current]) {
    applyTheme(themes[current])
  }
} catch {}

store.subscribe(() => {
  try {
    const current = store.getState().theme?.current
    if (current && themes[current]) {
      applyTheme(themes[current])
    }
  } catch {}
})

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app/App.jsx'
import { colors } from './theme/colors'

const cssColorTokens = {
  '--color-neural-base': colors.neuralBackground.canvas.dark,
  '--color-accent': colors.accent.dark,
  '--color-dark-ink': colors.darkInk.dark,
  '--color-portfolio-text': colors.text.dark,
}

Object.entries(cssColorTokens).forEach(([name, value]) => {
  document.documentElement.style.setProperty(name, value)
})
document.querySelector('meta[name="theme-color"]')?.setAttribute('content', colors.neuralBackground.canvas.dark)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

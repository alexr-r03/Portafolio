import { useCallback, useEffect, useMemo, useState } from 'react'
import { createTheme } from '@mui/material'
import { colors } from '../theme/colors'

export function usePortfolioTheme(language) {
  const [mode, setMode] = useState(() => localStorage.getItem('portfolio-mode') === 'light' ? 'light' : 'dark')

  const colorVariables = useMemo(() => ({
    '--color-accent': colors.accent[mode],
    '--color-accent-button': colors.accentButton[mode],
    '--color-accent-button-hover': colors.accentButtonHover[mode],
    '--color-dark-ink': colors.darkInk[mode],
    '--color-light-text': colors.lightText[mode],
    '--color-accent-border': colors.accentBorder[mode],
    '--color-avatar-border': colors.avatarBorder[mode],
    '--color-avatar-bg': colors.avatarBackground[mode],
    '--color-dot-glow': colors.dotGlow[mode],
    '--color-project-placeholder': colors.projectPlaceholder[mode],
    '--color-scrollbar-track': colors.scrollbar.track[mode],
    '--color-scrollbar-thumb': colors.scrollbar.thumb[mode],
    '--color-scrollbar-thumb-hover': colors.scrollbar.thumbHover[mode],
    '--portfolio-text': colors.text[mode],
    '--portfolio-muted': colors.muted[mode],
    '--portfolio-line': colors.line[mode],
    '--portfolio-surface': colors.surface[mode],
    '--portfolio-card': colors.card[mode],
    '--portfolio-panel': colors.panel[mode],
  }), [mode])

  const theme = useMemo(() => createTheme({
    palette: {
      mode,
      primary: { main: colors.accent[mode] },
      background: { default: colors.neuralBackground.canvas.dark, paper: colors.panel[mode] },
      text: { primary: colors.text[mode], secondary: colors.muted[mode] },
    },
    typography: { fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' },
    shape: { borderRadius: 14 },
  }), [mode])

  const changeMode = useCallback(() => {
    const nextMode = mode === 'dark' ? 'light' : 'dark'
    setMode(nextMode)
    localStorage.setItem('portfolio-mode', nextMode)
  }, [mode])

  useEffect(() => {
    document.documentElement.lang = language
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', colors.neuralBackground.canvas[mode])
  }, [language, mode])

  useEffect(() => {
    Object.entries(colorVariables).forEach(([name, value]) => {
      document.documentElement.style.setProperty(name, value)
    })
  }, [colorVariables])

  useEffect(() => {
    const updateScrollbarCompensation = () => {
      const scrollbarWidth = Math.max(0, window.innerWidth - document.documentElement.clientWidth)
      document.documentElement.style.setProperty('--scrollbar-compensation', `${scrollbarWidth}px`)
    }

    updateScrollbarCompensation()
    window.addEventListener('resize', updateScrollbarCompensation)
    return () => window.removeEventListener('resize', updateScrollbarCompensation)
  }, [])

  return { mode, changeMode, colorVariables, theme }
}

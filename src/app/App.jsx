import { useMemo, useState } from 'react'
import { Global } from '@emotion/react'
import { Box, CssBaseline, ThemeProvider } from '@mui/material'
import BackToTopButton from '../components/BackToTopButton'
import Background from '../components/Background'
import PortfolioSections from '../components/PortfolioSections'
import SiteHeader from '../components/SiteHeader'
import { projects } from '../data/projects'
import { useI18n } from '../i18n'
import { globalStyles } from '../theme/globalStyles'
import { usePortfolioTheme } from '../hooks/usePortfolioTheme'

const projectsById = new Map(projects.map((project) => [project.id, project]))

function App() {
  const [backgroundVisible, setBackgroundVisible] = useState(true)
  const { language, changeLanguage, t } = useI18n()
  const { mode, changeMode, colorVariables, theme } = usePortfolioTheme(language)
  const localizedProjects = useMemo(() => t('projects.items').map((project) => ({
    ...projectsById.get(project.id),
    ...project,
  })), [language, t])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Global styles={globalStyles} />
      <Box className={`app-shell ${mode}`} style={colorVariables}>
        {backgroundVisible ? (
          <Background mode={mode} />
        ) : (
          <Box
            aria-hidden="true"
            sx={{
              position: 'fixed',
              inset: 0,
              zIndex: -1,
              bgcolor: mode === 'light' ? '#cfdee7' : 'background.default',
            }}
          />
        )}
        <SiteHeader
          language={language}
          changeLanguage={changeLanguage}
          t={t}
          mode={mode}
          changeMode={changeMode}
          backgroundVisible={backgroundVisible}
          toggleBackground={() => setBackgroundVisible((visible) => !visible)}
        />
        <PortfolioSections t={t} projects={localizedProjects} />
        <BackToTopButton t={t} />
      </Box>
    </ThemeProvider>
  )
}

export default App

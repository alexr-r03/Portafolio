import { useEffect, useMemo, useState } from 'react'
import { Global } from '@emotion/react'
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  CssBaseline,
  Divider,
  IconButton,
  Link,
  Stack,
  ThemeProvider,
  Toolbar,
  Tooltip,
  Typography,
  createTheme,
} from '@mui/material'
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded'
import Brightness4RoundedIcon from '@mui/icons-material/Brightness4Rounded'
import Brightness7RoundedIcon from '@mui/icons-material/Brightness7Rounded'
import CodeRoundedIcon from '@mui/icons-material/CodeRounded'
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded'
import EmailRoundedIcon from '@mui/icons-material/EmailRounded'
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded'
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded'
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded'
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded'
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded'
import Background from '../components/Background'
import ContactLinks from '../components/ContactLinks'
import ProjectCard from '../components/ProjectCard'
import { BulletGroup, InfoRow, SectionTitle } from '../components/ResumeDetails'
import { portfolio } from '../data/portfolio'
import { projects } from '../data/projects'
import { stackLogos } from '../data/stackLogos'
import { useI18n } from '../i18n'
import { colors } from '../theme/colors'
import { globalStyles } from '../theme/globalStyles'

const projectsById = new Map(projects.map((project) => [project.id, project]))

function App() {
  const [backgroundVisible, setBackgroundVisible] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { language, changeLanguage, t } = useI18n()
  const [mode, setMode] = useState(() => localStorage.getItem('portfolio-mode') === 'light' ? 'light' : 'dark')
  const [showBackToTop, setShowBackToTop] = useState(false)
  useEffect(() => {
    if (!mobileMenuOpen) return undefined

    const closeOnOutsidePointer = (event) => {
      if (!(event.target instanceof Element)) return
      if (event.target.closest('.mobile-navigation-panel, .mobile-menu-trigger')) return
      setMobileMenuOpen(false)
    }

    document.addEventListener('pointerdown', closeOnOutsidePointer)
    return () => document.removeEventListener('pointerdown', closeOnOutsidePointer)
  }, [mobileMenuOpen])
  useEffect(() => {
    document.documentElement.lang = language
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', colors.neuralBackground.canvas[mode])
  }, [language, mode])
  useEffect(() => {
    const updateBackToTopVisibility = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight
      setShowBackToTop(scrollableHeight > 0 && window.scrollY / scrollableHeight > 0.2)
    }

    updateBackToTopVisibility()
    window.addEventListener('scroll', updateBackToTopVisibility, { passive: true })
    window.addEventListener('resize', updateBackToTopVisibility)
    return () => {
      window.removeEventListener('scroll', updateBackToTopVisibility)
      window.removeEventListener('resize', updateBackToTopVisibility)
    }
  }, [])
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

  const changeMode = () => {
    const next = mode === 'dark' ? 'light' : 'dark'
    setMode(next)
    localStorage.setItem('portfolio-mode', next)
  }
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
        <AppBar
          position="sticky"
          elevation={0}
          className="site-header"
          onKeyDown={(event) => {
            if (event.key === 'Escape') setMobileMenuOpen(false)
          }}
        >
          <Toolbar className="header-inner">
            <Link href="#inicio" underline="none" className="wordmark">{portfolio.name}</Link>
            <IconButton
              className="mobile-menu-trigger"
              aria-label={mobileMenuOpen ? 'Cerrar menú / Close menu' : 'Abrir menú / Open menu'}
              aria-controls="mobile-navigation-panel"
              aria-haspopup="menu"
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((isOpen) => !isOpen)}
            >
              <MenuRoundedIcon />
            </IconButton>
            <Stack component="nav" direction="row" spacing={{ xs: 1.5, md: 2.5 }} className="desktop-nav">
              {[
                ['about', '#sobre-mi'],
                ['experience', '#experiencia'],
                ['projects', '#proyectos'],
                ['contact', '#contacto'],
              ].map(([key, href]) => <Link key={key} href={href} underline="none" className="nav-link">{t(`nav.${key}`)}</Link>)}
            </Stack>
            <Stack direction="row" spacing={{ xs: 0.25, md: 1.5 }} sx={{ alignItems: 'center' }} className="header-tools">
              <ContactLinks t={t} compact />
              <Button
                component="a"
                href={portfolio.resumeUrl}
                download="HV Alexander Rincon.pdf"
                variant="outlined"
                className="header-resume"
                startIcon={<DownloadRoundedIcon />}
              >{t('actions.downloadResume')}</Button>
              <IconButton onClick={() => changeLanguage(language === 'es' ? 'en' : 'es')} aria-label={t(language === 'es' ? 'actions.switchToEnglish' : 'actions.switchToSpanish')} className="header-icon">
                <LanguageRoundedIcon />
                <Typography component="span" className="language-label">{language.toUpperCase()}</Typography>
              </IconButton>
              <IconButton onClick={changeMode} aria-label={t(mode === 'dark' ? 'actions.lightMode' : 'actions.darkMode')} className="header-icon">
                {mode === 'dark' ? <Brightness7RoundedIcon /> : <Brightness4RoundedIcon />}
              </IconButton>
              <IconButton
                aria-label={backgroundVisible ? 'Ocultar fondo / Hide background' : 'Mostrar fondo / Show background'}
                title={backgroundVisible ? 'Ocultar fondo / Hide background' : 'Mostrar fondo / Show background'}
                onClick={() => setBackgroundVisible((visible) => !visible)}
                className="header-icon background-toggle"
              >
                {backgroundVisible ? <VisibilityRoundedIcon /> : <VisibilityOffRoundedIcon />}
              </IconButton>
            </Stack>
          </Toolbar>
          <Box
            id="mobile-navigation-panel"
            className={`mobile-navigation-panel${mobileMenuOpen ? ' is-open' : ''}`}
            aria-hidden={!mobileMenuOpen}
          >
            <Box className="mobile-navigation-content">
              <Link href="#sobre-mi" underline="none" className="mobile-navigation-link" onClick={() => setMobileMenuOpen(false)}>
                {t('nav.about')}
              </Link>
              <Divider />
              <Link href="#experiencia" underline="none" className="mobile-navigation-link" onClick={() => setMobileMenuOpen(false)}>
                {t('nav.experience')}
              </Link>
              <Divider />
              <Link href="#proyectos" underline="none" className="mobile-navigation-link" onClick={() => setMobileMenuOpen(false)}>
                {t('nav.projects')}
              </Link>
              <Divider />
              <Link href="#contacto" underline="none" className="mobile-navigation-link" onClick={() => setMobileMenuOpen(false)}>
                {t('nav.contact')}
              </Link>
              <Divider />
              <Box className="mobile-menu-contacts">
                <ContactLinks t={t} compact />
              </Box>
              <Divider />
              <Link
                href={portfolio.resumeUrl}
                download="HV Alexander Rincon.pdf"
                underline="none"
                className="mobile-navigation-link mobile-resume-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                <DownloadRoundedIcon />
                {t('actions.downloadResume')}
              </Link>
              <Divider />
              <Box className="mobile-menu-controls">
                <IconButton
                  onClick={() => { changeLanguage(language === 'es' ? 'en' : 'es'); setMobileMenuOpen(false) }}
                  aria-label={t(language === 'es' ? 'actions.switchToEnglish' : 'actions.switchToSpanish')}
                  title={language.toUpperCase()}
                  className="header-icon"
                >
                  <LanguageRoundedIcon />
                  <Typography component="span" className="language-label">{language.toUpperCase()}</Typography>
                </IconButton>
                <IconButton
                  onClick={() => { changeMode(); setMobileMenuOpen(false) }}
                  aria-label={t(mode === 'dark' ? 'actions.lightMode' : 'actions.darkMode')}
                  title={t(mode === 'dark' ? 'actions.lightMode' : 'actions.darkMode')}
                  className="header-icon"
                >
                  {mode === 'dark' ? <Brightness7RoundedIcon /> : <Brightness4RoundedIcon />}
                </IconButton>
                <IconButton
                  onClick={() => { setBackgroundVisible((visible) => !visible); setMobileMenuOpen(false) }}
                  aria-label={backgroundVisible ? 'Ocultar fondo / Hide background' : 'Mostrar fondo / Show background'}
                  title={backgroundVisible ? 'Ocultar fondo / Hide background' : 'Mostrar fondo / Show background'}
                  className="header-icon"
                >
                  {backgroundVisible ? <VisibilityRoundedIcon /> : <VisibilityOffRoundedIcon />}
                </IconButton>
              </Box>
            </Box>
          </Box>
        </AppBar>

        <Container maxWidth="md" className="page-content">
          <Box component="main">
            <Box component="section" id="inicio" className="hero-section text-panel">
              <Box className="hero-copy">
                <Typography className="eyebrow">{t('hero.role')}</Typography>
                <Typography component="h1" className="hero-title">{portfolio.name}</Typography>
                <Typography className="hero-intro">{t('hero.intro')}</Typography>
                <Stack direction="row" spacing={1.3} className="hero-actions">
                  <Button component="a" href="#proyectos" variant="contained" startIcon={<CodeRoundedIcon />} endIcon={<ArrowOutwardRoundedIcon />}>{t('nav.projects')}</Button>
                  <Button component="a" href="#contacto" variant="outlined" startIcon={<EmailRoundedIcon />} endIcon={<ArrowOutwardRoundedIcon />}>{t('nav.contact')}</Button>
                </Stack>
                <Stack direction="row" spacing={2} className="social-links">
                  <Typography className="location"><LocationOnOutlinedIcon fontSize="small" />{t('hero.location')}</Typography>
                </Stack>
              </Box>
              <Box className="hero-aside">
                <Avatar src={portfolio.avatar} alt={portfolio.name} className="profile-avatar"><PersonOutlineRoundedIcon fontSize="large" /></Avatar>
                <ContactLinks t={t} presentation />
              </Box>
            </Box>

            <Box component="section" id="sobre-mi" className="content-section text-panel">
              <SectionTitle>{t('about.title')}</SectionTitle>
              <Typography className="section-copy">{t('about.text')}</Typography>
            </Box>

            <Box component="section" id="experiencia" className="content-section text-panel">
              <SectionTitle>{t('experience.title')}</SectionTitle>
              <InfoRow title={t('experience.role')} subtitle={`${t('experience.company')} · ${t('experience.dates')}`}>
                <BulletGroup title={t('experience.responsibilitiesTitle')} items={t('experience.responsibilities')} />
                <BulletGroup title={t('experience.achievementsTitle')} items={t('experience.achievements')} />
              </InfoRow>
            </Box>

            <Box component="section" id="formacion" className="content-section compact-section text-panel">
              <SectionTitle>{t('education.title')}</SectionTitle>
              <InfoRow title={t('education.degree')} subtitle={t('education.dates')} description={t('education.institution')} />
            </Box>

            <Box component="section" id="stack" className="content-section compact-section text-panel">
              <SectionTitle>{t('stack.title')}</SectionTitle>
              <Typography className="section-copy">{t('stack.hint')}</Typography>
              <Stack direction="row" sx={{ flexWrap: 'wrap' }} className="stack-list">
                {portfolio.stack.map(({ name, icon }) => {
                  const logo = stackLogos[icon]
                  if (!logo) return null
                  return <Tooltip title={name} key={name}><Box component="span" role="img" data-stack={icon} className="stack-icon" aria-label={name}><Box component="img" src={logo} alt="" loading="lazy" /></Box></Tooltip>
                })}
              </Stack>
            </Box>

            <Box component="section" id="habilidades" className="content-section compact-section text-panel">
              <SectionTitle>{t('technicalSkills.title')}</SectionTitle>
              <Stack spacing={2.1} className="skill-groups">
                {t('technicalSkills.groups').map((group) => (
                  <Box key={group.id} className="skill-group">
                    <Typography className="skill-category">{group.label}</Typography>
                    <Stack direction="row" gap={0.8} sx={{ flexWrap: 'wrap' }}>
                      {group.items.map((skill) => <Chip key={skill} label={skill} size="small" className="skill-chip" />)}
                    </Stack>
                  </Box>
                ))}
              </Stack>
            </Box>

            <Box component="section" id="certificaciones" className="content-section compact-section text-panel">
              <SectionTitle>{t('certifications.title')}</SectionTitle>
              <Box component="ul" className="certification-list">
                {t('certifications.items').map((item) => (
                  <Box component="li" key={item.name} className="certification-item">
                    <Typography className="certification-name">{item.name}</Typography>
                    <Typography className="certification-meta">{item.issuer} · {item.date}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            <Box component="section" id="proyectos" className="content-section projects-section text-panel">
              <SectionTitle>{t('projects.title')}</SectionTitle>
              <Typography className="section-copy projects-hint">{t('projects.hint')}</Typography>
              <Box className="projects-grid">
                {localizedProjects.map((project) => <ProjectCard key={project.id} project={project} t={t} />)}
              </Box>
            </Box>

            <Box component="section" id="contacto" className="contact-section text-panel">
              <SectionTitle>{t('contact.title')}</SectionTitle>
              <Typography className="section-copy">{t('contact.text')}</Typography>
              <ContactLinks t={t} presentation />
              <Button component="a" href={portfolio.resumeUrl} download="HV Alexander Rincon.pdf" variant="text" className="resume-button">
                {t('actions.viewResume')}<ArrowOutwardRoundedIcon fontSize="small" />
              </Button>
            </Box>
          </Box>
          <Box component="footer" className="site-footer">
            <Typography>{t('footer.note')}</Typography>
            <Typography>© {new Date().getFullYear()} {portfolio.name}</Typography>
          </Box>
        </Container>
        <Tooltip
          title={t('footer.backToTop')}
          disableHoverListener={!showBackToTop}
          disableFocusListener={!showBackToTop}
          disableTouchListener={!showBackToTop}
        >
          <IconButton
            component="a"
            href="#inicio"
            aria-label={t('footer.backToTop')}
            aria-hidden={!showBackToTop}
            tabIndex={showBackToTop ? 0 : -1}
            className={`back-to-top${showBackToTop ? ' is-visible' : ''}`}
          >
            <ArrowUpwardRoundedIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </ThemeProvider>
  )
}

export default App

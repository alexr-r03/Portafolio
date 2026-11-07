import { useEffect, useState } from 'react'
import {
  AppBar,
  Box,
  Button,
  Divider,
  IconButton,
  Link,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material'
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded'
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded'
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded'
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded'
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded'
import PlayDisabledRoundedIcon from '@mui/icons-material/PlayDisabledRounded'
import ContactLinks from './ContactLinks'
import { portfolio } from '../data/portfolio'

export default function SiteHeader({
  language,
  changeLanguage,
  t,
  mode,
  changeMode,
  backgroundVisible,
  toggleBackground,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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

  const closeMobileMenu = () => setMobileMenuOpen(false)
  const switchLanguage = () => changeLanguage(language === 'es' ? 'en' : 'es')
  const languageAction = t(language === 'es' ? 'actions.switchToEnglish' : 'actions.switchToSpanish')
  const modeAction = t(mode === 'dark' ? 'actions.lightMode' : 'actions.darkMode')
  const backgroundAction = t(backgroundVisible ? 'actions.hideBackground' : 'actions.showBackground')

  return (
    <AppBar
      position="sticky"
      elevation={0}
      className="site-header"
      onKeyDown={(event) => {
        if (event.key === 'Escape') closeMobileMenu()
      }}
    >
      <Toolbar className="header-inner">
        <Link href="#inicio" underline="none" className="wordmark">{portfolio.name}</Link>
        <Tooltip title={t(mobileMenuOpen ? 'actions.closeMenu' : 'actions.openMenu')}>
          <IconButton
            className="mobile-menu-trigger"
            aria-label={t(mobileMenuOpen ? 'actions.closeMenu' : 'actions.openMenu')}
            aria-controls="mobile-navigation-panel"
            aria-haspopup="menu"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((isOpen) => !isOpen)}
          >
            <MenuRoundedIcon />
          </IconButton>
        </Tooltip>
        <Stack component="nav" direction="row" spacing={{ xs: 1.5, md: 2.5 }} className="desktop-nav">
          {[
            ['about', '#sobre-mi'],
            ['experience', '#experiencia'],
            ['projects', '#proyectos'],
            ['contact', '#contacto'],
          ].map(([key, href]) => (
            <Link key={key} href={href} underline="none" className="nav-link">{t(`nav.${key}`)}</Link>
          ))}
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
          <Tooltip title={languageAction}>
            <IconButton onClick={switchLanguage} aria-label={languageAction} className="header-icon">
              <LanguageRoundedIcon />
              <Typography component="span" className="language-label">{language.toUpperCase()}</Typography>
            </IconButton>
          </Tooltip>
          <Tooltip title={modeAction}>
            <IconButton onClick={changeMode} aria-label={modeAction} className="header-icon">
              {mode === 'dark' ? <LightModeRoundedIcon /> : <DarkModeRoundedIcon />}
            </IconButton>
          </Tooltip>
          <Tooltip title={backgroundAction}>
            <IconButton
              aria-label={backgroundAction}
              onClick={toggleBackground}
              className="header-icon background-toggle"
            >
              {backgroundVisible ? <PlayDisabledRoundedIcon /> : <PlayArrowRoundedIcon />}
            </IconButton>
          </Tooltip>
        </Stack>
      </Toolbar>
      <Box
        id="mobile-navigation-panel"
        className={`mobile-navigation-panel${mobileMenuOpen ? ' is-open' : ''}`}
        aria-hidden={!mobileMenuOpen}
      >
        <Box className="mobile-navigation-content">
          <Link href="#sobre-mi" underline="none" className="mobile-navigation-link" onClick={closeMobileMenu}>{t('nav.about')}</Link>
          <Divider />
          <Link href="#experiencia" underline="none" className="mobile-navigation-link" onClick={closeMobileMenu}>{t('nav.experience')}</Link>
          <Divider />
          <Link href="#proyectos" underline="none" className="mobile-navigation-link" onClick={closeMobileMenu}>{t('nav.projects')}</Link>
          <Divider />
          <Link href="#contacto" underline="none" className="mobile-navigation-link" onClick={closeMobileMenu}>{t('nav.contact')}</Link>
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
            onClick={closeMobileMenu}
          >
            <DownloadRoundedIcon />
            {t('actions.downloadResume')}
          </Link>
          <Divider />
          <Box className="mobile-menu-controls">
            <Tooltip title={languageAction}>
              <IconButton
                onClick={() => { switchLanguage(); closeMobileMenu() }}
                aria-label={languageAction}
                className="header-icon"
              >
                <LanguageRoundedIcon />
                <Typography component="span" className="language-label">{language.toUpperCase()}</Typography>
              </IconButton>
            </Tooltip>
            <Tooltip title={modeAction}>
              <IconButton
                onClick={() => { changeMode(); closeMobileMenu() }}
                aria-label={modeAction}
                className="header-icon"
              >
                {mode === 'dark' ? <LightModeRoundedIcon /> : <DarkModeRoundedIcon />}
              </IconButton>
            </Tooltip>
            <Tooltip title={backgroundAction}>
              <IconButton
                onClick={() => { toggleBackground(); closeMobileMenu() }}
                aria-label={backgroundAction}
                className="header-icon"
              >
                {backgroundVisible ? <PlayDisabledRoundedIcon /> : <PlayArrowRoundedIcon />}
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Box>
    </AppBar>
  )
}

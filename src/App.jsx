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
  IconButton,
  Link,
  Stack,
  ThemeProvider,
  Toolbar,
  Tooltip,
  Typography,
  createTheme,
} from '@mui/material'
import AccountTreeRoundedIcon from '@mui/icons-material/AccountTreeRounded'
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded'
import Brightness4RoundedIcon from '@mui/icons-material/Brightness4Rounded'
import Brightness7RoundedIcon from '@mui/icons-material/Brightness7Rounded'
import CloudRoundedIcon from '@mui/icons-material/CloudRounded'
import CodeRoundedIcon from '@mui/icons-material/CodeRounded'
import DataObjectRoundedIcon from '@mui/icons-material/DataObjectRounded'
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded'
import EmailRoundedIcon from '@mui/icons-material/EmailRounded'
import GitHubIcon from '@mui/icons-material/GitHub'
import HubRoundedIcon from '@mui/icons-material/HubRounded'
import InstagramIcon from '@mui/icons-material/Instagram'
import JavascriptRoundedIcon from '@mui/icons-material/JavascriptRounded'
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded'
import StorageRoundedIcon from '@mui/icons-material/StorageRounded'
import TerminalRoundedIcon from '@mui/icons-material/TerminalRounded'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import Background from './components/background'
import { useI18n } from './i18n'
import { portfolio, projects } from './data/portfolio'
import { colors } from './theme/colors'
import { globalStyles } from './theme/globalStyles'

const stackIcons = {
  react: HubRoundedIcon,
  javascript: JavascriptRoundedIcon,
  node: TerminalRoundedIcon,
  express: TerminalRoundedIcon,
  mui: HubRoundedIcon,
  python: DataObjectRoundedIcon,
  php: CodeRoundedIcon,
  swagger: DataObjectRoundedIcon,
  html: CodeRoundedIcon,
  css: CodeRoundedIcon,
  git: AccountTreeRoundedIcon,
  database: StorageRoundedIcon,
  cloud: CloudRoundedIcon,
}

const contactItems = [
  { key: 'email', icon: EmailRoundedIcon },
  { key: 'whatsapp', icon: WhatsAppIcon },
  { key: 'instagram', icon: InstagramIcon },
]

function getContactHref(key) {
  if (key === 'email') return `mailto:${portfolio.email}`
  if (key === 'whatsapp') return portfolio.whatsapp ? `https://wa.me/${portfolio.whatsapp.replace(/\D/g, '')}` : '#contacto'
  return portfolio.instagramUrl || '#contacto'
}

function ContactLinks({ t, compact = false }) {
  return (
    <Stack direction="row" spacing={compact ? 1.5 : 3} className={compact ? 'top-contacts' : 'contact-links'}>
      {contactItems.map(({ key, icon: Icon }) => {
        const href = getContactHref(key)
        const external = href.startsWith('https://')
        return (
          <Link
            key={key}
            href={href}
            target={external ? '_blank' : undefined}
            rel={external ? 'noreferrer' : undefined}
            aria-label={t(`contact.${key}`)}
            underline="none"
            className="contact-link"
          >
            <Icon />
            {!compact && <Typography component="span">{t(`contact.${key}`)}</Typography>}
          </Link>
        )
      })}
    </Stack>
  )
}

function ProjectCard({ project, t }) {
  return (
    <Box component="article" className="project-card">
      <Box className="project-image-wrap">
        <img className="project-image" src={project.image} alt={project.imageAlt} loading="lazy" />
      </Box>
      <Box className="project-details">
        <Stack direction="row" alignItems="center" justifyContent="space-between" gap={2}>
          <Typography variant="h3" className="project-title">{project.name}</Typography>
          <Link href={project.link} target="_blank" rel="noreferrer" aria-label={`${t('actions.viewProject')}: ${project.name}`} className="project-link">
            <ArrowOutwardRoundedIcon fontSize="small" />
          </Link>
        </Stack>
        <Typography className="project-description">{project.description}</Typography>
        <Stack direction="row" flexWrap="wrap" gap={0.8}>
          {project.technologies.map((technology) => <Chip key={technology} label={technology} size="small" className="tech-chip" />)}
        </Stack>
      </Box>
    </Box>
  )
}

function App() {
  const { language, changeLanguage, t } = useI18n()
  const [mode, setMode] = useState(() => localStorage.getItem('portfolio-mode') === 'light' ? 'light' : 'dark')
  useEffect(() => {
    document.documentElement.lang = language
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', colors.neuralBackground.canvas[mode])
  }, [language, mode])
  const colorVariables = {
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
    '--portfolio-text': colors.text[mode],
    '--portfolio-muted': colors.muted[mode],
    '--portfolio-line': colors.line[mode],
    '--portfolio-surface': colors.surface[mode],
    '--portfolio-card': colors.card[mode],
    '--portfolio-panel': colors.panel[mode],
  }
  const theme = useMemo(() => createTheme({
    palette: {
      mode,
      primary: { main: colors.accent[mode] },
      background: { default: colors.neuralBackground.canvas.dark, paper: colors.surface[mode] },
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
  const localizedProjects = t('projects.items').map((project) => ({
    ...projects.find((item) => item.id === project.id),
    ...project,
  }))

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Global styles={globalStyles} />
      <Box className={`app-shell ${mode}`} style={colorVariables}>
        <Background mode={mode} />
        <AppBar position="sticky" elevation={0} className="site-header">
          <Toolbar className="header-inner">
            <Link href="#inicio" underline="none" className="wordmark">{portfolio.name}</Link>
            <Stack component="nav" direction="row" spacing={{ xs: 1.5, md: 2.5 }} className="desktop-nav">
              {[
                ['about', '#sobre-mi'],
                ['experience', '#experiencia'],
                ['projects', '#proyectos'],
                ['contact', '#contacto'],
              ].map(([key, href]) => <Link key={key} href={href} underline="none" className="nav-link">{t(`nav.${key}`)}</Link>)}
            </Stack>
            <Stack direction="row" alignItems="center" spacing={{ xs: 0.25, md: 1.5 }} className="header-tools">
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
            </Stack>
          </Toolbar>
        </AppBar>

        <Container maxWidth="md" className="page-content">
          <Box component="main">
            <Box component="section" id="inicio" className="hero-section text-panel">
              <Box className="hero-copy">
                <Typography className="eyebrow">{t('hero.role')}</Typography>
                <Typography component="h1" className="hero-title">{portfolio.name}</Typography>
                <Typography className="hero-intro">{t('hero.intro')}</Typography>
                <Stack direction="row" spacing={1.3} className="hero-actions">
                  <Button component="a" href="#proyectos" variant="contained" endIcon={<ArrowOutwardRoundedIcon />}>{t('nav.projects')}</Button>
                  <Button component="a" href={`mailto:${portfolio.email}`} variant="outlined" startIcon={<EmailRoundedIcon />}>{t('nav.contact')}</Button>
                </Stack>
                <Stack direction="row" spacing={2} className="social-links">
                  {portfolio.github && <Link href={portfolio.github} target="_blank" rel="noreferrer" aria-label="GitHub"><GitHubIcon /></Link>}
                  {portfolio.linkedin && <Link href={portfolio.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedInIcon /></Link>}
                  <Typography className="location"><LocationOnOutlinedIcon fontSize="small" />{t('hero.location')}</Typography>
                </Stack>
              </Box>
              <Avatar src={portfolio.avatar} alt={portfolio.name} className="profile-avatar"><PersonOutlineRoundedIcon fontSize="large" /></Avatar>
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
              <Stack direction="row" flexWrap="wrap" gap={1.4} className="stack-list">
                {portfolio.stack.map(({ name, icon }) => {
                  const StackIcon = stackIcons[icon] || CodeRoundedIcon
                  return <Tooltip title={name} key={name}><Box component="span" role="img" className="stack-icon" aria-label={name}><StackIcon /></Box></Tooltip>
                })}
              </Stack>
            </Box>

            <Box component="section" id="habilidades" className="content-section compact-section text-panel">
              <SectionTitle>{t('technicalSkills.title')}</SectionTitle>
              <Stack spacing={2.1} className="skill-groups">
                {t('technicalSkills.groups').map((group) => (
                  <Box key={group.id} className="skill-group">
                    <Typography className="skill-category">{group.label}</Typography>
                    <Stack direction="row" flexWrap="wrap" gap={0.8}>
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
              <ContactLinks t={t} />
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
      </Box>
    </ThemeProvider>
  )
}

function SectionTitle({ children }) {
  return <Typography component="h2" className="section-title">{children}</Typography>
}

function InfoRow({ title, subtitle, description, children }) {
  return (
    <Box className="info-row">
      <Box className="info-dot" />
      <Box>
        <Typography className="info-title">{title}</Typography>
        <Typography className="info-subtitle">{subtitle}</Typography>
        {description && <Typography className="info-description">{description}</Typography>}
        {children}
      </Box>
    </Box>
  )
}

function BulletGroup({ title, items }) {
  return (
    <Box className="resume-bullet-group">
      <Typography className="resume-group-title">{title}</Typography>
      <Box component="ul" className="resume-bullets">
        {items.map((item) => <Box component="li" key={item}>{item}</Box>)}
      </Box>
    </Box>
  )
}

export default App

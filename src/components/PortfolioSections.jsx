import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Link,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material'
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded'
import CodeRoundedIcon from '@mui/icons-material/CodeRounded'
import EmailRoundedIcon from '@mui/icons-material/EmailRounded'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded'
import ContactLinks from './ContactLinks'
import ProjectCard from './ProjectCard'
import { BulletGroup, InfoRow, SectionTitle } from './ResumeDetails'
import { portfolio } from '../data/portfolio'
import { stackLogos } from '../data/stackLogos'

export default function PortfolioSections({ t, projects }) {
  return (
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
            {projects.map((project) => <ProjectCard key={project.id} project={project} t={t} />)}
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
  )
}

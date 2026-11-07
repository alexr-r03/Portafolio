import { Box, Link, Stack, Tooltip, Typography } from '@mui/material'
import EmailRoundedIcon from '@mui/icons-material/EmailRounded'
import GitHubIcon from '@mui/icons-material/GitHub'
import InstagramIcon from '@mui/icons-material/Instagram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import { portfolio } from '../data/portfolio'

const contactItems = [
  { key: 'email', icon: EmailRoundedIcon },
  { key: 'whatsapp', icon: WhatsAppIcon },
  { key: 'github', icon: GitHubIcon },
  { key: 'instagram', icon: InstagramIcon },
  { key: 'linkedin', icon: LinkedInIcon },
]

function getContactHref(key) {
  if (key === 'email') return `mailto:${portfolio.email}`
  if (key === 'whatsapp') return portfolio.whatsapp ? `https://wa.me/${portfolio.whatsapp.replace(/\D/g, '')}` : '#contacto'
  if (key === 'github') return portfolio.github || '#contacto'
  if (key === 'linkedin') return portfolio.linkedin || '#contacto'
  return portfolio.instagramUrl || '#contacto'
}

function getContactValue(key) {
  if (key === 'email') return portfolio.email
  if (key === 'whatsapp') return portfolio.whatsappDisplay
  if (key === 'github') return portfolio.github.replace(/^https?:\/\//, '').replace(/\/$/, '')
  if (key === 'linkedin') return portfolio.linkedin.replace(/^https?:\/\//, '').replace(/\/$/, '')
  return portfolio.instagramHandle
}

export default function ContactLinks({ t, compact = false, presentation = false }) {
  return (
    <Stack
      direction={presentation ? 'column' : 'row'}
      spacing={compact ? 2.5 : presentation ? 1.7 : 3}
      className={compact ? 'top-contacts' : presentation ? 'presentation-contacts' : 'contact-links'}
    >
      {contactItems.map(({ key, icon: Icon }) => {
        const href = getContactHref(key)
        const external = href.startsWith('https://')

        return (
          <Tooltip key={key} title={compact ? t(`contact.${key}`) : ''}>
            <Link
              href={href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noreferrer' : undefined}
              aria-label={t(`contact.${key}`)}
              underline="none"
              className="contact-link"
            >
              <Icon />
              {!compact && (presentation
                ? <Box className="presentation-contact-copy">
                    <Typography className="presentation-contact-label">{t(`contact.${key}`)}</Typography>
                    <Typography className="presentation-contact-value">{getContactValue(key)}</Typography>
                  </Box>
                : <Typography component="span">{t(`contact.${key}`)}: {getContactValue(key)}</Typography>)}
            </Link>
          </Tooltip>
        )
      })}
    </Stack>
  )
}

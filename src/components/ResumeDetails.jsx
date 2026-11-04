import { Box, Typography } from '@mui/material'

export function SectionTitle({ children }) {
  return <Typography component="h2" className="section-title">{children}</Typography>
}

export function InfoRow({ title, subtitle, description, children }) {
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

export function BulletGroup({ title, items }) {
  return (
    <Box className="resume-bullet-group">
      <Typography className="resume-group-title">{title}</Typography>
      <Box component="ul" className="resume-bullets">
        {items.map((item) => <Box component="li" key={item}>{item}</Box>)}
      </Box>
    </Box>
  )
}

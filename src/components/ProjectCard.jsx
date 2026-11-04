import { Box, Chip, Link, Stack, Typography } from '@mui/material'
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded'

export default function ProjectCard({ project, t }) {
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

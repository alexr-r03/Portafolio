import { memo, useState } from 'react'
import { Box, Chip, Stack, Typography } from '@mui/material'
import ProjectDialog from './ProjectDialog'

function ProjectCard({ project, t }) {
  const [open, setOpen] = useState(false)

  const openDialog = () => {
    if (!open) setOpen(true)
  }
  const handleKeyDown = (event) => {
    if (event.target !== event.currentTarget) return
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      openDialog()
    }
  }

  return (
    <>
      <Box
        component="article"
        className="project-card"
        role="button"
        tabIndex={0}
        aria-haspopup="dialog"
        aria-label={`${t('actions.viewProject')}: ${project.name}`}
        onClick={openDialog}
        onKeyDown={handleKeyDown}
      >
        <Box className="project-image-wrap">
          <img className="project-image" src={project.image} alt={project.imageAlt} loading="lazy" />
        </Box>
        <Box className="project-details">
          <Stack direction="row" gap={2} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h3" className="project-title">{project.name}</Typography>
          </Stack>
          <Typography className="project-description">{project.shortDescription || project.description}</Typography>
          <Stack direction="row" gap={0.8} sx={{ flexWrap: 'wrap' }}>
            {project.technologies.map((technology) => <Chip key={technology} label={technology} size="small" className="tech-chip" />)}
          </Stack>
        </Box>
      </Box>
      <ProjectDialog project={project} t={t} open={open} onClose={() => setOpen(false)} />
    </>
  )
}

export default memo(ProjectCard)

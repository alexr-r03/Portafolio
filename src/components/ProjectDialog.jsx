import { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded'
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded'
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import GitHubIcon from '@mui/icons-material/GitHub'
import ZoomInRoundedIcon from '@mui/icons-material/ZoomInRounded'

export default function ProjectDialog({ project, t, open, onClose }) {
  const [imageViewerOpen, setImageViewerOpen] = useState(false)
  const [imageIndex, setImageIndex] = useState(0)
  const [zoomScale, setZoomScale] = useState(1)
  const liveUrl = project.liveUrl || project.link
  const images = project.images?.length
    ? project.images
    : project.image
      ? [project.image]
      : []
  const currentImage = images[imageIndex]
  const currentImageSrc = typeof currentImage === 'string' ? currentImage : currentImage?.src
  const currentImageAlt = typeof currentImage === 'string' ? project.imageAlt : currentImage?.alt || project.imageAlt
  const isModalOpen = open || imageViewerOpen

  useEffect(() => {
    if (!isModalOpen) return undefined

    const root = document.documentElement
    const previousBodyOverflow = document.body.style.overflow
    const previousRootOverflow = root.style.overflow
    document.body.style.overflow = 'hidden'
    root.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousBodyOverflow
      root.style.overflow = previousRootOverflow
    }
  }, [isModalOpen])

  const showPreviousImage = () => {
    setImageIndex((index) => (index - 1 + images.length) % images.length)
    setZoomScale(1)
  }

  const showNextImage = () => {
    setImageIndex((index) => (index + 1) % images.length)
    setZoomScale(1)
  }

  const closeImageViewer = () => {
    setImageViewerOpen(false)
    setZoomScale(1)
  }

  const closeDialog = () => {
    closeImageViewer()
    setImageIndex(0)
    onClose()
  }

  const handleImageWheel = (event) => {
    event.preventDefault()
    const zoomFactor = event.deltaY < 0 ? 1.12 : 1 / 1.12
    setZoomScale((scale) => Math.min(4, Math.max(1, scale * zoomFactor)))
  }

  useEffect(() => {
    if (zoomScale > 1) return;

    const images = document.querySelectorAll('.MuiDialog-root img');
    const image = images[images.length - 1];
    if (!image) return;

    image.style.translate = '0px 0px';
    image.style.cursor = 'default';

    const viewer = image.closest('.MuiDialog-root');
    if (viewer) {
      viewer.dataset.panX = '0';
      viewer.dataset.panY = '0';
      viewer.dataset.panOriginX = '0';
      viewer.dataset.panOriginY = '0';
      viewer.dataset.panning = 'false';
    }
  }, [zoomScale, imageViewerOpen, imageIndex]);

  useEffect(() => {
    setZoomScale(1);
  }, [imageIndex]);

  return (
    <>
      <Dialog
        disableScrollLock
        onKeyDownCapture={(event) => {
          if (imageViewerOpen || !project?.images || project.images.length < 2) return;
          if (event.key === 'ArrowLeft') {
            event.preventDefault();
            event.stopPropagation();
            setImageIndex((current) => (current - 1 + project.images.length) % project.images.length);
          } else if (event.key === 'ArrowRight') {
            event.preventDefault();
            event.stopPropagation();
            setImageIndex((current) => (current + 1) % project.images.length);
          }
        }}
        open={open}
        onClose={closeDialog}
        fullWidth
        maxWidth="md"
        scroll="paper"
        aria-labelledby={`project-dialog-title-${project.id}`}
        slotProps={{ paper: { className: 'project-dialog-paper' } }}
      >
        <DialogTitle id={`project-dialog-title-${project.id}`} className="project-dialog-title">
          <Typography component="span">{project.name}</Typography>
          <IconButton onClick={closeDialog} aria-label={t('actions.close')} className="project-dialog-close">
            <CloseRoundedIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers className="project-dialog-content">
          <Box className="project-description-panel">
            <Typography className="project-dialog-description">{project.description}</Typography>
          </Box>

          <Stack direction="row" gap={0.8} sx={{ flexWrap: 'wrap' }} className="project-dialog-technologies">
            {project.technologies.map((technology) => (
              <Chip key={technology} label={technology} size="small" className="tech-chip" />
            ))}
          </Stack>

          {currentImageSrc && (
            <Box className="project-gallery" aria-roledescription="carousel">
              <Typography className="project-gallery-title">{t('projects.galleryTitle')}</Typography>
              <Box className="project-carousel-frame">
                <Box
                  component="button"
                  type="button"
                  className="project-carousel-image-button"
                  aria-label={`${t('actions.expandImage')}: ${currentImageAlt}`}
                  onClick={() => {
                    setZoomScale(1)
                    setImageViewerOpen(true)
                  }}
                >
                  <Box component="img" src={currentImageSrc} alt={currentImageAlt} />
                  <Box className="project-image-expand-hint">
                    <ZoomInRoundedIcon fontSize="small" />
                    <Typography component="span">{t('actions.expandImage')}</Typography>
                  </Box>
                </Box>
                {images.length > 1 && (
                  <>
                    <IconButton
                      onClick={showPreviousImage}
                      aria-label={t('actions.previousImage')}
                      className="project-carousel-control project-carousel-previous"
                    >
                      <ChevronLeftRoundedIcon />
                    </IconButton>
                    <IconButton
                      onClick={showNextImage}
                      aria-label={t('actions.nextImage')}
                      className="project-carousel-control project-carousel-next"
                    >
                      <ChevronRightRoundedIcon />
                    </IconButton>
                    <Typography className="project-carousel-counter" aria-live="polite">
                      {imageIndex + 1} / {images.length}
                    </Typography>
                  </>
                )}
              </Box>
            </Box>
          )}
        </DialogContent>

        <DialogActions className="project-dialog-actions">
          {liveUrl && (
            <Button
              component="a"
              href={liveUrl}
              target="_blank"
              rel="noreferrer"
              variant="contained"
              endIcon={<ArrowOutwardRoundedIcon />}
              className="project-live-button"
            >
              {t('actions.liveProject')}
            </Button>
          )}
          <Button
            component="a"
            href={project.githubUrl || undefined}
            target={project.githubUrl ? '_blank' : undefined}
            rel={project.githubUrl ? 'noreferrer' : undefined}
            disabled={!project.githubUrl}
            variant="outlined"
            startIcon={<GitHubIcon />}
            className="project-github-button"
          >
            {t('actions.githubProject')}
          </Button>
          <Button onClick={closeDialog} variant="text" className="project-close-button">
            {t('actions.close')}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={imageViewerOpen}
        onDragStart={(event) => event.preventDefault()}
        onPointerDown={(event) => {
          if (zoomScale <= 1 || event.target.tagName !== 'IMG') return;
          event.preventDefault();
          const image = event.target;
          image.draggable = false;
          const container = event.currentTarget;
          container.dataset.panStartX = String(event.clientX);
          container.dataset.panStartY = String(event.clientY);
          container.dataset.panOriginX = container.dataset.panX || '0';
          container.dataset.panOriginY = container.dataset.panY || '0';
          container.dataset.panning = 'true';
          image.style.cursor = 'grabbing';
          container.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          const container = event.currentTarget;
          if (container.dataset.panning !== 'true') {
            if (event.target.tagName === 'IMG') event.target.style.cursor = zoomScale > 1 ? 'grab' : 'default';
            return;
          }
          const image = container.querySelector('.MuiDialog-paper img');
          const viewport = container.querySelector('.MuiDialog-paper');
          if (!image || !viewport) return;

          const width = viewport.clientWidth;
          const height = viewport.clientHeight;
          const naturalWidth = image.naturalWidth || image.width;
          const naturalHeight = image.naturalHeight || image.height;
          const containScale = Math.min(width / naturalWidth, height / naturalHeight);
          const visibleMargin = 72;
          const maxX = Math.max(0, (naturalWidth * containScale * zoomScale + width) / 2 - visibleMargin);
          const maxY = Math.max(0, (naturalHeight * containScale * zoomScale + height) / 2 - visibleMargin);
          const x = Number(container.dataset.panOriginX) + event.clientX - Number(container.dataset.panStartX);
          const y = Number(container.dataset.panOriginY) + event.clientY - Number(container.dataset.panStartY);
          const boundedX = Math.min(maxX, Math.max(-maxX, x));
          const boundedY = Math.min(maxY, Math.max(-maxY, y));

          container.dataset.panX = String(boundedX);
          container.dataset.panY = String(boundedY);
          image.style.translate = `${boundedX / zoomScale}px ${boundedY / zoomScale}px`;
        }}
        onPointerUp={(event) => {
          const container = event.currentTarget;
          if (container.dataset.panning !== 'true') return;
          container.dataset.panning = 'false';
          const image = container.querySelector('.MuiDialog-paper img');
          if (image) image.style.cursor = 'grab';
          if (container.hasPointerCapture(event.pointerId)) container.releasePointerCapture(event.pointerId);
        }}
        onPointerCancel={(event) => {
          const container = event.currentTarget;
          container.dataset.panning = 'false';
          const image = container.querySelector('.MuiDialog-paper img');
          if (image) image.style.cursor = zoomScale > 1 ? 'grab' : 'default';
        }}
        disableScrollLock
        onKeyDownCapture={(event) => {
          if (event.key === 'ArrowLeft' && project.images?.length > 1) {
            event.preventDefault();
            event.stopPropagation();
            setImageIndex((current) => (current - 1 + project.images.length) % project.images.length);
          } else if (event.key === 'ArrowRight' && project.images?.length > 1) {
            event.preventDefault();
            event.stopPropagation();
            setImageIndex((current) => (current + 1) % project.images.length);
          }
        }}
        onClose={closeImageViewer}
        fullScreen
        aria-label={currentImageAlt || project.name}
        sx={{ zIndex: (theme) => theme.zIndex.modal + 1 }}
        slotProps={{ paper: { className: 'project-image-viewer-paper' } }}
      >
        <IconButton onClick={closeImageViewer} aria-label={t('actions.close')} className="project-image-viewer-close">
          <CloseRoundedIcon />
        </IconButton>
        {images.length > 1 && (
          <>
            <IconButton
              onClick={showPreviousImage}
              aria-label={t('actions.previousImage')}
              className="project-viewer-carousel-control project-viewer-previous"
            >
              <ChevronLeftRoundedIcon />
            </IconButton>
            <IconButton
              onClick={showNextImage}
              aria-label={t('actions.nextImage')}
              className="project-viewer-carousel-control project-viewer-next"
            >
              <ChevronRightRoundedIcon />
            </IconButton>
          </>
        )}
        <Box className="project-image-viewer-scroll" onWheel={handleImageWheel}>
          <Box
            component="img"
            src={currentImageSrc}
            alt={currentImageAlt}
            className="project-image-viewer"
            style={{ transform: `scale(${zoomScale})` }}
          />
        </Box>
        <Typography className="project-image-viewer-zoom" aria-live="polite">
          {Math.round(zoomScale * 100)}%
        </Typography>
      </Dialog>
    </>
  )
}

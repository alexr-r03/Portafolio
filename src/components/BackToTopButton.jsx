import { useEffect, useState } from 'react'
import { IconButton, Tooltip } from '@mui/material'
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded'

export default function BackToTopButton({ t }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const updateVisibility = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight
      setIsVisible(scrollableHeight > 0 && window.scrollY / scrollableHeight > 0.2)
    }

    updateVisibility()
    window.addEventListener('scroll', updateVisibility, { passive: true })
    window.addEventListener('resize', updateVisibility)
    return () => {
      window.removeEventListener('scroll', updateVisibility)
      window.removeEventListener('resize', updateVisibility)
    }
  }, [])

  return (
    <Tooltip
      title={t('footer.backToTop')}
      disableHoverListener={!isVisible}
      disableFocusListener={!isVisible}
      disableTouchListener={!isVisible}
    >
      <IconButton
        component="a"
        href="#inicio"
        aria-label={t('footer.backToTop')}
        aria-hidden={!isVisible}
        tabIndex={isVisible ? 0 : -1}
        className={`back-to-top${isVisible ? ' is-visible' : ''}`}
      >
        <ArrowUpwardRoundedIcon />
      </IconButton>
    </Tooltip>
  )
}

import { css } from '@emotion/react'

export const globalStyles = css` 
:root {
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-optical-sizing: auto;
  font-weight: 400;
  color: var(--color-portfolio-text);
  background: var(--color-neural-base);
  scroll-behavior: smooth;
}

* { box-sizing: border-box; }

html {
  min-width: 320px;
  scroll-padding-top: 82px;
}

body {
  min-width: 320px;
  min-height: 100vh;
  margin: 0;
}

button, a { -webkit-tap-highlight-color: #00000000; }

::selection {
  color: var(--color-dark-ink);
  background: var(--color-accent);
}

.app-shell {
  min-height: 100vh;
  position: relative;
  isolation: isolate;
  color: var(--portfolio-text);
}

.site-header.MuiAppBar-root {
  z-index: 5;
  background: var(--portfolio-surface);
  color: var(--portfolio-text);
  border-bottom: 1px solid var(--portfolio-line);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
}

.header-inner.MuiToolbar-root {
  width: min(100% - 40px, 1080px);
  min-height: 68px;
  margin: 0 auto;
  padding: 0;
  display: flex;
  justify-content: space-between;
  gap: 18px;
}

.wordmark.MuiLink-root {
  color: var(--portfolio-text);
  font-size: .95rem;
  font-weight: 700;
  letter-spacing: -.035em;
  white-space: nowrap;
}

.desktop-nav {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.nav-link.MuiLink-root {
  color: var(--portfolio-muted);
  font-size: .79rem;
  transition: color .2s ease;
}

.nav-link.MuiLink-root:hover,
.social-links a:hover,
.project-link:hover,
.contact-link:hover {
  color: var(--color-accent);
}

.header-tools {
  margin-left: auto;
}

.header-icon.MuiIconButton-root {
  color: var(--portfolio-muted);
  display: flex;
  gap: 4px;
}

.language-label.MuiTypography-root {
  font-size: .68rem;
  font-weight: 700;
}

.top-contacts {
  align-items: center;
}

.contact-link.MuiLink-root {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  color: var(--portfolio-muted);
  transition: color .2s ease;
}

.top-contacts .contact-link svg {
  font-size: 18px;
}

.header-resume.MuiButton-root {
  min-width: 0;
  padding: 7px 10px;
  border-color: var(--portfolio-line);
  color: var(--portfolio-text);
  font-size: .72rem;
  white-space: nowrap;
  text-transform: none;
}

.header-resume .MuiButton-startIcon {
  margin-right: 5px;
}

.page-content.MuiContainer-root {
  position: relative;
  z-index: 1;
  padding: 0 28px;
}

.text-panel {
  border: 1px solid var(--portfolio-line);
  border-radius: 16px;
  background: var(--portfolio-panel);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.hero-section {
  display: flex;
  min-height: 390px;
  align-items: center;
  justify-content: space-between;
  gap: 44px;
  margin: 44px 0 18px;
  padding: 46px 48px;
}

.hero-copy {
  flex: 1 1 auto;
  max-width: 620px;
}

.hero-aside {
  display: flex;
  flex: 0 0 270px;
  flex-direction: column;
  align-items: center;
  gap: 22px;
  min-width: 0;
  border-left: 1px solid var(--portfolio-line);
  padding-left: 30px;
}

.eyebrow.MuiTypography-root {
  color: var(--color-accent);
  font-size: .78rem;
  font-weight: 650;
  letter-spacing: .08em;
  text-transform: uppercase;
}

.hero-title.MuiTypography-root {
  margin: 13px 0 10px;
  color: var(--portfolio-text);
  font-size: clamp(2.8rem, 7vw, 5rem);
  font-weight: 720;
  letter-spacing: -.065em;
  line-height: 1.04;
}

.hero-intro.MuiTypography-root {
  max-width: 510px;
  color: var(--portfolio-muted);
  font-size: 1.06rem;
  line-height: 1.7;
}

.hero-actions {
  margin-top: 24px;
}

.hero-actions .MuiButton-root,
.contact-button.MuiButton-root {
  min-height: 42px;
  border-radius: 9px;
  padding: 8px 15px;
  font-size: .82rem;
  font-weight: 650;
  text-transform: none;
}

.hero-actions .MuiButton-contained,
.contact-button.MuiButton-contained {
  background: var(--color-accent-button);
  color: var(--color-dark-ink);
  box-shadow: none;
}

.hero-actions .MuiButton-contained:hover,
.contact-button.MuiButton-contained:hover {
  background: var(--color-accent-button-hover);
  box-shadow: none;
}

.hero-actions .MuiButton-outlined {
  border-color: var(--portfolio-line);
  color: var(--portfolio-text);
}

.social-links {
  margin-top: 23px;
  align-items: center;
}

.social-links a {
  display: inline-flex;
  color: var(--portfolio-muted);
  transition: color .2s ease;
}

.social-links a svg {
  font-size: 19px;
}

.location.MuiTypography-root {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: var(--portfolio-muted);
  font-size: .8rem;
}

.profile-avatar.MuiAvatar-root {
  width: 148px;
  height: 148px;
  flex: 0 0 148px;
  border: 1px solid var(--color-avatar-border);
  background: var(--color-avatar-bg);
  color: var(--color-light-text);
  font-size: 2.8rem;
}

.content-section {
  margin: 18px 0;
  padding: 34px 42px;
}

.compact-section {
  padding-top: 31px;
  padding-bottom: 31px;
}

.section-title.MuiTypography-root {
  margin: 0 0 15px;
  color: var(--portfolio-text);
  font-size: 1.3rem;
  font-weight: 650;
  letter-spacing: -.035em;
}

.section-copy.MuiTypography-root {
  max-width: 680px;
  color: var(--portfolio-muted);
  font-size: .92rem;
  line-height: 1.8;
}

.info-row {
  display: grid;
  grid-template-columns: 11px 1fr;
  gap: 13px;
  padding: 4px 0 0;
}

.info-dot {
  width: 8px;
  height: 8px;
  margin-top: 8px;
  border-radius: 50%;
  background: var(--color-accent);
  box-shadow: 0 0 14px var(--color-dot-glow);
}

.info-title.MuiTypography-root {
  color: var(--portfolio-text);
  font-size: .95rem;
  font-weight: 620;
}

.info-subtitle.MuiTypography-root {
  margin-top: 3px;
  color: var(--color-accent);
  font-size: .78rem;
}

.info-description.MuiTypography-root {
  margin-top: 9px;
  color: var(--portfolio-muted);
  font-size: .87rem;
  line-height: 1.65;
}

.resume-bullet-group {
  margin-top: 18px;
}

.resume-group-title.MuiTypography-root {
  color: var(--portfolio-text);
  font-size: .86rem;
  font-weight: 650;
}

.resume-bullets {
  display: grid;
  gap: 8px;
  margin: 8px 0 0;
  padding-left: 19px;
  color: var(--portfolio-muted);
}

.resume-bullets li {
  padding-left: 3px;
  font-size: .84rem;
  line-height: 1.65;
}

.stack-list {
  margin-top: 17px;
}

.skill-groups {
  margin-top: 21px;
}

.skill-category.MuiTypography-root {
  margin-bottom: 8px;
  color: var(--portfolio-text);
  font-size: .84rem;
  font-weight: 620;
}

.skill-chip.MuiChip-root {
  height: 25px;
  border: 1px solid var(--portfolio-line);
  background: var(--portfolio-card);
  color: var(--portfolio-muted);
}

.skill-chip .MuiChip-label {
  font-size: .71rem;
}

.certification-list {
  display: grid;
  gap: 16px;
  margin: 0;
  padding-left: 19px;
  color: var(--color-accent);
}

.certification-item {
  padding-left: 3px;
}

.certification-name.MuiTypography-root {
  color: var(--portfolio-text);
  font-size: .9rem;
  font-weight: 600;
  line-height: 1.5;
}

.certification-meta.MuiTypography-root {
  margin-top: 3px;
  color: var(--portfolio-muted);
  font-size: .78rem;
  line-height: 1.55;
}

.stack-icon {
  display: inline-flex;
  width: 42px;
  height: 42px;
  align-items: center;
  justify-content: center;
  color: var(--portfolio-muted);
  transition: color .18s ease;
  cursor: default;
}

.stack-icon svg {
  width: 27px;
  height: 27px;
}

.stack-icon:hover {
  color: var(--color-accent);
}

.projects-section {
  border: 0;
  background: #00000000;
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
  padding-inline: 0;
}

.projects-hint.MuiTypography-root {
  margin-top: -8px;
  margin-bottom: 20px;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.project-card {
  overflow: hidden;
  border: 1px solid var(--portfolio-line);
  border-radius: 13px;
  background: var(--portfolio-card);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  transition: border-color .2s ease;
}

.project-card:hover {
  border-color: var(--color-accent-border);
}

.project-image-wrap {
  overflow: hidden;
  aspect-ratio: 16 / 9;
  background: var(--color-project-placeholder);
}

.project-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.project-details {
  display: grid;
  gap: 11px;
  padding: 15px 15px 18px;
}

.project-title.MuiTypography-root {
  color: var(--portfolio-text);
  font-size: .96rem;
  font-weight: 630;
}

.project-link.MuiLink-root {
  display: inline-flex;
  color: var(--portfolio-muted);
  transition: color .2s ease;
}

.project-description.MuiTypography-root {
  min-height: 68px;
  color: var(--portfolio-muted);
  font-size: .8rem;
  line-height: 1.65;
}

.tech-chip.MuiChip-root {
  height: 23px;
  border: 1px solid var(--portfolio-line);
  background: var(--portfolio-card);
  color: var(--portfolio-muted);
}

.tech-chip .MuiChip-label {
  font-size: .68rem;
}

.contact-section {
  margin: 18px 0;
  padding: 34px 42px 38px;
}

.contact-section .section-copy {
  margin-bottom: 19px;
}

.contact-links {
  align-items: center;
  flex-wrap: wrap;
  margin-top: 17px;
}

.contact-links .contact-link {
  font-size: .85rem;
}

.contact-links .contact-link svg {
  font-size: 19px;
}

.presentation-contacts {
  width: 100%;
  margin-top: 0;
}

.presentation-contacts .contact-link {
  width: 100%;
  align-items: flex-start;
  gap: 12px;
  color: var(--portfolio-muted);
}

.presentation-contacts .contact-link:hover {
  color: var(--color-accent);
}

.presentation-contacts .contact-link > svg {
  flex: 0 0 19px;
  margin-top: 3px;
  font-size: 19px;
}

.presentation-contact-copy {
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 2px;
}

.presentation-contact-label.MuiTypography-root {
  color: var(--portfolio-muted);
  font-size: .72rem;
  font-weight: 600;
  letter-spacing: .025em;
}

.presentation-contact-value.MuiTypography-root {
  overflow-wrap: anywhere;
  color: var(--portfolio-text);
  font-size: .78rem;
  line-height: 1.5;
}

.resume-button.MuiButton-root {
  margin-top: 17px;
  color: var(--portfolio-muted);
  font-size: .82rem;
  text-transform: none;
}

.resume-button .MuiButton-endIcon {
  margin-left: 6px;
}

.site-footer {
  display: flex;
  justify-content: space-between;
  gap: 15px;
  margin: 0 0 20px;
  padding: 17px 4px 21px;
  color: var(--portfolio-muted);
}

.site-footer .MuiTypography-root {
  font-size: .73rem;
}

@media (max-width: 1050px) {
  .desktop-nav {
    display: none;
  }
}

@media (max-width: 700px) {
  .header-inner.MuiToolbar-root {
    width: calc(100% - 24px);
    min-height: 60px;
    gap: 8px;
  }

  .top-contacts {
    gap: 11px !important;
  }

  .top-contacts .contact-link svg {
    font-size: 16px;
  }

  .header-resume.MuiButton-root {
    padding: 6px;
    font-size: 0;
  }

  .header-resume .MuiButton-startIcon {
    margin: 0;
  }

  .header-tools {
    gap: 0 !important;
  }

  .header-icon.MuiIconButton-root {
    padding: 7px;
  }

  .page-content.MuiContainer-root {
    padding: 0 18px;
  }

  .hero-section {
    min-height: 0;
    margin-top: 22px;
    padding: 34px 28px;
    align-items: flex-start;
    gap: 20px;
    flex-direction: column-reverse;
  }

  .hero-aside {
    width: 100%;
    flex: 0 0 auto;
    align-items: flex-start;
    border-top: 1px solid var(--portfolio-line);
    border-left: 0;
    padding: 20px 0 0;
  }

  .profile-avatar.MuiAvatar-root {
    width: 78px;
    height: 78px;
    flex-basis: 78px;
    font-size: 1.8rem;
  }

  .hero-title.MuiTypography-root {
    font-size: clamp(2.3rem, 11vw, 3.5rem);
    overflow-wrap: anywhere;
  }

  .hero-intro.MuiTypography-root {
    font-size: .94rem;
  }

  .hero-actions {
    flex-wrap: wrap;
  }

  .content-section,
  .contact-section {
    padding: 29px 28px;
  }

  .projects-section {
    padding-inline: 0;
  }

  .projects-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 500px) {
  .wordmark.MuiLink-root {
    max-width: 68px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .language-label.MuiTypography-root {
    display: none;
  }

  .profile-avatar.MuiAvatar-root {
    width: 68px;
    height: 68px;
    flex-basis: 68px;
  }

  .hero-title.MuiTypography-root {
    font-size: 2.55rem;
  }

  .hero-actions .MuiButton-root {
    padding-inline: 11px;
    font-size: .74rem;
  }

  .projects-grid {
    grid-template-columns: 1fr;
  }

  .site-footer {
    flex-direction: column;
  }
}

`

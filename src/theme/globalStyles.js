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

* {
  scrollbar-width: thin;
  scrollbar-color: var(--color-scrollbar-thumb) var(--color-scrollbar-track);
}

*::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

*::-webkit-scrollbar-track {
  background: var(--color-scrollbar-track);
}

*::-webkit-scrollbar-thumb {
  border: 2px solid var(--color-scrollbar-track);
  border-radius: 999px;
  background: var(--color-scrollbar-thumb);
}

*::-webkit-scrollbar-thumb:hover {
  background: var(--color-scrollbar-thumb-hover);
}

html {
  min-width: 0;
  overflow-x: clip;
  scroll-padding-top: 82px;
  scrollbar-gutter: stable;
}

body {
  min-width: 0;
  min-height: 100vh;
  margin: 0;
  overflow-x: clip;
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
  position: sticky;
  z-index: 5;
  background: transparent;
  color: var(--portfolio-text);
  border-bottom: 1px solid var(--portfolio-line);
}

.site-header.MuiAppBar-root::before {
  position: absolute;
  z-index: -1;
  inset: 0;
  background: var(--portfolio-surface);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  content: '';
  pointer-events: none;
}

.site-header.MuiAppBar-root::after {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 100%;
  width: var(--scrollbar-compensation, 0px);
  border-bottom: 1px solid var(--portfolio-line);
  background: var(--portfolio-surface);
  content: '';
  pointer-events: none;
}

.header-inner.MuiToolbar-root {
  width: min(100% - 40px, 1080px);
  min-height: 68px;
  margin: 0 auto;
  padding: 0;
  display: flex;
  justify-content: space-between;
  gap: 24px;
}

.wordmark.MuiLink-root {
  color: var(--portfolio-text);
  font-size: .95rem;
  font-weight: 700;
  letter-spacing: -.035em;
  white-space: nowrap;
}

.desktop-nav {
  flex: 1;
  justify-content: center;
  min-width: 0;
}

.mobile-menu-trigger.MuiIconButton-root {
  display: none;
  flex: 0 0 40px;
  width: 40px;
  height: 40px;
  color: var(--portfolio-muted);
}

.mobile-navigation-panel {
  display: none;
  position: absolute;
  z-index: 6;
  top: 100%;
  left: 0;
  width: 100%;
  max-width: 100%;
  max-height: calc(100vh - 60px);
  overflow-y: auto;
  overscroll-behavior: contain;
  border-bottom: 1px solid var(--portfolio-line);
  background: var(--portfolio-surface);
  color: var(--portfolio-text);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  clip-path: inset(0 0 100% 0);
  transform: translateY(-8px);
  transition: opacity .3s ease, transform .3s ease, clip-path .3s ease, visibility 0s linear .3s;
}

.mobile-navigation-panel.is-open {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  clip-path: inset(0 0 0 0);
  transform: translateY(0);
  transition: opacity .3s ease, transform .3s ease, clip-path .3s ease, visibility 0s;
}

.mobile-navigation-content {
  width: min(100%, 1080px);
  margin: 0 auto;
  padding: 8px 20px 14px;
}

.mobile-navigation-link {
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 44px;
  gap: 10px;
  padding: 10px 4px;
  color: var(--portfolio-text);
  font-size: .86rem;
  opacity: 0;
  transform: translateX(-12px);
  transition: opacity .1s ease, transform .1s ease;
}

.mobile-navigation-link:hover {
  color: var(--color-accent);
}

.mobile-navigation-content .MuiDivider-root {
  border-color: var(--portfolio-line);
  margin: 0 4px;
}

.mobile-menu-contacts {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  min-height: 56px;
  padding: 10px 4px;
  opacity: 0;
  transform: translateX(-12px);
  transition: opacity .1s ease, transform .1s ease;
}

.mobile-menu-contacts .top-contacts {
  width: 100%;
  justify-content: flex-start;
  gap: 22px;
}

.mobile-menu-contacts .contact-link.MuiLink-root {
  color: var(--color-accent);
}

.mobile-menu-controls {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  padding: 6px 4px;
  opacity: 0;
  transform: translateX(-12px);
  transition: opacity .1s ease, transform .1s ease;
}

.mobile-menu-controls .header-icon.MuiIconButton-root {
  width: auto;
  min-width: 32px;
  height: 32px;
  padding: 0;
  justify-content: flex-start;
}

.mobile-menu-controls .MuiSvgIcon-root,
.mobile-menu-contacts .top-contacts .contact-link svg {
  font-size: 16px;
}

.mobile-navigation-panel.is-open .mobile-navigation-link,
.mobile-navigation-panel.is-open .mobile-menu-contacts,
.mobile-navigation-panel.is-open .mobile-menu-controls {
  opacity: 1;
  transform: translateX(0);
}

.mobile-navigation-panel.is-open .mobile-navigation-link:nth-of-type(1) { transition-delay: 0s; }
.mobile-navigation-panel.is-open .mobile-navigation-link:nth-of-type(2) { transition-delay: .1s; }
.mobile-navigation-panel.is-open .mobile-navigation-link:nth-of-type(3) { transition-delay: .2s; }
.mobile-navigation-panel.is-open .mobile-navigation-link:nth-of-type(4) { transition-delay: .3s; }
.mobile-navigation-panel.is-open .mobile-menu-contacts { transition-delay: .4s; }
.mobile-navigation-panel.is-open .mobile-resume-link { transition-delay: .5s; }
.mobile-navigation-panel.is-open .mobile-menu-controls { transition-delay: .6s; }

@media (prefers-reduced-motion: reduce) {
  .mobile-navigation-panel,
  .mobile-navigation-panel.is-open,
  .mobile-navigation-link,
  .mobile-menu-contacts,
  .mobile-menu-controls {
    transition-duration: .01ms;
    transition-delay: 0s !important;
  }
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
  margin-left: 0;
  flex-shrink: 0;
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
  width: 100%;
  max-width: 100%;
  flex-wrap: wrap !important;
  column-gap: 24px !important;
  row-gap: 18px !important;
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
  cursor: default;
}

.stack-icon img {
  display: block;
  width: 50px;
  height: auto;
  object-fit: contain;
  filter: grayscale(1);
}

.stack-icon:hover img {
  filter: grayscale(0);
}

.app-shell.dark [data-stack="express"] img {
  filter: invert(1) grayscale(1);
}

.app-shell.dark [data-stack="express"]:hover img {
  filter: invert(1) grayscale(0);
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
  width: 100%;
  overflow: hidden;
  border: 1px solid var(--portfolio-line);
  border-radius: 13px;
  background: var(--portfolio-card);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  color: var(--portfolio-text);
  text-align: left;
  cursor: pointer;
  transition: border-color .2s ease;
}

.project-card:hover {
  border-color: var(--color-accent-border);
}

.project-card:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 3px;
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

.project-card-open-icon {
  display: inline-flex;
  color: var(--portfolio-muted);
  flex-shrink: 0;
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

.project-dialog-paper.MuiDialog-paper {
  display: flex;
  max-height: min(90vh, 900px);
  overflow: hidden;
  border: 1px solid var(--portfolio-line);
  background: var(--portfolio-panel);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  color: var(--portfolio-text);
}

.project-dialog-title.MuiDialogTitle-root {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 22px 12px;
  color: var(--portfolio-text);
  font-size: 1.15rem;
  font-weight: 650;
}

.project-dialog-close.MuiIconButton-root {
  flex-shrink: 0;
  margin-left: auto;
  color: var(--portfolio-muted);
}

.project-dialog-content.MuiDialogContent-root {
  min-height: 0;
  flex: 1 1 auto;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 22px 24px;
}

.project-dialog-description.MuiTypography-root {
  color: var(--portfolio-muted);
  font-size: .93rem;
  line-height: 1.7;
}

.project-description-panel {
  padding: 16px 18px;
  border: 1px solid var(--portfolio-line);
  border-radius: 12px;
  background: var(--portfolio-panel);
}

.project-dialog-technologies {
  margin-top: 18px;
}

.project-gallery {
  margin-top: 22px;
  border: 1px solid var(--portfolio-line);
  border-radius: 12px;
  background: var(--portfolio-panel);
  overflow: hidden;
}

.project-gallery-title.MuiTypography-root {
  padding: 14px 16px 10px;
  color: var(--portfolio-text);
  font-size: .88rem;
  font-weight: 620;
}

.project-carousel-frame {
  position: relative;
  margin: 0 14px 14px;
  overflow: hidden;
  aspect-ratio: 16 / 9;
  border: 1px solid var(--portfolio-line);
  border-radius: 10px;
  background: var(--color-project-placeholder);
}

.project-carousel-image-button {
  display: block;
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: zoom-in;
}

.project-carousel-image-button > img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.project-image-expand-hint {
  position: absolute;
  top: 10px;
  right: 10px;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 7px 10px;
  border: 1px solid var(--portfolio-line);
  border-radius: 8px;
  background: var(--portfolio-panel);
  color: var(--portfolio-text);
  opacity: 0;
  transition: opacity .18s ease;
}

.project-image-expand-hint .MuiTypography-root {
  font-size: .7rem;
  font-weight: 700;
  letter-spacing: .04em;
  text-transform: uppercase;
}

.project-carousel-frame:hover .project-image-expand-hint,
.project-carousel-frame:focus-within .project-image-expand-hint {
  opacity: 1;
}

.project-carousel-image-button:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 3px;
}

.project-carousel-control.MuiIconButton-root {
  position: absolute;
  top: 50%;
  z-index: 1;
  width: 40px;
  height: 40px;
  border: 1px solid var(--portfolio-line);
  background: var(--portfolio-panel);
  color: var(--portfolio-text);
  opacity: 0;
  pointer-events: none;
  transform: translateY(-50%);
  transition: opacity .18s ease;
}

.project-carousel-previous.MuiIconButton-root { left: 12px; }
.project-carousel-next.MuiIconButton-root { right: 12px; }

.project-carousel-frame:hover .project-carousel-control,
.project-carousel-frame:focus-within .project-carousel-control {
  opacity: 1;
  pointer-events: auto;
}

.project-carousel-counter.MuiTypography-root {
  position: absolute;
  right: 12px;
  bottom: 12px;
  padding: 4px 8px;
  border: 1px solid var(--portfolio-line);
  border-radius: 20px;
  background: var(--portfolio-panel);
  color: var(--portfolio-text);
  font-size: .72rem;
  opacity: 0;
  transition: opacity .18s ease;
}

.project-carousel-frame:hover .project-carousel-counter,
.project-carousel-frame:focus-within .project-carousel-counter {
  opacity: 1;
}

@media (hover: none) {
  .project-image-expand-hint,
  .project-carousel-control.MuiIconButton-root,
  .project-carousel-counter.MuiTypography-root {
    opacity: 1;
    pointer-events: auto;
  }
}

.project-dialog-actions.MuiDialogActions-root {
  flex-shrink: 0;
  flex-wrap: wrap;
  gap: 8px;
  padding: 14px 22px 18px;
  border-top: 1px solid var(--portfolio-line);
}

.project-dialog-actions .MuiButton-root {
  min-height: 40px;
  text-transform: none;
}

.project-live-button.MuiButton-root {
  background: var(--color-accent-button);
  color: var(--color-dark-ink);
}

.project-live-button.MuiButton-root:hover {
  background: var(--color-accent-button-hover);
}

.project-github-button.MuiButton-root {
  border-color: var(--portfolio-line);
  color: var(--portfolio-text);
}

.project-close-button.MuiButton-root {
  color: var(--portfolio-muted);
}

.project-image-viewer-paper.MuiDialog-paper {
  position: relative;
  width: 100%;
  height: 100%;
  max-width: none;
  max-height: none;
  overflow: hidden;
  border: 0;
  border-radius: 0;
  background: var(--portfolio-panel);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.project-image-viewer-scroll {
  position: absolute;
  z-index: 1;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  overscroll-behavior: contain;
  padding: 76px 88px 60px;
}

.project-image-viewer {
  display: block;
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  transform-origin: center center;
}

.project-image-viewer-close.MuiIconButton-root {
  position: fixed;
  z-index: 3;
  top: 18px;
  right: 20px;
  width: 44px;
  height: 44px;
  border: 1px solid var(--portfolio-line);
  background: var(--portfolio-panel);
  color: var(--portfolio-text);
}

.project-viewer-carousel-control.MuiIconButton-root {
  position: fixed;
  z-index: 2;
  top: 50%;
  width: 48px;
  height: 48px;
  border: 1px solid var(--portfolio-line);
  background: var(--portfolio-panel);
  color: var(--portfolio-text);
  transform: translateY(-50%);
}

.project-viewer-previous.MuiIconButton-root { left: 20px; }
.project-viewer-next.MuiIconButton-root { right: 20px; }

.project-image-viewer-zoom.MuiTypography-root {
  position: fixed;
  z-index: 3;
  right: 22px;
  bottom: 18px;
  padding: 5px 9px;
  border: 1px solid var(--portfolio-line);
  border-radius: 18px;
  background: var(--portfolio-panel);
  color: var(--portfolio-text);
  font-size: .75rem;
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

.back-to-top.MuiIconButton-root {
  position: fixed;
  z-index: 20;
  bottom: 24px;
  left: 24px;
  width: 38px;
  height: 38px;
  color: var(--portfolio-muted);
  border: 1px solid var(--portfolio-line);
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transform: translateY(5px);
  transition: opacity .5s ease, transform .5s ease, visibility .5s, color .18s ease, border-color .18s ease, background-color .18s ease;
}

.back-to-top.MuiIconButton-root.is-visible {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  transform: translateY(0);
}

.back-to-top.MuiIconButton-root:hover {
  color: var(--color-accent);
  border-color: var(--color-accent-border);
  background: var(--portfolio-panel);
}

@media (max-width: 700px) {
  .back-to-top.MuiIconButton-root {
    bottom: 16px;
    left: 16px;
  }
}

@media (max-width: 1050px) {
  .desktop-nav {
    display: none !important;
  }

  .header-tools {
    display: none !important;
  }

  .mobile-menu-trigger.MuiIconButton-root {
    display: inline-flex;
  }

  .mobile-navigation-panel {
    display: block;
  }
}

@media (max-width: 700px) {
  html,
  body,
  #root,
  .app-shell {
    max-width: 100%;
    overflow-x: clip;
  }

  .project-image-viewer-scroll {
    padding: 68px 50px 56px;
  }

  .project-image-viewer {
    max-width: calc(100vw - 100px);
    max-height: calc(100vh - 124px);
  }

  .project-image-viewer-close.MuiIconButton-root {
    top: 12px;
    right: 12px;
    width: 40px;
    height: 40px;
  }

  .project-viewer-carousel-control.MuiIconButton-root {
    width: 40px;
    height: 40px;
  }

  .project-viewer-previous.MuiIconButton-root { left: 5px; }
  .project-viewer-next.MuiIconButton-root { right: 5px; }

  .project-image-viewer-zoom.MuiTypography-root {
    right: 14px;
    bottom: 12px;
  }

  .project-dialog-title.MuiDialogTitle-root {
    padding-inline: 14px;
  }

  .project-dialog-content.MuiDialogContent-root {
    padding: 18px 14px;
  }

  .project-dialog-actions.MuiDialogActions-root {
    padding: 12px 14px 16px;
  }

  .project-dialog-actions .MuiButton-root {
    flex: 1 1 calc(50% - 8px);
  }

  .project-dialog-actions .project-live-button.MuiButton-root {
    flex-basis: 100%;
  }

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
    gap: 0;
    flex-direction: column;
  }

  .hero-copy,
  .hero-aside {
    display: contents;
  }

  .hero-section .eyebrow {
    order: 1;
    width: 100%;
  }

  .hero-section .hero-title {
    order: 2;
    width: 100%;
    margin: 10px 0 16px;
  }

  .hero-section .profile-avatar {
    order: 3;
    align-self: flex-start;
    margin-bottom: 16px;
  }

  .profile-avatar.MuiAvatar-root {
    width: 117px;
    height: 117px;
    flex-basis: 117px;
    font-size: 2.7rem;
  }

  .hero-title.MuiTypography-root {
    font-size: clamp(2.3rem, 11vw, 3.5rem);
    overflow-wrap: anywhere;
  }

  .hero-intro.MuiTypography-root {
    order: 4;
    width: 100%;
    margin-bottom: 14px;
    font-size: .94rem;
  }

  .hero-actions {
    order: 5;
    width: 100%;
    margin-top: 0;
    flex-wrap: wrap;
  }

  .hero-section .social-links {
    order: 6;
    width: 100%;
    margin-top: 16px;
  }

  .hero-section .presentation-contacts {
    order: 7;
    width: 100%;
    margin-top: 18px;
    padding-top: 18px;
    border-top: 1px solid var(--portfolio-line);
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
    max-width: calc(100vw - 88px);
  }

  .language-label.MuiTypography-root {
    display: none;
  }

  .profile-avatar.MuiAvatar-root {
    width: 102px;
    height: 102px;
    flex-basis: 102px;
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

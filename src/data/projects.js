// Configuración modular de proyectos, capturas e hipervínculos.
// Sus textos traducidos se gestionan en i18n/EN.json e i18n/ES.json.
// Mantén el mismo id del proyecto en ambos archivos de traducción.
export const projects = [
  {
    id: 'project-one',
    image: '/projects/preview-one.svg',
    images: ['/projects/preview-one.svg', '/projects/preview-one-responsive.svg'],
    liveUrl: 'https://google.com',
    githubUrl: 'https://github.com',
    technologies: ['React', 'MUI', 'Vite'],
  },
  {
    id: 'project-two',
    image: '/projects/preview-two.svg',
    images: ['/projects/preview-two.svg', '/projects/preview-two-detail.svg', '/projects/preview-two-table.svg'],
    liveUrl: 'https://google.com',
    githubUrl: 'https://github.com',
    technologies: ['JavaScript', 'Charts', 'CSS'],
  },
  {
    id: 'project-three',
    image: '/projects/preview-three.svg',
    images: ['/projects/preview-three.svg', '/projects/preview-three-calendar.svg', '/projects/preview-three-mobile.svg', '/projects/preview-three-form.svg'],
    liveUrl: 'https://google.com',
    githubUrl: 'https://github.com',
    technologies: ['React', 'Node.js', 'MongoDB'],
  },
]

import i18next from 'i18next'
import { initReactI18next, useTranslation } from 'react-i18next'
import EN from './EN.json'
import ES from './ES.json'

const supportedLanguages = ['es', 'en']
const savedLanguage = localStorage.getItem('portfolio-language')
const initialLanguage = supportedLanguages.includes(savedLanguage) ? savedLanguage : 'es'

i18next.use(initReactI18next).init({
  resources: {
    es: { translation: ES },
    en: { translation: EN },
  },
  lng: initialLanguage,
  fallbackLng: 'es',
  supportedLngs: supportedLanguages,
  interpolation: { escapeValue: false },
  returnObjects: true,
  initAsync: false,
  react: { useSuspense: false },
})

i18next.on('languageChanged', (language) => {
  if (supportedLanguages.includes(language)) {
    localStorage.setItem('portfolio-language', language)
  }
})

export const i18n = i18next

export function useI18n() {
  const { t, i18n: currentI18n } = useTranslation()

  return {
    language: currentI18n.resolvedLanguage || currentI18n.language,
    changeLanguage: (language) => currentI18n.changeLanguage(language),
    t,
  }
}

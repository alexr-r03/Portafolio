import { useSyncExternalStore } from 'react'
import EN from './EN.json'
import ES from './ES.json'

const resources = { en: EN, es: ES }
const validLanguages = Object.keys(resources)
let language = validLanguages.includes(localStorage.getItem('portfolio-language'))
  ? localStorage.getItem('portfolio-language')
  : 'es'
const listeners = new Set()

function subscribe(listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function getSnapshot() {
  return language
}

function translate(key) {
  return key.split('.').reduce((value, part) => value?.[part], resources[language]) ?? key
}

export const i18n = {
  get language() {
    return language
  },
  t: translate,
  changeLanguage(nextLanguage) {
    if (!validLanguages.includes(nextLanguage) || language === nextLanguage) return
    language = nextLanguage
    localStorage.setItem('portfolio-language', language)
    document.documentElement.lang = language
    listeners.forEach((listener) => listener())
  },
}

export function useI18n() {
  useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
  return i18n
}

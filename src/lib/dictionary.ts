import 'server-only'
import type { Locale } from '../i18n.config'

const dictionaries = {
    en: () => import('@/dictionaries/en.json').then(module => module.default),
    uz: () => import('@/dictionaries/uz.json').then(module => module.default)
}

export const getDictionary = async (locale: Locale) => dictionaries[locale]()
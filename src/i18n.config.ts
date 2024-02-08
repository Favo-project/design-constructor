export const i18n = {
    defaultLocale: 'uz',
    locales: ['uz', 'en', 'ru']
} as const

export type Locale = (typeof i18n)['locales'][number]
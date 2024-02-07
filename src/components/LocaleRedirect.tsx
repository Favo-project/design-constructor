'use client'

import { usePathname, useRouter } from "next/navigation"
import { useLayoutEffect } from "react"

import { i18n } from '@/i18n.config'

export default function LocaleRedirect() {
    const router = useRouter()
    const pathname = usePathname()

    useLayoutEffect(() => {
        try {
            const selectedLocale: any = localStorage.getItem('selectLocale')

            if (selectedLocale && i18n.locales.includes(selectedLocale)) {
                const segments = pathname.split("/");
                segments[1] = selectedLocale;
                router.push(segments.join("/"))
            }
        }
        catch (err) {
            console.log(err);
        }
    }, [])

    return null
}
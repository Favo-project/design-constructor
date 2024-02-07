'use client'
import NativeLink from "next/link";
import { useParams } from "next/navigation";

// this link is internationalized link, it has href with correct locale
export default function Link({ children, href, className = '', hrefLang = 'uz', style = {} }) {
    const { lang } = useParams()
    const linkHref = (href) => {
        if (lang) {
            return `/${lang}${href}`
        }
        else {
            return href
        }
    };

    return (
        <NativeLink href={linkHref(href)} style={style} hrefLang={hrefLang} className={className}>{children}</ NativeLink >
    )
}
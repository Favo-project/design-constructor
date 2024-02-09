'use client'
import NativeLink from "next/link";
import { useParams } from "next/navigation";

// this link is internationalized link, it has href with correct locale
export default function Link({ children, ...props }) {
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
        <NativeLink {...props} href={linkHref(props.href)}>{children}</NativeLink >
    )
}
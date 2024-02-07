import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";
import Start from "./page";

export default async function Layout({ params: { lang } }: { params: { lang: Locale }, children: React.ReactNode }) {
    const dict = await getDictionary(lang)

    return (
        <>
            <Start resources={dict} />
        </>
    )
}
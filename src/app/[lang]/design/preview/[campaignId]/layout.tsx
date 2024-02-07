import { Locale } from "@/i18n.config"
import { getDictionary } from "@/lib/dictionary"
import Preview from "./page";

export default async function Layout({ children, params: { lang } }: { params: { lang: Locale }, children: React.ReactNode }) {
    const dict = await getDictionary(lang)

    return (
        <div>
            <Preview resources={dict} />
        </div>
    )
}
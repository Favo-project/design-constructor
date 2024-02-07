import { Locale } from "@/i18n.config"
import { getDictionary } from "@/lib/dictionary"
import Profits from "./page";

export default async function Layout({ children, params: { lang } }: { params: { lang: Locale }, children: React.ReactNode }) {
    const dict = await getDictionary(lang)

    return (
        <div>
            <Profits resources={dict} />
        </div>
    )
}
import { Locale } from "@/i18n.config"
import { getDictionary } from "@/lib/dictionary"
import Template from "./Layout2"

export default async function Layout({
    children, params: { lang }
}: {
    children: React.ReactNode, params: { lang: Locale }
}) {
    const dict = await getDictionary(lang)

    return (
        <div id="dash-layout">
            <Template resources={dict}>
                {children}
            </Template>
        </div>
    )
}
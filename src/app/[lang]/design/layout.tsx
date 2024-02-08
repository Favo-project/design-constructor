import { Locale } from "@/i18n.config"
import { getDictionary } from "@/lib/dictionary"
import DesignLayout from "./RootLayout"

export default async function Layout({ children, params: { lang } }: { params: { lang: Locale }, children: React.ReactNode }) {
    const dict = await getDictionary(lang)

    return (
        <div>
            <DesignLayout resources={dict}>
                {children}
            </DesignLayout>
        </div>
    )
}
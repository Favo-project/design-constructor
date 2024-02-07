import { Locale } from "@/i18n.config";
import Shop from "./page";
import { getDictionary } from "@/lib/dictionary";

export default async function Layout({
    params: { lang }
}: {
    children: React.ReactNode;
    params: { lang: Locale }
}) {
    const dict = await getDictionary(lang)

    return <div>
        <Shop resources={dict} />
    </div>
}
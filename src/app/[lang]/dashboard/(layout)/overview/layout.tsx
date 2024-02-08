import { getDictionary } from "@/lib/dictionary";
import Overview from "./page";
import { Locale } from "@/i18n.config";

export default async function Layout({
    params: { lang }
}: {
    params: { lang: Locale }
}) {
    const dict = await getDictionary(lang)

    return <>
        <Overview resources={dict} />
    </>
} 
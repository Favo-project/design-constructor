import { getDictionary } from "@/lib/dictionary";
import { Locale } from "@/i18n.config";
import Payouts from "./page";

export default async function Layout({
    params: { lang }
}: {
    params: { lang: Locale }
}) {
    const dict = await getDictionary(lang)

    return <>
        <Payouts resources={dict} />
    </>
} 
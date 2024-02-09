import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";
import Start from "./Main";

export default async function Layout({ params }: { params: { lang: Locale } }) {
    const dict = await getDictionary(params.lang)

    return (
        <>
            <Start resources={dict} />
        </>
    )
}
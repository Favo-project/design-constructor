import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";
import Start from "./Main";

export default async function Layout({ params, children }: { params: { lang: Locale }, children: React.ReactNode }) {
    const dict = await getDictionary(params.lang)

    console.log(params);

    return (
        <>
            <Start resources={dict} />
        </>
    )
}
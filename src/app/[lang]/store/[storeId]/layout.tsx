import Store from "./page"
import StoreNavbar from "./components/StoreNavbar"
import Footer from "@/components/Footer"
import { getDictionary } from "@/lib/dictionary";
import { Locale } from "@/i18n.config";

export default async function Layout({
    params: { lang }
}: {
    children: React.ReactNode;
    params: { lang: Locale }
}) {
    const dict = await getDictionary(lang)

    return (
        <>
            <StoreNavbar resources={dict} />
            <Store resources={dict} />
            <Footer resources={dict} />
        </>
    )
}
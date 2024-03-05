import Store from "./page"
import Navbar from "./components/Navbar"
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
            <Store resources={dict} />
            <Footer resources={dict} />
        </>
    )
}
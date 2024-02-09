import Footer from "@/components/Footer";
import CampaignNavbar from "./components/CampaignNavbar";
import Badges from "./components/Badges";
import { getDictionary } from "@/lib/dictionary";
import { Locale } from "@/i18n.config";


export default async function Layout({ children, params: { lang } }: { children: React.ReactNode, params: { lang: Locale } }) {
    const dict = await getDictionary(lang)

    return (
        <>
            <CampaignNavbar resources={dict} />
            {children}
            <Badges resources={dict} />
            <Footer resources={dict} />
        </>
    )
}
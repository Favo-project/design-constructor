import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Hero from "./containers/Hero";
import Content from "./containers/Content";
import { getCampaigns } from "@/api/campaigns";
import { getDictionary } from "@/lib/dictionary";
import { Locale } from "@/i18n.config";

export default async function Shop({ params: { lang } }: { params: { lang: Locale } }) {
    const dict = await getDictionary(lang)
    const campaigns = await getCampaigns()

    return (
        <>
            <Navbar resources={dict} />
            <Hero resources={dict} />
            <Content campaigns={campaigns} resources={dict} />
            <Footer resources={dict} />
        </>
    )
}
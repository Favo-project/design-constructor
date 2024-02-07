import Footer from "@/components/Footer";
import axios from "axios";

import Campaign from './page'
import CampaignNavbar from "./components/CampaignNavbar";
import Badges from "./components/Badges";
import { getDictionary } from "@/lib/dictionary";


export default async function Layout({ params: { campaignId, lang } }) {
    const dict = await getDictionary(lang)

    const { data: response } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/campaigns/public/${campaignId}`, {
        headers: {
            'Content-Type': 'application/json'
        },
    })

    return (
        <>
            <CampaignNavbar resources={dict} />
            <Campaign resources={dict} campaign={response.data} />
            <Badges resources={dict} />
            <Footer resources={dict} />
        </>
    )
}
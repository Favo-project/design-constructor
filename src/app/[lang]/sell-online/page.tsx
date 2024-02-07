import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Hero from "./containers/Hero";
import Examples from "./containers/Examples";
import Guide from "./containers/Guide";
import CreateStore from "./containers/CreateStore";
import Catalog from "./containers/Catalog";
import UploadDesign from "./containers/UploadDesign";
import Prices from "./containers/Prices";
import Customize from "./containers/Customize";
import Promote from "./containers/Promote";
import PrintShip from "./containers/PrintShip";
import Start from "./containers/Start";
import { getDictionary } from "@/lib/dictionary";

export default async function SellOnline({ params: { lang } }) {
    const dict = await getDictionary(lang)

    return (
        <>
            <Navbar resources={dict} />
            <Hero resources={dict} />
            <Examples resources={dict} />
            <Guide resources={dict} />
            <CreateStore resources={dict} />
            <Catalog resources={dict} />
            <UploadDesign resources={dict} />
            <Prices resources={dict} />
            <Customize resources={dict} />
            <Promote resources={dict} />
            <PrintShip resources={dict} />
            <Start resources={dict} />
            <Footer resources={dict} />
        </>
    )
}
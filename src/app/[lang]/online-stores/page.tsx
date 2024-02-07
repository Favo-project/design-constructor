import Navbar from "@/components/Navbar";
import Hero from "./containers/Hero";
import Footer from "@/components/Footer";
import Customization from "./containers/Customization";
import Slider from "./containers/Slider";
import OpenStore from "./containers/OpenStore";
import { getDictionary } from "@/lib/dictionary";

export default async function SellOnline({ params: { lang } }) {
    const dict = await getDictionary(lang)

    return (
        <>
            <Navbar resources={dict} />
            <Hero resources={dict} />
            <Customization resources={dict} />
            <Slider resources={dict} />
            <OpenStore resources={dict} />
            <Footer resources={dict} />
        </>
    )
}
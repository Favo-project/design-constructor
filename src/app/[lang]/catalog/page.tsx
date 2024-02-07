import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Hero from "./containers/Hero";
import Banner from "./containers/Banner";
import Content from "./containers/Content";
import { getDictionary } from "@/lib/dictionary";

export default async function Catalog({ params: { lang } }) {
    const dict = await getDictionary(lang)

    return (
        <>
            <Navbar resources={dict} />
            <Hero resources={dict} />
            <Content resources={dict} />
            <Banner resources={dict} />
            <Footer resources={dict} />
        </>
    )
}
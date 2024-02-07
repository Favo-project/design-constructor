import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Hero from "./containers/Hero";
import Content from "./containers/Content";
import { getDictionary } from "@/lib/dictionary";

export default async function Tamplates({ params: { lang } }) {
    const dict = await getDictionary(lang)

    return (
        <>
            <Navbar resources={dict} />
            <Hero resources={dict} />
            <Content resources={dict} />
            <Footer resources={dict} />
        </>
    )
}
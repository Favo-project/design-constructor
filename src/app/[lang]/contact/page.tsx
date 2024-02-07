import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Hero from "./containers/Hero";
import Questions from "./containers/Questions";
import { getDictionary } from "@/lib/dictionary";

export default async function Contact({ params: { lang } }) {
    const dict = await getDictionary(lang)

    return (
        <>
            <Navbar resources={dict} />
            <Hero resources={dict} />
            <Questions resources={dict} />
            <Footer resources={dict} />
        </>
    )
}
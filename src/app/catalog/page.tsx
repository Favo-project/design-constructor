import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Hero from "./containers/Hero";
import Banner from "./containers/Banner";
import Content from "./containers/Content";

export default function Catalog() {
    return (
        <>
            <Navbar />
            <Hero />
            <Content />
            <Banner />
            <Footer />
        </>
    )
}
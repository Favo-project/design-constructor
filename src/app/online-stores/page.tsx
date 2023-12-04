import Navbar from "@/components/Navbar";
import Hero from "./containers/Hero";
import Footer from "@/components/Footer";
import Customization from "./containers/Customization";
import Slider from "./containers/Slider";
import OpenStore from "./containers/OpenStore";

export default function SellOnline() {
    return (
        < >
            <Navbar />
            <Hero />
            <Customization />
            <Slider />
            <OpenStore />
            <Footer />
        </>
    )
}
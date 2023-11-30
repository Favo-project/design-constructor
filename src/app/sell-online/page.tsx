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

export default function SellOnline() {
    return (
        <>
            <Navbar />
            <Hero />
            <Examples />
            <Guide />
            <CreateStore />
            <Catalog />
            <UploadDesign />
            <Prices />
            <Customize />
            <Promote />
            <PrintShip />
            <Start />
            <Footer />
        </>
    )
}
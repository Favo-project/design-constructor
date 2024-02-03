import Hero from "./Home/Hero";
import Footer from "@/components/Footer";
import Products from "./Home/Products";
import SellOnline from "./Home/SellOnline";
import OpenStore from "./Home/OpenStore";
import Support from "./Home/Support";
import Suggestions from "./Home/Suggestions";
import Start from "./Home/Start";
import Navbar from "@/components/Navbar";

export default function Home() {

  return (
    <>
      <Navbar />
      <Hero />
      <Products />
      <SellOnline />
      <OpenStore />
      <Support />
      <Suggestions />
      <Start />
      <Footer />
    </>
  );
}

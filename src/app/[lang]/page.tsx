import Hero from "./Home/Hero";
import Footer from "@/components/Footer";
import Products from "./Home/Products";
import SellOnline from "./Home/SellOnline";
import OpenStore from "./Home/OpenStore";
import Support from "./Home/Support";
import Suggestions from "./Home/Suggestions";
import Start from "./Home/Start";
import Navbar from "@/components/Navbar";
import { getDictionary } from "@/lib/dictionary";

export default async function Home({ params: { lang } }) {
  const dict = await getDictionary(lang)

  return (
    <>
      <Navbar resources={dict} />
      <Hero resources={dict} />
      <Products resources={dict} />
      <SellOnline resources={dict} />
      <OpenStore resources={dict} />
      <Support resources={dict} />
      <Suggestions resources={dict} />
      <Start resources={dict} />
      <Footer resources={dict} />
    </>
  );
}

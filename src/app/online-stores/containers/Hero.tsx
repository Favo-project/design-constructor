import Image from "next/image";
import Link from "next/link";
import { storeHero } from "../assets";
import StartBtn from "@/components/StartBtn";

export default function Hero() {
    return (
        <header className="relative overflow-hidden py-20 pt-40">
            <div className="container m-auto max-w-7xl">
                <div className="absolute bg-[#eaf2ed] top-0 right-0 left-0 bottom-[25%] after:block after:h-[18%] after:rounded-[50%] after:bg-[#eaf2ed] after:absolute after:-right-[24px] after:-left-[24px] after:-bottom-[75px]" />

                <div className="relative z-10 flex flex-col items-center m-auto px-4 mb-12">
                    <h1 className="max-w-sm mt-6 mb-8 text-center lg:text-5xl md:text-3xl text-2xl font-bold leading-snug font-sans text-dark tracking-wide">OPEN YOUR ONLINE STORE</h1>
                    <p className="text-gray-800 mb-6 font-medium text-2xl font-sans">Your custom designed shirts all in one place</p>
                    <StartBtn href="/dashboard/stores" context={'Create your store'} />
                </div>
                <div className="relative z-10 lg:max-w-4xl md:max-w-xl max-w-lg rounded-lg overflow-hidden shadow-lg m-auto w-full">
                    <Image className="w-full" src={storeHero} alt="store-hero-image" width={700} height={500} />
                </div>

            </div>
        </header>
    )
}
import Image from "next/image";
import Link from "next/link";
import { storeHero } from "../assets";

export default function Hero() {
    return (
        <header className="relative overflow-hidden py-20">
            <div className="container m-auto max-w-7xl">
                <div className="absolute bg-[#eaf2ed] top-0 right-0 left-0 bottom-[25%] after:block after:h-[18%] after:rounded-[50%] after:bg-[#eaf2ed] after:absolute after:-right-[24px] after:-left-[24px] after:-bottom-[75px]" />

                <div className="relative z-10 flex flex-col items-center m-auto px-4 mb-12">
                    <h1 className="max-w-sm mt-6 mb-8 text-center text-5xl font-bold leading-snug font-sans text-slate-700 tracking-wide">OPEN YOUR ONLINE STORE</h1>
                    <p className="text-slate-600 mb-6 font-medium text-2xl font-sans">Your custom designed shirts all in one place</p>
                    <Link className="rounded-md bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all" href={'/dashboard/stores'}>
                        Create your store
                    </Link>
                </div>
                <div className="relative z-10 max-w-4xl rounded-lg overflow-hidden shadow-lg m-auto w-full">
                    <Image className="w-full" src={storeHero} alt="store-hero-image" width={700} height={500} />
                </div>

            </div>
        </header>
    )
}
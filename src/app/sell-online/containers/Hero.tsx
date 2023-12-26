import Image from "next/image";
import { heroImg } from "../assets";
import Link from "next/link";
import StartBtn from "@/components/StartBtn";

export default function Hero() {
    return (
        <header className="bg-[#f5f8fc] py-12">
            <div className="container m-auto max-w-7xl">
                <div className="flex items-center px-4">
                    <div>
                        <h1 className="text-4xl mb-12 font-bold font-sans text-slate-700 tracking-wide max-w-[525px]">The easy way to design and sell t-shirts online</h1>

                        <div className="flex items-center">
                            <StartBtn />
                            <ul className="m-0 p-0 ml-6 flex items-center list-disc gap-6 marker:text-slate-700">
                                <li className="font-sans text-slate-700 list-none">100% free</li>
                                <li className="font-sans text-slate-700">Easy setup</li>
                                <li className="font-sans text-slate-700">Fast payouts</li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <Image src={heroImg} alt="hero-image" width={800} height={440} />
                    </div>
                </div>
            </div>
        </header>
    )
} 
import Image from "next/image";
import { heroImg } from "../assets";
import StartBtn from "@/components/StartBtn";

export default function Hero({ resources }) {
    return (
        <header className="bg-[#f5f8fc] py-12 pt-32">
            <div className="container m-auto max-w-7xl">
                <div className="flex lg:flex-nowrap flex-wrap items-center px-4">
                    <div>
                        <h1 className="md:text-4xl text-2xl mb-12 font-bold font-sans text-slate-700 tracking-wide max-w-[525px]">{resources.sellonline.hero.title}</h1>

                        <div className="flex items-center">
                            <StartBtn resources={resources} context={resources.sellonline.hero.startbtn} />
                            <ul className="m-0 p-0 ml-6 flex items-center list-disc gap-6 marker:text-slate-700">
                                <li className="font-sans text-slate-700 list-none">{resources.sellonline.hero.free}</li>
                                <li className="font-sans text-slate-700">{resources.sellonline.hero.setup}</li>
                                <li className="font-sans text-slate-700">{resources.sellonline.hero.payouts}</li>
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
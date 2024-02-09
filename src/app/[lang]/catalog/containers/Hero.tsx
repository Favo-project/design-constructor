import Image from "next/image";
import Link from "@/components/Link";
import { heroImg } from "../assets";

export default function Hero({ resources }) {
    return (
        <header className="py-12 pt-32">
            <div className="container m-auto max-w-7xl overflow-hidden">
                <div className="px-6 mb-8">
                    <ul className="flex items-center gap-2">
                        <li>
                            <Link className="text-sm text-slate-600 font-sans font-medium" href={'/'}>
                                {resources?.catalog.hero.link1}
                            </Link>
                        </li>
                        <li>
                            <span className="text-sm text-slate-600 font-sans font-medium">
                                /
                            </span>
                        </li>
                        <li>
                            <span className="text-sm text-slate-600 font-sans font-medium border-b-[1.5px] border-b-slate-600">
                                {resources?.catalog.hero.link2}
                            </span>
                        </li>
                    </ul>
                </div>
                <div className="grid lg:grid-cols-2 gap-8 items-center px-6">
                    <div className="m-auto">
                        <h1 className="lg:text-8xl text-6xl font-mono font-bold tracking-widest text-slate-600 mb-3 uppercase">{resources?.catalog.hero.title}</h1>
                        <p className="text-2xl text-slate-500 font-sans font-medium">{resources?.catalog.hero.paragraph}</p>
                    </div>
                    <div className="flex justify-center m-auto items-center">
                        <Image src={heroImg} alt="catalog-image" className="w-full" width={411} height={247} />
                    </div>
                </div>
            </div>
        </header>
    )
}
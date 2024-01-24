import Image from "next/image";
import { catalogImg, templateImg } from "./assets";
import { GoChevronRight } from "react-icons/go";
import Link from "next/link";

export default function Suggestions() {
    return (
        <div className="py-20">
            <div className="container m-auto max-w-7xl">
                <h2 className="text-center text-slate-700 font-semibold tracking-widest font-sans text-xl mb-16">MORE FROM ARTVIBE</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                    <div className="px-3">
                        <Link href={'/catalog'} className="relative flex items-center px-6 py-12 h-[250px] duration-200 hover:shadow-[inset_0_0_0_2px_#dfc7b2] transition-all rounded-xl bg-[#efe7e3]">
                            <div className="relative z-20">
                                <h3 className="flex mb-2 items-center text-2xl font-semibold font-sans tracking-wider text-slate-600">See our product catalog <span className="text-2xl flex items-center mt-1.5"><GoChevronRight /></span></h3>
                                <p className="font-semibold font-mono text-sm tracking-wider text-slate-600 uppercase">Custom apparel with higher standards</p>
                            </div>
                            <div className="absolute bottom-[2px] right-[2px]">
                                <Image src={catalogImg} className="rounded-xl" alt="catalog-image" width={235} height={235} />
                            </div>
                        </Link>
                    </div>
                    <div className="px-3">
                        <Link href={'/templates'} className="relative flex items-center px-6 py-12 h-[250px] duration-200 hover:shadow-[inset_0_0_0_2px_#bdc8d9] transition-all rounded-xl bg-[#f5f8fc]">
                            <div className="relative z-20">
                                <h3 className="flex mb-2 items-center text-2xl font-semibold font-sans tracking-wider text-slate-600">Start with a design template <span className="text-2xl flex items-center mt-1.5"><GoChevronRight /></span></h3>
                                <p className="font-semibold font-mono text-sm tracking-wider text-slate-600 uppercase">Explore our best design ideas</p>
                            </div>
                            <div className="absolute bottom-[2px] right-[2px]">
                                <Image src={templateImg} className="rounded-xl" alt="catalog-image" width={235} height={235} />
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
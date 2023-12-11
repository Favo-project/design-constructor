import Image from "next/image";
import { bannerImg } from "../assets";
import Link from "next/link";

export default function Banner() {
    return (
        <section className="py-20 bg-[#f5f0ea]">
            <div className="container m-auto max-w-7xl">
                <div className="grid grid-cols-[repeat(18,1fr)] items-center px-6">
                    <div className="col-start-2 col-span-12 row-start-1" >
                        <Image src={bannerImg} alt="banner-image" width={780} height={560} />
                    </div>
                    <div className="col-start-11 col-span-7 row-start-1 px-7 py-14 bg-white rounded-xl shadow-lg">
                        <h2 className="text-5xl text-slate-700 font-bold font-sans tracking-wide leading-tight mb-10">
                            Create something great today
                        </h2>
                        <Link className="rounded-md bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all" href={'/dashboard'}>
                            Start designing
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
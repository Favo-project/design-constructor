import Image from "next/image";
import { bannerImg } from "../assets";
import SolidBtn from "@/components/form-elements/SolidBtn";

export default function Banner({ resources }) {
    return (
        <section className="py-20 bg-[#f5f0ea]">
            <div className="container m-auto max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-[repeat(18,1fr)] gap-4 items-center px-6">
                    <div className="md:col-start-2 md:col-span-12 md:row-start-1" >
                        <Image src={bannerImg} alt="banner-image" width={780} height={560} />
                    </div>
                    <div className="md:col-start-11 md:col-span-7 md:row-start-1 px-7 py-14 bg-white rounded-xl shadow-lg">
                        <h2 className="lg:text-5xl text-3xl text-gray-700 font-bold font-sans tracking-wide leading-tight mb-10">
                            {resources?.catalog.banner.title}
                        </h2>
                        <SolidBtn href={'/dashboard/overview'}>
                            {resources?.catalog.banner.startbtn}
                        </SolidBtn>
                    </div>
                </div>
            </div>
        </section>
    )
}
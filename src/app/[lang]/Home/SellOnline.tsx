import SolidBtn from "@/components/form-elements/SolidBtn";
import Image from "next/image";

export default function SellOnline({ resources }) {
    return (
        <section className="overflow-hidden bg-[#f5f8fc]">
            <div className="container m-auto max-w-7xl">

                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 items-center">
                    <div className="p-4">
                        <h2 className="text-2xl text-gray-800 tracking-wide font-semibold mb-8">{resources.home.sellonline.title}</h2>
                        <p className="text-gray-700 tracking-wide font-sans mb-6">{resources.home.sellonline.paragraph1}.</p>
                        <p className="text-gray-700 tracking-wide font-sans mb-10">{resources.home.sellonline.paragraph2}.</p>
                        <SolidBtn href={'/sell-online'}>
                            {resources.home.sellonline.sellbtn}
                        </SolidBtn>
                    </div>
                    <div className="w-[1100px]">
                        <Image src={'https://www.bonfire.com/images/campaigns-callout.jpg'} className="w-full" width={1000} height={600} alt="sell-online" />
                    </div>
                </div>
            </div>
        </section>
    )
}
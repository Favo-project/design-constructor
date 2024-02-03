import Image from "next/image";
import { promote1, promote2 } from "../assets";

export default function Promote() {
    return (
        <section className="relative flex items-center justify-center bg-[#fef0f1] min-h-[600px] overflow-hidden">
            <div className="absolute -bottom-6 -left-[200px] lg:w-[700px] w-[400px]">
                <Image className="w-full" src={promote1} alt="promote-image" width={800} height={400} />
            </div>
            <div className="absolute -top-12 -right-28 lg:w-[400px] w-[200px]">
                <Image className="w-full" src={promote2} alt="promote-image" width={800} height={400} />
            </div>
            <div className="relative md:pl-44 pl-6 z-30 flex flex-col items-start">
                <h2 className="max-w-[370px] font-sans font-semibold text-2xl text-slate-700 mb-10">Promote and sell your shirts</h2>
                <p className="max-w-[340px] font-sans text-slate-600 tracking-wide mb-8">Spread the word to your audience via social media, your website or whatever other channels work best.</p>
                <p className="max-w-[340px] font-sans text-slate-600 tracking-wide mb-8">Watch sales stats in your seller dashboard while your community visits and buys from your mobile-friendly campaign page.</p>
            </div>
        </section>
    )
}
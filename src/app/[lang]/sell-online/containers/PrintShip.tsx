import Image from "next/image";
import { shipBox } from "../assets";

export default function PrintShip({ resources }) {
    return (
        <section className="pt-32 pb-8">
            <div className="container m-auto max-w-7xl">
                <div className="flex flex-col items-center">
                    <h3 className="font-sans text-lg text-slate-700 font-bold tracking-wider mb-8 uppercase">{resources.sellonline.print.title}</h3>
                    <p className="text-center max-w-[380px] font-sans font-medium text-slate-700">{resources.sellonline.print.paragraph}.</p>
                    <div className="w-[300px]">
                        <Image className="w-full" src={shipBox} alt="shipbox-image" width={600} height={600} />
                    </div>
                </div>
            </div>
        </section>
    )
}
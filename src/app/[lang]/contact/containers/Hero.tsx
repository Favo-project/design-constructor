import SolidBtn from "@/components/form-elements/SolidBtn";
import Image from "next/image";

export default function Hero({ resources }) {
    return (
        <header className="py-16 pt-36">
            <div className="container m-auto max-w-5xl">
                <div className="flex items-center justify-between px-10 py-16 rounded-2xl bg-[#f5f8fc]">
                    <div>
                        <h2 className="max-w-[420px] leading-normal text-3xl font-sans font-semibold text-dark mb-6">{resources?.contact.hero.title}</h2>
                        <p className="text-gray-700 font-sans font-medium mb-8">{resources?.contact.hero.text}.</p>
                        <SolidBtn href={'/help'}>{resources?.contact.hero.helpbtn}</SolidBtn>
                    </div>
                    <div>
                        <Image src={'https://www.bonfire.com/images/home/contact-hc-illo@2x.png'} alt="contact-image" width={220} height={220} />
                    </div>
                </div>
            </div>
        </header>
    )
}
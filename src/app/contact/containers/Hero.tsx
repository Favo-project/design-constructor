import Image from "next/image";
import Link from "next/link";

export default function Hero() {
    return (
        <header className="py-16">
            <div className="container m-auto max-w-5xl">
                <div className="flex items-center justify-between px-10 py-16 rounded-2xl bg-[#f5f8fc]">
                    <div>
                        <h2 className="max-w-[420px] leading-normal text-3xl font-sans font-semibold text-slate-700 mb-6">Get instant answers & advice in our Help Center</h2>
                        <p className="text-slate-600 font-sans font-medium mb-8">Have your questions answered without having to wait.</p>
                        <Link href={'/help'} className="rounded-md bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all">Explore help canter</Link>
                    </div>
                    <div>
                        <Image src={'https://www.bonfire.com/images/home/contact-hc-illo@2x.png'} alt="contact-image" width={220} height={220} />
                    </div>
                </div>
            </div>
        </header>
    )
}
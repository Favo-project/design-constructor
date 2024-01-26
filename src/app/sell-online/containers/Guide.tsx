import StartBtn from "@/components/StartBtn";
import Image from "next/image";

export default function Guide() {
    return (
        <main className="py-10 pb-16">
            <div className="container m-auto max-w-7xl">
                <h2 className="text-center mb-12 text-3xl font-semibold font-sans tracking-tight text-slate-700">How to sell shirts online with ArtVibe</h2>
                <div className="relative grid grid-cols-1 md:grid-cols-2 max-w-5xl m-auto after:block after:w-[2px] after:bg-[#f5f8fc] after:absolute after:left-[50%] after:translate-x-[-50%] after:top-24 after:bottom-24">
                    <div className="pr-7">
                        <div className="relative flex items-center gap-6 px-6 py-10 shadow-xl before:absolute before:w-3 before:h-3 before:rounded-full before:bg-[#bdc8d9] before:top-[50%] before:translate-y-[-50%] before:-right-[34px] before:z-20 after:absolute after:-right-3 after:border-t-[16px] after:border-t-transparent after:border-b-[16px] after:border-b-transparent after:border-l-[12px] after:border-l-[#fff]">
                            <div className="max-w-[96px] w-full h-[96px]">
                                <Image className="rounded-full w-full h-full" src={'https://c.bonfireassets.com/images/campaign-hiw.jpg'} alt="guide-image" width={96} height={96} />
                            </div>
                            <div>
                                <h3 className="font-semibold tracking-widest text-slate-600 max-w-[250px] mb-4">DESIGN OR UPLOAD ARTWORK</h3>
                                <p className="font-sans text-slate-600 font-medium">Upload custom artwork or create your design right on Bonfire.</p>
                            </div>
                        </div>
                    </div>
                    <div className="pl-7 mt-24">
                        <div className="relative flex items-center gap-6 px-6 py-10 shadow-lg before:absolute before:w-3 before:h-3 before:rounded-full before:bg-[#bdc8d9] before:top-[50%] before:translate-y-[-50%] before:-left-[34px] before:z-20 after:absolute after:-left-3 after:border-t-[16px] after:border-t-transparent after:border-b-[16px] after:border-b-transparent after:border-r-[12px] after:border-r-[#fff]">
                            <div className="max-w-[96px] w-full h-[96px]">
                                <Image className="rounded-full w-full h-full" src={'https://c.bonfireassets.com/images/homepage-sell-online.jpg'} alt="guide-image" width={96} height={96} />
                            </div>
                            <div>
                                <h3 className="font-semibold tracking-widest text-slate-600 max-w-[250px] mb-4">PROMOTE AND SELL</h3>
                                <p className="font-sans text-slate-600 font-medium">Spread the word on social media while we handle everything else.</p>
                            </div>
                        </div>
                    </div>
                    <div className="pr-7">
                        <div className="relative flex items-center gap-6 px-6 py-10 shadow-lg before:absolute before:w-3 before:h-3 before:rounded-full before:bg-[#bdc8d9] before:top-[50%] before:translate-y-[-50%] before:-right-[34px] before:z-20 after:absolute after:-right-3 after:border-t-[16px] after:border-t-transparent after:border-b-[16px] after:border-b-transparent after:border-l-[12px] after:border-l-[#fff]">
                            <div className="max-w-[96px] w-full h-[96px]">
                                <Image className="rounded-full w-full h-full" src={'https://c.bonfireassets.com/images/hompage-order-custom.jpg'} alt="guide-image" width={96} height={96} />
                            </div>
                            <div>
                                <h3 className="font-semibold tracking-widest text-slate-600 max-w-[250px] mb-4">SHIRTS ARE SHIPPED</h3>
                                <p className="font-sans text-slate-600 font-medium">Sit back as orders are printed and sent directly to your buyers.</p>
                            </div>
                        </div>
                    </div>
                    <div className="pl-7 mt-24">
                        <div className="relative flex items-center gap-6 px-6 py-10 shadow-lg before:absolute before:w-3 before:h-3 before:rounded-full before:bg-[#bdc8d9] before:top-[50%] before:translate-y-[-50%] before:-left-[34px] before:z-20 after:absolute after:-left-3 after:border-t-[16px] after:border-t-transparent after:border-b-[16px] after:border-b-transparent after:border-r-[12px] after:border-r-[#fff]">
                            <div className="max-w-[96px] w-full h-[96px]">
                                <Image className="rounded-full w-full h-full" src={'https://c.bonfireassets.com/images/trusted-1.jpg'} alt="guide-image" width={96} height={96} />
                            </div>
                            <div>
                                <h3 className="font-semibold tracking-widest text-slate-600 max-w-[250px] mb-4">GET PAID</h3>
                                <p className="font-sans text-slate-600 font-medium">Get a fast payout of 100% of the campaign profits.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-center mt-14">
                    <StartBtn />
                </div>
            </div>
        </main>
    )
}
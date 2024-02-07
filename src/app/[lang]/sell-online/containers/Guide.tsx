import StartBtn from "@/components/StartBtn";
import Image from "next/image";

export default function Guide({ resources }) {
    return (
        <main className="py-10 pb-16">
            <div className="container m-auto max-w-7xl">
                <h2 className="text-center mb-12 text-3xl font-semibold font-sans tracking-tight text-slate-700">{resources.sellonline.guide.title}</h2>
                <div className="relative grid grid-cols-1 md:grid-cols-2 max-w-5xl m-auto after:block after:w-[2px] after:bg-[#f5f8fc] after:absolute after:left-[50%] after:translate-x-[-50%] after:top-24 after:bottom-24">
                    <div className="pr-7">
                        <div className="relative flex items-center gap-6 px-6 py-10 shadow-xl before:absolute before:w-3 before:h-3 before:rounded-full before:bg-[#bdc8d9] before:top-[50%] before:translate-y-[-50%] before:-right-[34px] before:z-20 after:absolute after:-right-3 after:border-t-[16px] after:border-t-transparent after:border-b-[16px] after:border-b-transparent after:border-l-[12px] after:border-l-[#fff]">
                            <div className="max-w-[96px] w-full h-[96px]">
                                <Image className="rounded-full w-full h-full" src={'https://c.bonfireassets.com/images/campaign-hiw.jpg'} alt="guide-image" width={96} height={96} />
                            </div>
                            <div>
                                <h3 className="font-semibold tracking-widest text-slate-600 max-w-[250px] mb-4 uppercase">{resources.sellonline.guide.design}</h3>
                                <p className="font-sans text-slate-600 font-medium">{resources.sellonline.guide.upload}.</p>
                            </div>
                        </div>
                    </div>
                    <div className="pl-7 mt-24">
                        <div className="relative flex items-center gap-6 px-6 py-10 shadow-lg before:absolute before:w-3 before:h-3 before:rounded-full before:bg-[#bdc8d9] before:top-[50%] before:translate-y-[-50%] before:-left-[34px] before:z-20 after:absolute after:-left-3 after:border-t-[16px] after:border-t-transparent after:border-b-[16px] after:border-b-transparent after:border-r-[12px] after:border-r-[#fff]">
                            <div className="max-w-[96px] w-full h-[96px]">
                                <Image className="rounded-full w-full h-full" src={'https://c.bonfireassets.com/images/homepage-sell-online.jpg'} alt="guide-image" width={96} height={96} />
                            </div>
                            <div>
                                <h3 className="font-semibold tracking-widest text-slate-600 max-w-[250px] mb-4 uppercase">{resources.sellonline.guide.promote}</h3>
                                <p className="font-sans text-slate-600 font-medium">{resources.sellonline.guide.sell}.</p>
                            </div>
                        </div>
                    </div>
                    <div className="pr-7">
                        <div className="relative flex items-center gap-6 px-6 py-10 shadow-lg before:absolute before:w-3 before:h-3 before:rounded-full before:bg-[#bdc8d9] before:top-[50%] before:translate-y-[-50%] before:-right-[34px] before:z-20 after:absolute after:-right-3 after:border-t-[16px] after:border-t-transparent after:border-b-[16px] after:border-b-transparent after:border-l-[12px] after:border-l-[#fff]">
                            <div className="max-w-[96px] w-full h-[96px]">
                                <Image className="rounded-full w-full h-full" src={'https://c.bonfireassets.com/images/hompage-order-custom.jpg'} alt="guide-image" width={96} height={96} />
                            </div>
                            <div>
                                <h3 className="font-semibold tracking-widest text-slate-600 max-w-[250px] mb-4 uppercase">{resources.sellonline.guide.shirts}</h3>
                                <p className="font-sans text-slate-600 font-medium">{resources.sellonline.guide.shipped}.</p>
                            </div>
                        </div>
                    </div>
                    <div className="pl-7 mt-24">
                        <div className="relative flex items-center gap-6 px-6 py-10 shadow-lg before:absolute before:w-3 before:h-3 before:rounded-full before:bg-[#bdc8d9] before:top-[50%] before:translate-y-[-50%] before:-left-[34px] before:z-20 after:absolute after:-left-3 after:border-t-[16px] after:border-t-transparent after:border-b-[16px] after:border-b-transparent after:border-r-[12px] after:border-r-[#fff]">
                            <div className="max-w-[96px] w-full h-[96px]">
                                <Image className="rounded-full w-full h-full" src={'https://c.bonfireassets.com/images/trusted-1.jpg'} alt="guide-image" width={96} height={96} />
                            </div>
                            <div>
                                <h3 className="font-semibold tracking-widest text-slate-600 max-w-[250px] mb-4 uppercase">{resources.sellonline.guide.getpaid}</h3>
                                <p className="font-sans text-slate-600 font-medium">{resources.sellonline.guide.payouts}.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-center mt-14">
                    <StartBtn resources={resources} context={resources.sellonline.guide.startbtn} contextOut={resources.sellonline.guide.startbtn} />
                </div>
            </div>
        </main>
    )
}
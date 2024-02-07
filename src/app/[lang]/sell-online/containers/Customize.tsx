import Image from "next/image";

export default function Customize({ resources }) {
    return (
        <section className="py-20">
            <div className="container m-auto max-w-7xl">
                <div className="flex flex-col items-center">
                    <h2 className="text-center max-w-[420px] font-sans font-semibold text-2xl text-slate-700 mb-10">{resources.sellonline.customize.title}</h2>
                    <p className="text-center max-w-[420px] font-sans text-slate-600 tracking-wide mb-8">{resources.sellonline.customize.paragraph}.</p>
                    <div className="w-full p-6">
                        <Image className="w-full" src={'https://c.bonfireassets.com/images/step-preview.jpg'} alt="tool-image" width={1000} height={700} />
                    </div>
                </div>
            </div>
        </section>
    )
}
import Image from "next/image";

export default function Support({ resources }) {
    return (
        <section className="bg-dark bg-opacity-90 overflow-hidden">
            <div className="container m-auto max-w-7xl" >
                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 items-center">
                    <div className="p-4">
                        <h2 className="text-2xl text-white tracking-wide font-semibold mb-8">{resources.home.support.title}.</h2>
                        <p className="text-slate-300 tracking-wide font-sans mb-10">{resources.home.support.paragraph}.</p>
                    </div>
                    <div className="w-[650px] max-h-[330px] sm:w-[800px] sm:max-h-[400px] md:w-[600px] md:max-h-max lg:w-[800px]">
                        <Image src={'https://www.bonfire.com/images/support@2x.jpg'} alt="support-image" width={1200} height={600} />
                    </div>
                </div>
            </div>
        </section>
    )
}
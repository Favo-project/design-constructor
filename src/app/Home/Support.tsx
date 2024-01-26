import Image from "next/image";

export default function Support() {
    return (
        <section className="bg-dark bg-opacity-90 overflow-hidden">
            <div className="container m-auto max-w-7xl" >
                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 items-center">
                    <div className="p-4">
                        <h2 className="text-2xl text-white tracking-wide font-semibold mb-8">Responsive, and caring customer support.</h2>
                        <p className="text-slate-300 tracking-wide font-sans mb-10">From the moment you set out to create a custom shirt, our dedicated customer happiness and account management teams have your back every step of the way.</p>
                    </div>
                    <div className="w-[800px]">
                        <Image src={'https://www.bonfire.com/images/support@2x.jpg'} alt="support-image" width={1200} height={600} />
                    </div>
                </div>
            </div>
        </section>
    )
}
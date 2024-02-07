import Image from "next/image";

export default function UploadDesign({ resources }) {
    return (
        <section className="py-16">
            <div className="container m-auto max-w-7xl">
                <div className="flex flex-col items-center">
                    <h2 className="text-center max-w-[420px] font-sans font-semibold text-2xl text-gray-800 mb-10">{resources.sellonline.uploaddesign.title}</h2>
                    <p className="text-center max-w-[420px] font-sans text-gray-600 tracking-wide mb-8">{resources.sellonline.uploaddesign.paragraph}.</p>
                    <div className="w-full p-6">
                        <Image className="w-full" src={'https://c.bonfireassets.com/images/step-design-tool@2x.jpg'} alt="tool-image" width={1000} height={700} />
                    </div>
                </div>
            </div>
        </section>
    )
}
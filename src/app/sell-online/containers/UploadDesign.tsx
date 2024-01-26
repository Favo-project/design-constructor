import Image from "next/image";

export default function UploadDesign() {
    return (
        <section className="py-16">
            <div className="container m-auto max-w-7xl">
                <div className="flex flex-col items-center">
                    <h2 className="text-center max-w-[420px] font-sans font-semibold text-2xl text-gray-800 mb-10">Upload your own design or create your own right in our design tool</h2>
                    <p className="text-center max-w-[420px] font-sans text-gray-600 tracking-wide mb-8">Upload your own custom artwork or use our library of thousands of free fonts and graphics.</p>
                    <div className="w-full p-6">
                        <Image className="w-full" src={'https://c.bonfireassets.com/images/step-design-tool@2x.jpg'} alt="tool-image" width={1000} height={700} />
                    </div>
                </div>
            </div>
        </section>
    )
}
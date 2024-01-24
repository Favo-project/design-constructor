import Image from "next/image";

export default function Prices() {
    return (
        <section className="bg-[#f9f6f1]">
            <div className="container m-auto max-w-7xl overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center p-4">
                    <div className="px-4">
                        <h2 className="text-2xl text-slate-700 tracking-wide font-semibold mb-8">Set your selling prices</h2>
                        <p className="text-slate-700 tracking-wide font-sans mb-6">Set your own selling prices and determine your profit margins. As you sell more, your profit margins per shirt will increase.</p>
                        <p className="text-slate-700 tracking-wide font-sans">You can also change your campaign settings, such as setting your campaign duration and enabling fundraising.</p>
                    </div>
                    <div className="md:w-[600px] ml-24">
                        <Image src={'https://c.bonfireassets.com/images/step-pricing-phone@2x.jpg'} className="w-full" width={1000} height={600} alt="sell-online" />
                    </div>
                </div>
            </div>
        </section>
    )
}
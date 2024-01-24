import Image from "next/image";
import Link from "next/link";
import { IoStorefrontOutline } from "react-icons/io5";

export default function CreateStore() {
    return (
        <section className="overflow-hidden py-16">
            <div className="container m-auto max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                    <div className="px-4">
                        <h2 className="text-2xl text-slate-700 tracking-wide font-semibold mb-8">Create an online t-shirt store</h2>
                        <p className="text-slate-700 tracking-wide font-sans mb-10">Make it easy for users to browse all of the custom shirts and apparel you`ve designed by creating a free online store. It only takes a few minutes to create and you can customize them to match your brand.</p>
                        <Link href={'/online-stores'} className="inline-flex items-center px-4 py-2.5 rounded-lg border-2 border-slate-600 bg-white text-slate-600 font-sans font-semibold hover:bg-slate-600 hover:text-white transition">
                            <IoStorefrontOutline className="mr-4 text-2xl" /> Open your store
                        </Link>
                    </div>
                    <div className="w-[1100px]">
                        <Image src={'https://www.bonfire.com/images/stores/store-footer.png'} className="w-full" width={1000} height={600} alt="sell-online" />
                    </div>
                </div>
            </div>
        </section>
    )
}
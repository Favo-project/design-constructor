import Image from "next/image";
import Link from "next/link";
import { IoStorefrontOutline } from "react-icons/io5";

export default function OpenStore() {
    return (
        <section className="overflow-hidden py-16">
            <div className="container m-auto max-w-7xl">
                <div className="grid grid-cols-3 gap-6 items-center">
                    <div className="px-4">
                        <h2 className="text-2xl text-slate-700 tracking-wide font-semibold mb-8">Open your store today</h2>
                        <p className="text-slate-700 tracking-wide font-sans mb-6">Create an account on Bonfire and you’ll automatically be able to open your online store.</p>
                        <Link href={'/online-stores'} className="inline-flex items-center rounded-md bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all">
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
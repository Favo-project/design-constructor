import Image from "next/image";
import Link from "next/link";

export default function Catalog() {
    return (
        <section className="bg-[#f5f8fc] overflow-hidden py-16">
            <div className="container m-auto max-w-7xl">
                <div className="grid grid-cols-3 items-center">
                    <div className="px-4">
                        <h2 className="text-2xl text-slate-700 tracking-wide font-semibold mb-8">Choose the custom apparel you want to sell online</h2>
                        <p className="text-slate-700 tracking-wide font-sans mb-10">Browse our curated selection of premium t-shirts, hoodies, tank tops and more. Find a variety of styles, sizes, colors and fabric options like ringspun cotton, polyblends, heavyweights and more.</p>
                        <Link href={'/catalog'} className="inline-flex items-center px-4 py-2.5 rounded-lg border-2 border-slate-600 bg-white text-slate-600 font-sans font-semibold hover:bg-slate-600 hover:text-white transition">
                            See full catalog
                        </Link>
                    </div>
                    <div className="w-[600px] xl:w-[900px]">
                        <Image src={'https://www.bonfire.com/images/custom-shirts@2x.png'} className="w-full" width={1000} height={600} alt="sell-online" />
                    </div>
                </div>
            </div>
        </section>
    )
}
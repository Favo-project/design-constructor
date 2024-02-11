'use client'
import Image from "next/image"
import Link from "@/components/Link"
import { useState } from "react"

export default function Content({ resources }) {
    const [products] = useState([
        {
            name: 'Shirts',
            image: 'https://c.bonfireassets.com/static/product-type/bacf6cd6-b53d-469c-ab96-02afe5b15f71/catalog-image/a399e2cbe34c4c7e8c276eb1ada4fb2d/prem-unisex.jpg',
            href: 'shirts'
        },
        {
            name: 'Toddlers',
            image: 'https://c.bonfireassets.com/static/product-type/1007ee54-bd5e-4d8d-b698-25b790eb2925/catalog-image/583fce2eb61b417fa9d98a8da715dfe0/toddler.jpg',
            href: 'toddlers'
        },
        {
            name: 'Printed Hats',
            image: 'https://c.bonfireassets.com/static/product-type/3b41bb30-9fd8-4e6b-a3a9-0b8f8902be73/catalog-image/93c35943987449ec854f15df1184e48f/dad-hat.jpg',
            href: 'printed-hats'
        },
        {
            name: 'Mugs',
            image: 'https://c.bonfireassets.com/static/product-type/5761a9e5-ea59-4b8f-a6dc-198ecb105faa/catalog-image/8948a9e12c1e463d8f7c5c71fc8463d0/mug-catalog3.jpg',
            href: 'mugs'
        },
        {
            name: 'Tote bags',
            image: 'https://c.bonfireassets.com/static/product-type/6c8bdf76-412f-4607-b944-505de2f9099c/catalog-image/6fc403e4f8524c918d8c7b73a379d091/tote.jpg',
            href: 'tote-bags'
        },
    ])

    return (
        <main className="pb-16">
            <div className="container m-auto max-w-7xl">
                <div className="grid md:grid-cols-[1fr_3.5fr] gap-14 px-6">
                    <div>
                        <h3 className="text-lg font-bold font-sans text-slate-600 mb-3">{resources.catalog.content.filter}</h3>
                        <ul className="flex md:flex-col flex-wrap md:flex-nowrap gap-2 items-start">
                            <li>
                                <button className="font-sans font-medium text-slate-600 px-3 py-1.5 rounded-full border-2 border-slate-200 hover:border-slate-600 focus:bg-slate-600 focus:text-white focus:border-slate-600 transition-all">News</button>
                            </li>
                            <li>
                                <button className="font-sans font-medium text-slate-600 px-3 py-1.5 rounded-full border-2 border-slate-200 hover:border-slate-600 focus:bg-slate-600 focus:text-white focus:border-slate-600 transition-all">Autumn Collection</button>
                            </li>
                            <li>
                                <button className="font-sans font-medium text-slate-600 px-3 py-1.5 rounded-full border-2 border-slate-200 hover:border-slate-600 focus:bg-slate-600 focus:text-white focus:border-slate-600 transition-all">Earth Conscious</button>
                            </li>
                            <li>
                                <button className="font-sans font-medium text-slate-600 px-3 py-1.5 rounded-full border-2 border-slate-200 hover:border-slate-600 focus:bg-slate-600 focus:text-white focus:border-slate-600 transition-all">Drinkware</button>
                            </li>
                            <li>
                                <button className="font-sans font-medium text-slate-600 px-3 py-1.5 rounded-full border-2 border-slate-200 hover:border-slate-600 focus:bg-slate-600 focus:text-white focus:border-slate-600 transition-all">Kids</button>
                            </li>
                        </ul>
                    </div>
                    <div className="grid md:grid-cols-3 gap-5 [&_a:first]:flex">
                        {
                            products.map((product, index) => (
                                <Link href={product.href} key={index} className="flex gap-4 flex-col items-center just first-of-type:flex-row first-of-type:col-span-2 first-of-type:text-2xl font-sans font-medium text-slate-600 bg-[#f0f5f9] p-6 rounded-xl border-2 border-slate-100 hover:border-slate-400 hover:shadow-xl transition-all">
                                    <div>
                                        <Image src={product.image} alt="product-image" width={204} height={204} />
                                    </div>
                                    <div>
                                        <h4>{product.name}</h4>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                </div>
            </div>
        </main>
    )
}
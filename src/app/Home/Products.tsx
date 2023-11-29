'use client'
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export default function Products() {
    const [products] = useState([
        {
            name: 'Harm Reduction Means Life',
            image: 'https://dynamic.bonfireassets.com/thumb/design-image/6c1e5ac8-3c21-4e91-aa35-abec577a5703/e69c1d92-4334-4a92-a3c4-b0c1863b886c/900/'
        },
        {
            name: 'Harm Reduction Means Life',
            image: 'https://dynamic.bonfireassets.com/thumb/design-image/6c1e5ac8-3c21-4e91-aa35-abec577a5703/e69c1d92-4334-4a92-a3c4-b0c1863b886c/900/'
        },
        {
            name: 'Harm Reduction Means Life',
            image: 'https://dynamic.bonfireassets.com/thumb/design-image/6c1e5ac8-3c21-4e91-aa35-abec577a5703/e69c1d92-4334-4a92-a3c4-b0c1863b886c/900/'
        },
    ])

    return (
        <main className="py-16">
            <div className="container m-auto max-w-7xl">
                <h2 className="text-center text-slate-700 font-semibold tracking-widest font-sans text-xl mb-10">OUR BEST PRODUCTS</h2>

                <div className="grid grid-cols-3">
                    {
                        products.map((product, index) => (
                            <div key={index} className="flex flex-col items-center">
                                <div className="">
                                    <Image src={product.image} width={300} height={300} alt="product-image" />
                                </div>
                                <Link className="text-slate-700 font-medium font-sans hover:text-indigo-600 transition" href="/">{product.name}</Link>
                            </div>
                        ))
                    }
                </div>

                <div className="flex justify-center my-14">
                    <Link href={'/'} className="px-3 py-2.5 rounded-lg bg-white text-slate-600 border-2 border-slate-600 font-semibold hover:bg-slate-600 hover:text-white transition">
                        Visit the marketplace
                    </Link>
                </div>
            </div>
        </main>
    )
}
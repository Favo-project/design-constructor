'use client'
import Image from "next/image"
import { useState } from "react"

export default function Examples() {
    const [images] = useState([
        {
            image: 'https://c.bonfireassets.com/images/campaigns-1.jpg'
        },
        {
            image: 'https://c.bonfireassets.com/images/campaigns-2.jpg'
        },
        {
            image: 'https://c.bonfireassets.com/images/campaigns-3.jpg'
        },
    ])

    return (
        <section className="py-16">
            <div className="container m-auto max-w-7xl">
                <h3 className="text-center font-sans text-2xl text-slate-700 tracking-wide max-w-[515px] m-auto mb-16">Sell shirts online without inventory through a Bonfire campaign. It`s 100% free, you get a fast payout, and we`ll ship your products directly to your buyers.</h3>
                <div className="grid grid-cols-3 xl:gap-12 gap-8 md:gap-10 px-6 xl:px-2">
                    {
                        images.map((image, index) => (
                            <div key={index} className="p-4 lg:p-6 border-2 border-slate-100">
                                <Image className="w-full" src={image.image} alt="example-image" width={285} height={285} />
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}
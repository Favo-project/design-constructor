'use client'
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export default function Content() {
    const [categories] = useState([
        {
            name: 'Popular',
        },
        {
            name: 'Adoption',
        },
        {
            name: 'Animal rescue',
        },
        {
            name: 'Disaster relief',
        },
        {
            name: 'Events',
        },
        {
            name: 'Fundraising',
        },
        {
            name: 'Greek',
        },
        {
            name: 'Holidays',
        },
        {
            name: 'Inspirational',
        },
    ])
    const [designs] = useState([
        {
            name: 'test',
            image: 'https://c.bonfireassets.com/static/design-template-category/cfb4c0f6-1883-4c3d-8b45-9526f143438b/design-template/cac865b8-c532-4a52-8dd5-953db8eb9036/f7e72a23910741d0a22014ecdb3e4d3f/CMIFHhvpxR.jpeg'
        },
        {
            name: 'test',
            image: 'https://c.bonfireassets.com/static/design-template-category/cfb4c0f6-1883-4c3d-8b45-9526f143438b/design-template/cac865b8-c532-4a52-8dd5-953db8eb9036/f7e72a23910741d0a22014ecdb3e4d3f/CMIFHhvpxR.jpeg'
        },
        {
            name: 'test',
            image: 'https://c.bonfireassets.com/static/design-template-category/cfb4c0f6-1883-4c3d-8b45-9526f143438b/design-template/cac865b8-c532-4a52-8dd5-953db8eb9036/f7e72a23910741d0a22014ecdb3e4d3f/CMIFHhvpxR.jpeg'
        },
    ])

    return (
        <main className="py-8">
            <div className="container m-auto max-w-7xl px-6">
                <div className="max-w-3xl">
                    <h3 className="font-sans uppercase font-semibold text-slate-700 tracking-wider p-2 mb-4">BY CATEGORY</h3>
                    <ul className="grid grid-cols-3">
                        {
                            categories.map((category, index) => (
                                <li key={index}>
                                    <Link className="font-sans font-medium text-[#3f70a2] p-2 block" href={'#'}>
                                        {category.name}
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="pt-14">
                    <h2 className="text-2xl font-medium font-sans text-slate-700 mb-4">Popular</h2>
                    <div className="grid grid-cols-3 gap-10">
                        {
                            designs.map((design, index) => (
                                <div key={index}>
                                    <Link href={'#'} className="px-4 py-8">
                                        <div className="flex justify-center items-center">
                                            <Image src={design.image} alt="design-img" width={300} height={300} />
                                        </div>
                                        <div className="flex justify-center">
                                            <button className="px-3 py-1.5 rounded-md hover:shadow-md border-2 shadow-lg transition-all border-white hover:border-slate-400">
                                                Customize
                                            </button>
                                        </div>
                                    </Link>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </main>
    )
}
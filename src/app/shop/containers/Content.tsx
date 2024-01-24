'use client'
import { campaign } from "@/app/dashboard/assets"
import CampaignCard from "@/components/CampaignCard"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export default function Content({ campaigns }) {
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

    return (
        <main className="py-8">
            <div className="container m-auto max-w-7xl px-6">
                <div className="max-w-3xl">
                    <h3 className="font-sans uppercase font-semibold text-slate-700 tracking-wider p-2 mb-4">BY CATEGORY</h3>
                    <ul className="grid grid-cols-3">
                        {
                            categories.map((category, index) => (
                                <li key={index}>
                                    <Link className="font-sans font-medium text-[#3f70a2] px-2 py-1 block" href={'#'}>
                                        {category.name}
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="pt-14">
                    <h2 className="text-2xl font-medium font-sans text-slate-700 mb-4">Popular</h2>
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10">
                        {
                            campaigns.map((campaign, index) => (
                                <CampaignCard key={index} campaign={campaign} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </main>
    )
}
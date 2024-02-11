'use client'
import Link from "@/components/Link";
import { useParams } from "next/navigation";

export default function Badges({ resources }) {
    const { campaignId } = useParams()

    return (
        <div className="bg-slate-100">
            <div className="container m-auto max-w-7xl py-10 px-6">
                <ul className="flex items-center gap-2">
                    <li>
                        <Link href={'/'} className="text-slate-600 font-sans">{resources.campaignId.home}</Link>
                    </li>
                    <span className="text-slate-600">/</span>
                    <li>
                        <Link href={'/shop'} className="text-slate-600 font-sans">{resources.campaignId.shop}</Link>
                    </li>
                    <span className="text-slate-600">/</span>
                    <li>
                        <Link href={`/${campaignId}`} className="text-slate-600 font-sans border-b border-slate-600">{resources.campaignId.campaign}</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}
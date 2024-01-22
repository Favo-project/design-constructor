'use client'
import { formatCurrency } from "@/app/design/actions/campaignTools"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export default function CampaignCard({ campaign }) {
    const product = campaign.products[0]
    const [imgLoading, setImgLoading] = useState(true)

    const loadImage = (imgUrl) => {
        let origUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/files${imgUrl}`

        const imgElement = document.createElement('img')
        imgElement.crossOrigin = 'anonymous';
        imgElement.src = origUrl

        imgElement.onload = () => {
            setTimeout(() => {
                setImgLoading(false)
            }, 350)
        }

        return origUrl
    }

    return (
        <Link className="block max-w-md p-2 pb-3 transition-all" href={`/${campaign._id}`}>
            <div className="flex flex-col">
                <header className="relative">
                    <Image className="w-full h-full opacity-0 absolute hover:opacity-100 transition-all duration-300" src={loadImage(product.colors[0].designImg.back)} alt="campaign-img" width={324} height={324} />
                    <Image className="w-full h-full" src={loadImage(product.colors[0].designImg.front)} alt="campaign-img" width={324} height={324} />
                    <div>
                        <div className="w-full h-[1px] absolute top-0 block z-10 bg-white" />
                        <div className="w-[1px] h-full absolute left-0 top-0 block z-10 bg-white" />
                        <div className="w-full h-[1px] absolute bottom-0 block z-10 bg-white" />
                        <div className="w-[1px] h-full absolute right-0 top-0 block z-10 bg-white" />
                    </div>
                </header>
                <div className="flex flex-col items-center -mt-5 relative z-10">
                    <h3 className="text-slate-700 font-sans font-medium mb-1">{campaign.title}</h3>
                    <strong className="block font-semibold mb-2 text-slate-600">{formatCurrency(product.sellingPrice)}</strong>
                    <div className="mb-2">
                        <ul className="flex items-center justify-center gap-2">
                            {product.colors.map((color, index) => (
                                <li key={index}>
                                    <span className="block w-4 h-4 rounded-full border border-slate-300" style={{ background: color.color.content }} />
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <p className="text-center font-sans text-sm text-slate-400">Available in {campaign.products.length} styles</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}
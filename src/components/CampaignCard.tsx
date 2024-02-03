import { formatCurrency } from "@/actions/campaignTools"
import Link from "next/link"
import CampaignImage from "./CampaignImage"
import { Locale } from "@/i18n.config"

export default function CampaignCard({ campaign, params }: { campaign, params: { lang: Locale } }) {
    const product = campaign.products[0]

    console.log(params);

    return (
        <Link className="block max-w-md w-full m-auto p-2 pb-3 transition-all" href={`/campaign/${campaign._id}`}>
            <div className="flex flex-col">
                <header className="relative">
                    <div className="z-10 w-full h-full top-0 bottom-0 left-0 right-0 opacity-0 absolute hover:opacity-100 transition-all duration-300">
                        <CampaignImage design={campaign.design.back} background={product?.colors[0]?.image?.back} pArea={product.printableArea?.back} main />
                    </div>
                    <CampaignImage design={campaign.design.front} background={product?.colors[0]?.image?.front} pArea={product.printableArea?.front} main />
                    <div>
                        <div className="w-full h-[1px] absolute top-0 block z-10 bg-white" />
                        <div className="w-[1px] h-full absolute left-0 top-0 block z-10 bg-white" />
                        <div className="w-full h-[1px] absolute bottom-0 block z-10 bg-white" />
                        <div className="w-[1px] h-full absolute right-0 top-0 block z-10 bg-white" />
                    </div>
                </header>
                <div className="flex flex-col items-center -mt-5 relative z-20">
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
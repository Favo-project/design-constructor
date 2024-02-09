import { formatCurrency } from "@/actions/campaignTools";
import { Suspense } from "react";
import { BsCheckLg } from "react-icons/bs";
import CampaignCreator from "./components/CampaignCreator";
import SizeInfo from "../../design/components/SizeInfo";
import { PiWarningDiamond } from "react-icons/pi";
import { GrTag } from "react-icons/gr";
import CampaignImage from "@/components/CampaignImage";
import Link from "next/link";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";
import AddCart from "../../../../components/AddCart";
import Loader from "@/components/Loader";

const getCampaign = async (campaignId) => {
    return await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/campaigns/public/${campaignId}`).then((res) => res.json()).then(
        result => result.data || undefined
    )
}

export default async function Campaign({ params: { lang, campaignId }, searchParams: { color = 0, product = 0, side = 'front' } }: {
    params: { lang: Locale, campaignId: string };
    searchParams?: { [key: string]: string | number | undefined };
}) {
    const resources = await getDictionary(lang)

    const campaign = await getCampaign(campaignId)

    const getCurrentPrice = () => {
        const currentProduct = campaign.products.find((p) => p?.name === campaign.products[product]?.name)

        return formatCurrency(currentProduct?.sellingPrice)
    }

    const getCurrentSizes = () => {
        const currentProduct = campaign.products.find((p) => p?.name === campaign.products[product]?.name)

        return currentProduct?.sizes
    }

    return (
        <div id="campaign">
            <Suspense fallback={<CampaignLoader />}>
                <div className="container relative m-auto md:pt-20 pt-12">
                    <div className="grid md:grid-cols-2 grid-cols-1 lg:gap-10 gap-2 py-10 mt-6">
                        <div className="md:sticky flex lg:justify-end justify-center top-28 h-min bg-transparent">
                            <div className="relative w-full max-h-[700px] max-w-[700px] bg-transparent">
                                <div className="border-0">
                                    <Suspense fallback={'Loading'}>
                                        <CampaignImage design={campaign.design?.[side]} background={campaign.products[product]?.colors[color]?.image?.[side]} pArea={campaign.products[product].printableArea?.[side]} main />
                                    </Suspense>
                                    <div>
                                        <div className="w-full h-[1px] absolute top-0 block z-10 bg-white" />
                                        <div className="w-[1px] h-full absolute left-0 top-0 block z-10 bg-white" />
                                        <div className="w-full h-[1px] absolute bottom-0 block z-10 bg-white" />
                                        <div className="w-[1px] h-full absolute right-0 top-0 block z-10 bg-white" />
                                    </div>
                                </div>

                                <div>
                                    <div className="bg-transparent flex flex-col items-center gap-3 absolute bottom-5 left-1 z-10">
                                        <Link href={{ query: { product, side: "front", color } }} scroll={false} className={`${side === 'front' ? 'border-slate-400' : 'border-slate-100 hover:border-slate-200'} p-2 bg-white rounded-lg border-2 transition-all max-w-[50px] max-h-[50px]`}>
                                            <CampaignImage design={campaign?.design?.['front']} pArea={campaign.products[product].printableArea?.[side]} background={campaign.products[product]?.colors[color].image?.[side]} width={30} />
                                        </Link>
                                        <Link href={{ query: { product, side: "back", color } }} scroll={false} className={`${side === 'back' ? 'border-slate-400' : 'border-slate-100 hover:border-slate-200'} p-2 bg-white rounded-lg border-2  hover:border-slate-300 transition-all max-w-[50px] max-h-[50px]`}>
                                            <CampaignImage design={campaign.design?.['back']} pArea={campaign.products[product].printableArea?.[side]} background={campaign.products[product]?.colors[color].image?.[side]} width={30} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="px-6 py-4 md:py-0 md:px-0">
                            <div className="lg:pt-5">
                                <h1 className="text-3xl font-sans font-bold text-slate-600 leading-normal mb-3">{campaign.title}</h1>
                                <h4 className="relative inline-flex px-3 py-3.5 rounded-md bg-slate-200 font-sans font-medium text-slate-600 mb-2 after:block after:absolute after:left-[20px] after:-bottom-[19px] after:border-[10px] after:border-l-transparent after:border-r-transparent after:border-b-transparent after:border-t-slate-200">{campaign.description}</h4>
                            </div>

                            <CampaignCreator resources={resources} creator={campaign.creator} />

                            <div className="lg:my-10 my-4">
                                <h3 className="font-semibold text-slate-600 mb-3 text-base uppercase font-mono">{resources.campaignId.color}</h3>
                                <ul className="flex items-center gap-2">
                                    {
                                        campaign.products[product]?.colors.map(({ color: colorItem }, index) => (
                                            <li key={index}>
                                                <Link href={{ query: { product, side, color: index } }} scroll={false} className="relative block border cursor-pointer border-gray-400 p-1 rounded-full">
                                                    <span style={{ background: colorItem.content }} className="flex rounded-full w-6 h-6" />
                                                    {
                                                        Number(color) === index && (
                                                            <span className="text-white absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                                                                <BsCheckLg />
                                                            </span>
                                                        )
                                                    }
                                                </Link>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>

                            <div className="lg:my-10 my-4">
                                <h3 className="font-semibold text-slate-600 mb-3 text-base uppercase font-mono">{resources.campaignId.design}<span className="text-lg ml-2">{getCurrentPrice()}</span></h3>
                                <div className="flex flex-wrap gap-3">
                                    {
                                        campaign.products.map((productItem, index) => (
                                            <Link href={{ query: { product: index, side, color: 0 } }} scroll={false} key={index} className={`${productItem.name === campaign.products[product]?.name ? (
                                                'bg-slate-100 border-slate-400 bg-opacity-80'
                                            ) : 'hover:shadow-lg hover:border-gray-100 border-slate-300'
                                                } flex cursor-pointer transition-all flex-col items-center lg:px-3 lg:py-5 px-2 py-4 border rounded-2xl w-[125px]`}>
                                                <div>
                                                    <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" width="42.96" height="48" viewBox="0 0 42.96 48"><defs><style>{`.product-picker-fill{fill:#BECBD8;}`}</style></defs><title>product-crewneck</title><path className="product-picker-fill" d="M1170.52,3666.55c-3,0-5.3-1.79-5.3-4.07a1,1,0,0,1,2,0c0,1.12,1.51,2.07,3.3,2.07A1,1,0,1,1,1170.52,3666.55Z" transform="translate(-1149.04 -3661.48)"></path><path className="product-picker-fill" d="M1184.61,3709.48h-14.09a1,1,0,0,1,0-2h14.09A1,1,0,1,1,1184.61,3709.48Z" transform="translate(-1149.04 -3661.48)"></path><path className="product-picker-fill" d="M1150,3704.43a1,1,0,0,1-1-1v-33.81a1,1,0,0,1,2,0v33.81A1,1,0,0,1,1150,3704.43Z" transform="translate(-1149.04 -3661.48)"></path><path className="product-picker-fill" d="M1170.52,3666.55a1,1,0,0,1,0-2c1.79,0,3.3-.95,3.3-2.07a1,1,0,0,1,2,0C1175.83,3664.76,1173.5,3666.55,1170.52,3666.55Z" transform="translate(-1149.04 -3661.48)"></path><path className="product-picker-fill" d="M1150,3670.46a1,1,0,0,1-.4-1.92l16.18-7a1,1,0,0,1,.79,1.84l-16.18,7A1,1,0,0,1,1150,3670.46Z" transform="translate(-1149.04 -3661.48)"></path><path className="product-picker-fill" d="M1156.44,3704.43H1150a1,1,0,0,1,0-2h6.39A1,1,0,0,1,1156.44,3704.43Z" transform="translate(-1149.04 -3661.48)"></path><path className="product-picker-fill" d="M1156.44,3709.48a1,1,0,0,1-1-1V3675a1,1,0,0,1,2,0v33.46A1,1,0,0,1,1156.44,3709.48Z" transform="translate(-1149.04 -3661.48)"></path><path className="product-picker-fill" d="M1170.52,3709.48h-14.09a1,1,0,0,1,0-2h14.09A1,1,0,1,1,1170.52,3709.48Z" transform="translate(-1149.04 -3661.48)"></path><path className="product-picker-fill" d="M1184.61,3709.48a1,1,0,0,1-1-1V3675a1,1,0,0,1,2,0v33.46A1,1,0,0,1,1184.61,3709.48Z" transform="translate(-1149.04 -3661.48)"></path><path className="product-picker-fill" d="M1191,3670.46a1,1,0,0,1-.4-0.08l-16.18-7a1,1,0,0,1,.79-1.84l16.18,7A1,1,0,0,1,1191,3670.46Z" transform="translate(-1149.04 -3661.48)"></path><path className="product-picker-fill" d="M1191,3704.43h-6.39a1,1,0,0,1,0-2H1191A1,1,0,0,1,1191,3704.43Z" transform="translate(-1149.04 -3661.48)"></path><path className="product-picker-fill" d="M1191,3704.43a1,1,0,0,1-1-1v-33.81a1,1,0,0,1,2,0v33.81A1,1,0,0,1,1191,3704.43Z" transform="translate(-1149.04 -3661.48)"></path></svg>
                                                </div>
                                                <p className="text-gray-600 text-sm text-center mt-3 font-medium">{productItem.name}</p>
                                            </Link>
                                        ))
                                    }
                                </div>
                            </div>

                            <div className="lg:my-10 my-4">
                                <h3 className="font-semibold text-slate-600 mb-3 text-base uppercase font-mono">{resources.campaignId.size}</h3>
                                <div className="flex mb-3 gap-2">
                                    {
                                        getCurrentSizes()?.length ? (
                                            <div className="flex flex-col items-start">
                                                <div className="flex flex-wrap gap-2 mb-5">
                                                    {
                                                        getCurrentSizes()?.map((size, index) => (
                                                            <button key={index} className="px-3 py-1 rounded-lg border border-slate-300 text-sm text-slate-500 font-semibold font-mono hover:border-slate-500 hover:shadow-md transition-all">
                                                                {size}
                                                            </button>
                                                        ))
                                                    }
                                                </div>
                                                <SizeInfo resources={resources} />
                                            </div>

                                        ) : (
                                            <h4 className="text-slate-600 font-sans flex items-center font-semibold">{resources.campaignId.nosize}<span className="text-2xl text-orange-600 ml-2"><PiWarningDiamond /></span></h4>
                                        )
                                    }
                                </div>
                            </div>

                            <AddCart resources={resources} campaignId={campaignId} product={campaign.products[product]} color={campaign.products[product].colors[color]} />

                            <div className="lg:my-10 my-4">
                                <div className="border border-slate-200 px-8 py-6 rounded-xl max-w-md">
                                    <div className="flex items-center justify-between">
                                        <div className={`flex items-center gap-3`}>
                                            <span className="block text-xl p-2.5     rounded-full bg-slate-100 text-slate-400">
                                                <GrTag className="text-slate-400" />
                                            </span>
                                            <div className="flex flex-col">
                                                <h4 className="uppercase font-mono font-semibold text-slate-500 mb-1">{resources.campaignId.sold}</h4>
                                                <span className="font-bold text-lg font-sans">{campaign.soldAmount}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Suspense>
        </div >

    )
}

function CampaignLoader() {
    return (
        <div className="fixed bg-white bg-opacity z-50 top-0 left-0 right-0 bottom-0 flex items-center justify-center text-4xl">
            <Loader />
        </div>
    )
}
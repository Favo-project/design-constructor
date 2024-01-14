'use client'
import Loader from "@/components/Loader";
import { authAtom, campaignAtom } from "@/constants";
import axios from "axios";
import { useAtom } from "jotai";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useLayoutEffect, useState } from 'react'
import { BsQuestionCircle } from "react-icons/bs";
import { formatCurrency } from "../../actions/campaignTools";
import ProfitInput from "./ProfitInput";

export default function Profits() {
    const { campaignId } = useParams()
    const [loading, setLoading] = useState(true)

    const [auth, setAuth] = useAtom(authAtom)
    const [campaign, setCampaign] = useAtom(campaignAtom)

    useLayoutEffect(() => {
        const fetch = async () => {
            setLoading(true)
            try {
                const { data: response } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/campaigns/${campaignId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${auth || localStorage.getItem('user_at')}`
                    }
                })

                console.log(response.data);

                setCampaign({ ...response.data })
                setLoading(false)
            }
            catch (e) {
                console.log(e);
                setLoading(false)
            }
        }

        fetch()
    }, [campaignId])

    return <div>
        <div className="container m-auto">

            <h2 className="text-4xl font-sans font-semibold text-slate-700 mt-8 mb-6">
                Set your selling prices
            </h2>

            {
                loading ? (
                    <Loader />
                ) : (
                    <table className="text-left w-[100%]">
                        <thead>
                            <tr className="font-thin font-mono text-base uppercase text-slate-600">
                                <th>PRODUCT</th>
                                <th className="flex items-center">BASE COST <button className="p-1 ml-2 mb-[1px] text-gray-400 hover:text-gray-700"><BsQuestionCircle /></button></th>
                                <th>SELLING PRICE</th>
                                <th>YOUR PROFIT</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                campaign.products.map((product, index) => (
                                    <tr className="border-b border-b-gray-300" key={index}>
                                        <td className="py-5">
                                            <div className="flex items-center gap-4">
                                                <div>
                                                    <Image priority src={`${process.env.NEXT_PUBLIC_BASE_URL}/files${campaign.images[index].colors[0].image!.front}`} alt="product-img" width={64} height={64} />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-gray-600">{product.title}</h4>
                                                    <ul className="flex items-center gap-2 mt-4">
                                                        {
                                                            product.colors.map((color, idx) => (
                                                                <li key={idx}>
                                                                    <span className="block w-6 h-6 shadow-sm rounded-full" style={{ background: color.content }} />
                                                                </li>
                                                            ))
                                                        }
                                                    </ul>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="text-base py-5 text-slate-700 font-medium">{formatCurrency(product.baseCost)}</td>
                                        <td className="py-5">
                                            <div className="relative">
                                                <strong className="absolute top-[50%] left-2 translate-y-[-50%] text-sm text-slate-300">$</strong>
                                                <ProfitInput product={product} />
                                            </div>
                                        </td>
                                        <td className="py-5">
                                            <div>
                                                <h5 className="flex items-center font-semibold text-green-600">{formatCurrency(product.sellingPrice - product.baseCost)} each <button className="p-1 ml-2 text-gray-400 hover:text-gray-700"><BsQuestionCircle /></button></h5>
                                                <span className="text-sm">at 1 sold</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                )
            }

        </div>
    </div>
}
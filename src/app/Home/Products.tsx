'use client'
import CampaignCard from "@/components/CampaignCard"
import Loader from "@/components/Loader"
import { authAtom, userAtom } from "@/constants"
import axios from "axios"
import { useAtom } from "jotai"
import Image from "next/image"
import Link from "next/link"
import { useLayoutEffect, useState } from "react"

export default function Products() {
    const [auth, setAuth] = useAtom(authAtom)
    const [user, setUser] = useAtom(userAtom)
    const [loading, setLoading] = useState(true)
    const [campaigns, setCampaigns] = useState([])

    useLayoutEffect(() => {
        const fetch = async () => {
            try {
                setLoading(true)
                const { data: response } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/campaigns/public`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${auth || localStorage.getItem('user_at')}`
                    }
                })

                if (response.success) {
                    setCampaigns([...response.data])
                }
                setLoading(false)
            }
            catch (err) {
                if (err?.response?.status === 403) {
                    setAuth('')
                    setUser({
                        ...userAtom.init
                    })
                    localStorage.removeItem('user_at')
                }
                setLoading(false)
            }
        }
        fetch()
    }, [auth])

    return (
        <main className="py-16">
            {loading ? (
                <div className="bg-white bg-opacity-20 z-50 flex items-center justify-center text-4xl w-full min-h-[450px]">
                    <Loader />
                </div>
            ) : (
                <div className="container m-auto max-w-7xl">
                    <h2 className="text-center text-slate-700 font-semibold tracking-widest font-sans text-xl mb-10">OUR BEST PRODUCTS</h2>

                    <div className="grid grid-cols-3 mb-6">
                        {
                            campaigns.map((campaign, index) => (
                                <CampaignCard key={index} campaign={campaign} />
                            ))
                        }
                    </div>

                    <div className="flex justify-center">
                        <Link href={'/shop'} className="px-3 py-2.5 rounded-lg bg-white text-slate-600 border-2 border-slate-600 font-semibold hover:bg-slate-600 hover:text-white transition">
                            See all
                        </Link>
                    </div>
                </div>
            )}
        </main>
    )
}
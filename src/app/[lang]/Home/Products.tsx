'use client'
import CampaignCard from "@/components/CampaignCard"
import Loader from "@/components/Loader"
import OutlineBtn from "@/components/form-elements/OutlineBtn"
import { authAtom, userAtom } from "@/constants"
import axios from "axios"
import { useAtom } from "jotai"
import { useLayoutEffect, useState } from "react"

export default function Products({ resources }) {
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
                    const campaignData = response.data.splice(0, 3)
                    setCampaigns([...campaignData])
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
        <main className="md:py-16 py-8">
            {loading ? (
                <div className="bg-white bg-opacity-20 z-50 flex items-center justify-center text-4xl w-full min-h-[450px]">
                    <Loader />
                </div>
            ) : (
                <div className="container m-auto max-w-7xl">
                    <h2 className="text-center text-slate-700 font-semibold tracking-widest font-sans text-xl mb-10 uppercase">{resources.home.products.title}</h2>

                    <div className="grid md:grid-cols-3 grid-cols-2 mb-6 justify-center">
                        {
                            campaigns.map((campaign, index) => (
                                <CampaignCard key={index} campaign={campaign} resources={resources} />
                            ))
                        }
                    </div>

                    <div className="flex justify-center">
                        <OutlineBtn href={'/shop'}
                        >
                            {resources.home.products.marketplace}
                        </OutlineBtn>
                    </div>
                </div>
            )}
        </main>
    )
}
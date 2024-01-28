'use client'
import Footer from "@/components/Footer";
import { authAtom, campaignAtom, userAtom } from "@/constants";
import axios from "axios";
import { useAtom } from "jotai";
import { useParams, useRouter } from "next/navigation"
import { useLayoutEffect, useState } from "react";

import Campaign from './page'
import Loader from "@/components/Loader";
import CampaignNavbar from "./components/CampaignNavbar";
import Badges from "./components/Badges";


export default function Layout() {
    const { campaignId } = useParams()

    const [loading, setLoading] = useState(true)
    const [campaign, setCampaign] = useState({ ...campaignAtom.init })
    const [auth, setAuth] = useAtom(authAtom)
    const [user, setUser] = useAtom(userAtom)

    useLayoutEffect(() => {
        const fetchUser = async () => {
            try {
                const { data: response } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/users/me`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${auth || localStorage.getItem('user_at')}`
                    }
                })

                if (response.success) {
                    setUser({ ...response.user, loaded: true })
                }
            }
            catch (err) {
                if (err?.response?.status === 403) {
                    setAuth('')
                    setUser({
                        ...userAtom.init
                    })
                    localStorage.removeItem('user_at')
                }
            }
        }
        fetchUser()

        const fetch = async () => {
            setLoading(true)

            try {
                const { data: response } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/campaigns/public/${campaignId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${auth || localStorage.getItem('user_at')}`,
                    },
                })

                setCampaign(response.data)
                setLoading(false)
            }
            catch (e) {
                if (e?.response?.status === 403) {
                    setAuth('')
                    setUser({
                        ...userAtom.init
                    })
                    localStorage.removeItem('user_at')
                    setLoading(false)
                }
            }
        }

        fetch()
    }, [auth])

    return (
        loading ? (
            <div className="absolute bg-white bg-opacity-20 z-50 top-0 left-0 right-0 bottom-0 flex items-center justify-center text-4xl">
                <Loader />
            </div>
        ) : (
            <>
                <CampaignNavbar />
                <Campaign campaign={campaign} />
                <Badges />
                <Footer />
            </>
        )
    )
}
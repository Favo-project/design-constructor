'use client'
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Hero from "./containers/Hero";
import Content from "./containers/Content";
import { authAtom, userAtom } from "@/constants";
import { useAtom } from "jotai";
import { useLayoutEffect, useState } from "react";
import axios from "axios";
import Loader from "@/components/Loader";

export default function Shop({ resources }) {
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
        <>
            {
                loading ? (
                    <div className="absolute bg-white bg-opacity-20 z-50 top-0 left-0 right-0 bottom-0 flex items-center justify-center text-4xl">
                        <Loader />
                    </div>
                ) : (
                    <>
                        <Navbar resources={resources} />
                        <Hero resources={resources} />
                        <Content campaigns={campaigns} resources={resources} />
                        <Footer resources={resources} />
                    </>
                )
            }
        </>
    )
}
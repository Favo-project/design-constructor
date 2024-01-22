'use client'
import Loader from "@/components/Loader"
import { useParams } from "next/navigation"
import { useLayoutEffect, useState } from "react"
import Store from "./page"
import StoreNavbar from "./components/StoreNavbar"
import Footer from "@/components/Footer"
import { authAtom, userAtom } from "@/constants"
import { useAtom } from "jotai"
import axios from "axios"

export default function Layout() {
    const { storeId } = useParams()

    const [auth, setAuth] = useAtom(authAtom)
    const [user, setUser] = useAtom(userAtom)
    const [loading, setLoading] = useState(false)

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
    }, [auth])

    return (
        loading ? (
            <div className="absolute bg-white bg-opacity-20 z-50 top-0 left-0 right-0 bottom-0 flex items-center justify-center text-4xl">
                <Loader />
            </div>
        ) : (
            <>
                <StoreNavbar />
                <Store />
                <Footer />
            </>
        )
    )
}
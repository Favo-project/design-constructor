'use client'
import { authAtom, userAtom } from "@/constants"
import axios from "axios"
import { useAtom } from "jotai"
import { useRouter } from "next/navigation"
import { useLayoutEffect, useState } from "react"

export default function Layout({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const [loading, setLoading] = useState(true)

    const [auth, setAuth] = useAtom(authAtom)
    const [user, setUser] = useAtom(userAtom)

    useLayoutEffect(() => {
        const fetch = async () => {
            try {
                const { data: response } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/users/me`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${auth || localStorage.getItem('user_at')}`
                    }
                })

                setUser({ ...response.user, loaded: true })
                setLoading(false)
            }
            catch (e) {
                setAuth('')
                setUser({
                    ...userAtom.init
                })
                localStorage.removeItem('user_at')
                setLoading(false)
                router.push('/')
            }
        }

        fetch()
    }, [auth])

    return children
}
'use client'
import DashboardSidebar from "@/components/DashboardSidebar";
import { authAtom, userAtom } from "@/constants";
import { useAtom } from "jotai";
import { useLayoutEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import axios from "axios";

export default function Template({
  resources, children
}: {
  resources, children?: React.ReactNode
}) {
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

  return (
    loading ? (
      <div className="absolute bg-white bg-opacity-20 z-50 top-0 left-0 right-0 bottom-0 flex items-center justify-center text-4xl" >
        <Loader />
      </div>
    ) : (
      user.loaded ? (
        <>
          <DashboardSidebar resources={resources} />
          <div className="lg:p-6 xl:p-8 p-4 lg:ml-56 bg-[#fff] lg:h-[100vh] h-[90vh] overflow-y-auto">
            {children}
          </div>
        </>
      ) : null
    ))
}

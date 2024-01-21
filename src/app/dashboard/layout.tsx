'use client'
import DashboardSidebar from "@/components/DashboardSidebar";
import { authAtom, campaignAtom, userAtom } from "@/constants";
import { useAtom } from "jotai";
import { useEffect, useLayoutEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import axios from "axios";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  const [auth, setAuth] = useAtom(authAtom)
  const [user, setUser] = useAtom(userAtom)
  const [campaign, setCampaign] = useAtom(campaignAtom)

  useLayoutEffect(() => {
    const fetch = async () => {
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
        else {
          setAuth('')
          setUser({
            ...userAtom.init
          })
          localStorage.removeItem('user_at')
          setLoading(false)
          router.push('/')
        }
        setLoading(false)
      }
      catch (e) {
        console.log(e.message);
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
    <div id="dashboard">
      {
        loading ? (
          <div className="absolute bg-white bg-opacity-20 z-50 top-0 left-0 right-0 bottom-0 flex items-center justify-center text-4xl">
            <Loader />
          </div>
        ) : (
          user.loaded ? (
            <>
              <DashboardSidebar />
              <div className="p-8 lg:ml-56 bg-[#fff] h-[100vh] overflow-y-auto">
                {children}
              </div>
            </>
          ) : null
        )
      }
    </div>
  );
}

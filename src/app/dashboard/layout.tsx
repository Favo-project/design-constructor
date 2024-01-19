'use client'
import DashboardSidebar from "@/components/DashboardSidebar";
import { authAtom, campaignAtom, userAtom } from "@/constants";
import { useAtom } from "jotai";
import { useEffect, useLayoutEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";

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
    try {
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/me`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('user_at') || auth}`
        }
      }).then(res => res.json()).then(data => {
        if (data.success) {
          setUser({ ...data.user, loaded: true })
        }
        else {
          setAuth('')
          setUser({
            name: null,
            phone: null,
            loaded: false
          })
          localStorage.removeItem('user_at')
          setLoading(false)
          router.push('/')
        }
        setLoading(false)
      })
    }
    catch (e) {
      console.log(e.message);
      setAuth('')
      setUser({
        name: null,
        phone: null,
        loaded: false
      })
      localStorage.removeItem('user_at')
      setLoading(false)
      router.push('/')
    }
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

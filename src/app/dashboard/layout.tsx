'use client'
import DashboardSidebar from "@/components/DashboardSidebar";
import { authAtom, userAtom } from "@/constants";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import Loading from "./loading";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  const [auth, setAuth] = useAtom(authAtom)
  const [user, setUser] = useAtom(userAtom)

  useEffect(() => {
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
          <Loading />
        ) : (
          user.loaded ? (
            <>
              <DashboardSidebar />
              <div className="p-8 lg:ml-56 bg-[#f5f8fc] h-[100vh] overflow-y-auto">
                {children}
              </div>
            </>
          ) : null
        )
      }
    </div>
  );
}

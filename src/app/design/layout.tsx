'use client'
import { useEffect, useState } from "react";
import DesignNavbar from "./components/DesignNavbar";
import { useAtom } from "jotai";
import { authAtom, userAtom } from "@/constants";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";

export default function DesignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  const [user, setUser] = useAtom(userAtom)
  const [auth, setAuth] = useAtom(authAtom)

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
    }
  }, [auth])

  return (
    <div className="lg:pt-[72px] pt-[80px]">
      {
        loading ? (
          <div className="absolute bg-white bg-opacity-20 z-50 top-0 left-0 right-0 bottom-0 flex items-center justify-center text-4xl">
            <Loader />
          </div>
        ) : <>
          <DesignNavbar />
          {children}</>
      }

    </div>
  );
}

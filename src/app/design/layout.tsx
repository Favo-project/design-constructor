'use client'
import { useEffect, useState } from "react";
import DesignNavbar from "./components/DesignNavbar";
import { useAtom } from "jotai";
import { authAtom, userAtom } from "@/constants";
import Loader from "@/components/Loader";
import axios from "axios";

export default function DesignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true)

  const [user, setUser] = useAtom(userAtom)
  const [auth, setAuth] = useAtom(authAtom)

  useEffect(() => {
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
        setLoading(false)
      }
      catch (e) {
        setAuth('')
        setUser({
          name: null,
          phone: null,
          loaded: false
        })
        localStorage.removeItem('user_at')
        setLoading(false)
      }
    }

    fetch()
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

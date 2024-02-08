'use client'
import { useEffect, useState } from "react";
import DesignNavbar from "./components/DesignNavbar";
import { useAtom } from "jotai";
import { authAtom, campaignAtom, designAtom, userAtom } from "@/constants";
import Loader from "@/components/Loader";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

export default function DesignLayout({
  children, resources
}: {
  children: React.ReactNode, resources
}) {
  const router = useRouter()
  const { campaignId } = useParams()
  const [loadingUser, setLoadingUser] = useState(true)
  const [loadingCampaign, setLoadingCampaign] = useState(true)

  const [user, setUser] = useAtom(userAtom)
  const [auth, setAuth] = useAtom(authAtom)
  const [campaign, setCampaign] = useAtom(campaignAtom)
  const [savedDesign, setSavedDesign] = useAtom(designAtom)

  useEffect(() => {
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
        setLoadingUser(false)
      }
      catch (err) {
        if (err?.response?.status === 403) {
          if (campaignId) {
            router.push('/')
          } else {
            setLoadingUser(false)
          }
          setAuth('')
          setUser({
            ...userAtom.init
          })
          localStorage.removeItem('user_at')
        } else {
          setLoadingUser(false)
        }
      }
    }
    fetchUser()

    if (campaignId) {
      const fetchCampaign = async () => {
        try {
          const { data: response } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/campaigns/${campaignId}`, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${auth || localStorage.getItem('user_at')}`
            }
          })

          setCampaign({
            ...campaign,
            ...response.data,
          })
          setSavedDesign({
            ...response.data.design
          })
          setLoadingCampaign(false)
        }
        catch (err) {
          if (err?.response?.status === 403) {
            router.push('/')
            setAuth('')
            setUser({
              ...userAtom.init
            })
            localStorage.removeItem('user_at')
          }
          if (err?.response?.status === 404) {
            router.push('/design/start')
          }
          setLoadingCampaign(false)
        }
      }
      fetchCampaign()
    }
    else {
      setLoadingCampaign(false)
    }
  }, [auth])

  return (
    <div className="lg:pt-[72px] pt-[80px]">
      {
        loadingCampaign || loadingUser ? (
          <div className="absolute bg-white bg-opacity-20 z-50 top-0 left-0 right-0 bottom-0 flex items-center justify-center text-4xl">
            <Loader />
          </div>
        ) : <>
          <DesignNavbar resources={resources} />
          {children}
        </>
      }

    </div>
  );
}

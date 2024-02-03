"use client";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Dialog } from '@headlessui/react'
import { AiOutlineHome } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";
import { MdLogout, MdCheck } from "react-icons/md";
import { useEffect, useState } from "react";
import Link from "next/link";
import AuthModal from "@/components/AuthModal";
import { useAtom } from "jotai";
import { authAtom, campaignAtom, campaignStart, designAtom, isSavedAtom, toastAtom, userAtom } from "@/constants";
import { useRouter, useParams, usePathname } from "next/navigation";
import { campaignTools, designNavigation, launchedNavigation } from "@/actions/campaignTools";
import SaveButton from "./SaveButton";
import NextButton from "./NextButton";
import SaveDialog from "./SaveDialog";
import LaunchDialog from "./LaunchDialog";
import Image from "next/image";
import NavbarArrow from "./NavbarArrow";
import Toasts from "@/components/Toasts";
import { LogoMain } from "@/assets";
import UserDropdown from "@/components/UserDropdown";

export default function DesignNavbar() {
  const [toast, setToast] = useAtom(toastAtom)
  const router = useRouter()
  const pathname = usePathname()
  const { campaignId } = useParams()
  const [saveDialog, setSaveDialog] = useState(false)
  const [launchDialog, setLaunchDialog] = useState(false)

  const [loading, setLoading] = useState(false)
  const [isSaved, setIsSaved] = useAtom(isSavedAtom)

  const [user, setUser] = useAtom(userAtom)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [auth, setAuth] = useAtom(authAtom)

  const [campaign, setCampaign] = useAtom(campaignAtom)
  const [campaignBlank, setCampaignBlank] = useAtom(campaignStart)
  const [savedDesign, setSavedDesign] = useAtom(designAtom)

  const onLogout = () => {
    setMobileMenuOpen(false)
    try {
      setAuth('')
      setUser({
        ...userAtom.init
      })
      localStorage.removeItem('user_at')
      router.push('/')
    }
    catch (e) {
      router.push('/')
    }
  }

  const onSave = async () => {
    try {
      if (campaignId) {
        setLoading(true)
        const response = await campaignTools.saveCampaign(pathname, auth, campaignId, campaign)

        setIsSaved(true)
        setCampaign({ ...campaign, ...response.data })
        setSavedDesign({ ...response.data.design })

        setTimeout(() => {
          setIsSaved(false)
        }, 3000)

        setLoading(false)
      }
      else {
        setSaveDialog(true)
        const response = await campaignTools.initCampaign(auth, campaignBlank)
        setCampaignBlank({
          ...campaignStart.init,
          products: [...campaignBlank.products]
        })
        router.push(`/design/start/${response.data._id}`)
        setCampaign({ ...campaign, ...response.data })
        setSavedDesign({ ...response.data.design })
        return response.data
      }
    }
    catch (err) {
      setSaveDialog(false)
      if (err?.response?.status === 403) {
        router.push('/')
        setAuth('')
        setUser({
          ...userAtom.init
        })
        localStorage.removeItem('user_at')
      }
      else {
        setToast({ type: "warning", message: err?.message || 'Xatolik yuz berdi, qayta uruning' })
      }
    }
  }

  const onNext = async () => {
    try {
      const data = await onSave()
      if (campaignId) {
        const response = await campaignTools.changeLevel(auth, pathname, campaignId, campaign)
        setCampaign({ ...campaign, campaignLevel: response?.data?.campaignLevel })
      }
      else {
        const response = await campaignTools.changeLevel(auth, pathname, data._id, data)
        setCampaign({ ...campaign, ...data, campaignLevel: response?.data?.campaignLevel })
      }
    }
    catch (err) {
      if (err?.response?.status === 403) {
        router.push('/')
        setAuth('')
        setUser({
          ...userAtom.init
        })
        localStorage.removeItem('user_at')
        setSaveDialog(false)
      }
      else {
        setToast({ type: "warning", message: err?.message || 'Xatolik yuz berdi, qayta uruning' })
      }
    }
  }

  const onLaunch = async () => {
    try {
      await onSave()
      const response = await campaignTools.changeLevel(auth, pathname, campaignId, campaign)
      const launchData = await campaignTools.launchCampaign(auth, campaignId)
      setCampaign({ ...campaign, campaignLevel: response?.data?.campaignLevel, status: launchData?.data?.status })
      setToast({ type: "success", message: `Dizayn  - "${campaign.title}" yakullandi` })
      setLaunchDialog(true)
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
      else {
        setToast({ type: "warning", message: err?.message || 'Xatolik yuz berdi, qayta uruning' })
      }
      setSaveDialog(false)
      setLaunchDialog(false)
    }
  }

  useEffect(() => {
    if (saveDialog && campaignId) {
      setSaveDialog(false)
    }
  }, [saveDialog, campaignId])

  function closeLaunchModal() {
    setLaunchDialog(false)
  }

  const isActive = (index) => {
    const href = campaign.status === 'Launched' ? launchedNavigation[index].href : designNavigation[index].href
    return pathname.indexOf(href) !== -1
  }

  return (
    <>
      <Toasts />
      <SaveDialog isOpen={saveDialog} closeModal={() => { }} />
      <LaunchDialog isOpen={launchDialog} closeModal={closeLaunchModal} />

      <nav
        className="flex z-50 fixed top-0 left-0 right-0 bg-white items-center justify-between p-4 lg:px-8 lg:py-0 shadow-sm"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <div className="lg:hidden">
            {
              user.loaded ? (
                <Link href={'/'} className="block scale-75 md:scale-100">
                  <Image src={LogoMain} alt="artvibe-logo" width={60} height={38} />
                </Link>
              ) : (
                <AuthModal>
                  <div className="font-semibold leading-6 text-dark hover:text-transparent bg-gradient-to-r from-magenta to-blue bg-clip-text transition-all">
                    Log in
                  </div>
                </AuthModal>
              )
            }
          </div>
          <div className="hidden lg:block">
            <Link href={'/'} className="block scale-75 md:scale-100">
              <Image src={LogoMain} alt="artvibe-logo" width={60} height={38} />
            </Link>
          </div>
        </div>
        <div className="order-3 flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex items-center">
          {campaignTools.navigation(campaign, campaignId).map((link, index) => (
            <div key={index} className="flex items-center">
              {isActive(index) ? (
                <span className="text-white bg-magenta rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-1">
                  {index + 1}
                </span>
              ) : (
                <span className="text-slate-400 bg-white rounded-full w-6 h-6 border-2 border-slate-400 text-sm flex items-center justify-center font-semibold mr-1">
                  {index + 1}
                </span>
              )}
              {
                link.passed ? (
                  <div className="flex items-center">
                    <Link
                      href={link.href}
                      className="text-sm py-6 font-semibold leading-6 text-slate-700 hover:text-magenta transition-all"
                    >
                      {link.name}
                    </Link>
                    <span className="ml-1 text-green-600 text-lg">
                      <MdCheck />
                    </span>
                  </div>
                ) : (
                  <button className="text-sm py-6 font-semibold leading-6 text-slate-700 cursor-default">{link.name}</button>
                )
              }
              {campaignTools.navigation(campaign, campaignId).length !== index + 1 && <NavbarArrow />}
            </div>
          ))}
        </div>
        <div className="flex lg:flex-1 lg:justify-end gap-3 items-center">
          <SaveButton loaded={user.loaded} onSave={onSave} loading={loading} isSaved={isSaved} />
          <NextButton loaded={user.loaded} onNext={onNext} onLaunch={onLaunch} loading={loading} campaign={campaignId ? campaign : campaignBlank} onSave={onSave} isSaved={isSaved} />

          <div className="hidden lg:block">
            {
              user.loaded ? (
                <div>
                  <UserDropdown />
                </div>
              ) : (
                <AuthModal>
                  <div className="font-semibold leading-6 text-dark hover:text-transparent bg-gradient-to-r from-magenta to-blue bg-clip-text transition-all">
                    Log in
                  </div>
                </AuthModal>
              )
            }
          </div>

        </div >
      </nav >
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50 bg-black bg-opacity-25" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-4 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <Link href={'/'} className="block scale-75 md:scale-100">
                <Image src={LogoMain} alt="artvibe-logo" width={60} height={38} />
              </Link>
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {campaignTools.navigation(campaign, campaignId).map((link, index) => (
                  <div key={index} className="flex items-center">
                    {isActive(index) ? (
                      <span className="text-white bg-magenta rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-1">
                        {index + 1}
                      </span>
                    ) : (
                      <span className="text-slate-400 bg-white rounded-full w-6 h-6 border-2 border-slate-400 text-sm flex items-center justify-center font-semibold mr-1">
                        {index + 1}
                      </span>
                    )}
                    {
                      link.passed ? (
                        <div className="flex items-center">
                          <Link
                            href={link.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-sm py-4 font-semibold leading-6 text-slate-700 hover:text-transparent hover:bg-gradient-to-r from-magenta to-blue hover:bg-clip-text transition-all"
                          >
                            {link.name}
                          </Link>
                          <span className="ml-1 text-green-600 text-lg">
                            <MdCheck />
                          </span>
                        </div>
                      ) : (
                        <button className="text-sm py-4 font-semibold leading-6 text-slate-700 cursor-default">{link.name}</button>
                      )
                    }
                  </div>
                ))}
              </div>
              <div className="py-6">
                {
                  user.loaded ? (
                    <div>
                      <h3 className="flex flex-wrap py-3 tracking-tight text-slate-700">Welcome, <strong className='ml-1 block text-transparent font-medium bg-gradient-to-r from-magenta to-blue bg-clip-text'>{user.name}!</strong></h3>
                      <Link onClick={() => setMobileMenuOpen(false)} className="flex items-center mb-2 py-2.5 text-dark hover:text-magenta transition-all font-sans font-semibold hover:bg-slate-100" href={'/dashboard/overview'}>
                        <span className="text-2xl mr-2">
                          <AiOutlineHome />
                        </span> Dashboard
                      </Link>
                      <Link onClick={() => setMobileMenuOpen(false)} className="flex items-center mb-2 py-2.5 text-dark hover:text-magenta transition-all font-sans font-semibold hover:bg-slate-100" href={'/dashboard/account'}>
                        <span className="text-2xl mr-2">
                          <IoSettingsOutline />
                        </span> Account Settings
                      </Link>
                      <button onClick={onLogout} className="w-full flex items-center mb-2 py-2.5 text-dark hover:text-magenta transition-all font-sans font-semibold hover:bg-slate-100">
                        <span className="text-2xl mr-2">
                          <MdLogout />
                        </span> Logout
                      </button>
                    </div>
                  ) : (
                    <AuthModal>
                      <div className="font-semibold leading-6 text-dark hover:text-transparent bg-gradient-to-r from-magenta to-blue bg-clip-text transition-all">
                        Log in
                      </div>
                    </AuthModal>
                  )
                }
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </>
  );
}

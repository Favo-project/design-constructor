"use client";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Dialog, Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { AiOutlineHome } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";
import { MdLogout, MdCheck } from "react-icons/md";
import { useEffect, useState } from "react";
import { PiCaretRightThin } from "react-icons/pi";
import Link from "next/link";
import AuthModal from "@/components/AuthModal";
import { useAtom } from "jotai";
import { authAtom, campaignAtom, campaignStart, userAtom } from "@/constants";
import { useRouter, useParams, usePathname } from "next/navigation";
import { FaRegUserCircle } from "react-icons/fa";
import { campaignTools } from "../actions/campaignTools";
import SaveButton from "./SaveButton";
import NextButton from "./NextButton";
import SaveDialog from "./SaveDialog";

export default function DesignNavbar() {
  const router = useRouter()
  const pathname = usePathname()
  const { campaignId } = useParams()
  const [saveDialog, setSaveDialog] = useState(false)

  const [loading, setLoading] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  const [user, setUser] = useAtom(userAtom)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [auth, setAuth] = useAtom(authAtom)

  const [campaign] = useAtom(campaignAtom)
  const [campaignBlank, setCampaignBlank] = useAtom(campaignStart)

  const onLogout = () => {
    try {
      setAuth('')
      setUser({
        name: null,
        phone: null,
        loaded: false
      })
      localStorage.removeItem('user_at')
      router.push('/')
    }
    catch (e) {
      router.push('/')
    }
  }

  // window.onbeforeunload = (e) => {
  //   e.preventDefault()
  // }

  const onSave = async () => {
    try {
      if (campaignId) {
        setLoading(true)
        const response = await campaignTools.saveCampaign(pathname, auth, campaignId, campaign)

        if (response.success) {
          setIsSaved(true)

          setTimeout(() => {
            setIsSaved(false)
          }, 3000)
        }
        else {
          // error || warn the user that they should make change
        }

        setLoading(false)
      }
      else {
        setSaveDialog(true)
        const response = await campaignTools.initCampaign(auth, campaignBlank)
        if (response.success) {
          setCampaignBlank({
            ...campaignStart.init,
            products: [...campaignBlank.products]
          })
          router.push(`/design/start/${response.data._id}`)
          return response.data
        }
        else {
          // error || warn the user that they should make change
        }
      }
    }
    catch (err) {
      if (err?.response?.status === 403) {
        router.push('/')
        setAuth('')
        setUser({
          name: null,
          phone: null,
          loaded: false
        })
        localStorage.removeItem('user_at')
        setSaveDialog(false)
      }
      else {
        console.log(err);
      }
    }
  }

  const onNext = async () => {
    try {
      const data = await onSave()
      if (campaignId) {
        await campaignTools.changeLevel(auth, pathname, campaignId, campaign)
      }
      else {
        await campaignTools.changeLevel(auth, pathname, data._id, data)
      }
    }
    catch (err) {
      if (err?.response?.status === 403) {
        router.push('/')
        setAuth('')
        setUser({
          name: null,
          phone: null,
          loaded: false
        })
        localStorage.removeItem('user_at')
        setSaveDialog(false)
      }
      else {
        console.log(err);
      }
    }
  }

  const onLaunch = () => {
    try {
      const response = campaignTools.launchCampaign(campaign, auth, campaignId)
    }
    catch (e) {

    }
  }

  useEffect(() => {
    if (saveDialog && campaignId) {
      setSaveDialog(false)
    }
  }, [saveDialog, campaignId])

  return (
    <>
      <SaveDialog isOpen={saveDialog} closeModal={() => { }} />

      <nav
        className="flex z-50 fixed top-0 left-0 right-0 bg-white items-center justify-between p-6 lg:px-8 lg:py-0 shadow-sm"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="logo"
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
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
              {
                link.passed ? (
                  <div className="flex items-center">
                    <Link
                      href={link.href}
                      className="text-sm py-6 font-semibold leading-6 text-slate-700 hover:text-indigo-500 transition-all"
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
              <PiCaretRightThin className="text-7xl text-slate-300" />
            </div>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-3 items-center">
          <SaveButton loaded={user.loaded} onSave={onSave} loading={loading} isSaved={isSaved} />
          <NextButton loaded={user.loaded} onNext={onNext} onLaunch={onLaunch} loading={loading} campaign={campaignId ? campaign : campaignBlank} isSaved={isSaved} />
          {
            user.loaded ? (
              <div>
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="inline-flex w-full justify-center rounded-md px-3 py-3 text-sm font-medium text-slate-700 hover:bg-indigo-300/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
                      <span className="text-xl">
                        <FaRegUserCircle />
                      </span>
                      <ChevronDownIcon
                        className="-mr-1 ml-1 h-5 w-5 text-lg text-slate-600"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as="div"
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute overflow-hidden right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                      <h3 className="px-3 py-3 pt-5 tracking-tight text-slate-700">Welcome, {user.name}!</h3>
                      <Menu.Item as="div">
                        <Link className="flex items-center px-3 py-2.5 text-indigo-400 font-sans font-semibold hover:bg-slate-100" href={'/dashboard/overview'}>
                          <span className="text-2xl mr-2 text-slate-500">
                            <AiOutlineHome />
                          </span> Dashboard
                        </Link>
                      </Menu.Item>
                      <Menu.Item as="div">
                        <Link className="flex items-center px-3 py-2.5 text-indigo-400 font-sans font-semibold hover:bg-slate-100" href={'/dashboard/account'}>
                          <span className="text-2xl mr-2 text-slate-500">
                            <IoSettingsOutline />
                          </span> Account Settings
                        </Link>
                      </Menu.Item>
                      <Menu.Item as="div">
                        <button onClick={onLogout} className="w-full flex items-center px-3 py-2.5 text-indigo-400 font-sans font-semibold hover:bg-slate-100">
                          <span className="text-2xl mr-2 text-slate-500">
                            <MdLogout />
                          </span> Logout
                        </button>
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            ) : (
              <AuthModal>
                <div className="text-slate-700 font-sans font-semibold px-1 p-1">
                  Log in <span aria-hidden="true">&rarr;</span>
                </div>
              </AuthModal>
            )
          }

        </div >
      </nav >
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </a>
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
                {campaignTools.navigation(campaign, campaignId).map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Log in
                </a>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </>
  );
}

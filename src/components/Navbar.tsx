"use client";

import { Bars3Icon, ChevronUpIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Dialog } from "@headlessui/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import AuthModal from "./AuthModal";
import { useAtom } from "jotai";
import { authAtom, userAtom } from "@/constants";
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { AiOutlineHome } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { useRouter } from "next/navigation";
import { FaRegUserCircle } from "react-icons/fa";
import Image from "next/image";
import axios from "axios";

const navigation = [
  { name: "Sell online", href: "/sell-online" },
  { name: "Create store", href: "/online-stores" },
  { name: "Marketplace", href: "/marketplace" },
  { name: "Templates", href: "/templates" },
];

export default function Navbar() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  const [auth, setAuth] = useAtom(authAtom)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useAtom(userAtom)

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
        console.log(e.message);
        setAuth('')
        setUser({
          ...userAtom.init
        })
        localStorage.removeItem('user_at')
        setLoading(false)
      }
    }

    fetch()
  }, [auth])

  const onLogout = () => {
    try {
      setAuth('')
      setUser({
        ...userAtom.init
      })
      localStorage.removeItem('user_at')
      router.push('/')
    }
    catch (e) {

    }
  }

  return (
    <>
      <div className="py-3 bg-white z-50 relative"></div>
      <div className="bg-white sticky shadow-sm top-0 z-50">
        <div className="container m-auto max-w-7xl">
          <nav
            className="flex items-center justify-between p-4 lg:px-8"
            aria-label="Global"
          >
            <div className="flex lg:flex-1">
              <Link href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  width={32}
                  height={32}
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
            <div className="hidden lg:flex lg:gap-x-12">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text font-sans font-medium leading-6 text-gray-900"
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
              {
                loading ? null : (
                  user.loaded ? (
                    <div>
                      <Menu as="div" className="relative inline-block text-left">
                        <div>
                          <Menu.Button className="inline-flex w-full items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-slate-700 hover:bg-indigo-300/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
                            <span className="text-xl w-6 h-6 mr-1">
                              {
                                user.photo ? (
                                  <Image className='w-full h-full rounded-full' src={`${process.env.NEXT_PUBLIC_BASE_URL}/files${user?.photo}`} alt='account-profile' width={20} height={20} />
                                ) : (
                                  <FaRegUserCircle className="w-full h-full" />
                                )
                              }
                            </span>
                            {user.name}
                            <ChevronDownIcon
                              className="-mr-1 ml-2 h-5 w-5 text-slate-600"
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
                      <div className="text-sm font-semibold leading-6 text-gray-900">
                        Log in <span aria-hidden="true">&rarr;</span>
                      </div>
                    </AuthModal>
                  ))
              }
            </div>
          </nav>
        </div>
      </div>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-4 py-10 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
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
                {navigation.map((item) => (
                  <Link
                    onClick={() => setMobileMenuOpen(false)}
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                {
                  loading ? null : (
                    user.loaded ? (
                      <div>
                        <Menu as="div" className="relative inline-block text-left">
                          <div>
                            <Menu.Button className="inline-flex w-full items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-slate-700 hover:bg-indigo-300/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
                              <span className="text-xl w-6 h-6 mr-1">
                                {
                                  user.photo ? (
                                    <Image className='w-full h-full rounded-full' src={`${process.env.NEXT_PUBLIC_BASE_URL}/files${user?.photo}`} alt='account-profile' width={20} height={20} />
                                  ) : (
                                    <FaRegUserCircle className="w-full h-full" />
                                  )
                                }
                              </span>
                              {user.name}
                              <ChevronUpIcon
                                className="-mr-1 ml-2 h-5 w-5 text-slate-600"
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
                            <Menu.Items className="absolute -translate-y-[calc(100%+50px)] overflow-hidden left-0 mt-2 w-56 origin-bottom-left divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
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
                        <div className="text-sm font-semibold leading-6 text-gray-900">
                          Log in <span aria-hidden="true">&rarr;</span>
                        </div>
                      </AuthModal>
                    ))
                }
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </>
  );
}

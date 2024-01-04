"use client";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Dialog, Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { AiOutlineHome } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { useState } from "react";
import { PiCaretRightThin } from "react-icons/pi";
import Link from "next/link";
import AuthModal from "@/components/AuthModal";
import { useAtom } from "jotai";
import { authAtom, campaignAtom, canvas, userAtom } from "@/constants";
import { useRouter } from "next/navigation";
import { FaRegUserCircle } from "react-icons/fa";
import { fabric } from "fabric"
import axios from "axios";

const navigation = [
  { name: "Design", href: "/design/start" },
  { name: "Profits", href: "/design/profits" },
  { name: "Details", href: "/design/details" },
  { name: "Edit & Preview", href: "/design/preview" },
];

export default function DesignNavbar() {
  const [canvasExp] = useAtom<any>(canvas)

  const router = useRouter()
  const [user, setUser] = useAtom(userAtom)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [auth, setAuth] = useAtom(authAtom)
  const [currentHref, setCurrentHref] = useState(window.location.pathname)
  const [campaign] = useAtom(campaignAtom)

  const onNext = () => {
    navigation.forEach((path, index) => {
      if (path.href === currentHref) {
        router.push(navigation[index + 1].href)
      }
    })
  }

  const onLogout = () => {
    setAuth('')
    setUser({
      name: null,
      phone: null,
      loaded: false
    })
    localStorage.removeItem('user_at')
    router.push('/')
  }

  const onSave = async () => {

    const filteredFront = campaign.design.front.map((elem) => {
      if (elem.type === 'text') {
        return {
          originX: elem.originX,
          originY: elem.originX,
          top: elem.top,
          left: elem.left,
          scaleX: elem.scaleX,
          scaleY: elem.scaleY,
          type: elem.type,
          side: elem.side,
          canvasId: elem.canvasId,
          relativeTop: elem.relativeTop,
          text: elem.text,
          fontFamily: elem.fontFamily,
          fontSize: elem.fontSize,
          fontWeight: elem.fontWeight,
          fontStyle: elem.fontStyle,
          textAlign: elem.textAlign,
          textBaseline: elem.textBaseline,
          fill: elem.fill,
          opacity: elem.opacity,
          shadow: elem.shadow,
          underline: elem.underline,
          overline: elem.overline,
          linethrough: elem.linethrough,
          angle: elem.angle,
          flipX: elem.flipX,
          flipY: elem.flipY,
          charSpacing: elem.charSpacing,
          lineHeight: elem.lineHeight,
        }
      }
      else if (elem.type === 'icon') {
        console.log(elem);
        return {
          originX: elem.originX,
          originY: elem.originX,
          top: elem.top,
          left: elem.left,
          scaleX: elem.scaleX,
          scaleY: elem.scaleY,
          type: elem.type,
          side: elem.side,
          canvasId: elem.canvasId,
          relativeTop: elem.relativeTop,
          url: elem.url,
          fill: elem.fill,
          opacity: elem.opacity,
          shadow: elem.shadow,
          angle: elem.angle,
          flipX: elem.flipX,
          flipY: elem.flipY,
        }
      }
      else if (elem.type === 'image') {
        return {
          originX: elem.originX,
          originY: elem.originX,
          top: elem.top,
          left: elem.left,
          scaleX: elem.scaleX,
          scaleY: elem.scaleY,
          type: elem.type,
          side: elem.side,
          canvasId: elem.canvasId,
          relativeTop: elem.relativeTop,
          fill: elem.fill,
          opacity: elem.opacity,
          shadow: elem.shadow,
          angle: elem.angle,
          flipX: elem.flipX,
          flipY: elem.flipY,
          src: elem?._element?.src
        }
      }
    })

    const filteredBack = campaign.design.back.map((elem) => {
      if (elem.type === 'text') {
        return {
          originX: elem.originX,
          originY: elem.originX,
          top: elem.top,
          left: elem.left,
          scaleX: elem.scaleX,
          scaleY: elem.scaleY,
          type: elem.type,
          side: elem.side,
          canvasId: elem.canvasId,
          relativeTop: elem.relativeTop,
          text: elem.text,
          fontFamily: elem.fontFamily,
          fontSize: elem.fontSize,
          fontWeight: elem.fontWeight,
          fontStyle: elem.fontStyle,
          textAlign: elem.textAlign,
          textBaseline: elem.textBaseline,
          fill: elem.fill,
          opacity: elem.opacity,
          shadow: elem.shadow,
          underline: elem.underline,
          overline: elem.overline,
          linethrough: elem.linethrough,
          angle: elem.angle,
          flipX: elem.flipX,
          flipY: elem.flipY,
          charSpacing: elem.charSpacing,
          lineHeight: elem.lineHeight,
        }
      }
      else if (elem.type === 'icon') {
        console.log(elem);
        return {
          originX: elem.originX,
          originY: elem.originX,
          top: elem.top,
          left: elem.left,
          scaleX: elem.scaleX,
          scaleY: elem.scaleY,
          type: elem.type,
          side: elem.side,
          canvasId: elem.canvasId,
          relativeTop: elem.relativeTop,
          url: elem.url,
          fill: elem.fill,
          opacity: elem.opacity,
          shadow: elem.shadow,
          angle: elem.angle,
          flipX: elem.flipX,
          flipY: elem.flipY,
        }
      }
      else if (elem.type === 'image') {
        return {
          originX: elem.originX,
          originY: elem.originX,
          top: elem.top,
          left: elem.left,
          scaleX: elem.scaleX,
          scaleY: elem.scaleY,
          type: elem.type,
          side: elem.side,
          canvasId: elem.canvasId,
          relativeTop: elem.relativeTop,
          fill: elem.fill,
          opacity: elem.opacity,
          shadow: elem.shadow,
          angle: elem.angle,
          flipX: elem.flipX,
          flipY: elem.flipY,
          src: elem?._element?.src
        }
      }
    })

    campaign.design.front = filteredFront
    campaign.design.back = filteredBack

    console.log(campaign);

    canvasExp.setZoom(3)
    canvasExp.width = canvasExp.width * 3
    canvasExp.height = canvasExp.height * 3

    canvasExp.renderAll();

    // const dataUrl = canvasExp.toDataURL()

    // const img = document.createElement('img')
    // img.src = dataUrl

    // document.body.appendChild(img)


    try {
      const { data: response } = await axios.post('http://localhost:3333/campaigns', campaign, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth || localStorage.getItem('user_at')}`
        }
      });

      console.log(response);
    }
    catch (e) {
      console.log(e);
    }
  }

  return (
    <>
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
          {navigation.map((item, index) => (
            <div key={index} className="flex items-center">
              <Link
                key={item.name}
                href={item.href}
                className="text-sm py-6 font-semibold leading-6 text-gray-900"
              >
                {item.name}
              </Link>
              <PiCaretRightThin className="text-7xl text-slate-300" />
            </div>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-3 items-center">
          {
            user.loaded ? (
              <button onClick={onSave} className="text-indigo-500 font-sans font-semibold mr-1">
                Save
              </button>
            ) : null
          }
          <button onClick={onNext} disabled={!user.loaded} className="bg-indigo-500 text-white rounded-md shadow-md px-3 p-1 disabled:bg-indigo-300 disabled:shadow-none disabled:cursor-not-allowed">
            Next
          </button>
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
                {navigation.map((item) => (
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

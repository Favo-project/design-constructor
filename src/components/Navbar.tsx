"use client";

import { LiaMoneyBillWaveSolid } from "react-icons/lia";
import { Fragment, useLayoutEffect, useState } from "react";
import Link from "next/link";
import { useAtom } from "jotai";
import { userAtom } from "@/constants";
import { Menu, Transition } from '@headlessui/react'
import { IoStorefrontOutline } from "react-icons/io5";
import { GiPencilBrush } from "react-icons/gi";
import Image from "next/image";
import { LogoMain } from "@/assets";
import { GoChevronDown, GoChevronRight } from "react-icons/go";
import { RiShoppingBag3Line } from "react-icons/ri";
import { BsImageAlt } from "react-icons/bs";
import { PiTShirt } from "react-icons/pi";
import UserDropdown from "./UserDropdown";
import Cart from "./Cart";
import { FaBarsStaggered } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const navigation = [
  {
    name: "Sell online", links: [
      {
        name: 'Sell online in a campaign',
        href: '/sell-online',
        icon: <LiaMoneyBillWaveSolid />
      },
      {
        name: 'Create a merch store',
        href: '/online-stores',
        icon: <IoStorefrontOutline />
      }
    ]
  },
  {
    name: "Customize", links: [
      {
        name: 'Product catalog',
        href: '/catalog',
        icon: <RiShoppingBag3Line />
      },
      {
        name: 'Design templates',
        href: '/templates',
        icon: <BsImageAlt />
      }
    ]
  },
  {
    name: "Explore", links: [
      {
        name: 'Shop all shirts',
        subtext: 'Find something you love',
        href: '/shop',
        icon: <PiTShirt />
      },
      {
        name: 'Discover creators',
        href: '/templates',
        icon: <GiPencilBrush />
      }
    ]
  },
];

const dashboardLinks = [
  {
    name: 'Overview',
    href: '/dashboard/overview'
  },
  {
    name: 'Campaigns',
    href: '/dashboard/campaigns'
  },
  {
    name: 'Store',
    href: '/dashboard/stores'
  },
  {
    name: 'Payouts',
    href: '/dashboard/payouts'
  },
  {
    name: 'My orders',
    href: '/dashboard/orders'
  },
  {
    name: 'Account',
    href: '/dashboard/account'
  },
]

export default function Navbar() {
  const [isFixed, setIsFixed] = useState(false)
  const [user, setUser] = useAtom(userAtom)

  useLayoutEffect(() => {
    const handler = (e) => {
      if (window.scrollY > 50) {
        setIsFixed(true)
      }
      else {
        setIsFixed(false)
      }
    }

    window.addEventListener('scroll', handler)

    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <div className={`relative z-50`}>
      <nav className={`fixed left-0 right-0 transition-all ${isFixed ? 'top-0 border-b border-slate-300 bg-[#fafafa]' : 'top-6'}`}>
        <div className="lg:block hidden">
          <div className="container m-auto max-w-7xl">
            <div className="px-4 py-3 flex items-center">
              <Link href={'/'} className="block mr-14">
                <Image src={LogoMain} alt="artvibe-logo" width={60} height={38} />
              </Link>

              <ul className="flex items-center gap-6">
                {
                  navigation.map((link, index) => (
                    <li key={index} className="relative flex items-center p-1 gap-2 cursor-pointer child:hidden child:hover:block child:hover:opacity-100 transition-all hover:bg-gradient-to-r from-magenta to-blue bg-clip-text hover:text-transparent font-medium">
                      <div className="absolute w-max h-max px-6 py-4 -left-20 top-8 opacity-0 bg-white rounded-lg shadow-2xl transition-all">
                        <ul className="flex flex-col gap-2">
                          {
                            link.links.map((sublink, idx) => (
                              <li key={idx}>
                                <Link href={sublink.href} className="flex items-center font-sans font-semibold gap-2 p-2 text-dark [&>#pointer]:hover:translate-x-3 [&>#pointer]:hover:text-magenta">
                                  <span className="w-9 h-9 flex items-center justify-center text-lg rounded-full border-2 border-magenta text-blue">
                                    {sublink.icon}
                                  </span>
                                  {sublink.name}
                                  <span id="pointer" className="text-2xl mt-1 ml-auto transition-all">
                                    <GoChevronRight />
                                  </span>
                                </Link>
                              </li>
                            ))
                          }
                        </ul>
                      </div>
                      {link.name}
                      <span className="pt-1 text-lg text-dark">
                        <GoChevronDown />
                      </span>
                    </li>
                  ))
                }
              </ul>

              <div className="ml-auto flex items-center">
                <UserDropdown />
                <Cart />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:hidden">
          <div className="container m-auto max-w-7xl">
            <div className="px-4 py-3 relative flex items-center justify-between">
              <div className="flex-2">
                <Menu as="div" className="relative ml-4">
                  <div>
                    <Menu.Button className="flex items-center font-mono uppercase tracking-widest">
                      <span className="text-lg mr-2">
                        <FaBarsStaggered />
                      </span>
                      Menu
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute md:w-96 w-72 max-h-[70vh] overflow-y-auto -top-2 -left-2 bg-white z-30 px-4 py-3 pt-12 rounded-md shadow-2xl">
                      <Menu.Item>
                        {({ active, close }) => (
                          <button
                            onClick={close}
                            className={'absolute top-1 left-0 flex items-center font-mono uppercase tracking-widest p-1'}
                          >
                            <span className="text-2xl mr-2">
                              <IoMdClose />
                            </span>
                            Close
                          </button>
                        )}
                      </Menu.Item>

                      <h4 className="text-dark font-sans mt-6 mb-6">Welcome, <span className="text-transparent font-medium bg-gradient-to-r from-magenta to-blue bg-clip-text">{user?.name}</span></h4>

                      <ul className="grid grid-cols-2 gap-3 gap-x-10">
                        {dashboardLinks.map((link, idx) => (
                          <li key={idx}>
                            <Link href={link.href} className="text-blue font-medium hover:text-magenta">{link.name}</Link>
                          </li>
                        ))}
                      </ul>

                      <ul className="flex flex-col gap-6 mt-6">
                        {
                          navigation.map((link, index) => (
                            <li key={index}>
                              <h3 className="text-dark transition-all hover:bg-gradient-to-r text-sm font-semibold font-mono uppercase mb-3">
                                {link.name}
                              </h3>
                              <ul className="flex flex-col gap-5">
                                {
                                  link.links.map((sublink, idx) => (
                                    <li key={idx}>
                                      <Link href={sublink.href} className="flex items-center font-sans font-semibold gap-2 text-dark [&>#pointer]:hover:translate-x-3 [&>#pointer]:hover:text-magenta">
                                        <span className="w-9 h-9 flex items-center justify-center text-lg rounded-full border-2 border-magenta text-blue">
                                          {sublink.icon}
                                        </span>
                                        {sublink.name}
                                        <span id="pointer" className="text-2xl mt-1 ml-auto transition-all">
                                          <GoChevronRight />
                                        </span>
                                      </Link>
                                    </li>
                                  ))
                                }
                              </ul>
                            </li>
                          ))
                        }
                      </ul>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>

              <Link href={'/'} className="absolute left-1/2 -translate-x-1/2 block scale-75 md:scale-100">
                <Image src={LogoMain} alt="artvibe-logo" width={60} height={38} />
              </Link>

              <div className="flex-2 flex items-center">
                <UserDropdown className="hidden md:block" />
                <Cart />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}
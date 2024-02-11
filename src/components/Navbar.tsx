"use client";

import { LiaMoneyBillWaveSolid } from "react-icons/lia";
import { Fragment, useLayoutEffect, useState } from "react";

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
import Link from "./Link";
import LocaleSwitcher from "./LocaleSwitcher";

export default function Navbar({ resources }) {
  const [navigation] = useState([
    {
      name: resources.navbar.sellonline, links: [
        {
          name: resources.navbar.sellcampaign,
          href: '/sell-online',
          icon: <LiaMoneyBillWaveSolid />
        },
        {
          name: resources.navbar.createstore,
          href: '/online-stores',
          icon: <IoStorefrontOutline />
        }
      ]
    },
    {
      name: resources.navbar.customize, links: [
        {
          name: resources.navbar.catalog,
          href: '/catalog',
          icon: <RiShoppingBag3Line />
        },
        {
          name: resources.navbar.templates,
          href: '/templates',
          icon: <BsImageAlt />
        }
      ]
    },
    {
      name: resources.navbar.explore, links: [
        {
          name: resources.navbar.shop,
          subtext: resources.navbar.shoplove,
          href: '/shop',
          icon: <PiTShirt />
        },
        {
          name: resources.navbar.discover,
          href: '/templates',
          icon: <GiPencilBrush />
        }
      ]
    },
  ])

  const [dashboardLinks] = useState([
    {
      name: resources.navbar.overview,
      href: '/dashboard/overview'
    },
    {
      name: resources.navbar.campaigns,
      href: '/dashboard/campaigns'
    },
    {
      name: resources.navbar.store,
      href: '/dashboard/stores'
    },
    {
      name: resources.navbar.payouts,
      href: '/dashboard/payouts'
    },
    {
      name: resources.navbar.orders,
      href: '/dashboard/orders'
    },
    {
      name: resources.navbar.account,
      href: '/dashboard/account'
    },
  ])

  const [isFixed, setIsFixed] = useState(false)
  const [user, setUser] = useAtom(userAtom)

  useLayoutEffect(() => {
    const handler = () => {
      if (window.scrollY > 50) {
        setIsFixed(true)
      }
      else {
        setIsFixed(false)
      }
    }

    handler()

    window.addEventListener('scroll', handler)

    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <div className={`relative z-50`}>
      <nav className={`fixed left-0 right-0 transition-all ${isFixed ? 'top-0 border-b border-slate-300 bg-white' : 'top-6'}`}>
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
                <UserDropdown resources={resources} />
                <LocaleSwitcher />
                <Cart resources={resources} />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:hidden">
          <div className="container m-auto max-w-7xl">
            <div className="sm:px-4 px-2 py-3 relative flex items-center justify-between">
              <div className="flex-2">
                <Menu as="div" className="relative ml-4">
                  <div>
                    <Menu.Button className="flex items-center font-mono uppercase tracking-widest">
                      <span className="text-lg mr-2">
                        <FaBarsStaggered />
                      </span>
                      <span className='md:block hidden'>
                        Menu
                      </span>
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
                    <Menu.Items className="absolute md:w-96 w-80 max-h-[70vh] overflow-y-auto -top-2 -left-2 bg-white z-30 px-4 py-3 pt-12 rounded-md shadow-2xl">
                      <Menu.Item>
                        {({ active, close }) => (
                          <button
                            onClick={close}
                            className={'absolute top-1 left-0 flex items-center font-mono uppercase tracking-widest p-1'}
                          >
                            <span className="text-2xl mr-2">
                              <IoMdClose />
                            </span>
                            {resources.navbar.close}
                          </button>
                        )}
                      </Menu.Item>

                      <h4 className="text-dark font-sans mt-6 mb-6">{resources.navbar.welcome}, <span className="text-transparent font-medium bg-gradient-to-r from-magenta to-blue bg-clip-text">{user?.name}</span></h4>

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
                <UserDropdown resources={resources} />
                <LocaleSwitcher />
                <Cart resources={resources} />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}
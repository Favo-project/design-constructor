'use client'
import { LogoMain, LogoPrimary } from '@/assets'
import Cart from '@/components/Cart'
import UserDropdown from '@/components/UserDropdown'
import { authAtom, userAtom } from '@/constants'
import { Menu, Transition } from '@headlessui/react'
import axios from 'axios'
import { useAtom } from 'jotai'
import Image from 'next/image'
import Link from '@/components/Link'
import { Fragment, useLayoutEffect, useState } from 'react'
import { BsImageAlt } from 'react-icons/bs'
import { FaBarsStaggered } from 'react-icons/fa6'
import { GiPencilBrush } from 'react-icons/gi'
import { GoChevronRight } from 'react-icons/go'
import { IoMdClose } from 'react-icons/io'
import { IoStorefrontOutline } from 'react-icons/io5'
import { LiaMoneyBillWaveSolid } from 'react-icons/lia'
import { PiTShirt } from 'react-icons/pi'
import { RiShoppingBag3Line } from 'react-icons/ri'
import LocaleSwitcher from '@/components/LocaleSwitcher'


export default function StoreNavbar({ resources }) {
    const [navigation] = useState([
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
    ])

    const [dashboardLinks] = useState([
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
    ])

    const [isFixed, setIsFixed] = useState(false)

    const [auth, setAuth] = useAtom(authAtom)
    const [user, setUser] = useAtom(userAtom)

    useLayoutEffect(() => {
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
            }
            catch (err) {
                if (err?.response?.status === 403) {
                    setAuth('')
                    setUser({
                        ...userAtom.init
                    })
                    localStorage.removeItem('user_at')
                }
            }
        }
        fetchUser()
    }, [auth])

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
        <div className='relative z-50'>
            <nav className={`z-30 fixed left-0 right-0 transition-all ${isFixed ? 'top-0 border-b border-slate-300 bg-white' : 'top-6'}`}>
                <div className="container m-auto max-w-7xl sm:px-4 px-2 py-3 flex items-center justify-between relative">
                    <div className='flex-[2] flex items-center gap-5'>
                        <Menu as="div" className="relative ml-4">
                            <div>
                                <Menu.Button className={`flex items-center font-mono uppercase tracking-widest ${isFixed ? 'text-dark' : 'text-white'}`}>
                                    <span className={`text-lg mr-2`}>
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
                                <Menu.Items className="absolute md:w-96 w-80 max-h-[70vh] overflow-y-auto -top-2 -left-2 bg-white z-30 px-4 py-6 pt-12 rounded-md shadow-2xl">
                                    <Menu.Item>
                                        {({ active, close }) => (
                                            <button
                                                onClick={close}
                                                className={'absolute top-1 left-0 flex items-center font-mono uppercase tracking-widest p-1'}
                                            >
                                                <span className="text-2xl mr-2">
                                                    <IoMdClose />
                                                </span>
                                                {resources.store.navbar.close}
                                            </button>
                                        )}
                                    </Menu.Item>

                                    <h4 className="text-dark font-sans mt-6 mb-6">{resources.store.navbar.welcome}, <span className="text-transparent font-medium bg-gradient-to-r from-magenta to-blue bg-clip-text">{user?.name}</span></h4>

                                    <ul className="grid grid-cols-2 gap-3 gap-x-10">
                                        {dashboardLinks.map((link, idx) => (
                                            <li key={idx}>
                                                <Link href={link.href} className="text-blue font-medium hover:text-magenta">{link.name}</Link>
                                            </li>
                                        ))}
                                    </ul>

                                    <ul className="flex flex-col gap-6 mt-8">
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
                        <Image src={isFixed ? LogoMain : LogoPrimary} alt="artvibe-logo" width={60} height={38} />
                    </Link>

                    <div className='flex-[2] flex items-center justify-end'>
                        <UserDropdown resources={resources} className="hidden md:block" theme={isFixed ? 'dark' : 'light'} />
                        <LocaleSwitcher theme={isFixed ? 'dark' : 'light'} />
                        <Cart resources={resources} theme={isFixed ? 'dark' : 'light'} />
                    </div>
                </div>
            </nav>
        </div>
    )
}
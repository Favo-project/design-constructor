import { LogoMain } from '@/assets'
import Cart from '@/components/Cart'
import UserDropdown from '@/components/UserDropdown'
import { authAtom, userAtom } from '@/constants'
import { Menu, Transition } from '@headlessui/react'
import { useAtom } from 'jotai'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment, useLayoutEffect, useState } from 'react'
import { FaBarsStaggered } from 'react-icons/fa6'
import { GoSearch } from 'react-icons/go'
import { IoMdClose } from 'react-icons/io'

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

export default function CampaignNavbar() {
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
        <div className='relative z-50'>
            <nav className={`z-30 fixed left-0 right-0 transition-all ${isFixed ? 'top-0 border-b border-slate-300 bg-white' : 'top-6'}`}>
                <nav className="container m-auto max-w-7xl px-4 py-3 flex items-center justify-between relative">
                    <div className='flex-[2] flex items-center gap-5'>
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
                                <Menu.Items className="absolute md:w-96 w-72 max-h-[70vh] overflow-y-auto -top-2 -left-2 bg-white z-30 px-4 py-6 pt-12 rounded-md shadow-2xl">
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
                                </Menu.Items>
                            </Transition>
                        </Menu>
                        <div className='relative lg:flex items-center hidden'>
                            <span className='absolute text-lg text-slate-600 left-2'><GoSearch /></span>
                            <input className='p-2 pl-8 text-sm outline-none rounded-lg border-2 border-slate-300 font-sans font-semibold placeholder:text-slate-400 text-slate-600' placeholder='Search' type="text" />
                        </div>
                    </div>

                    <div className='hidden lg:block'>
                        <Link href={'/'} className="block scale-75 md:scale-100">
                            <Image src={LogoMain} alt="artvibe-logo" width={60} height={38} />
                        </Link>
                    </div>

                    <div className='flex-[2] flex items-center justify-end'>
                        <UserDropdown className="hidden md:block" />
                        <Cart />
                    </div>
                </nav>
            </nav>
        </div>
    )
}
import AuthModal from '@/components/AuthModal'
import { authAtom, userAtom } from '@/constants'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { useAtom } from 'jotai'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment, useEffect, useRef, useState } from 'react'
import { AiOutlineHome } from 'react-icons/ai'
import { BsCart4 } from 'react-icons/bs'
import { FaRegUserCircle } from 'react-icons/fa'
import { FaArtstation, FaBarsStaggered } from 'react-icons/fa6'
import { GoSearch } from 'react-icons/go'
import { IoMdClose } from 'react-icons/io'
import { IoSettingsOutline } from 'react-icons/io5'
import { MdLogout } from 'react-icons/md'

export default function CampaignNavbar() {
    const [user, setUser] = useAtom(userAtom)
    const [auth, setAuth] = useAtom(authAtom)

    const onLogout = () => {
        try {
            setAuth('')
            setUser({
                ...userAtom.init
            })
            localStorage.removeItem('user_at')
        }
        catch (e) {

        }
    }

    return (
        <div className="border-b border-slate-300 sticky top-0 bg-white z-30">
            <nav className="container m-auto max-w-7xl px-4 py-3 flex items-center justify-between">
                <div className='flex-[2] flex items-center'>
                    <Menu as="div" className="relative inline-block text-left">
                        <div>
                            <Menu.Button className="inline-flex w-full justify-center px-4 py-2 font-sans uppercase font-normal text-sm tracking-widest text-slate-900 focus:outline-none">
                                <FaBarsStaggered className="mr-2 ml-2 h-5 w-5 text-slate-700" />
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
                            <Menu.Items className="absolute z-20 px-5 py-3 left-0 top-0 mt-2 w-96 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-xl focus:outline-none">
                                <Menu.Item>
                                    {({ active, close }) => (
                                        <button
                                            className={'text-sm flex items-center font-sans uppercase font-normal tracking-widest text-slate-900'}
                                            onClick={close}
                                        >
                                            <span className='text-2xl mr-2'>
                                                <IoMdClose />
                                            </span>
                                            Close
                                        </button>
                                    )}
                                </Menu.Item>

                                <div className='flex gap-10 mt-8'>
                                    <ul className='flex flex-col'>
                                        <li className='text-indigo-500 font-sans text-lg mb-2'><Link href={'/dashboard/overview'}>Overview</Link></li>
                                        <li className='text-indigo-500 font-sans text-lg mb-2'><Link href={'/dashboard/campaigns'}>Campaigns</Link></li>
                                        <li className='text-indigo-500 font-sans text-lg mb-2'><Link href={'/dashboard/stores'}>Store</Link></li>
                                        <li className='text-indigo-500 font-sans text-lg mb-2'><Link href={'/dashboard/payouts'}>Payouts</Link></li>
                                    </ul>
                                    <ul className='flex flex-col'>
                                        <li className='text-indigo-500 font-sans text-lg mb-2'><Link href={'/dashboard/orders'}>My orders</Link></li>
                                        <li className='text-indigo-500 font-sans text-lg mb-2'><Link href={'/dashboard/account'}>Account</Link></li>
                                        <li className='text-indigo-500 font-sans text-lg mb-2'><Link href={'/help'}>Get Help</Link></li>
                                    </ul>
                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                    <div className='relative flex items-center'>
                        <span className='absolute text-lg text-slate-600 left-2'><GoSearch /></span>
                        <input className='p-2 pl-8 text-sm outline-none rounded-lg border-2 border-slate-300 font-sans font-semibold placeholder:text-slate-400 text-slate-600' placeholder='Search' type="text" />
                    </div>
                </div>
                <div className=''>
                    <Link className='text-slate-700 text-xl uppercase font-normal tracking-widest flex items-center' href={'/'}>
                        <span className='text-indigo-600 text-2xl mr-2'><FaArtstation /></span> ArtVibe
                    </Link>
                </div>
                <div className='flex-[2] flex items-center justify-end'>
                    <div>
                        {
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
                            )
                        }
                    </div>
                    <div>
                        <button className='flex items-center font-sans text-slate-700 px-3 py-2'>
                            <span className='text-xl mr-1'>
                                <BsCart4 />
                            </span>
                            Cart
                        </button>
                    </div>
                </div>
            </nav>
        </div>
    )
}
'use client'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { AiOutlineHome } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import Link from 'next/link';
import { FaRegUserCircle } from 'react-icons/fa';
import { authAtom, userAtom } from '@/constants';
import { useAtom } from 'jotai';
import { useRouter } from 'next/navigation';

export default function UserMenu() {
    const router = useRouter()
    const [user, setUser] = useAtom(userAtom)
    const [auth, setAuth] = useAtom(authAtom)

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

        }
    }

    return (
        <div>
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button className="inline-flex w-full justify-center rounded-md px-3 py-3 text-sm font-medium text-slate-700 hover:bg-indigo-300/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
                        <span className="text-xl mr-1">
                            <FaRegUserCircle />
                        </span>
                        {user.name}
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
    )
}
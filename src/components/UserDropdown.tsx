'use client'
import { authAtom, userAtom } from '@/constants'
import { Menu, Transition } from '@headlessui/react'
import { useAtom } from 'jotai'
import Image from 'next/image'
import Link from '@/components/Link'
import { useRouter } from 'next/navigation'
import { AiOutlineHome } from 'react-icons/ai'
import { FaRegUserCircle } from 'react-icons/fa'
import { IoSettingsOutline } from 'react-icons/io5'
import { MdLogout } from 'react-icons/md'
import AuthModal from './AuthModal'
import { GoChevronDown } from 'react-icons/go'
import { useLayoutEffect, useState } from 'react'
import axios from 'axios'
import { EnIco, RuIco, UzIco } from '@/assets'
import { Locale } from '@/i18n.config'
import { CiLogin } from 'react-icons/ci'

export default function UserDropdown({ className, resources, theme = 'dark' }: { className?: string, resources, theme?: 'dark' | 'light' }) {
    const router = useRouter()
    const [loading, setLoading] = useState(true)

    const [user, setUser] = useAtom(userAtom)
    const [auth, setAuth] = useAtom(authAtom)


    useLayoutEffect(() => {
        const fetch = async () => {
            try {
                const { data: response } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/users/me`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${auth || localStorage.getItem('user_at')}`
                    }
                })

                setUser({ ...response.user, loaded: true })
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

    if (loading) {
        return null
    }

    return (
        <div className={`flex items-center mr-1 ${className}`}>
            {
                user.loaded ? (
                    <Menu as="div" className="relative inline-block text-left">
                        <div>
                            <Menu.Button className={`flex items-center hover:bg-gray-200 sm:px-2 px-1 py-1 rounded-md outline-none ${theme === 'light' ? 'text-white hover:bg-opacity-30' : 'text-dark'}`}>
                                <span className='text-xl mr-1 hidden sm:block'>
                                    <GoChevronDown />
                                </span>

                                <div className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-magenta">
                                    {
                                        user.photo ? (
                                            <Image className='w-full h-full rounded-full object-cover' src={`${process.env.NEXT_PUBLIC_BASE_URL}/files${user?.photo}`} alt='account-profile' width={28} height={28} />
                                        ) : (
                                            <FaRegUserCircle className="w-full h-full" />
                                        )
                                    }
                                </div>
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
                            <Menu.Items className="absolute overflow-hidden right-0 mt-2 w-56 origin-bottom-left divide-y divide-gray-300 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                                <h3 className="px-3 py-3 pt-5 tracking-tight text-slate-700">{resources.userdropdown.welcome}, <strong className='block text-transparent font-medium bg-gradient-to-r from-magenta to-blue bg-clip-text'>{user.name}!</strong></h3>

                                <Menu.Item as="div">
                                    <Link className="flex items-center px-3 py-2.5 text-dark hover:text-magenta transition-all font-sans font-semibold hover:bg-slate-100" href={'/dashboard/overview'}>
                                        <span className="text-2xl mr-2">
                                            <AiOutlineHome />
                                        </span> {resources.userdropdown.dashboard}
                                    </Link>
                                </Menu.Item>
                                <Menu.Item as="div">
                                    <Link className="flex items-center px-3 py-2.5 text-dark hover:text-magenta transition-all font-sans font-semibold hover:bg-slate-100" href={'/dashboard/account'}>
                                        <span className="text-2xl mr-2">
                                            <IoSettingsOutline />
                                        </span> {resources.userdropdown.account}
                                    </Link>
                                </Menu.Item>
                                <Menu.Item as="div">
                                    <button onClick={onLogout} className="w-full flex items-center px-3 py-2.5 text-dark hover:text-magenta transition-all font-sans font-semibold hover:bg-slate-100">
                                        <span className="text-2xl mr-2">
                                            <MdLogout />
                                        </span> {resources.userdropdown.logout}
                                    </button>
                                </Menu.Item>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                ) : (
                    <AuthModal resources={resources}>
                        <div className={`font-semibold leading-6 ${theme === 'light' ? 'text-white' : 'text-dark'} hover:text-transparent bg-gradient-to-r from-magenta to-blue bg-clip-text transition-all`}>
                            <span className='hidden sm:block'>
                                {resources.userdropdown.login}
                            </span>
                            <span className={`block sm:hidden text-2xl mt-1 ${theme === 'light' ? 'text-white' : 'text-dark'} hover:text-magenta transition-all mr-2`}>
                                <CiLogin />
                            </span>
                        </div>
                    </AuthModal>
                )
            }
        </div >
    )
}
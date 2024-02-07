'use client'
import { authAtom, userAtom } from '@/constants'
import { Menu, Transition } from '@headlessui/react'
import { useAtom } from 'jotai'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, usePathname, useRouter } from 'next/navigation'
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
import { RadioGroup } from '@headlessui/react'

interface ILanguage {
    name: string, locale: Locale, icon: React.ReactNode
}

const langs: ILanguage[] = [
    {
        name: 'Eng',
        locale: 'en',
        icon: <Image src={EnIco} width={20} height={20} alt='lang-icon' />
    },
    {
        name: 'Uzb',
        locale: 'uz',
        icon: <Image src={UzIco} width={20} height={20} alt='lang-icon' />
    },
    // {
    //     name: 'Rus',
    //     locale: 'ru',
    //     icon: <Image src={RuIco} width={20} height={20} alt='lang-icon' />
    // },
]

export default function UserDropdown({ className, resources, theme = 'dark' }: { className?: string, resources, theme?: 'dark' | 'light' }) {
    const pathname = usePathname();
    const { lang } = useParams();
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [selectedLang, setSelectedLang] = useState(() => langs.find(l => l.locale === lang) || langs[0])

    const [user, setUser] = useAtom(userAtom)
    const [auth, setAuth] = useAtom(authAtom)

    const redirectedPathName = (locale: Locale) => {
        if (!pathname) return "/";
        const segments = pathname.split("/");
        segments[1] = locale;
        return segments.join("/");
    };

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


    const onChangeLang = (locale) => {
        try {
            localStorage.setItem('selectLocale', locale)
        }
        catch (err) {
            console.log(err);
        }
    }

    if (loading) {
        return null
    }

    return (
        <div className={`flex items-center sm:mr-3 ${className}`}>
            {
                user.loaded ? (
                    <Menu as="div" className="relative inline-block text-left">
                        <div>
                            <Menu.Button className={`flex items-center hover:bg-gray-200 px-2 py-1 rounded-md outline-none ${theme === 'light' ? 'text-white hover:bg-opacity-30' : 'text-dark'}`}>
                                <span className='text-xl mr-1'>
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

                                <div className='py-1 px-2   '>
                                    <RadioGroup value={selectedLang} onChange={setSelectedLang}>
                                        <RadioGroup.Label className="sr-only">Select language</RadioGroup.Label>
                                        <div className="flex items-center gap-3">
                                            {langs.map((lang) => (
                                                <RadioGroup.Option
                                                    key={lang.name}
                                                    value={lang}
                                                    className={({ checked }) =>
                                                        `${checked ? 'bg-blue' : 'bg-white border border-slate-300'} relative flex cursor-pointer rounded-md outline-none shadow-md`
                                                    }
                                                >
                                                    {({ checked }) => (
                                                        <Link onClick={() => onChangeLang(lang.locale)} href={redirectedPathName(lang.locale)} className="flex items-center gap-2 px-2.5 py-2 rounded-lg cursor-pointer">
                                                            <RadioGroup.Label className={'cursor-pointer'}>
                                                                {lang.icon}
                                                            </RadioGroup.Label>
                                                            <RadioGroup.Description
                                                                as="span"
                                                                className={`inline font-medium ${checked ? 'text-white' : 'text-gray-700'
                                                                    } text-sm`}
                                                            >
                                                                {lang.name}
                                                            </RadioGroup.Description>
                                                        </Link>
                                                    )}
                                                </RadioGroup.Option>
                                            ))}
                                        </div>
                                    </RadioGroup>
                                </div>
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
                            {resources.userdropdown.login}
                        </div>
                    </AuthModal>
                )
            }
        </div >
    )
}
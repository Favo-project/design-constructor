'use client'
import Image from "next/image";
import { avatar } from "../assets";
import { useEffect, useState } from 'react'
import { Tab } from '@headlessui/react'
import axios from "axios";
import { authAtom, imageTypes, userAtom } from "@/constants";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { PatternFormat } from "react-number-format";
import SolidBtn from "@/components/form-elements/SolidBtn";
import UserDropdown from "@/components/UserDropdown";
import LocaleSwitcher from "@/components/LocaleSwitcher";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Account({ resources }) {
    const router = useRouter()
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [photo, setPhoto] = useState<File>()
    const [imageError, setImageError] = useState('')

    const [user, setUser] = useAtom(userAtom)
    const [auth, setAuth] = useAtom(authAtom)

    const imageFilter = (imgFile) => {
        if (imgFile?.size > 1024 * 1024 * 5) {
            setImageError(resources.dashboard.account.maximagesize)
            return false
        }
        if (!imageTypes.includes(imgFile?.type)) {
            setImageError(resources.dashboard.account.onlyimages)
            return false
        }
        return true
    }

    const changeCredentials = async (e) => {
        e.preventDefault()

        const data = new FormData()

        data.append('name', user.name)
        data.append('phone', user.phone)
        data.append('email', user.email)
        data.append('photo', photo)

        try {
            const { data: response } = await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/users`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${auth || localStorage.getItem('user_at')}`
                }
            })

            setUser({ ...response.data })
            setAuth(response.newToken)
            localStorage.setItem('user_at', response.newToken)
        }
        catch (err) {
            if (err?.response?.status === 403) {
                router.push('/')
                setAuth('')
                setUser({
                    ...userAtom.init
                })
                localStorage.removeItem('user_at')
            }
        }
    }

    const changePassword = async () => {

    }

    const onChange = (name, value) => {
        setUser({
            ...user, [name]: value
        })
    }

    const onUpload = (e) => {
        if (imageFilter(e.target.files[0])) {
            setPhoto(e.target.files[0])
        }
    }

    useEffect(() => {
        if (imageError) {
            setTimeout(() => {
                setImageError('')
            }, 5000)
        }
    }, [imageError])

    return (
        <div id="account">
            <header className="flex items-center justify-between">
                <h1 className="md:text-3xl text-2xl font-bold text-dark my-8">{resources.dashboard.account.title}</h1>
                <div className="flex items-center gap-3">
                    <LocaleSwitcher />
                    <UserDropdown resources={resources} />
                </div>
            </header>

            <div>
                <div>
                    <div className="flex items-center justify-center sm:justify-start sm:flex-nowrap flex-wrap gap-12 p-8">
                        <div>
                            <Image className="rounded-full w-[160px] h-[160px] object-cover border-2 border-slate-200 object-center" src={user.photo ? (`${process.env.NEXT_PUBLIC_BASE_URL}/files${user?.photo}`) : avatar} alt="account-avatar" width={160} height={160} />
                        </div>
                        <div>
                            <h3 className="font-medium text-3xl font-sans text-slate-700 mb-3">{user.name}</h3>
                            <p className="text-slate-700 font-medium font-sans">{resources.dashboard.account.member} September 2023</p>
                        </div>
                    </div>

                    <div className="w-full max-w-lg px-2 py-8 sm:px-0">
                        <Tab.Group>
                            <Tab.List className="flex space-x-1 rounded-xl p-1 gap-3">
                                <Tab
                                    className={({ selected }) =>
                                        classNames(
                                            'w-full py-2.5 font-medium leading-5',
                                            ' outline-none',
                                            selected
                                                ? 'text-gray-800 border-b-[1.5px] font-semibold border-b-gray-800'
                                                : 'text-gray-400 hover:text-magenta'
                                        )
                                    }
                                >
                                    {resources.dashboard.account.profilesettings}
                                </Tab>
                                <Tab
                                    className={({ selected }) =>
                                        classNames(
                                            'w-full py-2.5 font-medium leading-5',
                                            ' outline-none',
                                            selected
                                                ? 'text-gray-800 border-b-[1.5px] font-semibold border-b-gray-800'
                                                : 'text-gray-400 hover:text-magenta'
                                        )
                                    }
                                >
                                    {resources.dashboard.account.passwordsettings}
                                </Tab>
                                <Tab
                                    className={({ selected }) =>
                                        classNames(
                                            'w-full py-2.5 font-medium leading-5',
                                            ' outline-none',
                                            selected
                                                ? 'text-gray-800 border-b-[1.5px] font-semibold border-b-gray-800'
                                                : 'text-gray-400 hover:text-magenta'
                                        )
                                    }
                                >
                                    {resources.dashboard.account.emailsettings}
                                </Tab>
                            </Tab.List>
                            <Tab.Panels className="mt-2">
                                <Tab.Panel className={"py-6 px-2"}>
                                    <form onSubmit={changeCredentials}>
                                        <div className="flex flex-col mb-12">
                                            <label className="uppercase font-sans text-sm font-bold tracking-widest mb-3 text-slate-600" htmlFor="name">{resources.dashboard.account.name}*</label>
                                            <input value={user.name} onChange={(e) => onChange('name', e.target.value)} className="px-4 py-3.5 bg-transparent outline-none font-semibold rounded-lg border-2 border-slate-200 focus-within:border-slate-600 text-slate-600" type="text" id="name" />
                                        </div>
                                        <div className="flex flex-col mb-12">
                                            <label className="uppercase font-sans text-sm font-bold tracking-widest mb-3 text-slate-600" htmlFor="phone">{resources.dashboard.account.phone}*</label>
                                            <PatternFormat
                                                value={user.phone}
                                                type="tel"
                                                format="+998(##)### ## ##"
                                                mask="_"
                                                onValueChange={value => onChange('phone', value.value)}
                                                required
                                                className='px-4 py-3.5 bg-transparent outline-none font-semibold rounded-lg border-2 border-slate-200 focus-within:border-slate-600 text-slate-600'
                                                name='phone'
                                                id='phone'
                                            />
                                        </div>
                                        <div className="flex flex-col mb-12">
                                            <label className="uppercase font-sans text-sm font-bold tracking-widest mb-3 text-slate-600" htmlFor="email">{resources.dashboard.account.emailadress}</label>
                                            <input value={user.email} onChange={(e) => onChange('email', e.target.value)} className="px-4 py-3.5 bg-transparent outline-none font-semibold rounded-lg border-2 border-slate-200 focus-within:border-slate-600 text-slate-600" type="email" id="email" />
                                        </div>
                                        <div className="flex flex-col mb-12">
                                            <label className="uppercase font-sans text-sm font-bold tracking-widest mb-3 text-slate-600" htmlFor="photo">{resources.dashboard.account.photo}</label>
                                            <input onChange={onUpload} className="px-4 py-3.5 bg-transparent outline-none font-semibold rounded-lg border-2 border-slate-200 focus-within:border-slate-600 text-slate-600" type="file" id="photo" />
                                            <p className="text-slate-600 text-sm mt-2">{resources.dashboard.account.imagetypes}.</p>
                                            <span className="w-full text-red-600 font-medium text-sm">{imageError}</span>
                                        </div>
                                        <div>
                                            <SolidBtn type="submit">
                                                {resources.dashboard.account.savechanges}
                                            </SolidBtn>
                                        </div>
                                    </form>
                                </Tab.Panel>
                                <Tab.Panel className={"py-6 px-2"}>
                                    <form onSubmit={changePassword}>
                                        <div className="flex flex-col mb-12">
                                            <label className="uppercase font-sans text-sm font-bold tracking-widest mb-3 text-slate-600" htmlFor="new-password">{resources.dashboard.account.newpassword}*</label>
                                            <input className="px-4 py-3.5 bg-transparent outline-none font-semibold rounded-lg border-2 border-slate-200 focus-within:border-slate-600 text-slate-600" type="email" id="new-password" />
                                        </div>
                                        <div className="flex flex-col mb-12">
                                            <label className="uppercase font-sans text-sm font-bold tracking-widest mb-3 text-slate-600" htmlFor="confirm-password">{resources.dashboard.account.confirmpassword}*</label>
                                            <input className="px-4 py-3.5 bg-transparent outline-none font-semibold rounded-lg border-2 border-slate-200 focus-within:border-slate-600 text-slate-600" type="email" id="confirm-password" />
                                        </div>
                                        <div>
                                            <SolidBtn>
                                                {resources.dashboard.account.changepassword}
                                            </SolidBtn>
                                        </div>
                                    </form>
                                </Tab.Panel>
                                <Tab.Panel className={"py-6 px-2"}>
                                    Email
                                </Tab.Panel>
                            </Tab.Panels>
                        </Tab.Group>
                    </div>
                </div>
            </div>
        </div>
    )
}
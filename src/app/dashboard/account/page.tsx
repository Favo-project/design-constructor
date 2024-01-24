'use client'
import Image from "next/image";
import { avatar } from "../assets";
import { useState } from 'react'
import { Tab } from '@headlessui/react'
import UserMenu from "../components/UserMenu";
import axios from "axios";
import { authAtom, userAtom } from "@/constants";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { PatternFormat } from "react-number-format";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Account() {
    const router = useRouter()
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [photo, setPhoto] = useState<File>()

    const [user, setUser] = useAtom(userAtom)
    const [auth, setAuth] = useAtom(authAtom)

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

    return (
        <div id="account">
            <header className="flex items-center justify-between">
                <h1 className="md:text-3xl text-2xl font-bold text-slate-600 my-8">Account</h1>
                <UserMenu />
            </header>

            <div>
                <div>
                    <div className="flex items-center justify-center sm:justify-start sm:flex-nowrap flex-wrap gap-12 p-8">
                        <div>
                            <Image className="rounded-full w-[160px] h-[160px] object-cover border-2 border-slate-200 object-center" src={user.photo ? (`${process.env.NEXT_PUBLIC_BASE_URL}/files${user?.photo}`) : avatar} alt="account-avatar" width={160} height={160} />
                        </div>
                        <div>
                            <h3 className="font-medium text-3xl font-sans text-slate-700 mb-3">Dilrozbek Raximov</h3>
                            <p className="text-slate-700 font-medium font-sans">Member since September 2023</p>
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
                                                : 'text-gray-400 hover:text-indigo-500'
                                        )
                                    }
                                >
                                    Profile Settings
                                </Tab>
                                <Tab
                                    className={({ selected }) =>
                                        classNames(
                                            'w-full py-2.5 font-medium leading-5',
                                            ' outline-none',
                                            selected
                                                ? 'text-gray-800 border-b-[1.5px] font-semibold border-b-gray-800'
                                                : 'text-gray-400 hover:text-indigo-500'
                                        )
                                    }
                                >
                                    Password
                                </Tab>
                                <Tab
                                    className={({ selected }) =>
                                        classNames(
                                            'w-full py-2.5 font-medium leading-5',
                                            ' outline-none',
                                            selected
                                                ? 'text-gray-800 border-b-[1.5px] font-semibold border-b-gray-800'
                                                : 'text-gray-400 hover:text-indigo-500'
                                        )
                                    }
                                >
                                    Email Settings
                                </Tab>
                            </Tab.List>
                            <Tab.Panels className="mt-2">
                                <Tab.Panel className={"py-6 px-2"}>
                                    <form onSubmit={changeCredentials}>
                                        <div className="flex flex-col mb-12">
                                            <label className="uppercase font-sans text-sm font-bold tracking-widest mb-3 text-slate-600" htmlFor="name">NAME*</label>
                                            <input value={user.name} onChange={(e) => onChange('name', e.target.value)} className="px-4 py-3.5 bg-transparent outline-none font-semibold rounded-lg border-2 border-slate-200 focus-within:border-slate-600 text-slate-600" type="text" id="name" />
                                        </div>
                                        <div className="flex flex-col mb-12">
                                            <label className="uppercase font-sans text-sm font-bold tracking-widest mb-3 text-slate-600" htmlFor="phone">PHONE*</label>
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
                                                placeholder='Phone'
                                            />
                                        </div>
                                        <div className="flex flex-col mb-12">
                                            <label className="uppercase font-sans text-sm font-bold tracking-widest mb-3 text-slate-600" htmlFor="email">EMAIL ADDRESS</label>
                                            <input value={user.email} onChange={(e) => onChange('email', e.target.value)} className="px-4 py-3.5 bg-transparent outline-none font-semibold rounded-lg border-2 border-slate-200 focus-within:border-slate-600 text-slate-600" type="email" id="email" />
                                        </div>
                                        <div className="flex flex-col mb-12">
                                            <label className="uppercase font-sans text-sm font-bold tracking-widest mb-3 text-slate-600" htmlFor="email">PHOTO</label>
                                            <input onChange={(e) => setPhoto(e.target.files[0])} className="px-4 py-3.5 bg-transparent outline-none font-semibold rounded-lg border-2 border-slate-200 focus-within:border-slate-600 text-slate-600" type="file" id="email" />
                                            <p className="text-slate-600 text-sm mt-2">JPG or PNG. Maximum size of 5MB.</p>
                                        </div>
                                        <div>
                                            <button type="submit" className="px-4 py-3 bg-green-600 text-white font-sans tracking-widest uppercase text-sm font-semibold rounded-lg shadow-md">
                                                SAVE CHANGES
                                            </button>
                                        </div>
                                    </form>
                                </Tab.Panel>
                                <Tab.Panel className={"py-6 px-2"}>
                                    <form onSubmit={changePassword}>
                                        <div className="flex flex-col mb-12">
                                            <label className="uppercase font-sans text-sm font-bold tracking-widest mb-3 text-slate-600" htmlFor="new-password">NEW PASSWORD*</label>
                                            <input className="px-4 py-3.5 bg-transparent outline-none font-semibold rounded-lg border-2 border-slate-200 focus-within:border-slate-600 text-slate-600" type="email" id="new-password" />
                                        </div>
                                        <div className="flex flex-col mb-12">
                                            <label className="uppercase font-sans text-sm font-bold tracking-widest mb-3 text-slate-600" htmlFor="confirm-password">CONFIRM NEW PASSOWRD*</label>
                                            <input className="px-4 py-3.5 bg-transparent outline-none font-semibold rounded-lg border-2 border-slate-200 focus-within:border-slate-600 text-slate-600" type="email" id="confirm-password" />
                                        </div>
                                        <div>
                                            <button className="px-4 py-3 bg-green-600 text-white font-sans tracking-widest uppercase text-sm font-semibold rounded-lg shadow-md">
                                                CHANGE PASSWORD
                                            </button>
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
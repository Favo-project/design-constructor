'use client'
import Image from "next/image";
import { avatar } from "../assets";
import { useState } from 'react'
import { Tab } from '@headlessui/react'
import UserMenu from "../components/UserMenu";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Account() {
    let [categories] = useState({
        "Profile Settings": [
            {
                id: 1,
                title: 'Does drinking coffee make you smarter?',
                date: '5h ago',
                commentCount: 5,
                shareCount: 2,
            },
            {
                id: 2,
                title: "So you've bought coffee... now what?",
                date: '2h ago',
                commentCount: 3,
                shareCount: 2,
            },
        ],
        "Password": [
            {
                id: 1,
                title: 'Is tech making coffee better or worse?',
                date: 'Jan 7',
                commentCount: 29,
                shareCount: 16,
            },
            {
                id: 2,
                title: 'The most innovative things happening in coffee',
                date: 'Mar 19',
                commentCount: 24,
                shareCount: 12,
            },
        ],
        "Email Settings": [
            {
                id: 1,
                title: 'Ask Me Anything: 10 answers to your questions about coffee',
                date: '2d ago',
                commentCount: 9,
                shareCount: 5,
            },
            {
                id: 2,
                title: "The worst advice we've ever heard about coffee",
                date: '4d ago',
                commentCount: 1,
                shareCount: 2,
            },
        ],
    })

    return (
        <div id="account">
            <header className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-slate-600 my-8">Account</h1>
                <UserMenu />
            </header>

            <div>
                <div>
                    <div className="flex items-center gap-12 p-8">
                        <div>
                            <Image className="rounded-full" src={avatar} alt="account-avatar" width={160} height={160} />
                        </div>
                        <div>
                            <h3 className="font-medium text-3xl font-sans text-slate-700 mb-3">Dilrozbek Raximov</h3>
                            <p className="text-slate-700 font-medium font-sans">Member since September 2023</p>
                        </div>
                    </div>

                    <div className="w-full max-w-lg px-2 py-8 sm:px-0">
                        <Tab.Group>
                            <Tab.List className="flex space-x-1 rounded-xl p-1 gap-3">
                                {Object.keys(categories).map((category) => (
                                    <Tab
                                        key={category}
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
                                        {category}
                                    </Tab>
                                ))}
                            </Tab.List>
                            <Tab.Panels className="mt-2">
                                <Tab.Panel className={"py-6 px-2"}>
                                    <div className="flex flex-col mb-12">
                                        <label className="uppercase font-sans text-sm font-bold tracking-widest mb-3 text-slate-600" htmlFor="name">NAME*</label>
                                        <input className="px-4 py-3.5 bg-transparent outline-none font-semibold rounded-lg border-2 border-slate-200 focus-within:border-slate-600 text-slate-600" type="text" id="name" />
                                    </div>
                                    <div className="flex flex-col mb-12">
                                        <label className="uppercase font-sans text-sm font-bold tracking-widest mb-3 text-slate-600" htmlFor="email">EMAIL ADDRESS*</label>
                                        <input className="px-4 py-3.5 bg-transparent outline-none font-semibold rounded-lg border-2 border-slate-200 focus-within:border-slate-600 text-slate-600" type="email" id="email" />
                                    </div>
                                    <div className="flex flex-col mb-12">
                                        <label className="uppercase font-sans text-sm font-bold tracking-widest mb-3 text-slate-600" htmlFor="email">PHOTO</label>
                                        <input className="px-4 py-3.5 bg-transparent outline-none font-semibold rounded-lg border-2 border-slate-200 focus-within:border-slate-600 text-slate-600" type="file" id="email" />
                                        <p className="text-slate-600 text-sm mt-2">JPG or PNG. Maximum size of 5MB.</p>
                                    </div>
                                    <div>
                                        <button className="px-4 py-3 bg-green-600 text-white font-sans tracking-widest uppercase text-sm font-semibold rounded-lg shadow-md">
                                            SAVE CHANGES
                                        </button>
                                    </div>
                                </Tab.Panel>
                                <Tab.Panel className={"py-6 px-2"}>
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
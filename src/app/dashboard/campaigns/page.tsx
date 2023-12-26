'use client'
import Image from "next/image";
import { account, campaign, sale } from "../assets";
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { MdCheck, MdDelete, MdDeleteOutline, MdModeEdit, MdOutlineEdit } from "react-icons/md";
import { GoChevronRight } from "react-icons/go";
import { FaMinus } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { useRouter } from 'next/navigation'
import HelpCard from "@/components/HelpCard";
import Link from "next/link";
import UserMenu from "../components/UserMenu";


export default function Campaigns() {
    const router = useRouter()

    return (
        <div id="overview">
            <header className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-slate-600 my-8">Campaigns</h1>
                <UserMenu />
            </header>

            <div>
                <div className="flex items-end justify-between px-[12%] my-16">
                    <div className="flex flex-col items-center mb-1">
                        <Image src={account} width={124} height={124} alt="account-img" />
                        <h5 className="flex mt-3 items-center text-sm tracking-wider font-sans text-slate-600">
                            Create your account
                            <MdCheck className="ml-2 text-green-600 text-xl" />
                        </h5>
                    </div>
                    <div className="text-2xl text-slate-500">
                        <GoChevronRight />
                    </div>
                    <div className="flex flex-col items-center mb-1">
                        <Image src={campaign} width={124} height={124} alt="account-img" />
                        <h5 className="flex mt-3 items-center text-sm tracking-wider font-sans text-slate-600">
                            Launch your first campaign
                            <MdCheck className="ml-2 text-green-600 text-xl hidden" />
                        </h5>
                    </div>
                    <div className="text-2xl text-slate-500">
                        <GoChevronRight />
                    </div>
                    <div className="flex flex-col items-center mb-1">
                        <Image src={sale} width={124} height={124} alt="account-img" />
                        <h5 className="flex mt-3 items-center text-sm tracking-wider font-sans text-slate-600">
                            Get your first sale
                            <MdCheck className="ml-2 text-green-600 text-xl hidden" />
                        </h5>
                    </div>
                </div>

                <div>
                    <header className="flex items-center justify-between mb-6">
                        {/* <div>
                            <button className="flex items-center text-indigo-700 font-semibold py-2.5 px-4 border border-indigo-300 shadow-lg rounded-lg">Filter campaigns <LuSettings2 className="ml-2 text-xl" /></button>
                        </div> */}

                        <Link href={'/design/start'} className="font-bold text-white bg-indigo-600 py-2.5 font-sans px-4 rounded-lg shadow-md">
                            Start new
                        </Link>
                    </header>

                    <table className="text-left w-full">
                        <thead>
                            <tr>
                                <th className="text-xs font-sans font-bold tracking-widest text-slate-500 pb-5">NAME</th>
                                <th className="text-xs font-sans font-bold tracking-widest text-slate-500 pb-5">SOLD</th>
                                <th className="text-xs font-sans font-bold tracking-widest text-slate-500 pb-5">TOTAL EARNED</th>
                                <th className="text-xs font-sans font-bold tracking-widest text-slate-500 pb-5">STATUS</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="hover:shadow-xl transition-all rounded-md cursor-pointer">
                                <td>
                                    <div className="flex items-center gap-3 p-3">
                                        <div>
                                            <Image priority src={'https://c.bonfireassets.com/thumb/design-image/25b3a15c-2be0-409e-bdda-6bd166933e80/b2b20823-8669-43b2-ab74-7eab5a447081/75/'} alt="product-img" width={48} height={48} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">Draft campaign</p>
                                            <span className="text-xs text-slate-500">0 sold</span>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="text-sm text-slate-600">
                                        <FaMinus />
                                    </div>
                                </td>
                                <td>
                                    <div className="text-sm text-slate-600">
                                        <FaMinus />
                                    </div>
                                </td>
                                <td>
                                    <p className="text-sm text-slate-500">Not launched</p>
                                </td>
                                <td>
                                    <Menu as="div" className="relative inline-block text-left p-3">
                                        <div>
                                            <Menu.Button className="p-2 text-2xl focus:outline-none text-slate-700 hover:text-slate-400 transition-all">
                                                <IoSettingsOutline />
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
                                            <Menu.Items className="absolute right-0 z-20 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-xl ring-1 ring-black/5 focus:outline-none">
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <button
                                                            className={`${active ? 'bg-gray-100 text-slate-600' : 'text-gray-700'
                                                                } group flex w-full items-center rounded-md px-2 py-3 text-sm transition-all`}
                                                        >
                                                            {active ? (
                                                                <MdModeEdit
                                                                    className="mr-2 h-5 w-5"
                                                                    aria-hidden="true"
                                                                />
                                                            ) : (
                                                                <MdOutlineEdit
                                                                    className="mr-2 h-5 w-5"
                                                                    aria-hidden="true"
                                                                />
                                                            )}
                                                            Edit
                                                        </button>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <button
                                                            className={`${active ? 'bg-gray-100 text-slate-600' : 'text-gray-700'
                                                                } group flex w-full items-center rounded-md px-2 py-3 text-sm transition-all`}
                                                        >
                                                            {active ? (
                                                                <MdDelete
                                                                    className="mr-2 h-5 w-5"
                                                                    aria-hidden="true"
                                                                />
                                                            ) : (
                                                                <MdDeleteOutline
                                                                    className="mr-2 h-5 w-5"
                                                                    aria-hidden="true"
                                                                />
                                                            )}
                                                            Duplicate
                                                        </button>
                                                    )}
                                                </Menu.Item>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="py-8 px-7 max-w-xl mt-20 bg-white border border-gray-200 rounded-2xl shadow-lg">
                <HelpCard />
            </div>
        </div>
    )
}
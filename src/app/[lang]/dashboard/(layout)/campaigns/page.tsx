'use client'
import Image from "next/image";
import { account, campaign, sale } from "../assets";
import { Menu, Transition } from '@headlessui/react'
import { Fragment, useLayoutEffect, useState } from 'react'
import { MdCheck, MdDelete, MdDeleteOutline, MdModeEdit, MdOutlineEdit } from "react-icons/md";
import { GoChevronRight } from "react-icons/go";
import { FaCircle, FaMinus, FaRegCircle } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { useRouter } from 'next/navigation'
import HelpCard from "@/components/HelpCard";
import Link from "@/components/Link";
import { BiCopy, BiSolidCopy } from "react-icons/bi";
import axios from "axios";
import { useAtom } from "jotai";
import { authAtom, campaignAtom, userAtom } from "@/constants";
import Loader from "@/components/Loader";
import CampaignDelete from "../components/CampaignDelete";
import UserDropdown from "@/components/UserDropdown";
import SolidBtn from "@/components/form-elements/SolidBtn";
import CampaignImage from "@/components/CampaignImage";
import LocaleSwitcher from "@/components/LocaleSwitcher";


export default function Campaigns({ resources }) {
    const [loading, setLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [campaignId, setCampaignId] = useState('')
    const [title, setTitle] = useState('')
    const router = useRouter()

    const [campaignObj] = useAtom(campaignAtom)
    const [auth, setAuth] = useAtom(authAtom)
    const [user, setUser] = useAtom(userAtom)

    const [campaigns, setCampaigns] = useState([])

    useLayoutEffect(() => {
        const fetch = async () => {
            setLoading(true)

            try {
                const { data: response } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/campaigns`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${auth || localStorage.getItem('user_at')}`,
                    },
                })

                setCampaigns(response.data)
                setLoading(false)
            }
            catch (e) {
                if (e?.response?.status === 403) {
                    setAuth('')
                    setUser({
                        ...userAtom.init
                    })
                    localStorage.removeItem('user_at')
                    setLoading(false)
                    router.push('/')
                }
            }
        }

        fetch()
    }, [auth, campaignObj])

    function closeModal() {
        setIsOpen(false)
    }

    function openModal(campaignId, title) {
        setCampaignId(campaignId)
        setTitle(title)
        setIsOpen(true)
    }

    async function onDelete(campaignId) {
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/campaigns/${campaignId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${auth || localStorage.getItem('user_at')}`
                }
            })

            closeModal()
            const filteredCampaigns = campaigns.filter((c) => c._id !== campaignId)
            setCampaigns([...filteredCampaigns])
        }
        catch (e) {
            if (e?.response?.status === 403) {
                setAuth('')
                setUser({
                    ...userAtom.init
                })
                localStorage.removeItem('user_at')
                router.push('/')
            }
        }
    }

    return (
        <div id="campaigns">
            <header className="flex items-center justify-between">
                <h1 className="md:text-3xl text-2xl font-bold text-dark my-8">{resources.dashboard.campaigns.title}</h1>
                <div className="flex items-center gap-3">
                    <LocaleSwitcher />
                    <UserDropdown resources={resources} />
                </div>
            </header>

            <div>
                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 lg:gap-4 items-end justify-center px-[12%] my-16">
                    <div className="flex items-end m-auto justify-center">
                        <div className="flex flex-col items-center mb-1">
                            <Image src={account} width={124} height={124} alt="account-img" />
                            <h5 className="flex mt-3 items-center text-sm tracking-wider font-sans text-slate-600">
                                {resources.dashboard.campaigns.createaccount}
                                <MdCheck className="ml-2 text-green-600 text-xl" />
                            </h5>
                        </div>
                        <div className="text-2xl hidden md:block text-slate-500">
                            <GoChevronRight />
                        </div>
                    </div>
                    <div className="flex items-end m-auto justify-center">
                        <div className="flex flex-col items-center mb-1">
                            <Image src={campaign} width={124} height={124} alt="account-img" />
                            <h5 className="flex mt-3 items-center text-sm tracking-wider font-sans text-slate-600">
                                {resources.dashboard.campaigns.launchcampaign}
                                <MdCheck className="ml-2 text-green-600 text-xl hidden" />
                            </h5>
                        </div>
                        <div className="text-2xl hidden md:block text-slate-500">
                            <GoChevronRight />
                        </div>
                    </div>
                    <div className="flex flex-col m-auto items-center mb-1">
                        <Image src={sale} width={124} height={124} alt="account-img" />
                        <h5 className="flex mt-3 items-center text-sm tracking-wider font-sans text-slate-600">
                            {resources.dashboard.campaigns.getsale}
                            <MdCheck className="ml-2 text-green-600 text-xl hidden" />
                        </h5>
                    </div>
                </div>

                <div>
                    <header className="flex items-center justify-between mb-6">
                        <SolidBtn href={'/design/start'}>
                            {resources.dashboard.campaigns.start}
                        </SolidBtn>
                    </header>

                    <table className="text-left w-full">
                        <thead>
                            <tr>
                                <th className="text-xs font-sans font-bold tracking-widest text-slate-500 pb-5 uppercase">{resources.dashboard.campaigns.name}</th>
                                <th className="text-xs font-sans font-bold tracking-widest text-slate-500 pb-5 hidden md:table-cell uppercase">{resources.dashboard.campaigns.sold}</th>
                                <th className="text-xs font-sans font-bold tracking-widest text-slate-500 pb-5 hidden md:table-cell uppercase">{resources.dashboard.campaigns.totalearned}</th>
                                <th className="text-xs font-sans font-bold tracking-widest text-slate-500 pb-5 uppercase">{resources.dashboard.campaigns.status}</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td>
                                        <div className="flex justify-center items-center">
                                            <div className="scale-50">
                                                <Loader />
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                !campaigns.length ? (
                                    <tr>
                                        <td>
                                            <h4 className="text-slate-600 text-lg font-sans">{resources.dashboard.campaigns.nocampaigns}</h4>
                                        </td>
                                    </tr>
                                ) : (
                                    campaigns.map((campaign, index) => (
                                        <tr key={index} className="hover:shadow-lg transition-all mb-2 rounded-lg overflow-hidden cursor-pointer relative">
                                            <td>
                                                <Link href={campaign.status === "Launched" ? `/dashboard/details/${campaign._id}` : `/design/start/${campaign._id}`} className="flex items-center gap-3 sm:p-3 after:block after:absolute after:top-0 after:bottom-0 after:left-0 after:right-0 z-10">
                                                    <div>
                                                        <CampaignImage design={campaign.design?.front} background={campaign?.products[0]?.colors[0]?.image?.front} pArea={campaign?.products[0]?.printableArea?.front} width={48} />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium">{campaign.title}</p>
                                                        <span className="text-xs text-slate-500">0 {resources.dashboard.campaigns.soldamount}</span>
                                                    </div>
                                                </Link>
                                            </td>
                                            <td className="hidden md:table-cell">
                                                <div className="text-sm text-slate-600">
                                                    {
                                                        campaign.status === 'Draft' ? <FaMinus /> : '0'
                                                    }
                                                </div>
                                            </td>
                                            <td className="hidden md:table-cell">
                                                <div className="text-sm text-slate-600">
                                                    <FaMinus />
                                                </div>
                                            </td>
                                            <td>
                                                {
                                                    campaign.status === 'Draft' ? (
                                                        <>
                                                            <h4 className="flex text-sm font-semibold text-slate-600 items-center mb-1">
                                                                <span className="text-slate-400 mr-1"><FaRegCircle /></span>
                                                                {resources.dashboard.campaigns.draft}
                                                            </h4>
                                                            <p className="text-sm text-slate-500">{resources.dashboard.campaigns.notlaunched}</p>
                                                        </>
                                                    ) : campaign.status === 'Launched' ? (
                                                        <>
                                                            <h4 className="flex text-sm font-semibold text-slate-600 items-center mb-1">
                                                                <span className="text-green-600 mr-1"><FaCircle /></span>
                                                                On
                                                            </h4>
                                                            <p className="text-sm text-slate-500">{resources.dashboard.campaigns.launched}</p>
                                                        </>
                                                    ) : ''
                                                }
                                            </td>
                                            <td>
                                                <Menu as="div" className="relative inline-block text-left sm:p-3">
                                                    <div>
                                                        <Menu.Button className="p-3 relative text-2xl outline-none text-slate-700 hover:text-slate-400 transition-all">
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
                                                        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-xl ring-1 ring-black/5 outline-none">
                                                            <Menu.Item>
                                                                {({ active }) => (
                                                                    <Link href={campaign.status === 'Launched' ? `/design/products/${campaign._id}` : `/design/start/${campaign._id}`}>
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
                                                                            {resources.dashboard.campaigns.edit}
                                                                        </button>
                                                                    </Link>
                                                                )}
                                                            </Menu.Item>
                                                            <Menu.Item>
                                                                {({ active }) => (
                                                                    <button
                                                                        className={`${active ? 'bg-gray-100 text-slate-600' : 'text-gray-700'
                                                                            } group flex w-full items-center rounded-md px-2 py-3 text-sm transition-all`}
                                                                    >
                                                                        {active ? (
                                                                            <BiSolidCopy
                                                                                className="mr-2 h-5 w-5"
                                                                                aria-hidden="true"
                                                                            />
                                                                        ) : (
                                                                            <BiCopy
                                                                                className="mr-2 h-5 w-5"
                                                                                aria-hidden="true"
                                                                            />
                                                                        )}
                                                                        {resources.dashboard.campaigns.duplicate}
                                                                    </button>
                                                                )}
                                                            </Menu.Item>
                                                            <Menu.Item>
                                                                {({ active, close }) => (
                                                                    <button
                                                                        onClick={() => openModal(campaign._id, campaign.title)}
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
                                                                        {resources.dashboard.campaigns.delete}
                                                                    </button>
                                                                )}
                                                            </Menu.Item>
                                                        </Menu.Items>
                                                    </Transition>
                                                </Menu>
                                            </td>
                                        </tr>
                                    ))
                                )
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="py-4 px-3 lg:py-8 lg:px-7 max-w-xl mt-20 bg-white border border-gray-200 rounded-2xl shadow-lg">
                <HelpCard resources={resources} />
            </div>

            <CampaignDelete resources={resources} closeModal={closeModal} isOpen={isOpen} onDelete={onDelete} title={title} campaignId={campaignId} />
        </div>
    )
}
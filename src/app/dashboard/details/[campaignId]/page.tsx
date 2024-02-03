'use client'
import { Fragment, useLayoutEffect, useState } from 'react'
import { Tab } from '@headlessui/react'
import { Menu, Transition } from '@headlessui/react'
import { authAtom, campaignAtom, userAtom } from "@/constants";
import { useAtom } from "jotai";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { GoChevronLeft } from "react-icons/go";
import Link from "next/link";
import Loading from "../../components/loading";
import { FiLink } from "react-icons/fi";
import { MdDelete, MdDeleteOutline, MdModeEdit, MdOpenInNew, MdOutlineEdit } from "react-icons/md";
import { CiShoppingCart } from "react-icons/ci";
import Image from "next/image";
import { FaCircle, FaRegCircle } from "react-icons/fa6";
import { BsThreeDots } from "react-icons/bs";
import { BiCopy, BiSolidCopy } from 'react-icons/bi';
import CampaignDelete from '../../components/CampaignDelete';
import { VscDebugRestart } from 'react-icons/vsc';
import DraftDialog from '@/app/design/components/DraftDialog';
import SolidBtn from '@/components/form-elements/SolidBtn';
import UserDropdown from '@/components/UserDropdown';
import CampaignImage from '@/components/CampaignImage';

export default function Details() {
    const router = useRouter()
    const [isOpenDraft, setIsOpenDraft] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const { campaignId } = useParams()
    const [loading, setLoading] = useState(true)
    const [campaign, setCampaign] = useState({ ...campaignAtom.init })
    const [auth, setAuth] = useAtom(authAtom)
    const [user, setUser] = useAtom(userAtom)

    useLayoutEffect(() => {
        const fetch = async () => {
            setLoading(true)

            try {
                const { data: response } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/campaigns/${campaignId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${auth || localStorage.getItem('user_at')}`,
                    },
                })

                setCampaign(response.data)
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
    }, [auth])

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    function closeModalDraft() {
        setIsOpenDraft(false)
    }

    function openModalDraft() {
        setIsOpenDraft(true)
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
            router.push('/dashboard/campaigns')
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
            {loading ? <Loading /> : (
                <>
                    <header className="flex items-center justify-between relative">
                        <Link href="/dashboard/campaigns" className="p-2 absolute text-3xl text-slate-400 -left-9 hidden lg:block">
                            <GoChevronLeft />
                        </Link>
                        <h1 className="md:text-3xl text-2xl font-bold text-slate-600 my-5 lg:ml-3">{campaign?.title}</h1>
                        <UserDropdown />
                    </header>
                    <div className="flex items-center mb-14 gap-4 lg:ml-3">
                        <Link href={`/${campaignId}`} className="font-sans hover:text-magenta text-slate-400 flex items-center transition-all">
                            <span className="md:text-2xl text-xl mr-2">
                                <MdOpenInNew />
                            </span>
                            See campaign
                        </Link>
                        <button className="font-sans hover:text-magenta text-slate-400 flex items-center transition-all">
                            <span className="md:text-2xl text-xl mr-2">
                                <FiLink />
                            </span>
                            Copy link
                        </button>
                    </div>
                    <div className='flex items-center md:flex-nowrap flex-wrap gap-5 mb-10 justify-between'>
                        <div className='flex items-center gap-3'>
                            <div>
                                <CampaignImage design={campaign.design?.front} background={campaign?.products[0]?.colors[0]?.image?.front} pArea={campaign?.products[0]?.printableArea?.front} width={48} />
                                {/* <Image src={`${process.env.NEXT_PUBLIC_BASE_URL}/files${campaign.products[0].colors[0].designImg.front}`} width={44} height={44} alt="campaign-img" /> */}
                            </div>
                            <div>
                                <h4 className='flex items-center gap-2 font-bold text-slate-600 mb-1'>
                                    {
                                        campaign.status === 'Launched' ? (
                                            <>
                                                <span className='text-green-600'><FaCircle /></span>
                                                Launched
                                            </>
                                        ) : (
                                            <>
                                                <span className='text-slate-400'><FaRegCircle /></span>
                                                Draft
                                            </>
                                        )
                                    }
                                </h4>
                                <p className='text-sm text-slate-400 font-medium'>
                                    Sep 18 - Jan 15, 2024
                                </p>
                            </div>
                        </div>
                        <div className='flex ml-auto items-center gap-2'>
                            <div>
                                <Menu as="div" className="relative inline-block text-left p-3">
                                    <div>
                                        <Menu.Button className="p-2.5 relative text-2xl outline-none rounded-sm border-2 border-slate-100 text-magenta shadow-lg hover:shadow-none hover:border-gray-800 transition-all">
                                            <BsThreeDots />
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
                                        <Menu.Items className="absolute -right-10 md:right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-xl ring-1 ring-black/5 outline-none">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <Link href={`/design/products/${campaign._id}`}>
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
                                                        Duplicate
                                                    </button>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <button
                                                        onClick={openModalDraft}
                                                        className={`${active ? 'bg-gray-100 text-slate-600' : 'text-gray-700'
                                                            } group flex w-full items-center rounded-md px-2 py-3 text-sm transition-all`}
                                                    >
                                                        {active ? (
                                                            <VscDebugRestart
                                                                className="mr-2 h-5 w-5"
                                                                aria-hidden="true"
                                                            />
                                                        ) : (
                                                            <VscDebugRestart
                                                                className="mr-2 h-5 w-5"
                                                                aria-hidden="true"
                                                            />
                                                        )}
                                                        Revert to draft
                                                    </button>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <button
                                                        onClick={openModal}
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
                                                        Delete
                                                    </button>
                                                )}
                                            </Menu.Item>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                            <SolidBtn href={`/${campaignId}`}>
                                See page
                            </SolidBtn>
                        </div>
                    </div>
                    <div className='mb-6'>
                        <h2 className='text-2xl font-semibold text-slate-700 font-sans mb-6'>
                            Recent sales
                        </h2>

                        <div>
                            <Tab.Group>
                                <Tab.List className={'w-full flex items-center gap-6'}>
                                    <Tab
                                        className={({ selected }) =>
                                            classNames(
                                                'flex py-2.5 font-medium outline-none leading-5 border-b-2',
                                                selected
                                                    ? 'text-slate-700 border-slate-700'
                                                    : 'text-slate-400 hover:text-magenta border-white'
                                            )
                                        }
                                    >
                                        Your buyers
                                    </Tab>
                                    <Tab
                                        className={({ selected }) =>
                                            classNames(
                                                'flex py-2.5 font-medium outline-none leading-5 border-b-2',
                                                selected
                                                    ? 'text-slate-700 border-slate-700'
                                                    : 'text-slate-400 hover:text-magenta border-white'
                                            )
                                        }
                                    >
                                        Sales by product
                                    </Tab>
                                </Tab.List>
                                <Tab.Panels className="mt-4">
                                    <Tab.Panel
                                        className={''}
                                    >
                                        <div className='py-20 flex flex-col items-center justify-center'>
                                            <span className='text-6xl p-8 rounded-full bg-slate-200 mb-6 text-slate-400 flex items-center justify-center'>
                                                <CiShoppingCart />
                                            </span>
                                            <p className='text-lg text-center text-slate-400'>No sales yet. Share your campaign to spread the word.</p>
                                        </div>
                                    </Tab.Panel>
                                    <Tab.Panel
                                        className={''}
                                    >
                                        <div className='py-20'>
                                            amount of products sold
                                        </div>
                                    </Tab.Panel>
                                </Tab.Panels>
                            </Tab.Group>
                        </div>
                    </div>
                    <div>
                        <h2 className='text-2xl font-semibold text-slate-700 font-sans mb-6'>Share</h2>
                        <div className='border-2 border-slate-200 rounded-lg lgp-10 p-4 lg:max-w-md'>
                            <div className='flex flex-col mb-8'>
                                <h3 className='text-xl font-semibold text-slate-600 mb-2'>Share on social</h3>
                                <div className='flex items-center flex-wrap gap-6'>
                                    <div className='flex flex-col items-center'>
                                        <button className='w-14 h-14 p-3 text-slate-500 rounded-full bg-slate-100 mb-1'>F</button>
                                        <span className='text-slate-500 font-sans font-medium'>
                                            Facebook
                                        </span>
                                    </div>
                                    <div className='flex flex-col items-center'>
                                        <button className='w-14 h-14 p-3 text-slate-500 rounded-full bg-slate-100 mb-1'>I</button>
                                        <span className='text-slate-500 font-sans font-medium'>
                                            Instagram
                                        </span>
                                    </div>
                                    <div className='flex flex-col items-center'>
                                        <button className='w-14 h-14 p-3 text-slate-500 rounded-full bg-slate-100 mb-1'>F</button>
                                        <span className='text-slate-500 font-sans font-medium'>
                                            Facebook
                                        </span>
                                    </div>
                                    <div className='flex flex-col items-center'>
                                        <button className='w-14 h-14 p-3 text-slate-500 rounded-full bg-slate-100 mb-1'>I</button>
                                        <span className='text-slate-500 font-sans font-medium'>
                                            Instagram
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col'>
                                <h3 className='text-xl font-semibold text-slate-600 mb-2'>Send a link</h3>
                                <div className='flex items-center flex-wrap gap-6'>
                                    <div className='flex flex-col items-center'>
                                        <button className='w-14 h-14 p-3 text-slate-500 rounded-full bg-slate-100 mb-1'>C</button>
                                        <span className='text-slate-500 font-sans font-medium'>
                                            Copy link
                                        </span>
                                    </div>
                                    <div className='flex flex-col items-center'>
                                        <button className='w-14 h-14 p-3 text-slate-500 rounded-full bg-slate-100 mb-1'>Sh</button>
                                        <span className='text-slate-500 font-sans font-medium'>
                                            Share
                                        </span>
                                    </div>
                                    <div className='flex flex-col items-center'>
                                        <button className='w-14 h-14 p-3 text-slate-500 rounded-full bg-slate-100 mb-1'>C</button>
                                        <span className='text-slate-500 font-sans font-medium'>
                                            Copy link
                                        </span>
                                    </div>
                                    <div className='flex flex-col items-center'>
                                        <button className='w-14 h-14 p-3 text-slate-500 rounded-full bg-slate-100 mb-1'>Sh</button>
                                        <span className='text-slate-500 font-sans font-medium'>
                                            Share
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <CampaignDelete closeModal={closeModal} isOpen={isOpen} onDelete={onDelete} title={campaign.title} campaignId={campaign._id} />
                </>
            )}

            <DraftDialog closeModal={closeModalDraft} isOpen={isOpenDraft} />
        </div>
    )
}

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
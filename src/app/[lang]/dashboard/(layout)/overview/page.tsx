'use client'
import {
  CurrencyDollarIcon,
  UserIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";
import { Menu, Transition } from '@headlessui/react'
import { Fragment, useLayoutEffect, useState } from 'react'
import { MdDelete, MdDeleteOutline, MdModeEdit, MdOutlineEdit } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import HelpCard from "@/components/HelpCard";
import Link from "@/components/Link";
import { authAtom, campaignAtom, userAtom } from "@/constants";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import axios from "axios";
import CampaignDelete from "../components/CampaignDelete";
import Loader from "@/components/Loader";
import { BiCopy, BiSolidCopy } from "react-icons/bi";
import { FaCircle, FaRegCircle } from "react-icons/fa6";
import UserDropdown from "@/components/UserDropdown";
import OutlineBtn from "@/components/form-elements/OutlineBtn";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import Image from "next/image";

export default function Overview({ resources }) {
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

        const campaignData = response.data.splice(0, 3)
        setCampaigns(campaignData)
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
    <div id="overview">
      <CampaignDelete resources={resources} closeModal={closeModal} isOpen={isOpen} onDelete={onDelete} title={title} campaignId={campaignId} />

      <header className="flex items-center justify-between">
        <h1 className="md:text-3xl text-2xl font-bold text-dark my-8">{resources.dashboard.overview.title}</h1>
        <div className="flex items-center gap-3">
          <LocaleSwitcher />
          <UserDropdown resources={resources} />
        </div>
      </header>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-8">
        <div className="flex flex-col gap-8">
          <div className="py-4 px-3 lg:py-6 lg:px-4 xl:py-8 xl:px-7 bg-white border border-gray-200 rounded-2xl shadow-lg">
            <header className="flex items-center mb-8 justify-between">
              <h3 className="text-2xl font-semibold tracking-tight text-gray-600">
                {resources.dashboard.overview.campaigns}
              </h3>
              <Link href={'/design/start'} className="p-1 text-magenta hover:text-transparent hover:bg-gradient-to-r from-magenta to-blue hover:bg-clip-text transition text-sm">
                {resources.dashboard.overview.start}
              </Link>
            </header>
            <div className="campaign-list">
              <ul className="mb-8">
                <li className="flex items-center mb-4">
                  <span className="h-6 w-6 mr-2">
                    <UserIcon aria-hidden="true" />
                  </span>
                  {resources.dashboard.overview.createaccount}
                </li>
                <li className="flex items-center mb-4">
                  <span className="h-6 w-6 mr-2">
                    <RocketLaunchIcon aria-hidden="true" />
                  </span>
                  {resources.dashboard.overview.launchcampaign}
                </li>
                <li className="flex items-center mb-4">
                  <span className="h-6 w-6 mr-2">
                    <CurrencyDollarIcon aria-hidden="true" />
                  </span>
                  {resources.dashboard.overview.getsale}
                </li>
              </ul>
            </div>
            <table className="text-left w-full">
              <thead>
                <tr>
                  <th className="text-xs font-sans font-bold tracking-widest text-slate-500 pb-5 uppercase">{resources.dashboard.overview.name}</th>
                  <th className="text-xs font-sans font-bold tracking-widest text-slate-500 pb-5 uppercase">{resources.dashboard.overview.status}</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                  loading ? (
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
                          <h4 className="text-slate-600 text-lg font-sans">{resources.dashboard.overview.nocampaigns}</h4>
                        </td>
                      </tr>
                    ) : (
                      campaigns.map((campaign, index) => (
                        <tr key={index} className="relative hover:shadow-xl transition-all rounded-md cursor-pointer">
                          <td>
                            <Link href={campaign.status === "Launched" ? `/dashboard/details/${campaign._id}` : `/design/start/${campaign._id}`} className="flex items-center gap-3 sm:p-3 after:block after:absolute after:top-0 after:bottom-0 after:left-0 after:right-0 z-10">
                              <div>
                                <Image className="w-full h-full object-contain" src={`${process.env.NEXT_PUBLIC_BASE_URL}/files${campaign.products?.[0].colors?.[0].designImg?.front}`} alt="campaign-image" width={48} height={48} />
                              </div>
                              <div>
                                <p className="text-sm font-medium">{campaign.title}</p>
                                <span className="text-xs text-slate-500">0 {resources.dashboard.overview.sold}</span>
                              </div>
                            </Link>
                          </td>
                          <td>
                            {
                              campaign.status === 'Draft' ? (
                                <>
                                  <h4 className="flex text-sm font-semibold text-slate-600 items-center mb-1">
                                    <span className="text-slate-400 mr-1"><FaRegCircle /></span>
                                    {resources.dashboard.overview.draft}
                                  </h4>
                                  <p className="text-sm text-slate-500">{resources.dashboard.overview.notlaunched}</p>
                                </>
                              ) : campaign.status === 'Launched' ? (
                                <>
                                  <h4 className="flex text-sm font-semibold text-slate-600 items-center mb-1">
                                    <span className="text-green-600 mr-1"><FaCircle /></span>
                                    On
                                  </h4>
                                  <p className="text-sm text-slate-500">{resources.dashboard.overview.launched}</p>
                                </>
                              ) : ''
                            }
                          </td>
                          <td>
                            <Menu as="div" className="relative inline-block text-left sm:p-3">
                              <div>
                                <Menu.Button className="p-2 relative text-2xl outline-none text-slate-700 hover:text-slate-400 transition-all">
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
                                          {resources.dashboard.overview.edit}
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
                                        {resources.dashboard.overview.duplicate}
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
                                        {resources.dashboard.overview.delete}
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
                  )
                }
              </tbody>
            </table>
            <div className="flex justify-end mt-4">
              <OutlineBtn href={'/dashboard/campaigns'}>
                {resources.dashboard.overview.seeall}
              </OutlineBtn>
            </div>
          </div>
          <div className="py-4 px-3 lg:py-8 lg:px-7 bg-white border border-gray-200 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-semibold tracking-tight text-gray-600">
              {resources.dashboard.overview.campaigns}
            </h3>
            <div>

              <div className="flex flex-col items-center mt-6">
                <h4 className="uppercase font-semibold tracking-wider text-slate-600 text-lg mb-3">
                  {resources.dashboard.overview.nopayouts}
                </h4>
                <p className="text-sm text-slate-600 text-center tracking-wide mb-3">{resources.dashboard.overview.payoutemail}.</p>
                <OutlineBtn className="uppercase" href={'/dashboard/payouts'}>
                  {resources.dashboard.overview.learnmore}
                </OutlineBtn>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="flex flex-col gap-8">
            <div className="py-4 px-3 lg:py-8 lg:px-7 bg-white border border-gray-200 rounded-2xl shadow-lg">
              <h5 className="mb-8 text-2xl font-medium tracking-tight text-gray-600 font-sans">
                {resources.dashboard.overview.recentsales}
              </h5>
              <p className="mb-3 font-normal text-gray-700 text-center">
                {resources.dashboard.overview.nosales}.
              </p>
            </div>
            <div className="py-4 px-3 lg:py-8 lg:px-7 bg-white border border-gray-200 rounded-2xl shadow-lg">
              <HelpCard resources={resources} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

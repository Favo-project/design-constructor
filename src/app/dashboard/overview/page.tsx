'use client'
import {
  CurrencyDollarIcon,
  UserIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { MdDelete, MdDeleteOutline, MdModeEdit, MdOutlineEdit } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import HelpCard from "@/components/HelpCard";

export default function Dashboard() {
  return (
    <div id="overview">
      <header>
        <h1 className="text-3xl font-bold text-slate-600 my-8">Overview</h1>
      </header>
      <div className="grid grid-cols-2 gap-8">
        <div className="flex flex-col gap-8">
          <div className="py-8 px-7 bg-white border border-gray-200 rounded-2xl shadow-lg">
            <header className="flex items-center mb-8 justify-between">
              <h3 className="text-2xl font-semibold tracking-tight text-gray-600">
                Campaigns
              </h3>
              <button className="p-1 text-indigo-600 hover:text-indigo-400 transition text-sm">
                Start new
              </button>
            </header>
            <div className="campaign-list">
              <ul className="mb-8">
                <li className="flex items-center mb-4">
                  <span className="h-6 w-6 mr-2">
                    <UserIcon aria-hidden="true" />
                  </span>
                  Create your account
                </li>
                <li className="flex items-center mb-4">
                  <span className="h-6 w-6 mr-2">
                    <RocketLaunchIcon aria-hidden="true" />
                  </span>
                  Launch your first campaign
                </li>
                <li className="flex items-center mb-4">
                  <span className="h-6 w-6 mr-2">
                    <CurrencyDollarIcon aria-hidden="true" />
                  </span>
                  Get your first sale
                </li>
              </ul>
            </div>
            <table className="text-left w-full">
              <thead>
                <tr>
                  <th className="text-xs font-sans font-bold tracking-widest text-slate-500 pb-5">NAME</th>
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
                        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-xl ring-1 ring-black/5 focus:outline-none">
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
            <div className="flex justify-end mt-4">
              <button className="px-4 py-2 rounded-lg border border-indigo-500 text-indigo-600 font-semibold shadow-lg transition-all">
                See all
              </button>
            </div>
          </div>
          <div className="py-8 px-7 bg-white border border-gray-200 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-semibold tracking-tight text-gray-600">
              Campaigns
            </h3>
            <div>

              <div className="flex flex-col items-center mt-6">
                <h4 className="uppercase font-semibold tracking-wider text-slate-600 text-lg mb-3">
                  NO PAYOUTS YET
                </h4>
                <p className="text-sm text-slate-600 text-center tracking-wide mb-3">No payouts available yet. Don’t worry, we will email you when the first one is ready.</p>
                <button className="px-3 py-2 border-2 border-slate-400 rounded-md text-slate-600 text-sm uppercase font-sans tracking-widest">
                  LEARN MORE
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="flex flex-col gap-8">
            <div className="py-8 px-7 bg-white border border-gray-200 rounded-2xl shadow-lg">
              <h5 className="mb-8 text-2xl font-medium tracking-tight text-gray-600 font-sans">
                Recent sales
              </h5>
              <p className="mb-3 font-normal text-gray-700 text-center">
                You don’t have any sales yet. After you get your first one, they
                will appear here.
              </p>
            </div>
            <div className="py-8 px-7 bg-white border border-gray-200 rounded-2xl shadow-lg">
              <HelpCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client'
import Link from "next/link";
import { useState } from "react";
import { AiOutlineDollar, AiOutlineHome } from "react-icons/ai";
import { BiStore } from "react-icons/bi";
import { BsBarChart } from "react-icons/bs";
import { FiChevronLeft, FiSettings } from "react-icons/fi";

const navigation = [
  {
    name: 'Overview',
    icon: <AiOutlineHome />,
    href: '/dashboard/overview'
  },
  {
    name: 'Campaigns',
    icon: <BsBarChart />,
    href: '/dashboard/campaigns'
  },
  {
    name: 'My Store',
    icon: <BiStore />,
    href: '/dashboard/stores'
  },
  {
    name: 'Payouts',
    icon: <AiOutlineDollar />,
    href: '/dashboard/payouts'
  },
  {
    name: 'Account',
    icon: <FiSettings />,
    href: '/dashboard/account'
  },
  {
    name: 'Back to ArtVibe',
    icon: <FiChevronLeft />,
    href: '/'
  },
]

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => {
    if (isOpen) {
      setIsOpen(false)
    }
    else {
      document.body.style.setProperty('overflow', 'hidden')
      setIsOpen(true)
    }
  }

  return (
    <div className="sidebar">
      <div className="lg:hidden p-2 bg-gray-700">
        <button
          data-drawer-target="default-sidebar"
          data-drawer-toggle="default-sidebar"
          aria-controls="default-sidebar"
          type="button"
          className="inline-flex items-center transition p-3 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 dark:text-gray-400 dark:hover:bg-slate-300"
          onClick={toggleSidebar}
        >
          <span className="sr-only">Open sidebar</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            ></path>
          </svg>
        </button>
      </div>

      <div onClick={toggleSidebar} className={`fixed bg-slate-600 opacity-30 top-0 left-0 right-0 bottom-0 ${isOpen ? 'block' : 'hidden'}`} />

      <aside
        id="default-sidebar"
        className={`fixed top-0 left-0 z-40 w-56 h-screen transition-all lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-700">
          <Link href={'/dashboard/overview'} className="flex flex-col items-center my-6">
            <img
              width={32}
              height={32}
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="logo"
            />
            <span className="block mt-3 text-2xl text-slate-100 font-thin font-mono tracking-wider">
              ArtVibe
            </span>
          </Link>
          <ul className="space-y-4 font-medium">
            {
              navigation.map((link, index) => (
                <li key={index}>
                  <Link
                    onClick={() => setIsOpen(false)}
                    href={link.href}
                    className="flex transition-all items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-500 group"
                  >
                    <span className="text-2xl text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
                      {link.icon}
                    </span>
                    <span className="ml-3">{link.name}</span>
                  </Link>
                </li>
              ))
            }
          </ul>
        </div>
      </aside>
    </div>
  );
}

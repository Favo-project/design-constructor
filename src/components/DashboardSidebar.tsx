'use client'
import { LogoPrimary } from "@/assets";
import Image from "next/image";
import Link from "@/components/Link";
import { useParams, usePathname } from "next/navigation";
import { useState } from "react";
import { AiOutlineDollar, AiOutlineHome } from "react-icons/ai";
import { BiStore } from "react-icons/bi";
import { BsBarChart } from "react-icons/bs";
import { FiChevronLeft, FiSettings } from "react-icons/fi";



export default function Sidebar({ resources }) {
  const [navigation] = useState([
    {
      name: resources.dashboard.sidebar.overview,
      icon: <AiOutlineHome />,
      href: '/dashboard/overview'
    },
    {
      name: resources.dashboard.sidebar.campaigns,
      icon: <BsBarChart />,
      href: '/dashboard/campaigns',
      subLinks: ['/dashboard/details']
    },
    {
      name: resources.dashboard.sidebar.store,
      icon: <BiStore />,
      href: '/dashboard/stores'
    },
    {
      name: resources.dashboard.sidebar.payouts,
      icon: <AiOutlineDollar />,
      href: '/dashboard/payouts'
    },
    {
      name: resources.dashboard.sidebar.account,
      icon: <FiSettings />,
      href: '/dashboard/account'
    },
    {
      name: resources.dashboard.sidebar.back,
      icon: <FiChevronLeft />,
      href: '/'
    },
  ])

  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => {
    if (isOpen) {
      setIsOpen(false)
      document.body.style.setProperty('overflow', 'unset')
    }
    else {
      document.body.style.setProperty('overflow', 'hidden')
      setIsOpen(true)
    }
  }

  const onLink = () => {
    setIsOpen(false)
    document.body.style.setProperty('overflow', 'unset')
  }

  const isActive = (link) => {
    if (link.href === '/') return false
    let value = pathname.indexOf(link.href) !== -1
    if (link.subLinks?.length) {
      link.subLinks.forEach(link => {
        if (pathname.indexOf(link) !== -1) value = true
      })
    }
    return value
  }

  return (
    <div className="sidebar">
      <div className="lg:hidden p-2 bg-dark">
        <button
          data-drawer-target="default-sidebar"
          data-drawer-toggle="default-sidebar"
          aria-controls="default-sidebar"
          type="button"
          className="inline-flex items-center transition p-3 text-sm rounded-lg focus:outline-none focus:ring-2 text-white hover:text-magenta"
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
        <div className="h-full px-3 py-4 overflow-y-auto bg-dark">
          <Link href={'/dashboard/overview'} className="flex flex-col items-center justify-center mt-8 mb-14">
            <Image src={LogoPrimary} alt="artvibe-logo" width={60} height={38} />
          </Link>
          <ul className="space-y-4 font-medium">
            {
              navigation.map((link, index) => (
                <li key={index}>
                  <Link
                    onClick={onLink}
                    href={link.href}
                    className={`${isActive(link) ? 'text-gray-800 bg-white bg-opacity-75' : 'text-white hover:text-transparent hover:bg-gradient-to-r from-magenta to-blue hover:bg-clip-text'} flex transition-all items-center p-2 rounded-lg group`}
                  >
                    <span className={`${isActive(link) ? 'text-gray-800' : 'text-white group-hover:text-magenta'} transition duration-75`}>
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

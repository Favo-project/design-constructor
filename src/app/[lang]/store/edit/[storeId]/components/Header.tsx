import Image from "next/image";
import HeaderImg from '../../../[storeId]/wallhaven-k7zv97.jpg'
import { FaBarsStaggered } from "react-icons/fa6";
import { LogoMain, LogoPrimary } from "@/assets";
import { BsCart4 } from "react-icons/bs";

export default function Header() {
    return (
        <header className="relative">
            <div className="absolute z-10 top-0 right-0 bottom-0 left-0 bg-black bg-opacity-50" />

            <Image src={HeaderImg} className="w-full h-[516px] md:h-[450px] object-cover object-center" alt="store-header" width={1200} height={450} />

            <nav className="container absolute z-20 top-6 bg-transparent m-auto max-w-7xl sm:px-4 px-2 py-3 flex items-center justify-between opacity-50">
                <div className='flex-[2] flex items-center gap-5 ml-4'>
                    <div>
                        <div className={`flex items-center font-mono uppercase tracking-widest ${/* isFixed ? 'text-dark' : */ 'text-white'}`}>
                            <span className={`text-lg mr-2`}>
                                <FaBarsStaggered />
                            </span>
                            <span className='md:block hidden'>
                                Menu
                            </span>
                        </div>
                    </div>
                </div>

                <div className="absolute left-1/2 -translate-x-1/2 block scale-75 md:scale-100">
                    <Image src={/* isFixed ? LogoMain : */ LogoPrimary} alt="artvibe-logo" width={60} height={38} />
                </div>

                <div className='flex-[2] flex items-center justify-end'>
                    <button className={`relative sm:text-2xl text-[22px] leading-[30px] transition-all p-2 sm:px-3 sm:py-2 ${/* theme === 'light' ? 'text-white' : */ 'text-white'}`}>
                        <BsCart4 />
                    </button>
                </div>
            </nav>

            <div className="absolute z-30 top-0 right-0 bottom-0 left-0 flex items-center justify-center">
                <div className="flex flex-col items-center justify-center mt-14">
                    <h1 className="text-5xl uppercase font-semibold font-sans tracking-widest text-white mb-8">HELLOWEEN</h1>
                    <p className="text-xl uppercase font-medium text-white tracking-widest">OFFICIAL MERCHANDISE</p>
                </div>
            </div>
        </header>
    )
};

import Link from "next/link";
import { GoSearch } from "react-icons/go";

export default function Hero() {
    return (
        <header className="py-12 pt-32">
            <div className="container m-auto max-w-7xl px-6">
                <div className="mb-14">
                    <ul className="flex items-center gap-2">
                        <li>
                            <Link className="text-sm text-slate-600 font-sans font-medium" href={'/'}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <span className="text-sm text-slate-600 font-sans font-medium">
                                /
                            </span>
                        </li>
                        <li>
                            <span className="text-sm text-slate-600 font-sans font-medium border-b-[1.5px] border-b-slate-600">
                                Shop
                            </span>
                        </li>
                    </ul>
                </div>
                <div className="flex flex-wrap items-center gap-8 justify-between">
                    <h1 className="md:text-4xl text-3xl font-sans font-bold tracking-wide text-dark">Explore the <span className="bg-gradient-to-r from-magenta to-blue bg-clip-text text-transparent">ArtVibe</span> marketplace</h1>
                    <div className='relative flex items-center'>
                        <span className='absolute text-lg text-gray-700 left-2'><GoSearch /></span>
                        <input className='p-2 pl-8 text-sm outline-none rounded-lg border-2 border-slate-300 font-sans font-semibold placeholder:text-slate-400 text-slate-600' placeholder='Search' type="text" />
                    </div>
                </div>
            </div>
        </header>
    )
}
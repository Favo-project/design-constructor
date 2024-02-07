import Link from "next/link";
import { GoSearch } from "react-icons/go";

export default function Hero({ resources }) {
    return (
        <header className="py-12 pt-32">
            <div
                className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                aria-hidden="true"
            >
                <div
                    className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                    style={{
                        clipPath:
                            "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                    }}
                />
            </div>

            <div className="container m-auto max-w-7xl px-4">
                <div className="mb-14">
                    <ul className="flex items-center gap-2">
                        <li>
                            <Link className="text-sm text-slate-600 font-sans font-medium" href={'/'}>
                                {resources.shop.hero.link1}
                            </Link>
                        </li>
                        <li>
                            <span className="text-sm text-slate-600 font-sans font-medium">
                                /
                            </span>
                        </li>
                        <li>
                            <span className="text-sm text-slate-600 font-sans font-medium border-b-[1.5px] border-b-slate-600">
                                {resources.shop.hero.link2}
                            </span>
                        </li>
                    </ul>
                </div>
                <div className="flex flex-wrap items-center gap-8 justify-between">
                    <h1 className="md:text-4xl text-3xl font-sans font-bold tracking-wide text-dark">{resources.shop.hero.title1} <span className="bg-gradient-to-r from-magenta to-blue bg-clip-text text-transparent">ArtVibe</span> {resources.shop.hero.title2}</h1>
                    <div className='relative flex items-center'>
                        <span className='absolute text-lg text-gray-700 left-2'><GoSearch /></span>
                        <input className='p-2 pl-8 text-sm outline-none rounded-lg border-2 border-slate-300 font-sans font-semibold placeholder:text-slate-400 text-slate-600' placeholder='Search' type="text" />
                    </div>
                </div>
            </div>
        </header>
    )
}
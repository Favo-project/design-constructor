import Link from "next/link";

export default function Hero() {
    return (
        <header className="py-12 pt-32">
            <div className="container m-auto max-w-7xl px-6">
                <div className="mb-8">
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
                                Design Templates
                            </span>
                        </li>
                    </ul>
                </div>
                <div>
                    <h1 className="text-3xl font-sans font-semibold tracking-wide text-dark mb-8">T-shirt design templates</h1>
                    <p className="text-xl text-gray-700 font-medium font-sans tracking-wide">A collection of free t-shirt templates & design ideas for your custom t-shirt.</p>
                </div>
            </div>
        </header>
    )
}
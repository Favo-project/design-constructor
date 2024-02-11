import Link from "@/components/Link";

export default function Hero({ resources }) {
    return (
        <header className="py-12 pt-32">
            <div className="container m-auto max-w-7xl px-6">
                <div className="mb-8">
                    <ul className="flex items-center gap-2">
                        <li>
                            <Link className="text-sm text-slate-600 font-sans font-medium" href={'/'}>
                                {resources.templates.hero.link1}
                            </Link>
                        </li>
                        <li>
                            <span className="text-sm text-slate-600 font-sans font-medium">
                                /
                            </span>
                        </li>
                        <li>
                            <span className="text-sm text-slate-600 font-sans font-medium border-b-[1.5px] border-b-slate-600">
                                {resources.templates.hero.link2}
                            </span>
                        </li>
                    </ul>
                </div>
                <div>
                    <h1 className="text-3xl font-sans font-semibold tracking-wide text-dark mb-8">{resources.templates.hero.title}</h1>
                    <p className="text-xl text-gray-700 font-medium font-sans tracking-wide">{resources.templates.hero.paragraph}.</p>
                </div>
            </div>
        </header>
    )
}
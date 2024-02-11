import CampaignCard from "@/components/CampaignCard"
import Link from "@/components/Link"

export default function Content({ campaigns, resources }) {
    const categories = [
        {
            name: 'Popular',
        },
        {
            name: 'Adoption',
        },
        {
            name: 'Animal rescue',
        },
        {
            name: 'Disaster relief',
        },
        {
            name: 'Events',
        },
        {
            name: 'Fundraising',
        },
        {
            name: 'Greek',
        },
        {
            name: 'Holidays',
        },
        {
            name: 'Inspirational',
        },
        {
            name: 'Greek',
        },
        {
            name: 'Holidays',
        },
        {
            name: 'Inspirational',
        },
    ]

    return (
        <main className="py-8">
            <div className="container m-auto max-w-7xl px-4">
                <div className="max-w-3xl">
                    <h3 className="font-sans uppercase font-semibold text-slate-700 tracking-wider p-2 mb-4">{resources.shop.content.bycategory}</h3>
                    <ul className="grid grid-cols-3">
                        {
                            categories.map((category, index) => (
                                <li key={index}>
                                    <Link className="font-sans font-medium text-[#3f70a2] px-2 py-1 block" href={'#'}>
                                        {category.name}
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="pt-14">
                    <h2 className="text-2xl font-medium font-sans text-slate-700 mb-4">Popular</h2>
                    <div className="grid md:grid-cols-3 grid-cols-2 gap-10">
                        {
                            campaigns.map((campaign, index) => (
                                <CampaignCard resources={resources} key={index} campaign={campaign} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </main>
    )
}
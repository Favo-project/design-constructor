import { getCampaigns } from "@/api/campaigns"
import CampaignCard from "@/components/CampaignCard"
import OutlineBtn from "@/components/form-elements/OutlineBtn"

export default async function Products({ resources }) {
    const campaigns = await getCampaigns().then(data => data.splice(0, 6))

    return (
        <main className="md:py-16 py-8">
            <div className="container m-auto max-w-7xl">
                <h2 className="text-center text-slate-700 font-semibold tracking-widest font-sans text-xl mb-10 uppercase">{resources.home.products.title}</h2>

                <div className="grid md:grid-cols-3 grid-cols-2 mb-6 justify-center">
                    {
                        campaigns.map((campaign, index) => (
                            <CampaignCard key={index} campaign={campaign} resources={resources} />
                        ))
                    }
                </div>

                <div className="flex justify-center">
                    <OutlineBtn href={'/shop'}
                    >
                        {resources.home.products.marketplace}
                    </OutlineBtn>
                </div>
            </div>
        </main>
    )
}
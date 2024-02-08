import Image from "next/image";
import { payout } from "../assets";
import UserDropdown from "@/components/UserDropdown";

export default function Payouts({ resources }) {
    return (
        <div id="payouts">
            <header className="flex items-center justify-between">
                <h1 className="md:text-3xl text-2xl font-bold text-dark my-8">{resources.dashboard.payouts.title}</h1>
                <UserDropdown resources={resources} />
            </header>
            <div className="flex flex-col items-center pt-8">
                <div>
                    <Image className="rounded-lg shadow-xl" src={payout} alt="payout-img" width={400} height={333} />
                </div>
                <h2 className="text-center text-3xl text-slate-700 font-semibold mt-6 mb-8">{resources.dashboard.payouts.payouttitle}</h2>
                <p className="text-center text-slate-700 max-w-[350px] font-medium tracking-wide">{resources.dashboard.payouts.paragraph}.</p>
            </div>
        </div>
    )
}
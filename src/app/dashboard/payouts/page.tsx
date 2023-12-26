import Image from "next/image";
import { payout } from "../assets";
import UserMenu from "../components/UserMenu";

export default function Payouts() {
    return (
        <div id="payouts">
            <header className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-slate-600 my-8">Payouts</h1>
                <UserMenu />
            </header>
            <div className="flex flex-col items-center pt-8">
                <div>
                    <Image className="rounded-lg shadow-xl" src={payout} alt="payout-img" width={400} height={333} />
                </div>
                <h2 className="text-center text-3xl text-slate-700 font-semibold mt-6 mb-8">No payouts available yet</h2>
                <p className="text-center text-slate-700 max-w-[350px] font-medium tracking-wide">Don’t worry, we will email you when the first one is ready.</p>
            </div>
        </div>
    )
}
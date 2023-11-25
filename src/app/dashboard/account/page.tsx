import Image from "next/image";
import { avatar } from "../assets";

export default function Account() {
    return (
        <div id="account">
            <header>
                <h1 className="text-3xl font-bold text-slate-600 my-8">Campaigns</h1>
            </header>

            <div>
                <div>
                    <div className="flex items-center gap-12 p-8">
                        <div>
                            <Image className="rounded-full" src={avatar} alt="account-avatar" width={160} height={160} />
                        </div>
                        <div>
                            <h3 className="font-medium text-2xl font-sans text-slate-700 mb-3">Dilrozbek Raximov</h3>
                            <p className="text-slate-700 font-sans">Member since September 2023</p>
                        </div>
                    </div>

                    <div>

                    </div>
                </div>
            </div>
        </div>
    )
}
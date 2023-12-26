import StartBtn from "@/components/StartBtn";
import Link from "next/link";
import { BsLayoutTextWindow, BsMailbox } from "react-icons/bs";

export default function Start() {
    return (
        <div className="bg-[#f5f8fc] py-28">
            <div className="container m-auto max-w-7xl">
                <div className="flex flex-col items-center">
                    <h2 className="max-w-[420px] text-3xl text-center font-semibold text-slate-700 font-sans tracking-wide mb-12">Ready to start selling shirts online?</h2>
                    <p className="text-center text-slate-600 font-sans tracking-wide font-medium max-w-[380px] mb-8">You’re only one step away from designing your next favorite shirt.</p>
                    <StartBtn />

                    <div className="flex gap-20 mt-16">
                        <div className="py-10 px-8 text-center flex flex-col items-center shadow-xl bg-white">
                            <span className="block mb-8 text-5xl text-slate-600">
                                <BsLayoutTextWindow />
                            </span>
                            <h3 className="mb-6 text-2xl text-slate-700 font-sans font-semibold tracking-wider">HELP CENTER</h3>
                            <p className="max-w-[380px] mb-6 font-sans text-slate-700">Read through answers to frequently asked question to help you get started.</p>
                            <Link className="inline-flex items-center px-4 py-2.5 rounded-lg border-2 border-slate-600 bg-white text-slate-600 font-sans font-semibold hover:bg-slate-600 hover:text-white transition" href={'/help'}>Read more</Link>
                        </div>
                        <div className="py-10 px-8 text-center flex flex-col items-center shadow-xl bg-white">
                            <span className="block mb-8 text-5xl text-slate-600">
                                <BsMailbox />
                            </span>
                            <h3 className="mb-6 text-2xl text-slate-700 font-sans font-semibold tracking-wider">DROP US A LINE</h3>
                            <p className="max-w-[380px] mb-6 font-sans text-slate-700">Prefer to talk to someone? Send us a message, and we`ll be in touch.</p>
                            <Link className="inline-flex items-center px-4 py-2.5 rounded-lg border-2 border-slate-600 bg-white text-slate-600 font-sans font-semibold hover:bg-slate-600 hover:text-white transition" href={'/contact'}>Contact Us</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
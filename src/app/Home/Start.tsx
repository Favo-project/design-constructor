import StartBtn from "@/components/StartBtn";
import Link from "next/link";

export default function Start() {
    return (
        <div className="bg-[#f5f8fc] py-28">
            <div className="flex flex-col items-center">
                <h2 className="text-3xl text-center font-semibold text-slate-700 font-sans tracking-wide mb-12">Ready to start?</h2>
                <p className="text-center text-slate-600 font-sans tracking-wide font-medium max-w-[380px] mb-8">You’re only one step away from designing your next favorite shirt.</p>
                <StartBtn />
            </div>
        </div>
    )
}
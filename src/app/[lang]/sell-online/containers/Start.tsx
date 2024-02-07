import StartBtn from "@/components/StartBtn";
import OutlineBtn from "@/components/form-elements/OutlineBtn";
import { BsLayoutTextWindow, BsMailbox } from "react-icons/bs";

export default function Start({ resources }) {
    return (
        <div className="bg-[#f5f8fc] py-28">
            <div className="container m-auto max-w-7xl">
                <div className="flex flex-col items-center">
                    <h2 className="max-w-[420px] text-3xl text-center font-semibold text-slate-700 font-sans tracking-wide mb-12">{resources.sellonline.start.title}?</h2>
                    <p className="text-center text-slate-600 font-sans tracking-wide font-medium max-w-[380px] mb-8">{resources.sellonline.start.text}.</p>
                    <StartBtn resources={resources} context={resources.sellonline.start.startbtn} contextOut={resources.sellonline.start.startbtn} />

                    <div className="flex gap-20 mt-16 md:px-6 px-8 flex-wrap md:flex-nowrap">
                        <div className="py-10 px-8 text-center flex flex-col items-center shadow-xl bg-white">
                            <span className="block mb-8 text-5xl text-slate-600">
                                <BsLayoutTextWindow />
                            </span>
                            <h3 className="mb-6 text-2xl text-slate-700 font-sans font-semibold tracking-wider uppercase">{resources.sellonline.start.helpcenter}</h3>
                            <p className="max-w-[380px] mb-6 font-sans text-slate-700">{resources.sellonline.start.helptext}.</p>
                            <OutlineBtn href={'/help'}>{resources.sellonline.start.readmore}</OutlineBtn>
                        </div>
                        <div className="py-10 px-8 text-center flex flex-col items-center shadow-xl bg-white">
                            <span className="block mb-8 text-5xl text-slate-600">
                                <BsMailbox />
                            </span>
                            <h3 className="mb-6 text-2xl text-slate-700 font-sans font-semibold tracking-wider uppercase">{resources.sellonline.start.dropline}</h3>
                            <p className="max-w-[380px] mb-6 font-sans text-slate-700">{resources.sellonline.start.droptext}.</p>
                            <OutlineBtn href={'/contact'}>{resources.sellonline.start.contact}</OutlineBtn>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
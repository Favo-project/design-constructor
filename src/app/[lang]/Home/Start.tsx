import StartBtn from "@/components/StartBtn";

export default function Start({ resources }) {
    return (
        <div className="bg-[#f5f8fc] py-28">
            <div className="flex flex-col items-center">
                <h2 className="text-3xl text-center font-semibold text-slate-700 font-sans tracking-wide mb-12">{resources.home.start.title}?</h2>
                <p className="text-center text-slate-600 font-sans tracking-wide font-medium max-w-[380px] mb-8">{resources.home.start.paragraph}.</p>
                <StartBtn resources={resources} context={resources.home.start.startbtn} contextOut={resources.home.start.startbtn} />
            </div>
        </div>
    )
}
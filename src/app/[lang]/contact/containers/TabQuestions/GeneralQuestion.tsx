import Image from "next/image"
import { useState } from "react"
import { helpImg } from "../../assets"
import SolidBtn from "@/components/form-elements/SolidBtn"
import OutlineBtn from "@/components/form-elements/OutlineBtn"

export default function GeneralQuestion({ resources }) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    return (
        <div>
            <div className="flex items-center justify-between py-8 px-6 bg-[#f9f6f1] border border-gray-200 rounded-2xl shadow-lg mb-14">
                <div>
                    <h2 className="text-2xl font-sans font-semibold tracking-wide text-slate-700 mb-5">{resources?.contact.generalquestion.getanswer}</h2>
                    <p className="font-medium font-sans tracking-wide text-slate-700 mb-5">{resources?.contact.generalquestion.questionanswer}.</p>
                    <div className="inline-block shadow-xl hover:shadow-none transition-all rounded-lg">
                        <OutlineBtn href={'/help'}>{resources?.contact.generalquestion.gethelp}</OutlineBtn>
                    </div>
                </div>
                <div>
                    <Image src={helpImg} alt="help-image" width={170} height={135} />
                </div>
            </div>

            <h3 className="text-xl font-sans font-semibold text-slate-700 mb-2">{resources?.contact.generalquestion.sendmessage}</h3>
            <p className="font-sans font-medium text-slate-700 mb-6">{resources?.contact.generalquestion.respond}.</p>
            <form >
                <div className="grid grid-cols-2 gap-8 mb-6">
                    <div className='mb-6'>
                        <label className='block font-semibold uppercase font-mono tracking-widest text-slate-700 mb-3' htmlFor='name'>{resources?.contact.generalquestion.yourname}?</label>
                        <input className='w-full px-4 py-2.5 font-semibold border-2 border-slate-300 outline-none focus:border-slate-600 text-slate-600 placeholder:text-slate-400 rounded-lg transition-all' value={name} onChange={(e) => setName(e.target.value)} placeholder={resources?.contact.generalquestion.nameplaceholder} name='name' id='name' type="text" />
                    </div>
                    <div className='mb-6'>
                        <label className='block font-semibold uppercase font-mono tracking-widest text-slate-700 mb-3' htmlFor='email'>{resources?.contact.generalquestion.emailadress}*</label>
                        <input required className='w-full px-4 py-2.5 font-semibold border-2 border-slate-300 outline-none focus:border-slate-600 text-slate-600 placeholder:text-slate-400 rounded-lg transition-all' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='hello@example.com' name='email' id='email' type="email" />
                    </div>
                </div>
                <div className='mb-6'>
                    <label className='block font-semibold uppercase font-mono tracking-widest text-slate-700 mb-3' htmlFor='message'>{resources?.contact.generalquestion.message}*</label>
                    <textarea required className='w-full px-4 py-2.5 font-semibold border-2 border-slate-300 outline-none focus:border-slate-600 text-slate-600 placeholder:text-slate-400 rounded-lg transition-all' value={message} onChange={(e) => setMessage(e.target.value)} placeholder={resources?.contact.generalquestion.messageplaceholder} name='message' id='message' rows={4} />
                </div>
                <SolidBtn type="submit" disabled={!email || !message}>
                    {resources?.contact.generalquestion.send}
                </SolidBtn>
            </form>
        </div>
    )
}
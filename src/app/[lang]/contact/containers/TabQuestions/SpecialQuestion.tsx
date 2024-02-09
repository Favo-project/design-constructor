import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import { helpImg } from '../../assets'
import SolidBtn from '@/components/form-elements/SolidBtn'
import OutlineBtn from '@/components/form-elements/OutlineBtn'

export default function SpecialQuestion({ resources }) {
    const [questions] = useState([
        { id: 1, text: resources.contact.specialquestion.questions.selectlist },
        { id: 2, text: resources.contact.specialquestion.questions.pricing, tip: resources.contact.specialquestion.questions.pricingtip },
        { id: 3, text: resources.contact.specialquestion.questions.design, tip: resources.contact.specialquestion.questions.designtip },
        { id: 4, text: resources.contact.specialquestion.questions.campaigns, tip: resources.contact.specialquestion.questions.campaignstip },
        { id: 5, text: resources.contact.specialquestion.questions.other, tip: resources.contact.specialquestion.questions.othertip },
    ])

    const [selected, setSelected] = useState(questions[0].id)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    return (
        <div>
            <div className='mb-10'>
                <label className='block font-semibold uppercase font-mono tracking-widest text-slate-700 mb-3' htmlFor='order-number'>{resources.contact.specialquestion.label}?</label >
                <Listbox value={selected} onChange={setSelected}>
                    <div className="relative mt-1">
                        <Listbox.Button className="relative w-full font-semibold text-slate-600 cursor-default rounded-lg bg-white py-2.5 pl-4 pr-10 text-left outline-none border-2 border-slate-300 focus-visible:border-slate-600 transition-all">
                            <span className="block truncate">{questions.find(q => selected === q.id).text}</span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronDownIcon
                                    className="h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                />
                            </span>
                        </Listbox.Button>
                        <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none">
                                {questions.map((question, idx) => (
                                    <Listbox.Option
                                        key={idx}
                                        className={({ active }) =>
                                            `relative cursor-pointer select-none py-2 pl-10 pr-4 ${active ? 'bg-blue/20 text-blue' : 'text-gray-900'
                                            }`
                                        }
                                        value={question.id}
                                    >
                                        {({ selected }) => (
                                            <>
                                                <span
                                                    className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                        }`}
                                                >
                                                    {question.text}
                                                </span>
                                                {selected ? (
                                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-magenta">
                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </Listbox>
            </div >

            <div>

                {
                    selected === 1 ? (
                        null
                    ) : (
                        <>
                            <p className='font-sans font-medium text-slate-700 mb-5'>{questions.find(q => q.id === selected).tip}</p>

                            <div className="flex items-center justify-between py-8 px-6 bg-[#f9f6f1] border border-gray-200 rounded-2xl shadow-lg mb-14">
                                <div>
                                    <h2 className="text-2xl font-sans font-semibold tracking-wide text-slate-700 mb-5">{resources.contact.specialquestion.getanswer}</h2>
                                    <p className="font-medium font-sans tracking-wide text-slate-700 mb-5">{resources.contact.specialquestion.questionanswer}.</p>
                                    <div className="inline-block shadow-xl hover:shadow-none transition-all rounded-lg">
                                        <OutlineBtn href={'/help'}>{resources.contact.specialquestion.gethelp}</OutlineBtn>
                                    </div>
                                </div>
                                <div>
                                    <Image src={helpImg} alt="help-image" width={170} height={135} />
                                </div>
                            </div>

                            <h3 className="text-xl font-sans font-semibold text-slate-700 mb-2">{resources.contact.specialquestion.sendmessage}</h3>
                            <p className="font-sans font-medium text-slate-700 mb-6">{resources.contact.specialquestion.respond}.</p>
                            <form >
                                <div className="grid grid-cols-2 gap-8 mb-6">
                                    <div className='mb-6'>
                                        <label className='block font-semibold uppercase font-mono tracking-widest text-slate-700 mb-3' htmlFor='name'>{resources.contact.specialquestion.yourname}?</label>
                                        <input className='w-full px-4 py-2.5 font-semibold border-2 border-slate-300 outline-none focus:border-slate-600 text-slate-600 placeholder:text-slate-400 rounded-lg transition-all' value={name} onChange={(e) => setName(e.target.value)} placeholder={resources.contact.specialquestion.nameplaceholder} name='name' id='name' type="text" />
                                    </div>
                                    <div className='mb-6'>
                                        <label className='block font-semibold uppercase font-mono tracking-widest text-slate-700 mb-3' htmlFor='email'>{resources.contact.specialquestion.emailadress}*</label>
                                        <input required className='w-full px-4 py-2.5 font-semibold border-2 border-slate-300 outline-none focus:border-slate-600 text-slate-600 placeholder:text-slate-400 rounded-lg transition-all' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='hello@example.com' name='email' id='email' type="email" />
                                    </div>
                                </div>
                                <div className='mb-6'>
                                    <label className='block font-semibold uppercase font-mono tracking-widest text-slate-700 mb-3' htmlFor='message'>{resources.contact.specialquestion.message}*</label>
                                    <textarea required className='w-full px-4 py-2.5 font-semibold border-2 border-slate-300 outline-none focus:border-slate-600 text-slate-600 placeholder:text-slate-400 rounded-lg transition-all' value={message} onChange={(e) => setMessage(e.target.value)} placeholder={resources.contact.specialquestion.messageplaceholder} name='message' id='message' rows={4} />
                                </div>
                                <SolidBtn disabled={!email || !message}>
                                    {resources.contact.specialquestion.send}
                                </SolidBtn>
                            </form>
                        </>
                    )
                }
            </div>
        </div >
    )
}
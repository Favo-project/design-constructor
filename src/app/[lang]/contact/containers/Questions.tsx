'use client'
import { Tab } from '@headlessui/react'
import { IoStorefrontOutline } from "react-icons/io5";
import { BsQuestionCircle, BsTags } from "react-icons/bs";
import OrderQuestion from './TabQuestions/OrderQuestion';
import SpecialQuestion from './TabQuestions/SpecialQuestion';
import GeneralQuestion from './TabQuestions/GeneralQuestion';
import { IoMdCheckmark } from "react-icons/io";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Questions({ resources }) {

    return (
        <section>
            <div className="container m-auto max-w-5xl px-6">
                <h2 className="text-2xl text-slate-700 font-sans font-semibold mb-10">{resources.contact.questions.title}?</h2>


                <div>
                    <Tab.Group>
                        <Tab.List className="flex gap-6">
                            <Tab
                                className={({ selected }) =>
                                    classNames(
                                        'relative z-30 w-full rounded-lg transition-all',
                                        'outline-none',
                                        selected
                                            ? 'shadow-[inset_0_0_0_2px_#bdc8d9] hover:shadow-[inset_0_0_0_2px_#bdc8d9] after:block after:w-5 after:h-5 after:absolute after:right-2 after:bottom-2 after:rounded-full after:bg-[#2b8265]'
                                            : 'shadow-md hover:shadow-xl'
                                    )
                                }
                            >
                                <div className={`px-4 py-6 rounded-lg transition-all`}>
                                    <div className='flex items-center gap-4'>
                                        <span className='p-2 text-3xl rounded-full text-slate-600 bg-[#f5f8fc] shadow-sm'><BsTags /></span>
                                        <p className='text-slate-600 font-sans font-medium tracking-wide'>{resources.contact.questions.orderissue}</p>
                                    </div>
                                    <span className='absolute z-30 text-white text-sm bottom-[11px] right-[11px]'>
                                        <IoMdCheckmark />
                                    </span>
                                </div>
                            </Tab>
                            <Tab
                                className={({ selected }) =>
                                    classNames(
                                        'relative w-full rounded-lg transition-all',
                                        'outline-none',
                                        selected
                                            ? 'shadow-[inset_0_0_0_2px_#bdc8d9] hover:shadow-[inset_0_0_0_2px_#bdc8d9] after:block after:w-5 after:h-5 after:absolute after:right-2 after:bottom-2 after:rounded-full after:bg-[#2b8265]'
                                            : 'shadow-md hover:shadow-xl'
                                    )
                                }
                            >
                                <div className={`px-4 py-6 rounded-lg transition-all`}>
                                    <div className='flex items-center gap-4'>
                                        <span className='p-2 text-3xl rounded-full text-slate-600 bg-[#f5f8fc] shadow-sm'><IoStorefrontOutline /></span>
                                        <p className='text-slate-600 font-sans font-medium tracking-wide'>{resources.contact.questions.selling}</p>
                                    </div>
                                    <span className='absolute z-30 text-white text-sm bottom-[11px] right-[11px]'>
                                        <IoMdCheckmark />
                                    </span>
                                </div>
                            </Tab>
                            <Tab
                                className={({ selected }) =>
                                    classNames(
                                        'relative w-full rounded-lg transition-all',
                                        'outline-none',
                                        selected
                                            ? 'shadow-[inset_0_0_0_2px_#bdc8d9] hover:shadow-[inset_0_0_0_2px_#bdc8d9] after:block after:w-5 after:h-5 after:absolute after:right-2 after:bottom-2 after:rounded-full after:bg-[#2b8265]'
                                            : 'shadow-md hover:shadow-xl'
                                    )
                                }
                            >
                                <div className={`px-4 py-6 rounded-lg transition-all`}>
                                    <div className='flex items-center gap-4'>
                                        <span className='p-2 text-3xl rounded-full text-slate-600 bg-[#f5f8fc] shadow-sm'><BsQuestionCircle /></span>
                                        <p className='text-slate-600 font-sans font-medium tracking-wide'>{resources.contact.questions.general}</p>
                                    </div>
                                    <span className='absolute z-30 text-white text-sm bottom-[11px] right-[11px]'>
                                        <IoMdCheckmark />
                                    </span>
                                </div>
                            </Tab>

                        </Tab.List>
                        <Tab.Panels className="mt-2">
                            <Tab.Panel className={classNames('py-12 outline-none')}>
                                <OrderQuestion resources={resources} />
                            </Tab.Panel>
                            <Tab.Panel className={classNames('py-12 outline-none')}>
                                <SpecialQuestion resources={resources} />
                            </Tab.Panel>
                            <Tab.Panel className={classNames('py-12 outline-none')}>
                                <GeneralQuestion resources={resources} />
                            </Tab.Panel>
                        </Tab.Panels>
                    </Tab.Group>
                </div>
            </div>
        </section>
    )
}
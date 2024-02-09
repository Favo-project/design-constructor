'use client'
import { Dialog, Transition } from '@headlessui/react'
import Link from 'next/link'
import { Fragment, useState } from 'react'
import { BsCart4 } from 'react-icons/bs'
import { IoMdClose } from 'react-icons/io'
import { LiaShoppingBagSolid } from 'react-icons/lia'

export default function Cart({ theme, resources }: { resources, theme?: 'dark' | 'light' }) {
    const [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    return (
        <div>
            <button onClick={openModal} className={`sm:text-2xl text-[22px] leading-[30px] transition-all p-2 sm:px-3 sm:py-2 ${theme === 'light' ? 'text-white' : 'text-dark'}`}>
                <BsCart4 />
            </button>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={() => { }}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all">
                                    <button onClick={closeModal} className='absolute text-2xl text-slate-500 p-3 top-2 right-2 cursor-pointer'>
                                        <IoMdClose />
                                    </button>
                                    <Dialog.Title
                                        as="h3"
                                        className="text-2xl font-semibold leading-6 text-gray-800"
                                    >
                                        {resources.cart.title}
                                    </Dialog.Title>

                                    <div className='w-full flex flex-col items-center justify-center pt-8 pb-4'>
                                        <div className='w-20 h-20 rounded-full bg-slate-200 grid place-content-center mt-6'>
                                            <span className='text-4xl text-slate-400'>
                                                <LiaShoppingBagSolid />
                                            </span>
                                        </div>
                                        <h4 className='text-lg uppercase font-mono font-semibold text-gray-700 my-6'>{resources.cart.empty}</h4>
                                        <div>
                                            <p className='text-gray-700 font-medium font-sans'>{resources.cart.addsomething}.</p>
                                            <Link href={'/shop'} className='text-magenta font-medium font-sans'>{resources.cart.explore}</Link>
                                        </div>
                                    </div>

                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    )
}
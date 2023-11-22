'use client'
import Image from "next/image";
import { store1, store2 } from "../assets";
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

export default function Stores() {
    const [isOpen, setIsOpen] = useState(false)
    const [name, setName] = useState('')

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    return (
        <div id="stores">
            <header>
                <h1 className="text-3xl font-bold text-slate-600 my-8">Store</h1>
            </header>

            <div className="flex justify-center gap-6">
                <div>
                    <Image className="rounded-lg overflow-hidden shadow-xl h-full" src={store1} alt="store-state" width={190} height={300} />
                </div>
                <div>
                    <Image className="rounded-lg overflow-hidden shadow-xl h-full" src={store2} alt="store-state" width={402} height={300} />
                </div>
            </div>

            <div className="flex flex-col items-center mt-10">
                <p className="max-w-[330px] text-slate-600 font-sans text-center mb-4">Stores make it easy to browse multiple products in one place.</p>

                <button
                    type="button"
                    onClick={openModal}
                    className="rounded-md bg-green-700/80 px-4 py-2 text-sm font-medium text-white hover:bg-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
                >
                    Create my store
                </button>

                <Transition appear show={isOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                                    <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg font-medium leading-6 text-gray-900"
                                        >
                                            Name your store
                                        </Dialog.Title>
                                        <div className="mt-4">
                                            <h5 className="w-full text-sm uppercase font-mono tracking-wider font-semibold mb-3 text-slate-600">TITLE</h5>
                                            <input onChange={(e) => setName(e.target.value)} type="text" className="w-full px-4 py-2.5 border-2 border-indigo-300 outline-none rounded-lg font-semibold mb-3 text-slate-600 placeholder:text-slate-500 placeholder:font-semibold" placeholder="For example: Life with Avery" />
                                            <p className="text-slate-600 text-sm">Don`t worry, you can always change it later.</p>
                                        </div>

                                        <div className="mt-6 flex justify-end">

                                            <button
                                                disabled={!name}
                                                type="button"
                                                className="inline-flex justify-center rounded-lg border border-transparent bg-indigo-500 px-4 py-3 text-sm font-medium text-white hover:bg-indigo-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:bg-indigo-400 disabled:cursor-auto"
                                                onClick={closeModal}
                                            >
                                                Continue
                                            </button>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </div>
        </div>
    )
}
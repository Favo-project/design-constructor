'use client'
import Image from "next/image";
import { store1, store2 } from "../assets";
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import UserDropdown from "@/components/UserDropdown";
import OutlineBtn from "@/components/form-elements/OutlineBtn";
import SolidBtn from "@/components/form-elements/SolidBtn";

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
            <header className="flex items-center justify-between">
                <h1 className="md:text-3xl text-2xl font-bold text-dark my-8">Store</h1>
                <UserDropdown />
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

                <SolidBtn
                    type="button"
                    onClick={openModal}
                >
                    Create my store
                </SolidBtn>

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
                                            <input onChange={(e) => setName(e.target.value)} type="text" className="w-full px-4 py-2.5 border-2 border-magenta border-opacity-70 outline-none rounded-lg font-semibold mb-3 text-slate-600 placeholder:text-slate-500 placeholder:font-semibold" placeholder="For example: Life with Avery" />
                                            <p className="text-slate-600 text-sm">Don`t worry, you can always change it later.</p>
                                        </div>

                                        <div className="mt-6 flex justify-end">

                                            <OutlineBtn
                                                disabled={name === ''}
                                                type="button"
                                                onClick={closeModal}
                                            >
                                                Continue
                                            </OutlineBtn>
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
import { Dialog, Transition } from '@headlessui/react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Fragment, useState } from 'react'
import { GoChevronLeft } from 'react-icons/go'

export default function LaunchDialog({ isOpen, closeModal }) {
    const { campaignId } = useParams()

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={closeModal}>
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
                            <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-10 text-left align-middle shadow-xl transition-all">
                                <div>
                                    <h2 className='text-2xl font-semibold text-slate-700 font-sans mb-6'>Share</h2>
                                    <div>
                                        <div className='flex flex-col mb-8'>
                                            <h3 className='text-xl font-semibold text-slate-600 mb-2'>Share on social</h3>
                                            <div className='flex items-center gap-6'>
                                                <div className='flex flex-col items-center'>
                                                    <button className='w-14 h-14 p-3 text-slate-500 rounded-full bg-slate-100 mb-1'>F</button>
                                                    <span className='text-slate-500 font-sans font-medium'>
                                                        Facebook
                                                    </span>
                                                </div>
                                                <div className='flex flex-col items-center'>
                                                    <button className='w-14 h-14 p-3 text-slate-500 rounded-full bg-slate-100 mb-1'>I</button>
                                                    <span className='text-slate-500 font-sans font-medium'>
                                                        Instagram
                                                    </span>
                                                </div>
                                                <div className='flex flex-col items-center'>
                                                    <button className='w-14 h-14 p-3 text-slate-500 rounded-full bg-slate-100 mb-1'>F</button>
                                                    <span className='text-slate-500 font-sans font-medium'>
                                                        Facebook
                                                    </span>
                                                </div>
                                                <div className='flex flex-col items-center'>
                                                    <button className='w-14 h-14 p-3 text-slate-500 rounded-full bg-slate-100 mb-1'>I</button>
                                                    <span className='text-slate-500 font-sans font-medium'>
                                                        Instagram
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex flex-col'>
                                            <h3 className='text-xl font-semibold text-slate-600 mb-2'>Send a link</h3>
                                            <div className='flex items-center gap-6'>
                                                <div className='flex flex-col items-center'>
                                                    <button className='w-14 h-14 p-3 text-slate-500 rounded-full bg-slate-100 mb-1'>C</button>
                                                    <span className='text-slate-500 font-sans font-medium'>
                                                        Copy link
                                                    </span>
                                                </div>
                                                <div className='flex flex-col items-center'>
                                                    <button className='w-14 h-14 p-3 text-slate-500 rounded-full bg-slate-100 mb-1'>Sh</button>
                                                    <span className='text-slate-500 font-sans font-medium'>
                                                        Share
                                                    </span>
                                                </div>
                                                <div className='flex flex-col items-center'>
                                                    <button className='w-14 h-14 p-3 text-slate-500 rounded-full bg-slate-100 mb-1'>C</button>
                                                    <span className='text-slate-500 font-sans font-medium'>
                                                        Copy link
                                                    </span>
                                                </div>
                                                <div className='flex flex-col items-center'>
                                                    <button className='w-14 h-14 p-3 text-slate-500 rounded-full bg-slate-100 mb-1'>Sh</button>
                                                    <span className='text-slate-500 font-sans font-medium'>
                                                        Share
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex items-center justify-between mt-6'>
                                        <Link href="/dashboard/overview" className='font-medium text-indigo-500 font-sans flex items-center'><span className='text-lg mr-1 flex items-center justify-center'><GoChevronLeft /></span> Dashboard</Link>
                                        <Link href={`/${campaignId}`} className='px-3 py-2 text-white bg-indigo-600 rounded-md shadow-md font-semibold'>See campaign</Link>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}
import Loader from '@/components/Loader'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'

export default function SaveDialog({ resources, isOpen }) {
    return (
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
                    <div className="flex min-h-full pt-[10%] justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-2xl h-min transform overflow-hidden rounded-2xl bg-white px-14 py-10 text-left align-middle shadow-xl transition-all">
                                <div className='flex m-auto justify-center scale-50 -mt-14 -mb-8'>
                                    <Loader />
                                </div>
                                <Dialog.Title
                                    as="h3"
                                    className="text-2xl mb-4 text-center font-mono font-bold leading-6 text-slate-700"
                                >
                                    {resources.designnavbar.savedesign}
                                </Dialog.Title>
                                <div className="mt-2">
                                    <p className="text-center font-sans font-medium text-slate-600">
                                        {resources.designnavbar.text}.
                                    </p>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import Auth from './Auth'

export default function AuthModal({ children, resources }: { resources, children: React.ReactNode }) {
    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    return <>
        <div className="inset-0 flex items-center">
            <button
                type="button"
                onClick={openModal}
            >
                {children}
            </button>
        </div>

        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-[80]" onClose={closeModal}>
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
                            <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 md:px-10 text-left align-middle shadow-xl transition-all">
                                <Auth resources={resources} closeModal={closeModal} />
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    </>
}
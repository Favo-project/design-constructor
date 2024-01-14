import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { GoBell } from 'react-icons/go'

type DeleteProps = { campaignId: string, title: string, isOpen: boolean, closeModal: () => void, onDelete: (campaignId: string) => Promise<void> }

export default function CampaignDelete({ campaignId, title, isOpen, closeModal, onDelete }: DeleteProps) {
    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-30" onClose={closeModal}>
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
                                    <div className='mt-4 mb-6 flex justify-center'>
                                        <span className='w-16 h-16 rounded-full border-2 border-indigo-500 text-indigo-500 flex items-center justify-center text-2xl'>
                                            <GoBell />
                                        </span>
                                    </div>
                                    <Dialog.Title
                                        as="h3"
                                        className="px-10 text-xl text-indigo-600 font-medium leading-6 text-center"
                                    >
                                        Are you sure you want to delete this campaign &quot;{title}&quot;
                                    </Dialog.Title>
                                    <div className="mt-6 mb-4">
                                        <p className="font-sans font-medium text-gray-600">All your progress will be gone.</p>
                                    </div>

                                    <div className="mt-4 flex items-center justify-end gap-3">
                                        <button onClick={closeModal} className='font-sans text-indigo-500'>
                                            Cancel
                                        </button>
                                        <button
                                            type="button"
                                            className="px-4 py-2.5 text-sm uppercase font-sans font-semibold text-white bg-indigo-500 rounded-md"
                                            onClick={() => onDelete(campaignId)}
                                        >
                                            Yes, Delete!
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
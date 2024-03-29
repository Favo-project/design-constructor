import SolidBtn from '@/components/form-elements/SolidBtn'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { GoBell } from 'react-icons/go'

type DeleteProps = { resources, campaignId: string, title: string, isOpen: boolean, closeModal: () => void, onDelete: (campaignId: string) => Promise<void> }

export default function CampaignDelete({ resources, campaignId, title, isOpen, closeModal, onDelete }: DeleteProps) {
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
                                        <span className='w-16 h-16 rounded-full border-2 border-magenta text-magenta flex items-center justify-center text-2xl'>
                                            <GoBell />
                                        </span>
                                    </div>
                                    <Dialog.Title
                                        as="h3"
                                        className="px-10 text-xl text-magenta font-medium leading-6 text-center"
                                    >
                                        {resources.campaigndelete.title} &quot;{title}&quot;
                                    </Dialog.Title>
                                    <div className="mt-6 mb-4">
                                        <p className="font-sans font-medium text-gray-600">{resources.campaigndelete.text}.</p>
                                    </div>

                                    <div className="mt-4 flex items-center justify-end gap-3">
                                        <button onClick={closeModal} className='font-sans text-magenta'>
                                            {resources.campaigndelete.cancel}
                                        </button>
                                        <SolidBtn
                                            type="button"
                                            onClick={() => onDelete(campaignId)}
                                        >
                                            {resources.campaigndelete.delete}!
                                        </SolidBtn>
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
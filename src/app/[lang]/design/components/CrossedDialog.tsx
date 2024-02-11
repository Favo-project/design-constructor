import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { campaignPrintCrossed } from '@/constants'
import { useAtom } from 'jotai'
import SolidBtn from '@/components/form-elements/SolidBtn'
import Link from '@/components/Link'
import { PiTShirtDuotone } from 'react-icons/pi'

export default function CrossedDialog({ resources, onSave, isOpen, closeModal, nextUrl }: { onSave: () => void, isOpen: boolean, closeModal: () => void, nextUrl: string, resources }) {
    const [printCrossed, setPrintCrossed] = useAtom(campaignPrintCrossed)

    const onProceed = () => {
        onSave()
        setPrintCrossed(false)
        closeModal()
    }

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
                            <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-3 sm:p-6 text-left align-middle transition-all">
                                <div className='sm:mt-4 sm:mb-6 mb-3 flex justify-center'>
                                    <span className='w-24 h-24 relative rounded-full border-2 bg-magenta bg-opacity-20 flex items-center justify-center'>
                                        <span className='flex items-center justify-center w-14 h-14 rounded-full shadow-md text-3xl bg-white text-magenta after:absolute after:block after:w-9 after:h-12 after:border-2 after:border-dashed after:border-blue'>
                                            <PiTShirtDuotone />
                                        </span>
                                    </span>
                                </div>
                                <Dialog.Title
                                    as="h3"
                                    className="px-10 md:text-2xl text-lg text-magenta leading-normal font-semibold text-center"
                                >
                                    {resources.crossdialog.title}.
                                </Dialog.Title>
                                <div className="mt-6 mb-4">
                                    <p className="font-sans text-gray-600 mb-3 sm:text-base text-sm">{resources.crossdialog.paragraph1}.</p>
                                    <p className="font-sans text-gray-600 sm:text-base text-sm">{resources.crossdialog.paragraph2}.</p>
                                </div>

                                <div className="mt-4 flex items-center justify-end gap-3">
                                    <button onClick={closeModal} className='font-sans text-blue'>
                                        {resources.crossdialog.cancel}
                                    </button>
                                    <SolidBtn
                                        type="button"
                                        onClick={() => onProceed()}
                                    >
                                        <Link href={nextUrl}>
                                            {resources.crossdialog.continue}
                                        </Link>
                                    </SolidBtn>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition >
    )
}
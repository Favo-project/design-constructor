import { Dialog, Transition } from '@headlessui/react'
import { useParams, useRouter } from 'next/navigation'
import { Fragment } from 'react'
import { GoBell } from 'react-icons/go'
import { campaignTools } from '@/actions/campaignTools'
import { authAtom, campaignAtom, toastAtom, userAtom } from '@/constants'
import { useAtom } from 'jotai'
import Toasts from '@/components/Toasts'
import SolidBtn from '@/components/form-elements/SolidBtn'

export default function DraftDialog({ resources, isOpen, closeModal }) {
    const [toast, setToast] = useAtom(toastAtom)
    const router = useRouter()
    const { campaignId } = useParams()

    const [auth, setAuth] = useAtom(authAtom)
    const [user, setUser] = useAtom(userAtom)
    const [campaign, setCampaign] = useAtom(campaignAtom)

    const onRevert = async () => {
        try {
            const response = await campaignTools.draftCampaign(auth, campaignId)

            setCampaign({ ...campaign, ...response.data })
            router.push(`/design/start/${campaignId}`)
            setToast({ type: "info", message: resources.campaigndraft.wait })
            closeModal()
        }
        catch (e) {
            if (e?.response?.status === 403) {
                setAuth('')
                setUser({
                    ...userAtom.init
                })
                localStorage.removeItem('user_at')
                router.push('/')
            }
            console.log(e?.message);
        }
    }

    return (
        <>
            <Toasts />
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
                                        {resources.campaigndraft.title}?
                                    </Dialog.Title>
                                    <div className="mt-6 mb-4">
                                        <p className="font-sans font-medium text-gray-600">{resources.campaigndraft.paragraph}.</p>
                                    </div>

                                    <div className="mt-4 flex items-center justify-end gap-3">
                                        <button onClick={closeModal} className='font-sans text-magenta'>
                                            {resources.campaigndraft.cancel}
                                        </button>
                                        <SolidBtn
                                            type="button"
                                            onClick={() => onRevert()}
                                        >
                                            {resources.campaigndraft.revert}
                                        </SolidBtn>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>)
}
import { AiOutlinePlus } from "react-icons/ai";
import { BiSolidUserCircle } from "react-icons/bi";
import { BsQuestionCircle } from "react-icons/bs";
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import { FileDrop } from "@/components/FileDrop";
import { RxCross1 } from "react-icons/rx";
import Image from "next/image";
import { useAtom } from "jotai";
import { authAtom, userAtom } from "@/constants";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function AccountSettings() {
    const router = useRouter()
    const [isLogoDialog, setIsLogoDialog] = useState(false)
    const [file, setFile] = useState<File>()
    const [base64Img, setBase64Img] = useState<string>('')

    const [user, setUser] = useAtom(userAtom)
    const [auth, setAuth] = useAtom(authAtom)

    useEffect(() => {
        if (file?.name && file?.size) {
            console.log(file);
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const result: any = reader.result
                setBase64Img(result);
            }
        }
    }, [file])

    function closeModal() {
        setIsLogoDialog(false)
    }

    function openModal() {
        setIsLogoDialog(true)
    }

    const onUpload = async () => {
        const userPhoto = new FormData()
        userPhoto.append('photo', file)

        try {
            const { data: response } = await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/users`, userPhoto, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${auth || localStorage.getItem('user_at')}`
                }
            })

            setUser({ ...user, ...response.data })
            setAuth(response.newToken)
            localStorage.setItem('user_at', response.newToken)
        }
        catch (err) {
            if (err?.response?.status === 403) {
                router.push('/')
                setAuth('')
                setUser({
                    ...userAtom.init
                })
                localStorage.removeItem('user_at')
            }

            console.log(err?.message);
        }
    }

    return (
        <>
            <div className="flex items-center mt-4">
                <button className="relative mr-2 p-0.5 flex items-center justify-center rounded-full border border-dashed border-gray-400" onClick={openModal}>
                    {
                        user.photo ? (
                            <span className="text-xl w-7 h-7">
                                <Image className='w-full h-full rounded-full' src={`${process.env.NEXT_PUBLIC_BASE_URL}/files${user?.photo}`} alt='account-profile' width={20} height={20} />
                            </span>
                        ) : (
                            <>
                                <span className="text-4xl text-gray-300">
                                    <BiSolidUserCircle />
                                </span>
                                <span className="flex items-center justify-center absolute bottom-0 right-0 rounded-full p-[1.5px] text-xs bg-green-700 text-white">
                                    <AiOutlinePlus />
                                </span>
                            </>
                        )
                    }
                </button>
                <p className="text-gray-600 font-medium">
                    by <span>Dilrozbek Raximov</span>
                </p>
                <button className="p-1 ml-2 text-gray-400 hover:text-gray-700"><BsQuestionCircle /></button>
            </div>

            <Transition appear show={isLogoDialog} as={Fragment}>
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
                                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white px-8 py-12 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-xl font-semibold leading-6 mb-6 text-slate-700"
                                    >
                                        Edit profile picture
                                    </Dialog.Title>
                                    <div className="mt-2 mb-8">
                                        <p className="font-sans font-medium text-slate-600">
                                            Add a photo to let your buyers know it&apos;s you
                                        </p>
                                    </div>

                                    <div>
                                        {
                                            file ? (
                                                <div className="flex items-center cursor-auto rounded-md py-4 px-4 text-sm bg-slate-100 border">
                                                    <Image src={base64Img} alt="file-image" width={100} height={100} />
                                                    <button
                                                        onClick={() => setFile(undefined)}
                                                        className="text-sm p-2 mr-2 cursor-pointer border border-slate-300 rounded-md hover:bg-white hover:shadow-md"
                                                    >
                                                        <RxCross1 />
                                                    </button>
                                                </div>
                                            ) : (
                                                <FileDrop setFile={setFile} file={file} />
                                            )
                                        }
                                    </div>

                                    <div className="flex justify-end mt-8 gap-5">
                                        <button onClick={closeModal} className='font-sans text-indigo-500'>
                                            Cancel
                                        </button>
                                        <button
                                            disabled={!file}
                                            type="button"
                                            className="px-4 py-2.5 text-sm uppercase font-sans font-semibold text-white bg-indigo-500 rounded-md disabled:opacity-60 disabled:cursor-not-allowed"
                                            onClick={() => onUpload()}
                                        >
                                            Upload
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
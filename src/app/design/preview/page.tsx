'use client'
import Image from "next/image";
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { BiSolidUserCircle } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { BsCheckLg, BsQuestionCircle } from "react-icons/bs";
import { FaHeading } from 'react-icons/fa6'
import { GrEdit } from 'react-icons/gr'
import { HiOutlinePhotograph } from "react-icons/hi";
import { FiVideo } from "react-icons/fi";

export default function Preview() {
    const [side, setSide] = useState('front')
    const [currentProduct] = useState({
        image: {
            front: 'https://dynamic.bonfireassets.com/thumb/design-image/7b1916f0-a48e-41cc-ad95-c0fa3eeafd2a/557e7359-9490-48a5-a9c0-e51455954637/900/',
            back: 'https://dynamic.bonfireassets.com/thumb/design-image/4b46af63-cedd-4ad9-96ce-6c34329a1d9f/557e7359-9490-48a5-a9c0-e51455954637/900/',
        }
    })
    const [colors] = useState([
        {
            name: "Dark Pink",
            color: "rgb(206, 15, 105)",
        },
        {
            name: "Brown",
            color: "rgb(128, 47, 45)",
        },
    ])
    const [sizes] = useState([
        'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL'
    ])

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    let [isLogoDialog, setIsLogoDialog] = useState(false)

    function closeModal() {
        setIsLogoDialog(false)
    }

    function openModal() {
        setIsLogoDialog(true)
    }

    const flipSide = (side) => {
        if (side === 'front') {
            setSide('front')
        }
        else {
            setSide('back')
        }
    }

    return <div className="container relative m-auto">
        <div className="grid grid-cols-2 py-10 mt-6">
            <div className="sticky top-28 h-min">
                <div>
                    <Image src={currentProduct.image[side]} alt="product-img" width={600} height={600} />
                </div>

                <div>
                    <div className="bg-transparent flex flex-col items-center gap-3 absolute bottom-5 left-1">
                        <button onClick={() => flipSide('front')} className="p-2 bg-white rounded-lg border-2 border-slate-100 hover:border-slate-300 transition-all">
                            <Image src={'https://dynamic.bonfireassets.com/thumb/design-image/7b1916f0-a48e-41cc-ad95-c0fa3eeafd2a/557e7359-9490-48a5-a9c0-e51455954637/75/'} alt="product-img" width={38} height={38} />
                        </button>
                        <button onClick={() => flipSide('back')} className="p-2 rounded-lg border-2 border-slate-100 hover:border-slate-300 transition-all">
                            <Image src={'https://dynamic.bonfireassets.com/thumb/design-image/4b46af63-cedd-4ad9-96ce-6c34329a1d9f/557e7359-9490-48a5-a9c0-e51455954637/75/'} alt="product-img" width={38} height={38} />
                        </button>
                    </div>
                    <button className="absolute bottom-5 left-[35%] px-3 py-2 text-sm font-semibold rounded-lg border-2 shadow-lg border-slate-100 text-indigo-500 hover:border-slate-300 transition-all">
                        Set item as featured
                    </button>
                </div>
            </div>

            <div>

                <div>
                    <input onChange={(e) => setTitle(e.target.value)} placeholder="Click to add title" className="text-3xl w-full xl:w-[70%] font-semibold text-slate-600 p-4 outline-none border border-dashed border-slate-300 hover:border-slate-500 transition mb-3" type="text" value={title} />
                    <input onChange={(e) => setDescription(e.target.value)} placeholder="Describe your campaign in one sentence" className="text-lg w-full xl:w-[70%] p-3 outline-none text-slate-600 border border-dashed border-slate-300 hover:border-slate-500 transition mb-3" type="text" value={description} />
                </div>

                <div className="flex items-center mt-4">
                    <button className="relative mr-2 p-0.5 flex items-center justify-center rounded-full border border-dashed border-gray-400" onClick={openModal}>
                        <span className="text-4xl text-gray-300">
                            <BiSolidUserCircle />
                        </span>
                        <span className="flex items-center justify-center absolute bottom-0 right-0 rounded-full p-[1.5px] text-xs bg-green-700 text-white">
                            <AiOutlinePlus />
                        </span>
                    </button>
                    <p className="text-gray-600 font-medium">
                        by <span>Dilrozbek Raximov</span>
                    </p>
                    <button className="p-1 ml-2 text-gray-400 hover:text-gray-700"><BsQuestionCircle /></button>
                </div>

                <div className="my-6">
                    <h3 className="font-semibold text-slate-600 mb-3 text-base uppercase font-mono">COLOR</h3>
                    <ul className="flex items-center gap-2">
                        {
                            colors.map((color, index) => (
                                <li key={index} className="relative border cursor-pointer border-gray-400 p-1 rounded-full">
                                    <span style={{ background: color.color }} className="flex rounded-full w-6 h-6" />
                                    <span className="text-white absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                                        <BsCheckLg />
                                    </span>
                                </li>
                            ))
                        }
                    </ul>
                </div>

                <div className="my-6">
                    <h3 className="font-semibold text-slate-600 mb-3 text-base uppercase font-mono">STYLE<span className="text-lg ml-2">$36.99 USD</span></h3>
                    <div className="flex gap-3">
                        {
                            [1, 2, 3, 4].map((product, index) => (
                                <div key={index} className="flex cursor-pointer hover:shadow-lg transition-all flex-col items-center px-3 py-4 bg-slate-100 border border-gray-200 rounded-2xl max-w-[125px]">
                                    <div>
                                        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" width="42.96" height="48" viewBox="0 0 42.96 48"><defs><style>{`.product-picker-fill{fill:#BECBD8;}`}</style></defs><title>product-crewneck</title><path className="product-picker-fill" d="M1170.52,3666.55c-3,0-5.3-1.79-5.3-4.07a1,1,0,0,1,2,0c0,1.12,1.51,2.07,3.3,2.07A1,1,0,1,1,1170.52,3666.55Z" transform="translate(-1149.04 -3661.48)"></path><path className="product-picker-fill" d="M1184.61,3709.48h-14.09a1,1,0,0,1,0-2h14.09A1,1,0,1,1,1184.61,3709.48Z" transform="translate(-1149.04 -3661.48)"></path><path className="product-picker-fill" d="M1150,3704.43a1,1,0,0,1-1-1v-33.81a1,1,0,0,1,2,0v33.81A1,1,0,0,1,1150,3704.43Z" transform="translate(-1149.04 -3661.48)"></path><path className="product-picker-fill" d="M1170.52,3666.55a1,1,0,0,1,0-2c1.79,0,3.3-.95,3.3-2.07a1,1,0,0,1,2,0C1175.83,3664.76,1173.5,3666.55,1170.52,3666.55Z" transform="translate(-1149.04 -3661.48)"></path><path className="product-picker-fill" d="M1150,3670.46a1,1,0,0,1-.4-1.92l16.18-7a1,1,0,0,1,.79,1.84l-16.18,7A1,1,0,0,1,1150,3670.46Z" transform="translate(-1149.04 -3661.48)"></path><path className="product-picker-fill" d="M1156.44,3704.43H1150a1,1,0,0,1,0-2h6.39A1,1,0,0,1,1156.44,3704.43Z" transform="translate(-1149.04 -3661.48)"></path><path className="product-picker-fill" d="M1156.44,3709.48a1,1,0,0,1-1-1V3675a1,1,0,0,1,2,0v33.46A1,1,0,0,1,1156.44,3709.48Z" transform="translate(-1149.04 -3661.48)"></path><path className="product-picker-fill" d="M1170.52,3709.48h-14.09a1,1,0,0,1,0-2h14.09A1,1,0,1,1,1170.52,3709.48Z" transform="translate(-1149.04 -3661.48)"></path><path className="product-picker-fill" d="M1184.61,3709.48a1,1,0,0,1-1-1V3675a1,1,0,0,1,2,0v33.46A1,1,0,0,1,1184.61,3709.48Z" transform="translate(-1149.04 -3661.48)"></path><path className="product-picker-fill" d="M1191,3670.46a1,1,0,0,1-.4-0.08l-16.18-7a1,1,0,0,1,.79-1.84l16.18,7A1,1,0,0,1,1191,3670.46Z" transform="translate(-1149.04 -3661.48)"></path><path className="product-picker-fill" d="M1191,3704.43h-6.39a1,1,0,0,1,0-2H1191A1,1,0,0,1,1191,3704.43Z" transform="translate(-1149.04 -3661.48)"></path><path className="product-picker-fill" d="M1191,3704.43a1,1,0,0,1-1-1v-33.81a1,1,0,0,1,2,0v33.81A1,1,0,0,1,1191,3704.43Z" transform="translate(-1149.04 -3661.48)"></path></svg>
                                    </div>
                                    <p className="text-gray-600 text-sm text-center mt-3 font-medium">Crewneck Sweatshirt</p>
                                </div>
                            ))
                        }
                    </div>
                </div>

                <div className="my-8">
                    <h3 className="font-semibold text-slate-600 mb-3 text-base uppercase font-mono">SIZE</h3>
                    <div className="flex flex-wrap mb-3 gap-2">
                        {
                            sizes.map((size, index) => (
                                <button key={index} className="px-3 py-1 rounded-lg border border-slate-200 text-sm text-slate-500 font-semibold font-mono hover:border-slate-400 hover:shadow-md transition-all">
                                    {size}
                                </button>
                            ))
                        }
                    </div>
                    <button className="text-indigo-500 font-sans hover:opacity-75 transition">Size & fabric info</button>
                </div>
            </div>
        </div>

        <div className="max-w-[700px] m-auto mb-14">
            <h3 className="font-semibold text-slate-600 mb-3 text-lg uppercase font-sans tracking-wider">ABOUT THIS CAMPAIGN</h3>
            <div>
                <div className="mb-6">
                    <input className="text-xl w-full font-medium text-slate-600 p-4 outline-none border border-dashed border-slate-300 hover:border-slate-500 transition mb-3" type="text" />
                    <input className="text-base w-full p-3 outline-none text-slate-600 border border-dashed border-slate-300 hover:border-slate-500 transition mb-3" type="text" />
                </div>
                <div className="grid grid-cols-4 gap-3">
                    <button className="flex flex-col items-center p-3 py-4 text-xl rounded-lg shadow-md hover:shadow-2xl transition-all border-2 border-slate-100"><FaHeading /> <span className="block text-sm mt-2">Add heading</span></button>
                    <button className="flex flex-col items-center p-3 py-4 text-xl rounded-lg shadow-md hover:shadow-2xl transition-all border-2 border-slate-100"><GrEdit /> <span className="block text-sm mt-2">Add text</span></button>
                    <button className="flex flex-col items-center p-3 py-4 text-xl rounded-lg shadow-md hover:shadow-2xl transition-all border-2 border-slate-100"><HiOutlinePhotograph /> <span className="block text-sm mt-2">Upload photo</span></button>
                    <button className="flex flex-col items-center p-3 py-4 text-xl rounded-lg shadow-md hover:shadow-2xl transition-all border-2 border-slate-100"><FiVideo /> <span className="block text-sm mt-2">Embed video</span></button>
                </div>
            </div>
        </div>

        <Transition appear show={isLogoDialog} as={Fragment}>
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
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    Payment successful
                                </Dialog.Title>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                        Your payment has been successfully submitted. We’ve sent
                                        you an email with all of the details of your order.
                                    </p>
                                </div>

                                <div className="mt-4">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                        onClick={closeModal}
                                    >
                                        Got it, thanks!
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    </div>
}
'use client'
import Image from "next/image";
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useLayoutEffect, useState } from 'react'
import { BiSolidUserCircle } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { BsCheckLg, BsQuestionCircle } from "react-icons/bs";
import { FaHeading } from 'react-icons/fa6'
import { GrEdit } from 'react-icons/gr'
import { HiOutlinePhotograph } from "react-icons/hi";
import { FiVideo } from "react-icons/fi";
import { useAtom } from "jotai";
import { authAtom, campaignAtom } from "@/constants";
import axios from "axios";
import { useParams } from "next/navigation";
import Loader from "@/components/Loader";
import { formatCurrency } from "../../actions/campaignTools";
import { PiWarningDiamond } from "react-icons/pi";

export default function Preview() {
    const { campaignId } = useParams()
    const [side, setSide] = useState('front')
    const [loading, setLoading] = useState(true)
    const [imgLoading, setImgLoading] = useState(false)

    const [currentProduct, setCurrentProduct] = useState(undefined)
    const [currentColor, setCurrentColor] = useState(0)

    const [auth, setAuth] = useAtom(authAtom)
    const [campaign, setCampaign] = useAtom(campaignAtom)

    const [sizes] = useState([
        'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL'
    ])

    useLayoutEffect(() => {
        const fetch = async () => {
            setLoading(true)
            try {
                const { data: response } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/campaigns/${campaignId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${auth || localStorage.getItem('user_at')}`
                    }
                })

                console.log(response.data);

                setCurrentProduct({ ...response.data.images[0] })
                setCampaign({ ...response.data })
                setLoading(false)
            }
            catch (e) {
                console.log(e);
                setLoading(false)
            }
        }

        fetch()
    }, [campaignId])

    const [isLogoDialog, setIsLogoDialog] = useState(false)

    function closeModal() {
        setIsLogoDialog(false)
    }

    function openModal() {
        setIsLogoDialog(true)
    }

    const flipSide = (side) => {
        setImgLoading(true)
        if (side === 'front') {
            setSide('front')
        }
        else {
            setSide('back')
        }
    }

    const setProduct = (product) => {
        setImgLoading(true)
        setCurrentProduct(product)
        setCurrentColor(0)
    }

    const setColor = (index) => {
        setImgLoading(true)
        setCurrentColor(index)
    }

    const loadImage = (imgUrl) => {
        let origUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/files${imgUrl}`

        const imgElement = document.createElement('img')
        imgElement.crossOrigin = 'anonymous';
        imgElement.src = origUrl

        imgElement.onload = () => {
            setTimeout(() => {
                setImgLoading(false)
            }, 300)
        }

        return origUrl
    }

    const getCurrentPrice = () => {
        const product = campaign.products.find((p) => p.name === currentProduct.name)

        return formatCurrency(product.sellingPrice)
    }

    return <div className="container relative m-auto">
        {loading ? (
            <Loader />
        ) : (
            <div className="grid grid-cols-2 gap-10 py-10 mt-6">
                <div className="sticky flex justify-end top-28 h-min">
                    <div className="relative">
                        <div>
                            <Image className="object-contain w-full h-full" src={loadImage(currentProduct.colors[currentColor].image[side])} alt="product-img" width={600} height={600} />
                        </div>

                        {
                            imgLoading && (
                                <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-white bg-opacity-40">
                                    <Loader />
                                </div>
                            )
                        }

                        <div>
                            <div className="bg-transparent flex flex-col items-center gap-3 absolute bottom-5 left-1">
                                <button onClick={() => flipSide('front')} className="p-2 bg-white rounded-lg border-2 border-slate-100 hover:border-slate-300 transition-all">
                                    <Image src={loadImage(currentProduct.colors[currentColor].image['front'])} alt="product-img" width={38} height={38} />
                                </button>
                                <button onClick={() => flipSide('back')} className="p-2 rounded-lg border-2 border-slate-100 hover:border-slate-300 transition-all">
                                    <Image src={loadImage(currentProduct.colors[currentColor].image['back'])} alt="product-img" width={38} height={38} />
                                </button>
                            </div>
                            <button className="absolute bottom-5 left-[35%] px-3 py-2 text-sm font-semibold rounded-lg border-2 shadow-lg bg-white border-slate-100 text-indigo-500 hover:border-slate-300 transition-all">
                                Set item as featured
                            </button>
                        </div>

                    </div>
                </div>

                <div>
                    <div>
                        <input onChange={(e) => setCampaign({ ...campaign, title: e.target.value })} placeholder="Click to add title" className="text-3xl w-full xl:w-[70%] font-semibold text-slate-600 p-4 outline-none border border-dashed border-slate-300 hover:border-slate-500 transition mb-3" type="text" value={campaign.title === 'Draft campaign' ? '' : campaign.title} required />
                        <input onChange={(e) => setCampaign({ ...campaign, description: e.target.value })} placeholder="Describe your campaign in one sentence" className="text-lg w-full xl:w-[70%] p-3 outline-none text-slate-600 border border-dashed border-slate-300 hover:border-slate-500 transition mb-3" type="text" value={campaign.description || ''} required />
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
                                currentProduct.colors.map(({ color }, index) => (
                                    <li onClick={() => setColor(index)} key={index} className="relative border cursor-pointer border-gray-400 p-1 rounded-full">
                                        <span style={{ background: color.content }} className="flex rounded-full w-6 h-6" />
                                        {
                                            currentColor === index && (
                                                <span className="text-white absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                                                    <BsCheckLg />
                                                </span>
                                            )
                                        }
                                    </li>
                                ))
                            }
                        </ul>
                    </div>

                    <div className="my-6">
                        <h3 className="font-semibold text-slate-600 mb-3 text-base uppercase font-mono">Design<span className="text-lg ml-2">{getCurrentPrice()}</span></h3>
                        <div className="flex flex-wrap gap-3">
                            {
                                campaign.images.map((product, index) => (
                                    <button onClick={() => setProduct(product)} key={index} className={`${product.name === currentProduct.name ? (
                                        'bg-slate-100 border-slate-200'
                                    ) : 'hover:shadow-lg border-gray-100'
                                        } flex cursor-pointer transition-all flex-col items-center px-3 py-4 border-2 rounded-2xl max-w-[125px]`}>
                                        <div>
                                            <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" width="42.96" height="48" viewBox="0 0 42.96 48"><defs><style>{`.product-picker-fill{fill:#BECBD8;}`}</style></defs><title>product-crewneck</title><path className="product-picker-fill" d="M1170.52,3666.55c-3,0-5.3-1.79-5.3-4.07a1,1,0,0,1,2,0c0,1.12,1.51,2.07,3.3,2.07A1,1,0,1,1,1170.52,3666.55Z" transform="translate(-1149.04 -3661.48)"></path><path className="product-picker-fill" d="M1184.61,3709.48h-14.09a1,1,0,0,1,0-2h14.09A1,1,0,1,1,1184.61,3709.48Z" transform="translate(-1149.04 -3661.48)"></path><path className="product-picker-fill" d="M1150,3704.43a1,1,0,0,1-1-1v-33.81a1,1,0,0,1,2,0v33.81A1,1,0,0,1,1150,3704.43Z" transform="translate(-1149.04 -3661.48)"></path><path className="product-picker-fill" d="M1170.52,3666.55a1,1,0,0,1,0-2c1.79,0,3.3-.95,3.3-2.07a1,1,0,0,1,2,0C1175.83,3664.76,1173.5,3666.55,1170.52,3666.55Z" transform="translate(-1149.04 -3661.48)"></path><path className="product-picker-fill" d="M1150,3670.46a1,1,0,0,1-.4-1.92l16.18-7a1,1,0,0,1,.79,1.84l-16.18,7A1,1,0,0,1,1150,3670.46Z" transform="translate(-1149.04 -3661.48)"></path><path className="product-picker-fill" d="M1156.44,3704.43H1150a1,1,0,0,1,0-2h6.39A1,1,0,0,1,1156.44,3704.43Z" transform="translate(-1149.04 -3661.48)"></path><path className="product-picker-fill" d="M1156.44,3709.48a1,1,0,0,1-1-1V3675a1,1,0,0,1,2,0v33.46A1,1,0,0,1,1156.44,3709.48Z" transform="translate(-1149.04 -3661.48)"></path><path className="product-picker-fill" d="M1170.52,3709.48h-14.09a1,1,0,0,1,0-2h14.09A1,1,0,1,1,1170.52,3709.48Z" transform="translate(-1149.04 -3661.48)"></path><path className="product-picker-fill" d="M1184.61,3709.48a1,1,0,0,1-1-1V3675a1,1,0,0,1,2,0v33.46A1,1,0,0,1,1184.61,3709.48Z" transform="translate(-1149.04 -3661.48)"></path><path className="product-picker-fill" d="M1191,3670.46a1,1,0,0,1-.4-0.08l-16.18-7a1,1,0,0,1,.79-1.84l16.18,7A1,1,0,0,1,1191,3670.46Z" transform="translate(-1149.04 -3661.48)"></path><path className="product-picker-fill" d="M1191,3704.43h-6.39a1,1,0,0,1,0-2H1191A1,1,0,0,1,1191,3704.43Z" transform="translate(-1149.04 -3661.48)"></path><path className="product-picker-fill" d="M1191,3704.43a1,1,0,0,1-1-1v-33.81a1,1,0,0,1,2,0v33.81A1,1,0,0,1,1191,3704.43Z" transform="translate(-1149.04 -3661.48)"></path></svg>
                                        </div>
                                        <p className="text-gray-600 text-sm text-center mt-3 font-medium">{product.name}</p>
                                    </button>
                                ))
                            }
                        </div>
                    </div>

                    <div className="my-8">
                        <h3 className="font-semibold text-slate-600 mb-3 text-base uppercase font-mono">SIZE</h3>
                        <div className="flex flex-wrap mb-3 gap-2">
                            {
                                currentProduct.sizes?.length ? (
                                    <>
                                        {
                                            currentProduct.sizes.map((size, index) => (
                                                <button key={index} className="px-3 py-1 rounded-lg border border-slate-200 text-sm text-slate-500 font-semibold font-mono hover:border-slate-400 hover:shadow-md transition-all">
                                                    {size}
                                                </button>
                                            ))}
                                        <button className="text-indigo-500 font-sans hover:opacity-75 transition">Size & fabric info</button>
                                    </>

                                ) : (
                                    <h4 className="text-slate-600 font-sans flex items-center font-semibold">Currently there is no size for this product <span className="text-2xl text-orange-600 ml-2"><PiWarningDiamond /></span></h4>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        )}

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
'use client'
import Image from "next/image";
import { useLayoutEffect, useState } from 'react'
import { BsCheckLg } from "react-icons/bs";
import { FaHeading } from 'react-icons/fa6'
import { GrEdit, GrTag } from 'react-icons/gr'
import { HiOutlinePhotograph } from "react-icons/hi";
import { FiVideo } from "react-icons/fi";
import { useAtom } from "jotai";
import { authAtom, campaignAtom, userAtom } from "@/constants";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import { formatCurrency } from "../../actions/campaignTools";
import { PiWarningDiamond } from "react-icons/pi";
import AccountSettings from "../../components/AccountSettings";
import SizeInfo from "../../components/SizeInfo";
import FeaturedItem from "../../components/FeaturedItem";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const RotateIcon =
    "data:image/png;base64,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";


export default function Preview() {
    const router = useRouter()
    const { campaignId } = useParams()
    const [side, setSide] = useState('front')
    const [loading, setLoading] = useState(true)
    const [imgLoading, setImgLoading] = useState(false)
    const [auth, setAuth] = useAtom(authAtom)
    const [user, setUser] = useAtom(userAtom)

    const [currentProduct, setCurrentProduct] = useState(undefined)
    const [currentColor, setCurrentColor] = useState(0)

    const [campaign, setCampaign] = useAtom(campaignAtom)

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

                let campaignTitle = response.data.title

                setCurrentProduct({ ...response.data.products[0] })
                if (campaignTitle === 'Draft campaign') {
                    campaignTitle = ''
                }
                setCampaign({ ...campaignAtom.init, ...response.data, title: campaignTitle })
                setLoading(false)
            }
            catch (e) {
                if (e?.response?.status === 403) {
                    router.push('/')
                    setAuth('')
                    setUser({
                        name: null,
                        phone: null,
                        loaded: false
                    })
                    localStorage.removeItem('user_at')
                }
                setLoading(false)
            }
        }

        fetch()
    }, [campaignId])

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
            }, 350)
        }

        return origUrl
    }

    const getCurrentPrice = () => {
        const product = campaign.products.find((p) => p.name === currentProduct?.name)

        return formatCurrency(product?.sellingPrice)
    }

    const getCurrentSizes = () => {
        const product = campaign.products.find((p) => p.name === currentProduct?.name)

        return product?.sizes
    }

    const onToggleVisibility = () => {
        if (campaign.soldHidden) {
            setCampaign({ ...campaign, soldHidden: false })
        } else {
            setCampaign({ ...campaign, soldHidden: true })
        }
    }

    return <div className="container relative m-auto">
        {loading ? (
            <Loader />
        ) : (
            <div className="grid grid-cols-2 gap-10 py-10 mt-6">
                <div className="sticky flex justify-end top-28 h-min">
                    <div className="relative">
                        <div className="border-0">
                            <Image priority style={{ objectFit: 'cover', border: 0 }} className="block w-full h-full border-0 no-underline" src={loadImage(currentProduct?.colors[currentColor].designImg[side])} alt="product-img" width={600} height={600} />
                        </div>

                        {
                            imgLoading && (
                                <div className="absolute z-20 top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-white bg-opacity-40">
                                    <Loader />
                                </div>
                            )
                        }

                        <div>
                            <div className="bg-transparent flex flex-col items-center gap-3 absolute bottom-5 left-1 z-10">
                                <button onClick={() => flipSide('front')} className={`${side === 'front' ? 'border-slate-400' : 'border-slate-100 hover:border-slate-200'} p-2 bg-white rounded-lg border-2 transition-all`}>
                                    <Image src={`${process.env.NEXT_PUBLIC_BASE_URL}/files${currentProduct?.colors[currentColor].designImg['front']}`} alt="product-img" width={30} height={30} />
                                </button>
                                <button onClick={() => flipSide('back')} className={`${side === 'back' ? 'border-slate-400' : 'border-slate-100 hover:border-slate-200'} p-2 bg-white rounded-lg border-2  hover:border-slate-300 transition-all`}>
                                    <Image src={`${process.env.NEXT_PUBLIC_BASE_URL}/files${currentProduct?.colors[currentColor].designImg['back']}`} alt="product-img" width={30} height={30} />
                                </button>
                            </div>
                            <FeaturedItem currentProduct={currentProduct} currentColor={currentColor} setCurrentColor={setCurrentColor} />
                        </div>

                    </div>
                </div>

                <div>
                    <div>
                        <input onChange={(e) => setCampaign({ ...campaign, title: e.target.value })} placeholder="Click to add title" className="text-3xl w-full xl:w-[70%] font-semibold text-slate-600 p-4 outline-none border border-dashed border-slate-300 hover:border-slate-500 transition mb-3" type="text" value={campaign.title || ''} required />
                        <input onChange={(e) => setCampaign({ ...campaign, description: e.target.value })} placeholder="Describe your campaign in one sentence" className="text-lg w-full xl:w-[70%] p-3 outline-none text-slate-600 border border-dashed border-slate-300 hover:border-slate-500 transition mb-3" type="text" value={campaign.description || ''} required />
                    </div>

                    <AccountSettings />

                    <div className="my-10">
                        <h3 className="font-semibold text-slate-600 mb-3 text-base uppercase font-mono">COLOR</h3>
                        <ul className="flex items-center gap-2">
                            {
                                currentProduct?.colors.map(({ color }, index) => (
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

                    <div className="my-10">
                        <h3 className="font-semibold text-slate-600 mb-3 text-base uppercase font-mono">Design<span className="text-lg ml-2">{getCurrentPrice()}</span></h3>
                        <div className="flex flex-wrap gap-3">
                            {
                                campaign?.products.map((product, index) => (
                                    <button onClick={() => setProduct(product)} key={index} className={`${product.name === currentProduct.name ? (
                                        'bg-slate-100 border-slate-300 bg-opacity-80'
                                    ) : 'hover:shadow-lg hover:border-gray-100 border-slate-50'
                                        } flex cursor-pointer transition-all flex-col items-center px-3 py-4 border rounded-2xl max-w-[125px]`}>
                                        <div>
                                            <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" width="42.96" height="48" viewBox="0 0 42.96 48"><defs><style>{`.product-picker-fill{fill:#BECBD8;}`}</style></defs><title>product-crewneck</title><path className="product-picker-fill" d="M1170.52,3666.55c-3,0-5.3-1.79-5.3-4.07a1,1,0,0,1,2,0c0,1.12,1.51,2.07,3.3,2.07A1,1,0,1,1,1170.52,3666.55Z" transform="translate(-1149.04 -3661.48)"></path><path className="product-picker-fill" d="M1184.61,3709.48h-14.09a1,1,0,0,1,0-2h14.09A1,1,0,1,1,1184.61,3709.48Z" transform="translate(-1149.04 -3661.48)"></path><path className="product-picker-fill" d="M1150,3704.43a1,1,0,0,1-1-1v-33.81a1,1,0,0,1,2,0v33.81A1,1,0,0,1,1150,3704.43Z" transform="translate(-1149.04 -3661.48)"></path><path className="product-picker-fill" d="M1170.52,3666.55a1,1,0,0,1,0-2c1.79,0,3.3-.95,3.3-2.07a1,1,0,0,1,2,0C1175.83,3664.76,1173.5,3666.55,1170.52,3666.55Z" transform="translate(-1149.04 -3661.48)"></path><path className="product-picker-fill" d="M1150,3670.46a1,1,0,0,1-.4-1.92l16.18-7a1,1,0,0,1,.79,1.84l-16.18,7A1,1,0,0,1,1150,3670.46Z" transform="translate(-1149.04 -3661.48)"></path><path className="product-picker-fill" d="M1156.44,3704.43H1150a1,1,0,0,1,0-2h6.39A1,1,0,0,1,1156.44,3704.43Z" transform="translate(-1149.04 -3661.48)"></path><path className="product-picker-fill" d="M1156.44,3709.48a1,1,0,0,1-1-1V3675a1,1,0,0,1,2,0v33.46A1,1,0,0,1,1156.44,3709.48Z" transform="translate(-1149.04 -3661.48)"></path><path className="product-picker-fill" d="M1170.52,3709.48h-14.09a1,1,0,0,1,0-2h14.09A1,1,0,1,1,1170.52,3709.48Z" transform="translate(-1149.04 -3661.48)"></path><path className="product-picker-fill" d="M1184.61,3709.48a1,1,0,0,1-1-1V3675a1,1,0,0,1,2,0v33.46A1,1,0,0,1,1184.61,3709.48Z" transform="translate(-1149.04 -3661.48)"></path><path className="product-picker-fill" d="M1191,3670.46a1,1,0,0,1-.4-0.08l-16.18-7a1,1,0,0,1,.79-1.84l16.18,7A1,1,0,0,1,1191,3670.46Z" transform="translate(-1149.04 -3661.48)"></path><path className="product-picker-fill" d="M1191,3704.43h-6.39a1,1,0,0,1,0-2H1191A1,1,0,0,1,1191,3704.43Z" transform="translate(-1149.04 -3661.48)"></path><path className="product-picker-fill" d="M1191,3704.43a1,1,0,0,1-1-1v-33.81a1,1,0,0,1,2,0v33.81A1,1,0,0,1,1191,3704.43Z" transform="translate(-1149.04 -3661.48)"></path></svg>
                                        </div>
                                        <p className="text-gray-600 text-sm text-center mt-3 font-medium">{product.name}</p>
                                    </button>
                                ))
                            }
                        </div>
                    </div>

                    <div className="my-10">
                        <h3 className="font-semibold text-slate-600 mb-3 text-base uppercase font-mono">SIZE</h3>
                        <div className="flex flex-wrap mb-3 gap-2">
                            {
                                getCurrentSizes()?.length ? (
                                    <div className="flex flex-col items-start">
                                        <div className="flex gap-2 mb-5">
                                            {
                                                getCurrentSizes()?.map((size, index) => (
                                                    <button key={index} className="px-3 py-1 rounded-lg border border-slate-300 text-sm text-slate-500 font-semibold font-mono hover:border-slate-500 hover:shadow-md transition-all">
                                                        {size}
                                                    </button>
                                                ))
                                            }
                                        </div>
                                        <SizeInfo />
                                    </div>

                                ) : (
                                    <h4 className="text-slate-600 font-sans flex items-center font-semibold">Currently there is no size for this product <span className="text-2xl text-orange-600 ml-2"><PiWarningDiamond /></span></h4>
                                )
                            }
                        </div>
                    </div>

                    <div className="mt-10">
                        <div className="border border-slate-200 px-8 py-6 rounded-xl max-w-md">
                            <div className="flex items-center justify-between">
                                <div className={`${campaign.soldHidden ? 'opacity-25' : 'opacity-100'} flex items-center gap-3`}>
                                    <span className="block text-xl p-2.5     rounded-full bg-slate-100 text-slate-400">
                                        <GrTag className="text-slate-400" />
                                    </span>
                                    <div className="flex flex-col">
                                        <h4 className="uppercase font-mono font-semibold text-slate-500 mb-1">SOLD</h4>
                                        <span className="font-bold text-lg font-sans">{campaign.soldAmount}</span>
                                    </div>
                                </div>
                                <div>
                                    <button className="rounded-md p-2 shadow-xl text-slate-400 bg-gray-100" onClick={onToggleVisibility}>
                                        {
                                            campaign.soldHidden ? (
                                                <span className="text-2xl">
                                                    <IoEyeOutline />
                                                </span>
                                            ) : (
                                                <span className="text-2xl">
                                                    <IoEyeOffOutline />
                                                </span>
                                            )
                                        }

                                    </button>
                                </div>
                            </div>
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
    </div>
}
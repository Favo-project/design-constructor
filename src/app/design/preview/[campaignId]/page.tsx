'use client'
import Image from "next/image";
import { useLayoutEffect, useState } from 'react'
import { BsCheckLg } from "react-icons/bs";
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
import AccountSettings from "../../components/AccountSettings";
import SizeInfo from "../../components/SizeInfo";

export default function Preview() {
    const { campaignId } = useParams()
    const [side, setSide] = useState('front')
    const [loading, setLoading] = useState(true)
    const [imgLoading, setImgLoading] = useState(false)

    const [currentProduct, setCurrentProduct] = useState(undefined)
    const [currentColor, setCurrentColor] = useState(0)

    const [auth, setAuth] = useAtom(authAtom)
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

    const getCurrentSizes = () => {
        const product = campaign.products.find((p) => p.name === currentProduct.name)

        return product.sizes
    }

    return <div className="container relative m-auto">
        {loading ? (
            <Loader />
        ) : (
            <div className="grid grid-cols-2 gap-10 py-10 mt-6">
                <div className="sticky flex justify-end top-28 h-min">
                    <div className="relative">
                        <div>
                            <Image className="object-contain w-full h-full" src={loadImage(currentProduct?.colors[currentColor].image[side])} alt="product-img" width={600} height={600} />
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
                                    <Image src={loadImage(currentProduct?.colors[currentColor].image['front'])} alt="product-img" width={38} height={38} />
                                </button>
                                <button onClick={() => flipSide('back')} className="p-2 bg-white rounded-lg border-2 border-slate-100 hover:border-slate-300 transition-all">
                                    <Image src={loadImage(currentProduct?.colors[currentColor].image['back'])} alt="product-img" width={38} height={38} />
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
                                campaign?.images.map((product, index) => (
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
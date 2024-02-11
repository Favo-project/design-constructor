'use client'
import { CART_STORAGE_KEY, cartAtom } from '@/constants'
import { Dialog, Transition } from '@headlessui/react'
import { useAtom } from 'jotai'
import Link from '@/components/Link'
import { Fragment, useLayoutEffect, useState } from 'react'
import { BsCart4, BsCheckLg, BsChevronLeft } from 'react-icons/bs'
import { IoMdClose } from 'react-icons/io'
import { LiaShoppingBagSolid } from 'react-icons/lia'
import Loader from './Loader'
import { fetchCart } from '@/api/cart'
import CampaignImage from './CampaignImage'

import { Listbox } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import { formatCurrency } from '@/actions/campaignTools'
import SolidBtn from './form-elements/SolidBtn'

const CART_ITEM_CLASSNAME = 'w-full grid md:grid-cols-[10%_10%_36%_16%_18%] grid-cols-[15%_15%_32%_16%_18%] md:gap-[2.4%] gap-[1%] items-center'

export default function Cart({ theme, resources }: { resources, theme?: 'dark' | 'light' }) {
    const [isOpen, setIsOpen] = useState(false)
    const [cartLength, setCartLength] = useAtom(cartAtom)
    const [cart, setCart] = useState([])
    const [loading, setLoading] = useState(true)

    useLayoutEffect(() => {
        const cartList = getCartList()
        setCartLength(cartList?.length || 0)
    }, [])

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
        getFullCart()
    }

    function getCartList() {
        try {
            const cartList = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || '[]')

            return cartList || []
        }
        catch (err) {
            console.log(err?.message);
            return []
        }
    }

    function removeFromCart(item) {
        const cartList = getCartList()

        const newCartList = cartList.filter(c => c.id !== item.id)

        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newCartList))
        setCartLength(newCartList.length)

        getFullCart()
    }

    const getFullCart = async () => {
        try {
            setLoading(true)

            const cartList = getCartList()


            const data = await fetchCart(cartList)

            const itemsLength = data.reduce((acc, camp) => acc + camp.items.length, 0)

            setCartLength(itemsLength || 0)
            setCart([...data])
            setLoading(false)
        }
        catch (err) {
            console.log(err?.message);
        }
    }

    return (
        <div>
            <button onClick={openModal} className={`relative sm:text-2xl text-[22px] leading-[30px] transition-all p-2 sm:px-3 sm:py-2 ${theme === 'light' ? 'text-white' : 'text-dark'}`}>
                <BsCart4 />
                {
                    !!cartLength && <span className='absolute top-0 right-0 w-4 h-4 flex items-center justify-center rounded-full bg-magenta text-white text-[10px] shadow-md font-semibold'>{cartLength}</span>
                }
            </button>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={() => { }}>
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
                        <div className="flex min-h-full items-center justify-center md:p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden md:rounded-2xl bg-white p-3 md:p-8 text-left align-middle shadow-xl transition-all">
                                    <button onClick={closeModal} className='absolute text-2xl text-slate-500 p-3 top-2 right-2 cursor-pointer'>
                                        <IoMdClose />
                                    </button>
                                    <Dialog.Title
                                        as="h3"
                                        className="text-2xl font-semibold leading-6 text-gray-800"
                                    >
                                        {resources.cart.title}
                                    </Dialog.Title>

                                    {
                                        loading ? (
                                            <div className='flex items-center justify-center py-16'>
                                                <span>
                                                    <Loader />
                                                </span>
                                            </div>
                                        ) : (
                                            cart.length ? (
                                                <>
                                                    <div className='flex flex-col gap-5 my-6 mb-20'>
                                                        {
                                                            cart.map((campaign, index) => (
                                                                <div className='flex flex-col' key={index}>
                                                                    <h3 className='text-xl font-semibold text-dark font-sans mb-4'>{campaign.title}</h3>
                                                                    <div className='flex flex-col gap-5'>
                                                                        <div className={CART_ITEM_CLASSNAME}>

                                                                        </div>
                                                                        {
                                                                            campaign.items.map((item, idx) => (
                                                                                <CartItem key={idx} item={item} campaign={campaign} removeFromCart={removeFromCart} />
                                                                            ))
                                                                        }
                                                                    </div>
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                    <div className='flex items-center gap-6 mb-6 flex-col sm:flex-row justify-center sm:justify-between'>
                                                        <button onClick={closeModal} className='flex items-center text-magenta font-sans'>
                                                            <span className='mr-1 flex mt-0.5'><BsChevronLeft /></span> {resources.cart.continue}
                                                        </button>

                                                        <SolidBtn className='w-56 text-center justify-center'>
                                                            {resources.cart.checkout}
                                                        </SolidBtn>
                                                    </div>
                                                </>
                                            ) : (
                                                <CartEmpty resources={resources} />
                                            )
                                        )
                                    }

                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    )
}

function CartEmpty({ resources }) {
    return (
        <div className='w-full flex flex-col items-center justify-center pt-8 pb-4'>
            <div className='w-20 h-20 rounded-full bg-slate-200 grid place-content-center mt-6'>
                <span className='text-4xl text-slate-400'>
                    <LiaShoppingBagSolid />
                </span>
            </div>
            <h4 className='text-lg uppercase font-mono font-semibold text-gray-700 my-6'>{resources.cart.empty}</h4>
            <div>
                <p className='text-gray-700 font-medium font-sans'>{resources.cart.addsomething}.</p>
                <Link href={'/shop'} className='text-magenta font-medium font-sans'>{resources.cart.explore}</Link>
            </div>
        </div>
    )
}

function CartItem({ item, campaign, removeFromCart }) {
    const [qty, setQty] = useState(item?.quantity || 1)
    const [selectedProduct, setSelectedProduct] = useState(item.productName)
    const [selectedSize, setSelectedSize] = useState(item?.size || '--')

    const [product, setProduct] = useState(() => campaign.products.find(p => p.name === item.productName))

    const [color, setColor] = useState(() => product.colors.find(({ color }) => color.name === item.colorName))

    function getCartList() {
        try {
            const cartList = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || '[]')

            return cartList || []
        }
        catch (err) {
            console.log(err?.message);
            return []
        }
    }

    const changeQty = (value) => {
        const cartList = getCartList()

        const newCartList = cartList.map(i => i.id === item.id ? ({ ...i, quantity: value }) : i)

        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newCartList))
        setQty(value)
    }

    const changeProduct = (value) => {
        const cartList = getCartList()

        const newCartList = cartList.map(i => i.id === item.id ? ({ ...i, productName: value }) : i)

        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newCartList))
        setSelectedProduct(value)

        const newProduct = campaign.products.find(p => p.name === value)
        setProduct(newProduct)

        changeColor(newProduct.colors[0])
    }

    const changeSize = (value) => {
        const cartList = getCartList()

        const newCartList = cartList.map(i => i.id === item.id ? ({ ...i, size: value }) : i)

        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newCartList))
        setSelectedSize(value)
    }

    const changeColor = (value) => {
        const cartList = getCartList()

        const newCartList = cartList.map(i => i.id === item.id ? ({ ...i, colorName: value.color.name }) : i)

        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newCartList))
        setColor(value)
    }

    return (
        <div className='relative flex flex-col gap-3 border-b border-b-gray-300 pb-5'>
            <div className='flex items-center'>
                <div className={CART_ITEM_CLASSNAME}>
                    <div>
                        <CampaignImage design={campaign.design['front']} background={color.image['front']} pArea={product.printableArea['front']} width={50} />
                    </div>
                    <div>
                        <input value={qty} onChange={(e) => changeQty(Number(e.target.value))} className="text-sm md:text-base px-2 py-2 md:px-3 md:py-2.5 w-full bg-transparent outline-none font-semibold rounded-lg border-2 border-slate-200 focus-within:border-slate-600 text-slate-600" type="text" id="name" />
                    </div>
                    <div>
                        <Listbox value={selectedProduct} onChange={changeProduct}>
                            <div className="relative">
                                <Listbox.Button className="relative w-full font-semibold text-slate-600 cursor-default rounded-lg bg-white py-2 pl-2 pr-6 md:py-2.5 md:pl-3 md:pr-10 text-left outline-none border-2 border-slate-300 focus-visible:border-slate-600 transition-all">
                                    <span className="block truncate text-dark font-medium text-sm md:text-base">{selectedProduct}</span>
                                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                        <ChevronDownIcon
                                            className="h-5 w-5 text-dark"
                                            aria-hidden="true"
                                        />
                                    </span>
                                </Listbox.Button>
                                <Transition
                                    as={Fragment}
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <Listbox.Options className="absolute z-20 -translate-x-1/3 md:translate-x-0 mt-1 w-60 md:w-80 max-w-sm overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none">
                                        {campaign.products.map((pdt, idx) => (
                                            <Listbox.Option
                                                key={idx}
                                                className={({ active }) =>
                                                    `relative cursor-pointer select-none py-2 pl-10 pr-4 ${active ? 'bg-blue/20 text-blue' : 'text-gray-900'
                                                    }`
                                                }
                                                value={pdt.name}
                                            >
                                                {({ selected }) => (
                                                    <>
                                                        <span
                                                            className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                                }`}
                                                        >
                                                            {pdt.name}
                                                        </span>
                                                        {selected ? (
                                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-magenta">
                                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                            </span>
                                                        ) : null}
                                                    </>
                                                )}
                                            </Listbox.Option>
                                        ))}
                                    </Listbox.Options>
                                </Transition>
                            </div>
                        </Listbox>
                    </div>
                    <div>
                        <Listbox value={selectedSize} onChange={changeSize}>
                            <div className="relative">
                                <Listbox.Button className="relative w-full font-semibold text-slate-600 cursor-default rounded-lg bg-white py-2 pl-2 pr-3 md:py-2.5 md:pl-3 md:pr-6 text-left outline-none border-2 border-slate-300 focus-visible:border-slate-600 transition-all">
                                    <span className="block truncate text-dark font-medium text-sm md:text-base">{selectedSize}</span>
                                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center md:pr-2">
                                        <ChevronDownIcon
                                            className="h-5 w-5 text-dark"
                                            aria-hidden="true"
                                        />
                                    </span>
                                </Listbox.Button>
                                <Transition
                                    as={Fragment}
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <Listbox.Options className="absolute z-20 mt-1 w-20 md:w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none">
                                        <Listbox.Option
                                            className={({ active }) =>
                                                `relative cursor-pointer text-sm select-none py-1 pl-3 pr-4 ${active ? 'bg-blue/20 text-blue' : 'text-gray-900'
                                                }`
                                            }
                                            value={'--'}
                                        >
                                            {({ selected }) => (
                                                <>
                                                    <span
                                                        className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                            }`}
                                                    >
                                                        {'--'}
                                                    </span>
                                                    {selected ? (
                                                        <span className="absolute inset-y-0 right-2 flex items-center pl-3 text-magenta">
                                                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                        </span>
                                                    ) : null}
                                                </>
                                            )}
                                        </Listbox.Option>
                                        {product.sizes.map((size, idx) => (
                                            <Listbox.Option
                                                key={idx}
                                                className={({ active }) =>
                                                    `relative cursor-pointer text-sm select-none py-1 pl-3 pr-4 ${active ? 'bg-blue/20 text-blue' : 'text-gray-900'
                                                    }`
                                                }
                                                value={size}
                                            >
                                                {({ selected }) => (
                                                    <>
                                                        <span
                                                            className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                                }`}
                                                        >
                                                            {size}
                                                        </span>
                                                        {selected ? (
                                                            <span className="absolute inset-y-0 right-2 flex items-center pl-3 text-magenta">
                                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                            </span>
                                                        ) : null}
                                                    </>
                                                )}
                                            </Listbox.Option>
                                        ))}
                                    </Listbox.Options>
                                </Transition>
                            </div>
                        </Listbox>
                    </div>
                    <div>
                        <span className='block text-dark font-sans font-medium text-sm md:text-base'>
                            {formatCurrency(product?.sellingPrice ? product?.sellingPrice * qty : 0)}
                        </span>
                    </div>
                </div>
                <div className='absolute md:static right-5 bottom-5'>
                    <button onClick={() => removeFromCart(item)} className='text-lg text-slate-600 p-2 bg-gray-200 rounded-full cursor-pointer'>
                        <IoMdClose />
                    </button>
                </div>
            </div>
            <ul className='flex items-center gap-2'>
                {
                    product.colors.map((colorItem, idx) => (
                        <li key={idx}>
                            <button onClick={() => changeColor(colorItem)} className="relative block border cursor-pointer border-gray-400 p-1 rounded-full">
                                <span style={{ background: colorItem.color.content }} className="flex rounded-full w-6 h-6" />
                                {
                                    color.color.name === colorItem.color.name && (
                                        <span className="text-white absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                                            <BsCheckLg />
                                        </span>
                                    )
                                }
                            </button>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}
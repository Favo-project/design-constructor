'use client'

import Toasts from "@/components/Toasts"
import SolidBtn from "@/components/form-elements/SolidBtn"
import { CART_STORAGE_KEY, toastAtom } from "@/constants"
import { useAtom } from "jotai"
import { Suspense, useEffect, useRef, useState } from "react"
import { BsCartDash, BsCartPlus } from "react-icons/bs"

export default function AddCart({ resources, campaignId, product, color }) {
    const cartBtn = useRef(null)
    const [toast, setToast] = useAtom(toastAtom)
    const [isCartBtn, setIsCartBtn] = useState(false)
    const [isInCart, setIsInCart] = useState(false)

    useEffect(() => {
        const isInViewport = (elem) => {
            const rect = elem?.getBoundingClientRect?.()

            const isinview = (
                rect?.top >= 0 &&
                rect?.left >= 0 &&
                rect?.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect?.right <= (window.innerWidth || document.documentElement.clientWidth)

            );

            return isinview
        }

        const handler = () => {
            setIsCartBtn(!isInViewport(cartBtn.current))
        }

        window.addEventListener('scroll', handler)

        return () => window.removeEventListener('scroll', handler)
    }, [])

    function isAdded() {
        try {
            const cartList = getCartList()

            const isAdded = cartList.find(c =>
                c.campaignId === campaignId &&
                c.productName === product.name &&
                c.colorName === color.color.name)

            return !!isAdded
        }
        catch (err) {
            console.log(err?.message);

            return false
        }
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

    function addToCart() {
        const cartList = getCartList()

        const campaign = {
            campaignId,
            colorName: color.color.name,
            productName: product.name
        }

        const newCartList = [...cartList, campaign]

        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newCartList))
    }

    function removeFromCart() {
        const cartList = getCartList()

        const campaign = {
            campaignId,
            colorName: color.color.name,
            productName: product.name
        }

        console.log(cartList, campaign);

        const newCartList = cartList.filter(c => {
            const cartCampaign = JSON.parse(JSON.stringify(c))
            const currentCampaign = JSON.parse(JSON.stringify(campaign))
            return (
                !(
                    cartCampaign.campaignId === currentCampaign.campaignId &&
                    cartCampaign.colorName === currentCampaign.colorName &&
                    cartCampaign.productName === currentCampaign.productName
                )
            )
        })

        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newCartList))
    }

    function toggleCart() {
        if (isAdded()) {
            removeFromCart()
            setToast({ type: 'warning', message: "Dizayn korzinadan o'chirildi" })
            setIsInCart(false)
        }
        else {
            addToCart()
            setToast({ type: 'success', message: "Dizayn korzinaga qo'shildi" })
            setIsInCart(true)
        }
    }

    useEffect(() => {
        setIsInCart(isAdded())
    }, [campaignId, product, color])

    return (
        <Suspense fallback={'Loading'}>
            <div ref={cartBtn} className="lg:my-10 my-6">
                <Toasts />

                <SolidBtn onClick={toggleCart}>
                    {
                        isInCart ? (
                            <div className="flex items-center">
                                {resources.campaignId.removecart}
                                <span className="text-white ml-2 text-lg">
                                    <BsCartDash />
                                </span>
                            </div>
                        ) : (
                            <div className="flex items-center">
                                {resources.campaignId.addcart}
                                <span className="text-white ml-2 text-lg"><BsCartPlus /></span>
                            </div>
                        )
                    }
                </SolidBtn>

                <div className={`fixed md:hidden block right-4 z-40 ${isCartBtn ? 'bottom-12' : '-bottom-12'} transition-all duration-300`}>
                    <button onClick={toggleCart} className="p-4 text-2xl border-2 border-magenta rounded-full bg-white shadow-2xl hover:text-magenta transition-all">
                        {
                            isInCart ? (<BsCartDash />) : (<BsCartPlus />)
                        }
                    </button>
                </div>
            </div>
        </Suspense>
    )
};

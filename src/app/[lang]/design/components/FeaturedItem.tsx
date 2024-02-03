import { campaignAtom } from '@/constants'
import { Popover, Transition } from '@headlessui/react'
import { useAtom } from 'jotai'
import { Fragment } from 'react'
import { MdCheck } from 'react-icons/md'

export default function FeaturedItem({ currentProduct, currentColor, setCurrentColor }) {
    const [campaign, setCampaign] = useAtom(campaignAtom)

    const isProductFeatured = () => {
        let currentIndex: number;

        campaign.products.forEach((p, i) => p.name === currentProduct.name ? currentIndex = i : p)

        return currentIndex === 0
    }

    const isColorFeatured = () => {
        let currentIndex: number = currentColor

        return currentIndex === 0
    }

    const featureColor = () => {
        // getting current color for both, images and products
        const color = currentProduct.colors[currentColor]

        // deleting selected color in order to make it featured
        currentProduct.colors.splice(currentColor, 1)

        // inserting the current color to the first index
        currentProduct.colors.unshift(color)

        const filteredProducts = campaign.products.map((p) => p.name === currentProduct.name ? currentProduct : p)
        setCampaign({ ...campaign, products: [...filteredProducts] })
        setCurrentColor(0)
    }

    const featureProduct = () => {
        featureColor()

        let currentIndex: number;

        campaign.products.forEach((p, i) => p.name === currentProduct.name ? currentIndex = i : p)

        campaign.products.splice(currentIndex, 1)

        campaign.products.unshift(currentProduct)

        const filteredProducts = campaign.products.map((p) => p.name === currentProduct.name ? currentProduct : p)

        setCampaign({
            ...campaign, products: [...filteredProducts],
        })
    }

    return (
        <>
            {
                isProductFeatured() && isColorFeatured() ? (
                    <button className='absolute bottom-5 left-1/2 -translate-x-1/2 px-3 py-2 text-sm font-semibold rounded-lg border-2 shadow-lg bg-white border-slate-100 text-magenta hover:border-slate-300 transition-all flex items-center '>
                        Featured Item <span className='text-green-600 text-lg ml-1'><MdCheck /></span>
                    </button>
                ) : (
                    <div className="absolute bottom-5 left-[35%]">
                        <Popover className="relative">
                            {({ open, close }) => (
                                <>
                                    <Popover.Button
                                        className={'px-3 py-2 text-sm font-semibold rounded-md border-2 shadow-lg bg-white border-slate-100 text-magenta hover:border-slate-300 transition-all'}
                                    >
                                        Set item as featured
                                    </Popover.Button>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-200"
                                        enterFrom="opacity-0 translate-y-1"
                                        enterTo="opacity-100 translate-y-0"
                                        leave="transition ease-in duration-150"
                                        leaveFrom="opacity-100 translate-y-0"
                                        leaveTo="opacity-0 translate-y-1"
                                    >
                                        <Popover.Panel className="absolute left-1/2 bottom-1/2 z-10 mt-3 w-screen max-w-[340px] -translate-x-1/2 transform px-4">
                                            <div className='bg-white rounded-lg shadow-lg p-4'>
                                                <div className='flex flex-col'>
                                                    <h4 className='text-slate-700 font-sans mb-2'>Set as featured item for:</h4>
                                                    {
                                                        !isProductFeatured() && (
                                                            <button onClick={() => { featureProduct(); close() }} className='w-full px-6 py-2.5 bg-blue text-sm text-white shadow mb-4 font-semibold rounded-sm hover:shadow-md transition-all'>
                                                                Entire campaign
                                                            </button>
                                                        )
                                                    }
                                                    {
                                                        !isColorFeatured() && (
                                                            <button onClick={() => { featureColor(); close() }} className='w-full px-6 py-2.5 border border-dark text-sm text-slate-600 shadow font-semibold rounded-sm hover:shadow-md hover:bg-dark hover:text-white transition-all'>
                                                                This product style
                                                            </button>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        </Popover.Panel>
                                    </Transition>
                                </>
                            )}
                        </Popover>
                    </div>
                )
            }
        </>
    )
}
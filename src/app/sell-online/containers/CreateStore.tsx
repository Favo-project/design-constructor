import OutlineBtn from "@/components/form-elements/OutlineBtn";
import Image from "next/image";
import { IoStorefrontOutline } from "react-icons/io5";

export default function CreateStore() {
    return (
        <section className="overflow-hidden py-16">
            <div className="container m-auto max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                    <div className="px-4">
                        <h2 className="text-2xl text-gray-800 tracking-wide font-semibold mb-8">Create an online t-shirt store</h2>
                        <p className="text-gray-700 tracking-wide font-sans mb-10">Make it easy for users to browse all of the custom shirts and apparel you`ve designed by creating a free online store. It only takes a few minutes to create and you can customize them to match your brand.</p>
                        <OutlineBtn href={'/online-stores'}>
                            <IoStorefrontOutline className="mr-4 text-2xl" /> Open your store
                        </OutlineBtn>
                    </div>
                    <div className="w-[1100px]">
                        <Image src={'https://www.bonfire.com/images/stores/store-footer.png'} className="w-full" width={1000} height={600} alt="sell-online" />
                    </div>
                </div>
            </div>
        </section>
    )
}
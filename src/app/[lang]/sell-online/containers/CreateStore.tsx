import OutlineBtn from "@/components/form-elements/OutlineBtn";
import Image from "next/image";
import { IoStorefrontOutline } from "react-icons/io5";

export default function CreateStore({ resources }) {
    return (
        <section className="overflow-hidden py-16">
            <div className="container m-auto max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                    <div className="px-4">
                        <h2 className="text-2xl text-gray-800 tracking-wide font-semibold mb-8">{resources.sellonline.createstore.title}</h2>
                        <p className="text-gray-700 tracking-wide font-sans mb-10">{resources.sellonline.createstore.paragraph}.</p>
                        <OutlineBtn href={'/online-stores'}>
                            <IoStorefrontOutline className="mr-4 text-2xl" />{resources.sellonline.createstore.openbtn}</OutlineBtn>
                    </div>
                    <div className="w-[1100px]">
                        <Image src={'https://www.bonfire.com/images/stores/store-footer.png'} className="w-full" width={1000} height={600} alt="sell-online" />
                    </div>
                </div>
            </div>
        </section>
    )
}
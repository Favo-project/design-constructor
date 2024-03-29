import SolidBtn from "@/components/form-elements/SolidBtn";
import Image from "next/image";
import { IoStorefrontOutline } from "react-icons/io5";

export default function OpenStore({ resources }) {
    return (
        <section className="overflow-hidden py-16">
            <div className="container m-auto max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                    <div className="px-4">
                        <h2 className="text-2xl text-dark tracking-wide font-semibold mb-8">{resources.onlinestore.openstore.title}</h2>
                        <p className="text-gray-700 tracking-wide font-sans mb-6">{resources.onlinestore.openstore.paragraph}.</p>
                        <SolidBtn href={'/online-stores'}>
                            <IoStorefrontOutline className="mr-4 text-2xl" />{resources.onlinestore.openstore.openstore}</SolidBtn>
                    </div>
                    <div className="w-[1100px]">
                        <Image src={'https://www.bonfire.com/images/stores/store-footer.png'} className="w-full" width={1000} height={600} alt="sell-online" />
                    </div>
                </div>
            </div>
        </section>
    )
}
import OutlineBtn from "@/components/form-elements/OutlineBtn";
import Image from "next/image";

export default function Catalog({ resources }) {
    return (
        <section className="bg-[#f5f8fc] overflow-hidden py-16">
            <div className="container m-auto max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-3 items-center">
                    <div className="px-4">
                        <h2 className="text-2xl text-gray-800 tracking-wide font-semibold mb-8">{resources.sellonline.catalog.title}</h2>
                        <p className="text-gray-700 tracking-wide font-sans mb-10">{resources.sellonline.catalog.paragraph}.</p>
                        <OutlineBtn href={'/catalog'}>
                            {resources.sellonline.catalog.seecatalog}
                        </OutlineBtn>
                    </div>
                    <div className="w-[600px] xl:w-[900px]">
                        <Image src={'https://www.bonfire.com/images/custom-shirts@2x.png'} className="w-full" width={1000} height={600} alt="sell-online" />
                    </div>
                </div>
            </div>
        </section>
    )
}
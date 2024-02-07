import OutlineBtn from "@/components/form-elements/OutlineBtn";
import Image from "next/image";

export default function OpenStore({ resources }) {
    return (
        <section className="overflow-hidden py-16">
            <div className="container m-auto max-w-7xl">
                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 items-center">
                    <div className="p-4">
                        <h2 className="text-2xl text-gray-800 tracking-wide font-semibold mb-8">{resources.home.openstore.title}</h2>
                        <p className="text-gray-700 tracking-wide font-sans mb-10">{resources.home.openstore.paragraph}.</p>
                        <OutlineBtn href={'/online-stores'}>
                            {resources.home.openstore.openbtn}
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
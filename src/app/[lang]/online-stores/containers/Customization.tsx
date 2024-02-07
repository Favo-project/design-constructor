import Image from "next/image";

export default function Customization({ resources }) {
    return (
        <main className="py-12">
            <div className="container m-auto max-w-7xl">
                <div className="w-full flex flex-col md:gap-14 gap-6">
                    <div className="grid grid-cols-2 items-center px-6">
                        <div className="md:ml-12">
                            <h2 className="text-2xl font-bold font-sans tracking-wide text-gray-800 mb-6">{resources.onlinestore.customization.products}</h2>
                            <p className="font-sans font-medium text-gray-700 max-w-[390px]">{resources.onlinestore.customization.productstext}.</p>
                        </div>
                        <div>
                            <Image className="w-full" src={'https://c.bonfireassets.com/images/stores/store-intro1.jpg'} width={500} height={300} alt="customization-image" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 items-center md:gap-8 px-6">
                        <div>
                            <Image className="w-full" src={'https://c.bonfireassets.com/images/stores/store-intro2.png'} width={500} height={300} alt="customization-image" />
                        </div>
                        <div className="md:ml-12">
                            <h2 className="text-2xl font-bold font-sans tracking-wide text-gray-800 mb-6">{resources.onlinestore.customization.customization}</h2>
                            <p className="font-sans font-medium text-gray-700 max-w-[390px]">{resources.onlinestore.customization.customizationtext}.</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 items-center px-6">
                        <div className="md:ml-12">
                            <h2 className="text-2xl font-bold font-sans tracking-wide text-gray-800 mb-6">{resources.onlinestore.customization.story}</h2>
                            <p className="font-sans font-medium text-gray-700 max-w-[390px]">{resources.onlinestore.customization.storytext}.</p>
                        </div>
                        <div>
                            <Image className="w-full" src={'https://c.bonfireassets.com/images/stores/store-intro3@2x.jpg'} width={500} height={300} alt="customization-image" />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
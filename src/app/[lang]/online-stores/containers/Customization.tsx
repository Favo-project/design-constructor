import Image from "next/image";

export default function Customization() {
    return (
        <main className="py-12">
            <div className="container m-auto max-w-7xl">
                <div className="w-full flex flex-col md:gap-14 gap-6">
                    <div className="grid grid-cols-2 items-center px-6">
                        <div className="md:ml-12">
                            <h2 className="text-2xl font-bold font-sans tracking-wide text-gray-800 mb-6">All of your products in one place</h2>
                            <p className="font-sans font-medium text-gray-700 max-w-[390px]">Stores make it easy for your customers to shop by bringing all your products together.</p>
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
                            <h2 className="text-2xl font-bold font-sans tracking-wide text-gray-800 mb-6">Customization made easy</h2>
                            <p className="font-sans font-medium text-gray-700 max-w-[390px]">Customize your store to give it a unique look and feel that compliments your brand.</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 items-center px-6">
                        <div className="md:ml-12">
                            <h2 className="text-2xl font-bold font-sans tracking-wide text-gray-800 mb-6">Tell your story</h2>
                            <p className="font-sans font-medium text-gray-700 max-w-[390px]">Introduce yourself to the world and write about who you are or the mission of your organization.</p>
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
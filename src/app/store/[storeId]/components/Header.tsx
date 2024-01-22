import Image from "next/image";
import HeaderImg from '../wallhaven-k7zv97.jpg'

export default function Header() {
    return (
        <header className="relative">
            <div className="absolute top-0 right-0 bottom-0 left-0 bg-black bg-opacity-30" />

            <Image src={HeaderImg} className="w-full h-[450px] object-cover object-center" alt="store-header" width={1200} height={450} />

            <div className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center">
                <div className="flex flex-col items-center justify-center mt-14">
                    <h1 className="text-5xl uppercase font-semibold font-sans tracking-widest text-white mb-8">HELLOWEEN</h1>
                    <p className="text-xl uppercase font-medium text-white tracking-widest">OFFICIAL MERCHANDISE</p>
                </div>
            </div>
        </header>
    )
}
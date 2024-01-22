'use client'
import Image from "next/image";
import { useParams } from "next/navigation";
import Header from "./components/Header";
import Link from "next/link";

const products = [
    {
        name: 'Harm Reduction Means Life',
        image: 'https://dynamic.bonfireassets.com/thumb/design-image/6c1e5ac8-3c21-4e91-aa35-abec577a5703/e69c1d92-4334-4a92-a3c4-b0c1863b886c/900/'
    },
    {
        name: 'Harm Reduction Means Life',
        image: 'https://dynamic.bonfireassets.com/thumb/design-image/6c1e5ac8-3c21-4e91-aa35-abec577a5703/e69c1d92-4334-4a92-a3c4-b0c1863b886c/900/'
    },
    {
        name: 'Harm Reduction Means Life',
        image: 'https://dynamic.bonfireassets.com/thumb/design-image/6c1e5ac8-3c21-4e91-aa35-abec577a5703/e69c1d92-4334-4a92-a3c4-b0c1863b886c/900/'
    },
]

export default function Store() {
    const { storeId } = useParams()

    console.log(storeId);

    return (
        <div id="store">
            <Header />

            <div className="container m-auto max-w-7xl px-4">
                <div className="grid grid-cols-[1fr_3fr]">
                    <div>
                        1
                    </div>
                    <div>
                        <div className="grid grid-cols-3">
                            {
                                products.map((product, index) => (
                                    <div key={index} className="flex flex-col items-center">
                                        <div className="">
                                            <Image src={product.image} width={300} height={300} alt="product-image" />
                                        </div>
                                        <Link className="text-slate-700 font-medium font-sans hover:text-indigo-600 transition" href="/">{product.name}</Link>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
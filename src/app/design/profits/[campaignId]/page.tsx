'use client'
import Image from "next/image";
import { useState } from 'react'
import { BsQuestionCircle } from "react-icons/bs";

export default function Profits() {
    const [products] = useState([
        {
            image: 'https://dynamic.bonfireassets.com/thumb/design-image/7b1916f0-a48e-41cc-ad95-c0fa3eeafd2a/30ce80de-d6b5-4146-9397-d92ae0d427c3/150/',
            title: 'Comfort Colors Unisex Tee',
            colors: ['black', 'gray'],
            baseCost: '18'
        },
        {
            image: 'https://dynamic.bonfireassets.com/thumb/design-image/7b1916f0-a48e-41cc-ad95-c0fa3eeafd2a/b2b20823-8669-43b2-ab74-7eab5a447081/150/',
            title: 'Classic Unisex Tee',
            colors: ['black', 'gray'],
            baseCost: '22'
        },
        {
            image: 'https://dynamic.bonfireassets.com/thumb/design-image/7b1916f0-a48e-41cc-ad95-c0fa3eeafd2a/cd9b5836-3f2e-4d4b-9367-e794df948681/150/',
            title: 'Crewneck Sweatshirt',
            colors: ['black', 'gray'],
            baseCost: '24'
        },
        {
            image: 'https://dynamic.bonfireassets.com/thumb/design-image/7b1916f0-a48e-41cc-ad95-c0fa3eeafd2a/e3c67090-1516-4e66-91be-0012bd4a5e2d/150/',
            title: 'Pullover Hoodie',
            colors: ['black', 'gray'],
            baseCost: '17'
        },
        {
            image: 'https://dynamic.bonfireassets.com/thumb/design-image/7b1916f0-a48e-41cc-ad95-c0fa3eeafd2a/5205a469-427b-4aac-8455-556ef3ed63da/150/',
            title: 'Premium Unisex Tee',
            colors: ['black', 'gray'],
            baseCost: '21'
        },
    ])

    return <div>
        <div className="container m-auto">

            <h2 className="text-4xl font-sans font-semibold text-slate-700 mt-8 mb-6">
                Set your selling prices
            </h2>

            <table className="text-left w-[100%]">
                <thead>
                    <tr className="font-thin font-mono text-base uppercase text-slate-600">
                        <th>PRODUCT</th>
                        <th className="flex items-center">BASE COST <button className="p-1 ml-2 mb-[1px] text-gray-400 hover:text-gray-700"><BsQuestionCircle /></button></th>
                        <th>SELLING PRICE</th>
                        <th>YOUR PROFIT</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map((product, index) => (
                            <tr className="border-b border-b-gray-300" key={index}>
                                <td className="py-5">
                                    <div className="flex items-center gap-4">
                                        <div>
                                            <Image priority src={product.image} alt="product-img" width={64} height={64} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-600">{product.title}</h4>
                                            <ul className="flex items-center gap-2 mt-4">
                                                {
                                                    product.colors.map((color, idx) => (
                                                        <li key={idx}>
                                                            <span className="block w-6 h-6 shadow-sm rounded-full" style={{ background: color }} />
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                </td>
                                <td className="text-base py-5 text-slate-700 font-medium">{product.baseCost}$</td>
                                <td className="py-5">
                                    <div className="relative">
                                        <strong className="absolute top-[50%] left-2 translate-y-[-50%] text-sm text-slate-300">$</strong>
                                        <input className="border-2 text-right border-slate-300 outline-gray-600 text-gray-600 text-sm rounded-lg px-3 py-2 pl-5 font-semibold" type="number" min={0} max={150} />
                                    </div>
                                </td>
                                <td className="py-5">
                                    <div>
                                        <h5 className="flex items-center font-semibold text-green-600">$3.48 each <button className="p-1 ml-2 text-gray-400 hover:text-gray-700"><BsQuestionCircle /></button></h5>
                                        <span className="text-sm">at 1 sold</span>
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    </div>
}
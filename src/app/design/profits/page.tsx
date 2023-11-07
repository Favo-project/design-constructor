'use client'
import Image from "next/image";
import { useState } from 'react'

export default function Profits() {
    const [products] = useState([
        {
            image: 'https://dynamic.bonfireassets.com/thumb/design-image/7b1916f0-a48e-41cc-ad95-c0fa3eeafd2a/30ce80de-d6b5-4146-9397-d92ae0d427c3/150/',
            title: 'Premium Unisex Tee',
            colors: ['black', 'gray'],
            baseCost: '18'
        }
    ])

    return <div>
        <div className="container m-auto">

            <h2>
                Set your selling prices
            </h2>

            <table className="text-left w-[100%]">
                <thead>
                    <tr>
                        <th>PRODUCT</th>
                        <th>BASE COST</th>
                        <th>SELLING PRICE</th>
                        <th>YOUR PROFIT</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map((product, index) => (
                            <tr key={index}>
                                <td>
                                    <div>
                                        <div>
                                            <Image priority src={product.image} alt="product-img" width={64} height={64} />
                                        </div>
                                        <div>
                                            <h4>{product.title}</h4>
                                            <ul>
                                                {
                                                    product.colors.map((color, idx) => (
                                                        <li key={idx}>
                                                            <span>{color}</span>
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                        </div>
                                    </div>

                                </td>
                                <td>{product.baseCost}$</td>
                                <td>
                                    <div>
                                        <input type="number" min={0} max={150} placeholder="$" />
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <h5>$3.48 each <button>?</button></h5>
                                        <span>at 1 sold</span>
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
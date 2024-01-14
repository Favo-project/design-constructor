import { campaignAtom } from "@/constants"
import { useAtom } from "jotai"

export default function ProfitInput({ product }) {
    const [campaign, setCampaign] = useAtom(campaignAtom)

    const onChange = (value: number) => {
        const productCopy = { ...product }

        productCopy.sellingPrice = value

        const filteredProducts = campaign.products.map((product) => product._id === productCopy._id ? productCopy : product)

        setCampaign({
            ...campaign, products: [...filteredProducts]
        })
    }

    const onBlur = (value: number) => {
        const productCopy = { ...product }

        if (value > product.maxCost) {
            productCopy.sellingPrice = product.maxCost
        }
        else if (value < product.baseCost) {
            productCopy.sellingPrice = product.baseCost
        }
        else {
            productCopy.sellingPrice = value
        }

        const filteredProducts = campaign.products.map((product) => product._id === productCopy._id ? productCopy : product)

        setCampaign({
            ...campaign, products: [...filteredProducts]
        })
    }

    return <div>
        <input onBlur={(e) => onBlur(Number(e.target.value))} onChange={(e) => onChange(Number(e.target.value))} value={product.sellingPrice || ''} className="border-2 text-right border-slate-300 outline-gray-600 text-gray-600 text-sm rounded-lg px-3 py-2 pl-5 font-semibold" type="number" />
    </div>
}
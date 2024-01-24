import { campaignAtom } from "@/constants"
import { useAtom } from "jotai"
import { NumericFormat, PatternFormat } from "react-number-format"

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

    const onBlur = () => {
        const productCopy = { ...product }

        if (productCopy.sellingPrice > product.maxCost) {
            productCopy.sellingPrice = product.maxCost
        }
        else if (productCopy.sellingPrice < product.baseCost) {
            productCopy.sellingPrice = product.baseCost
        }

        const filteredProducts = campaign.products.map((product) => product._id === productCopy._id ? productCopy : product)

        setCampaign({
            ...campaign, products: [...filteredProducts]
        })
    }

    return <div>
        <NumericFormat className="max-w-[170px] border-2 text-right border-slate-300 outline-gray-600 text-gray-600 text-sm rounded-lg px-3 py-2 pl-5 font-semibold" onBlur={onBlur} value={product.sellingPrice || ''} onValueChange={(value) => onChange(Number(value.value))} displayType="input" type="text" thousandSeparator suffix=" so'm" />
    </div>
}
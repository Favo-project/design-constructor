import { SVGAttributes, useEffect } from "react";
import { RadioGroup } from "@headlessui/react";
import Image from "next/image";
import { useParams } from "next/navigation";

const shirts = [
  {
    name: "Premium Unisex Tee",
    printableArea: {
      front: {
        top: 290,
        left: 350,
        width: 250,
        height: 310,
      },
      back: {
        top: 250,
        left: 350,
        width: 250,
        height: 300,
      }
    },
    colors: [
      {
        color: {
          name: "gray",
          content: '#7077A1'
        },
        image: {
          front:
            `${process.env.NEXT_PUBLIC_BASE_URL}/files/products/premium-unisex-tee-dark-heather-gray.jpg`,
          back: `${process.env.NEXT_PUBLIC_BASE_URL}/files/products/premium-unisex-tee-dark-heather-gray-back.jpg`,
        },
      },
      {
        color: {
          name: "red",
          content: '#FF004D'
        },
        image: {
          front:
            `${process.env.NEXT_PUBLIC_BASE_URL}/files/products/premium-unisex-tee-red.jpg`,
          back: `${process.env.NEXT_PUBLIC_BASE_URL}/files/products/premium-unisex-tee-red-back.jpg`,
        },
      },
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL'],
    baseCost: 120000,
    maxCost: 170000,
    sellingPrice: 0
  },
  {
    name: "Classic Unisex Tee",
    printableArea: {
      front: {
        top: 270,
        left: 350,
        width: 250,
        height: 300,
      },
      back: {
        top: 260,
        left: 350,
        width: 260,
        height: 320,
      }
    },
    colors: [
      {
        color: {
          name: "red",
          content: '#0F1035'
        },
        image: {
          front:
            `${process.env.NEXT_PUBLIC_BASE_URL}/files/products/classic-tee-black.jpg`,
          back: `${process.env.NEXT_PUBLIC_BASE_URL}/files/products/classic-tee-black-back.jpg`,
        },
      },
      {
        color: {
          name: "blue",
          content: '#525CEB'
        },
        image: {
          front:
            `${process.env.NEXT_PUBLIC_BASE_URL}/files/products/classic-tee-royal.jpg`,
          back: `${process.env.NEXT_PUBLIC_BASE_URL}/files/products/classic-tee-royal-back.jpg`,
        },
      },
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'],
    baseCost: 100000,
    maxCost: 150000,
    sellingPrice: 0
  },
  {
    name: "Pullover Hoodie",
    printableArea: {
      front: {
        top: 290,
        left: 350,
        width: 270,
        height: 300,
      },
      back: {
        top: 275,
        left: 350,
        width: 270,
        height: 320,
      }
    },
    colors: [
      {
        color: {
          name: "grey",
          content: '#647D87'
        },
        image: {
          front:
            `${process.env.NEXT_PUBLIC_BASE_URL}/files/products/pullover-hoodie-sport-grey.jpg`,
          back: `${process.env.NEXT_PUBLIC_BASE_URL}/files/products/pullover-hoodie-sport-grey-back.jpg`,
        },
      },
      {
        color: {
          name: "blue",
          content: '#596FB7'
        },
        image: {
          front:
            `${process.env.NEXT_PUBLIC_BASE_URL}/files/products/pullover-hoodie-indigo.jpg`,
          back: `${process.env.NEXT_PUBLIC_BASE_URL}/files/products/pullover-hoodie-indigo-back.jpg`,
        },
      },
    ],
    sizes: ['S', 'M', 'L', '2XL', '3XL'],
    baseCost: 180000,
    maxCost: 250000,
    sellingPrice: 0
  },
];

export default function Products({ resources, campaign, setCampaign, canvasRef, canvasValues }) {
  const { campaignId } = useParams()

  useEffect(() => {
    if (!campaignId) {
      setCampaign({ ...campaign, products: [...shirts] })
    }
  }, [campaignId])


  const onChangeHandler = (value) => {
    setCampaign({ ...campaign, selected: { ...campaign.selected, product: value, type: 0 } })

    const printableArea = campaign.products[value].printableArea[canvasValues.current.side]

    for (const side in campaign.design) {
      if (campaign.design[side].length) {
        campaign.design[side].forEach((elem) => {
          elem.top = (printableArea.top - printableArea.height / 2) + elem.height / 2 + elem.relativeTop
          canvasRef.canvas.requestRenderAll()
        })
      }
    }
  }

  return (
    <div className="w-full py-4">
      <div className="mx-auto w-full">
        <RadioGroup value={campaign.selected.product} onChange={onChangeHandler}>
          <RadioGroup.Label className="sr-only">{resources.design.products.title}</RadioGroup.Label>
          <div className="space-y-6">
            {campaign.products.map((product: any, index: any) => (
              <RadioGroup.Option
                key={product.name}
                value={index}
                className={({ active, checked }) =>
                  `${checked ? "text-white shadow-xl" : "bg-white hover:border-slate-300"}
                    relative flex cursor-pointer border-slate-100 border-2 rounded-lg p-3 shadow-sm focus:outline-none transition-all`
                }
              >
                {({ active, checked }) => (
                  <>
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex items-center justify-center p-3 mr-2">
                          <Image
                            src={product.colors[0].image.front}
                            width={50}
                            height={50}
                            alt="shirt-img"
                          />
                        </div>
                        <div className="text-sm">
                          <RadioGroup.Label
                            as="p"
                            className={`mb-2 text-base ${checked ? "font-bold text-slate-700" : "font-medium text-slate-600"
                              }`}
                          >
                            {product.name}
                          </RadioGroup.Label>
                          <RadioGroup.Description
                            as="span"
                            className={`inline text-gray-500`}
                          >
                            <div className="z-40 flex items-center gap-2">
                              {
                                product.colors.map((type, idx) => (
                                  <button onClick={() => setCampaign({ ...campaign, selected: { ...campaign.selected, type: idx } })} className={`flex items-center justify-center rounded-full ${campaign.selected.type === idx && campaign.selected.product === index ? 'border border-gray-600' : ''} p-1`} key={idx} >
                                    <span className="block w-5 h-5 rounded-full" style={{ background: type.color.content }} />
                                  </button>
                                ))
                              }
                            </div>
                          </RadioGroup.Description>
                        </div>
                      </div>
                      {checked && (
                        <div className="shrink-0 text-white">
                          <CheckIcon className="h-6 w-6" />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}

function CheckIcon(props: SVGAttributes<SVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

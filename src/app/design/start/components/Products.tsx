import { SVGAttributes, useState, useEffect } from "react";
import { RadioGroup } from "@headlessui/react";
import Image from "next/image";
import { PreTee, ClassTee, ComfSleeve, Hoodie, Sweatshirt } from "../assets";

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
    types: [
      {
        color: "gray",
        image: {
          front:
            "http://localhost:3333/images/premium-unisex-tee-dark-heather-gray.jpg",
          back: "http://localhost:3333/images/premium-unisex-tee-dark-heather-gray-back.jpg",
        },
      },
      {
        color: "red",
        image: {
          front:
            "http://localhost:3333/images/premium-unisex-tee-red.jpg",
          back: "http://localhost:3333/images/premium-unisex-tee-red-back.jpg",
        },
      },
    ],
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
    types: [
      {
        color: "black",
        image: {
          front:
            "http://localhost:3333/images/classic-tee-black.jpg",
          back: "http://localhost:3333/images/classic-tee-black-back.jpg",
        },
      },
      {
        color: "blue",
        image: {
          front:
            "http://localhost:3333/images/classic-tee-royal.jpg",
          back: "http://localhost:3333/images/classic-tee-royal-back.jpg",
        },
      },
    ],
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
    types: [
      {
        color: "grey",
        image: {
          front:
            "http://localhost:3333/images/pullover-hoodie-sport-grey.jpg",
          back: "http://localhost:3333/images/pullover-hoodie-sport-grey-back.jpg",
        },
      },
      {
        color: "#3f70a2",
        image: {
          front:
            "http://localhost:3333/images/pullover-hoodie-indigo.jpg",
          back: "http://localhost:3333/images/pullover-hoodie-indigo-back.jpg",
        },
      },
    ],
  },
];

export default function Products({ campaign, setCampaign, canvasRef, canvasValues }) {

  useEffect(() => {
    setCampaign({ ...campaign, products: [...shirts] })
  }, [])


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
          <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
          <div className="space-y-6">
            {campaign.products.map((product: any, index: any) => (
              <RadioGroup.Option
                key={product.name}
                value={index}
                className={({ active, checked }) =>
                  `${active
                    ? "ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300"
                    : ""
                  }
                    ${checked ? "text-white shadow-xl" : "bg-white"}
                      relative flex cursor-pointer border-sky-100 border-[1px] rounded-lg px-5 py-4 shadow-sm focus:outline-none`
                }
              >
                {({ active, checked }) => (
                  <>
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex items-center justify-center py-4 px-6">
                          <Image
                            src={product.types[0].image.front}
                            width={50}
                            height={50}
                            alt="shirt-img"
                          />
                        </div>
                        <div className="text-sm">
                          <RadioGroup.Label
                            as="p"
                            className={`text-gray-900 ${checked ? "font-bold" : "font-medium"
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
                                product.types.map((type, idx) => (
                                  <button onClick={() => setCampaign({ ...campaign, selected: { ...campaign.selected, type: idx } })} className={`flex items-center justify-center rounded-full ${campaign.selected.type === idx && campaign.selected.product === index ? 'border border-gray-600' : ''} p-1`} key={idx} >
                                    <span className="block w-5 h-5 rounded-full" style={{ background: type.color }} />
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

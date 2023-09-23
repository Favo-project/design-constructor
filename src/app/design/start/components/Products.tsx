import { SVGAttributes, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import Image from "next/image";
import { PreTee, ClassTee, ComfSleeve, Hoodie, Sweatshirt } from "../assets";

const shirts = [
  {
    img: PreTee,
    name: "Premium Unisex Tee",
    colors: ["red", "gray"],
  },
  {
    img: ClassTee,
    name: "Classic Unisex Tee",
    colors: ["red", "gray"],
  },
  {
    img: ComfSleeve,
    name: "Comfort Colors Unisex Tee",
    colors: ["red", "gray"],
  },
  {
    img: Hoodie,
    name: "Pullover Hoodie",
    colors: ["red", "gray"],
  },
  {
    img: Sweatshirt,
    name: "Crewneck Sweatshirt",
    colors: ["red", "gray"],
  },
];

export default function Products() {
  const [selected, setSelected] = useState(shirts[0]);

  return (
    <div className="w-full py-4 px-4">
      <div className="mx-auto w-full">
        <RadioGroup value={selected} onChange={setSelected}>
          <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
          <div className="space-y-6">
            {shirts.map((shirt) => (
              <RadioGroup.Option
                key={shirt.name}
                value={shirt}
                className={({ active, checked }) =>
                  `${
                    active
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
                            src={shirt.img}
                            width={50}
                            height={50}
                            alt="shirt-img"
                          />
                        </div>
                        <div className="text-sm">
                          <RadioGroup.Label
                            as="p"
                            className={`text-gray-900 ${
                              checked ? "font-bold" : "font-medium"
                            }`}
                          >
                            {shirt.name}
                          </RadioGroup.Label>
                          <RadioGroup.Description
                            as="span"
                            className={`inline text-gray-500`}
                          >
                            <span>{shirt.colors.join(", ")}</span>
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

"use client";

import { useState } from "react";
import { Tab } from "@headlessui/react";
import Products from "./components/Products";
import Text from "./components/Text";
import Graphics from "./components/Graphics";
import Templates from "./components/Templates";
import Upload from "./components/Upload";
import {
  PiShapes,
  PiTShirt,
  PiTextTBold,
  PiUploadSimple,
} from "react-icons/pi";
import { HiOutlineTemplate } from "react-icons/hi";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Start() {
  let [categories]: any = useState({
    Products: {
      icon: <PiTShirt />,
      component: Products,
    },
    Text: {
      icon: <PiTextTBold />,
      component: Text,
    },
    Graphics: {
      icon: <PiShapes />,
      component: Graphics,
    },
    Templates: {
      icon: <HiOutlineTemplate />,
      component: Templates,
    },
    Upload: {
      icon: <PiUploadSimple />,
      component: Upload,
    },
  });

  return (
    <div id="designer">
      <div className="grid grid-cols-2">
        <div>
          <canvas id="design" />
        </div>
        <div className="sm:p-4 lg:p-8 shadow-xl">
          <h2 className="text-gray-700 text-2xl font-semibold mt-6">
            Create your design
          </h2>
          <div className="w-full px-2 py-6 sm:px-0">
            <Tab.Group>
              <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                {Object.keys(categories).map((category) => (
                  <Tab
                    key={category}
                    className={({ selected }) =>
                      classNames(
                        "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
                        "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                        selected
                          ? "bg-white shadow"
                          : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                      )
                    }
                  >
                    <div className="flex flex-col items-center">
                      <span className="text-2xl mb-2">
                        {categories[category].icon}
                      </span>
                      <p>{category}</p>
                    </div>
                  </Tab>
                ))}
              </Tab.List>
              <Tab.Panels className="mt-2">
                {Object.values(categories).map((category: any, idx) => (
                  <Tab.Panel
                    key={idx}
                    className={classNames(
                      "rounded-xl bg-white p-3",
                      "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
                    )}
                  >
                    <category.component />
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      </div>
    </div>
  );
}

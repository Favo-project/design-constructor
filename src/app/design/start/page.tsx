"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
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
import { BsPlusLg, BsDashLg } from "react-icons/bs";
import { VscRefresh } from "react-icons/vsc";

import { fabric } from "fabric";

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

  useLayoutEffect(() => {
    const canvas = new fabric.Canvas("design", {
      width: 600,
      height: 600,
      selection: true,
    });

    fabric.Image.fromURL(
      "https://c.bonfireassets.com/static/product-images/88fa7c5883ac4fc881269780872a6f0b/premium-unisex-tee-dark-heather-gray.jpg",
      (img) => {
        const canvasCenter = canvas.getCenter();
        img.set({
          scaleX: (canvas.width || 1) / (img.width || 1),
          scaleY: (canvas.width || 1) / (img.width || 1),
          selectable: false,
          top: canvasCenter.top,
          left: canvasCenter.left,
          originX: "center",
          originY: "center",
        });

        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
      }
    );

    const canvasContainer = document.getElementById("canvas-container");

    // Initial scale and pan variables
    let scale = 1;
    let offsetX = 0;
    let offsetY = 0;

    function updateCanvasViewport() {
      canvas.setViewportTransform([scale, 0, 0, scale, offsetX, offsetY]);
      canvas.requestRenderAll();
    }

    function centerCanvasViewport() {
      offsetX = (canvasContainer!.clientWidth - canvas.width! * scale) / 2;
      offsetY = (canvasContainer!.clientHeight - canvas.height! * scale) / 2;
      updateCanvasViewport();
    }

    document.getElementById("zoom-in")!.addEventListener("click", function () {
      scale *= 1.4;
      centerCanvasViewport();
    });

    document.getElementById("zoom-out")!.addEventListener("click", function () {
      scale /= 1.4;
      centerCanvasViewport();
      console.log("w", canvas.width);
      console.log("h", canvas.height);
      console.log("v", canvas.viewportTransform);
    });

    // Implement panning using mouse events
    let isPanning = false;

    canvas.on("mouse:move", (e) => {
      if (isPanning) {
        const mouseEvent = e.e;
        const delta = new fabric.Point(
          mouseEvent.movementX,
          mouseEvent.movementY
        );
        canvas.relativePan(delta);
        canvas.setCursor("grab");
        canvas.requestRenderAll();
      }
    });

    canvas.on("mouse:down", () => {
      isPanning = true;
      canvas.setCursor("grab");
      canvas.requestRenderAll();
    });

    canvas.on("mouse:up", () => {
      isPanning = false;
      canvas.setCursor("default");
      canvas.requestRenderAll();
    });

    canvas.on("mouse:leave", () => {
      isPanning = false;
      canvas.setCursor("default");
      canvas.requestRenderAll();
    });

    // Initialize the canvas viewport
    updateCanvasViewport();
  });

  return (
    <div id="designer" className="mt-20">
      <div className="grid grid-cols-2">
        <div className="relative">
          <div className="fixed top-0 left-0 bottom-0 w-[50vw] flex items-center justify-center">
            <div id="canvas-container">
              <canvas id="design" width="600" height="600" />
            </div>
            <div
              id="controls"
              className="flex items-center p-3 absolute bottom-16 left-[50%] translate-x-[-50%] rounded-md bg-white"
            >
              <button className="flex items-center py-1 px-2 text-xs rounded-md border-opacity-70 border-slate-300 border-2 uppercase">
                <VscRefresh className="mr-2 text-lg" /> Show back
              </button>
              <div id="zoom" className="flex items-center ml-4 gap-2">
                <button
                  id="zoom-in"
                  className="flex items-center justify-center rounded-full p-1 border border-gray-300"
                >
                  <BsPlusLg />
                </button>
                <span className="text-sm">100%</span>
                <button
                  id="zoom-out"
                  className="flex items-center justify-center rounded-full p-1 border border-gray-300"
                >
                  <BsDashLg />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="sm:p-4 lg:p-8 shadow-xl min-h-[100vh]">
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
                        "focus:outline-none",
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
                      "ring-white focus:outline-none"
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

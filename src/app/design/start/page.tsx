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
  const canvasRef = useRef(null);
  const designContainer = useRef(null);
  const containerRef = useRef(null);
  const [categories]: any = useState({
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

  useEffect(() => {
    const CANVAS_WIDTH = 700;
    const CANVAS_HEIGHT = 700;

    const canvas = new fabric.Canvas(canvasRef.current, {
      width: CANVAS_WIDTH,
      height: CANVAS_HEIGHT,
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

    const canvasContainer: any = designContainer.current;

    // Initial scale and pan variables
    let scale = 1;
    let offsetX = 0;
    let offsetY = 0;
    let lastX: any, lastY: any;
    let MIN_OFFSET_X = 0;
    let MAX_OFFSET_X = 0;
    let MIN_OFFSET_Y = 0;
    let MAX_OFFSET_Y = 0;

    function updateCanvasViewport() {
      canvas.setViewportTransform([scale, 0, 0, scale, offsetX, offsetY]);
      canvas.requestRenderAll();
    }

    function centerCanvasViewport() {
      offsetX =
        (canvasContainer!.clientWidth * scale - canvas.width! * scale) / 2;
      offsetY =
        (canvasContainer!.clientHeight * scale - canvas.height! * scale) / 2;
      updateCanvasViewport();
    }

    document.getElementById("zoom-in")!.addEventListener("click", function () {
      if (scale >= 1 && 4 > scale) {
        // scaling factor
        scale += 0.5;

        // new scaled canvas width and height in zoom out
        let newWidth = CANVAS_WIDTH * scale;
        let newHeight = CANVAS_HEIGHT * scale;

        // change offset limits when scaling in zoom out
        MIN_OFFSET_X = scale === 1 ? 0 : -200 * scale;
        MIN_OFFSET_Y = scale === 1 ? 0 : -200 * scale;
        MAX_OFFSET_X = scale === 1 ? 0 : 200 * scale;
        MAX_OFFSET_Y = scale === 1 ? 0 : 200 * scale;

        canvas.setWidth(newWidth);
        canvas.setHeight(newHeight);

        centerCanvasViewport();
      }
    });

    document.getElementById("zoom-out")!.addEventListener("click", function () {
      if (scale > 1 && 4 >= scale) {
        // scaling factor
        scale -= 0.5;

        // new scaled canvas width and height in zoom out
        let newWidth = CANVAS_WIDTH * scale;
        let newHeight = CANVAS_HEIGHT * scale;

        // change offset limits when scaling in zoom out
        MIN_OFFSET_X = scale === 1 ? 0 : -200 * scale;
        MIN_OFFSET_Y = scale === 1 ? 0 : -200 * scale;
        MAX_OFFSET_X = scale === 1 ? 0 : 200 * scale;
        MAX_OFFSET_Y = scale === 1 ? 0 : 200 * scale;

        canvas.setWidth(newWidth);
        canvas.setHeight(newHeight);

        centerCanvasViewport();
      }
    });

    // Implement panning using mouse events
    let isPanning = false;

    canvas.on("mouse:move", (event) => {
      if (isPanning) {
        const deltaX = event.e.clientX - lastX;
        const deltaY = event.e.clientY - lastY;
        lastX = event.e.clientX;
        lastY = event.e.clientY;

        // Calculate the updated offset values
        let newOffsetX = offsetX + deltaX;
        let newOffsetY = offsetY + deltaY;

        // Ensure the new offset values stay within the defined limits
        newOffsetX = Math.max(MIN_OFFSET_X, Math.min(MAX_OFFSET_X, newOffsetX));
        newOffsetY = Math.max(MIN_OFFSET_Y, Math.min(MAX_OFFSET_Y, newOffsetY));

        // Update the canvas viewport
        offsetX = newOffsetX;
        offsetY = newOffsetY;

        canvas.selection = false;

        // Render the canvas to apply the changes
        updateCanvasViewport();
      }
    });

    canvas.on("mouse:down", (event) => {
      isPanning = true;
      lastX = event.e.clientX;
      lastY = event.e.clientY;
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

    const printableArea = new fabric.Rect({
      top: canvas.height! / 2 - 50,
      left: canvas.width! / 2,
      originX: "center",
      originY: "center",
      width: 250,
      height: 300,
      fill: "transparent",
      stroke: "transparent",
      strokeWidth: 1,
      strokeDashArray: [5, 5],
      selectable: false,
      evented: false,
    });

    const areaText = new fabric.Text("PRINTABLE AREA", {
      top: canvas.height! / 2 + printableArea.height! / 2 - 35,
      left: canvas.width! / 2,
      fontSize: 14,
      fontStyle: "normal",
      fontFamily: "Arial",
      fill: "transparent",
      selectable: false,
      evented: false,
      originX: "center",
      originY: "center",
    });

    canvas.add(printableArea, areaText);

    canvas.on("mouse:over", () => {
      printableArea.set({ stroke: "white" });
      areaText.set({ fill: "white" });
      canvas.requestRenderAll();
    });

    canvas.on("mouse:out", () => {
      printableArea.set({ stroke: "transparent" });
      areaText.set({ fill: "transparent" });
      canvas.requestRenderAll();
    });

    // Initialize the canvas viewport
    updateCanvasViewport();
  }, []);

  return (
    <div id="designer" className="mt-20">
      <div className="grid sm:grid-cols-1 lg:grid-cols-3">
        <div id="design-content" ref={containerRef} className="relative">
          <div className="lg:fixed top-0 mt-20 overflow-hidden left-0 bottom-0 sm:w-[100vw] lg:w-[66.6vw] flex items-center justify-center">
            <div id="design-container" ref={designContainer}>
              <canvas id="design" ref={canvasRef} />
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
        <div></div>
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

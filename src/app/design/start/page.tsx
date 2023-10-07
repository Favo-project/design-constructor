"use client";

import { createContext, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
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
  const [loading, setLoading] = useState(true)
  const zoomInBtn = useRef(null)
  const zoomOutBtn = useRef(null)

  const [canvasScale, setCanvasScale] = useState(100);
  const canvasValues = useRef({
    scale: 1,
    offsetX: 0,
    offsetY: 0,
    lastX: null,
    lastY: null,
    CANVAS_WIDTH: 700,
    CANVAS_HEIGHT: 700,
    MIN_OFFSET_X: 0,
    MAX_OFFSET_X: 0,
    MIN_OFFSET_Y: 0,
    MAX_OFFSET_Y: 0,
    isPanning: false,
  });
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

  const [campaign, setCampaign] = useState({
    selected: {
      product: 0,
      side: 'front',
      type: 0,
    },
    products: [],
    design: {
      front: [],
      back: []
    },
  });

  useLayoutEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: canvasValues.current.CANVAS_WIDTH,
      height: canvasValues.current.CANVAS_HEIGHT,
      selection: true,
      transparentCorners: false,
      cornerColor: 'white',
      cornerStrokeColor: 'white',
      cornerSize: 10,
      rotatingPointOffset: 12,
    });
    setLoading(true)

    fabric.Image.fromURL(
      "https://c.bonfireassets.com/static/product-images/88fa7c5883ac4fc881269780872a6f0b/premium-unisex-tee-dark-heather-gray.jpg",
      (img) => {
        const canvasCenter = canvas.getCenter();
        console.log((canvas.width || 1) / (img.width || 1))
        img.set({
          scaleX: (canvas.width || 1) / (img.width || 1),
          scaleY: (canvas.width || 1) / (img.height || 1),
          selectable: false,
          top: canvasCenter.top,
          left: canvasCenter.left,
          originX: "center",
          originY: "center",
        });

        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
      }
    );

    canvasRef.canvas = canvas;
    setLoading(false)
  }, []);

  useEffect(() => {
    const canvas = canvasRef.canvas!
    const canvasContainer: any = designContainer.current;
    const zoomIn = zoomInBtn.current
    const zoomOut = zoomOutBtn.current

    function updateCanvasViewport() {
      canvas.setViewportTransform([
        canvasValues.current.scale,
        0,
        0,
        canvasValues.current.scale,
        canvasValues.current.offsetX,
        canvasValues.current.offsetY,
      ]);
      canvas.renderAll();
    }

    function centerCanvasViewport() {
      canvasValues.current.offsetX =
        (canvasContainer!.clientWidth * canvasValues.current.scale -
          canvas.width! * canvasValues.current.scale) /
        2;
      canvasValues.current.offsetY =
        (canvasContainer!.clientHeight * canvasValues.current.scale -
          canvas.height! * canvasValues.current.scale) /
        2;
      updateCanvasViewport();
    }

    zoomIn!.addEventListener("click", function () {
      if (canvasValues.current.scale >= 1 && 4 > canvasValues.current.scale) {
        // scaling factor
        canvasValues.current.scale += 0.5;

        // new scaled canvas width and height in zoom out
        let newWidth = canvasValues.current.CANVAS_WIDTH * canvasValues.current.scale;
        let newHeight = canvasValues.current.CANVAS_HEIGHT * canvasValues.current.scale;

        // change offset limits when scaling in zoom out
        canvasValues.current.MIN_OFFSET_X =
          canvasValues.current.scale === 1
            ? 0
            : -200 * canvasValues.current.scale;
        canvasValues.current.MIN_OFFSET_Y =
          canvasValues.current.scale === 1
            ? 0
            : -200 * canvasValues.current.scale;
        canvasValues.current.MAX_OFFSET_X =
          canvasValues.current.scale === 1
            ? 0
            : 200 * canvasValues.current.scale;
        canvasValues.current.MAX_OFFSET_Y =
          canvasValues.current.scale === 1
            ? 0
            : 200 * canvasValues.current.scale;

        canvas.setWidth(newWidth);
        canvas.setHeight(newHeight);

        centerCanvasViewport();
      }
    });

    zoomOut!.addEventListener("click", function () {
      if (canvasValues.current.scale > 1 && 4 >= canvasValues.current.scale) {
        // scaling factor
        canvasValues.current.scale -= 0.5;

        // new scaled canvas width and height in zoom out
        let newWidth = canvasValues.current.CANVAS_WIDTH * canvasValues.current.scale;
        let newHeight = canvasValues.current.CANVAS_HEIGHT * canvasValues.current.scale;

        // change offset limits when scaling in zoom out
        canvasValues.current.MIN_OFFSET_X =
          canvasValues.current.scale === 1
            ? 0
            : -200 * canvasValues.current.scale;
        canvasValues.current.MIN_OFFSET_Y =
          canvasValues.current.scale === 1
            ? 0
            : -200 * canvasValues.current.scale;
        canvasValues.current.MAX_OFFSET_X =
          canvasValues.current.scale === 1
            ? 0
            : 200 * canvasValues.current.scale;
        canvasValues.current.MAX_OFFSET_Y =
          canvasValues.current.scale === 1
            ? 0
            : 200 * canvasValues.current.scale;

        canvas.setWidth(newWidth);
        canvas.setHeight(newHeight);

        centerCanvasViewport();
      }
    });

    canvas.on("mouse:move", (event) => {
      if (canvasValues.current.isPanning && !event.target) {
        const deltaX = event.e.clientX - canvasValues.current.lastX;
        const deltaY = event.e.clientY - canvasValues.current.lastY;
        canvasValues.current.lastX = event.e.clientX;
        canvasValues.current.lastY = event.e.clientY;

        // Calculate the updated offset values
        let newOffsetX = canvasValues.current.offsetX + deltaX;
        let newOffsetY = canvasValues.current.offsetY + deltaY;

        // Ensure the new offset values stay within the defined limits
        newOffsetX = Math.max(
          canvasValues.current.MIN_OFFSET_X,
          Math.min(canvasValues.current.MAX_OFFSET_X, newOffsetX)
        );
        newOffsetY = Math.max(
          canvasValues.current.MIN_OFFSET_Y,
          Math.min(canvasValues.current.MAX_OFFSET_Y, newOffsetY)
        );

        // Update the canvas viewport
        canvasValues.current.offsetX = newOffsetX;
        canvasValues.current.offsetY = newOffsetY;

        if (canvasValues.current.scale === 1) {
          canvas.selection = true
        }
        else {
          canvas.selection = false;
          canvas.setCursor("grab");
        }

        // Render the canvas to apply the changes
        updateCanvasViewport();
      }
    });

    canvas.on("mouse:down", (event) => {
      if (!event.target) {
        if (canvasValues.current.scale === 1) {
          canvas.setCursor("default");
        }
        else {
          canvas.setCursor("grab");
        }

        canvasValues.current.isPanning = true;
        canvasValues!.current!.lastX = event.e.clientX;
        canvasValues!.current!.lastY = event.e.clientY;
        canvas.renderAll();
      }
    });

    canvas.on("mouse:up", () => {
      canvasValues.current.isPanning = false;
      canvas.setCursor("default");
      canvas.renderAll();
    });

    canvas.on("mouse:leave", () => {
      canvasValues.current.isPanning = false;
      canvas.setCursor("default");
      canvas.renderAll();
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
      strokeDashArray: [4, 4],
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
  }, [])

  useEffect(() => {
    const canvas = canvasRef.canvas

    if (campaign.products.length) {
      setLoading(true)
      fabric.Image.fromURL(
        campaign.products[campaign.selected.product].types[campaign.selected.type].image[campaign.selected.side],
        (img) => {
          img.set({
            scaleX: (canvasValues.current.CANVAS_WIDTH || 1) / (img.width || 1),
            scaleY: (canvasValues.current.CANVAS_HEIGHT || 1) / (img.width || 1),
            selectable: false,
            top: canvasValues.current.CANVAS_WIDTH / 2,
            left: canvasValues.current.CANVAS_HEIGHT / 2,
            originX: "center",
            originY: "center",
          });

          setLoading(false)
          canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
        }
      );
    }

    var deleteIcon = "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";

    var img = document.createElement('img');
    img.src = deleteIcon;


    fabric.Object.prototype.controls.deleteControl = new fabric.Control({
      x: 0.5,
      y: -0.5,
      offsetY: 16,
      cursorStyle: 'pointer',
      mouseUpHandler: deleteObject,
      render: renderIcon,
      cornerSize: 24
    });

    function deleteObject(eventData, transform) {
      // delete from the array
      const targetId = transform.target.canvasId

      const filteredElements = campaign.design[campaign.selected.side].filter((elem) => elem.canvasId !== targetId)
      setCampaign({ ...campaign, products: [...campaign.products], design: { ...campaign.design, [campaign.selected.side]: [...filteredElements] } })

      var target = transform.target;
      var canvas = target.canvas;
      canvas.remove(target);
      canvas.requestRenderAll();
    }

    function renderIcon(ctx, left, top, styleOverride, fabricObject) {
      var size = this.cornerSize;
      ctx.save();
      ctx.translate(left, top);
      ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
      ctx.drawImage(img, -size / 2, -size / 2, size, size);
      ctx.restore();
    }

  }, [campaign])

  const onChangeSide = () => {
    const canvas = canvasRef.canvas

    if (campaign.selected.side === 'front') {
      setCampaign({ ...campaign, selected: { ...campaign.selected, side: 'back' } })
      canvas.remove(...campaign.design.front)
      canvas.add(...campaign.design.back)
    }
    else {
      setCampaign({ ...campaign, selected: { ...campaign.selected, side: 'front' } })
      canvas.remove(...campaign.design.back)
      canvas.add(...campaign.design.front)
    }
  }

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
              <button
                onClick={onChangeSide}
                className="flex items-center py-1 px-2 text-xs rounded-md border-opacity-70 border-slate-300 border-2 uppercase"
              >
                <VscRefresh className="mr-2 text-lg" /> Show {campaign.selected.side === 'front' ? 'back' : 'front'}
              </button>
              <div id="zoom" className="flex items-center ml-4 gap-2">
                <button
                  onClick={() =>
                    setCanvasScale((prevValue) => (prevValue += 50))
                  }
                  id="zoom-in"
                  ref={zoomInBtn}
                  className="flex items-center justify-center rounded-full p-1 border border-gray-300"
                >
                  <BsPlusLg />
                </button>
                <span className="text-sm">
                  {canvasValues.current.scale * 100}%
                </span>
                <button
                  onClick={() =>
                    setCanvasScale((prevValue) => (prevValue -= 50))
                  }
                  id="zoom-out"
                  ref={zoomOutBtn}
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
                    <category.component canvasRef={canvasRef} campaign={campaign} setCampaign={setCampaign} canvasValues={canvasValues} />
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

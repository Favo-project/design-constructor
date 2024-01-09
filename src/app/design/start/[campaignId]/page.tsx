"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Tab } from "@headlessui/react";
import Products from "./components/Products";
import Text from "./components/Text/Text";
import Clipart from "./components/Clipart/Clipart";
import Upload from "./components/Ulpoad/Upload";
import {
  PiShapes,
  PiTShirt,
  PiTextTBold,
  PiUploadSimple,
} from "react-icons/pi";
import { BsPlusLg, BsDashLg } from "react-icons/bs";
import { VscRefresh } from "react-icons/vsc";

import { fabric } from "fabric"
import { DeleteIcon, RotateIcon } from "../assets";
import Loader from "@/components/Loader";
import { Transform } from "fabric/fabric-impl";
import TextEditor from "./components/Text/Editor";
import ClipartEditor from "./components/Clipart/Editor";
import ImageEditor from "./components/Ulpoad/Editor";
import MultipleEditor from "./components/MultipleEditor";
import FontFaceObserver from 'fontfaceobserver'
import { campaignAtom, fonts, canvas, authAtom, userAtom } from "@/constants";
import { useAtom } from "jotai";
import axios from "axios";
import { useRouter } from "next/navigation";
import { campaignUtils } from "../../actions/campaign";


function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Start({ params }: { params: { campaignId: string } }) {
  const [canvasExp, setCanvas] = useAtom(canvas)

  const router = useRouter()
  const [auth, setAuth] = useAtom(authAtom)
  const [user, setUser] = useAtom(userAtom)
  const [loading, setLoading] = useState(true)
  const [tabIndex, setTabIndex] = useState(0)
  const [selectedObj, setSelectedObj] = useState<{ objType: any, object: fabric.Object }>(null)
  const [multipleObj, setMultipleObj] = useState([])
  const zoomInBtn = useRef(null)
  const zoomOutBtn = useRef(null)

  const [canvasScale, setCanvasScale] = useState(100);
  const canvasValues: any = useRef({
    areaCrossed: {
      front: {},
      back: {},
    },
    side: 'front',
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
  const canvasRef: any = useRef(null);
  const designContainer = useRef(null);
  const containerRef = useRef(null);
  const [categories]: any = useState({
    Products: {
      icon: <PiTShirt />,
      component: Products,
      editor: MultipleEditor,
      multiple: true
    },
    Text: {
      icon: <PiTextTBold />,
      component: Text,
      editor: TextEditor
    },
    Clipart: {
      icon: <PiShapes />,
      component: Clipart,
      editor: ClipartEditor
    },
    // Templates: {
    //   icon: <HiOutlineTemplate />,
    //   component: Templates,
    // },
    Upload: {
      icon: <PiUploadSimple />,
      component: Upload,
      editor: ImageEditor
    },
  });

  // campaign state
  const [campaign, setCampaign] = useAtom(campaignAtom);

  useLayoutEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/campaigns/${params.campaignId}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth || localStorage.getItem('user_at')}`
          }
        })

        console.log(response);

        const design = await campaignUtils.addObjects(canvasRef.canvas, response.data.design, response.data.products[0].printableArea, campaign.selected.side)

        setCampaign({
          selected: {
            product: 0,
            side: 'front',
            type: 0,
          },
          design: {
            ...design
          },
          products: response.data.products,
        })
      }
      catch (e) {
        console.log(e);
      }
    }

    fetchData()
  }, [])

  useLayoutEffect(() => {
    fonts.forEach((font) => {
      if (font === 'Arial') return
      const myfont = new FontFaceObserver(font);
      myfont.load()
    })

    const canvas = new fabric.Canvas(canvasRef.current, {
      width: canvasValues.current.CANVAS_WIDTH,
      height: canvasValues.current.CANVAS_HEIGHT,
      selection: true,
      imageSmoothingEnabled: true
    });

    setCanvas(canvas)

    const onSelect = (options) => {
      if (options.selected.length > 1) {
        setTabIndex(0)
        setMultipleObj(options.selected)
        setSelectedObj(null)
      }
      else {
        setSelectedObj({ objType: options.selected[0].objType, object: options.selected[0] })
        setMultipleObj([])

        switch (options.selected[0].objType) {
          case 'text':
            setTabIndex(1)
            break
          case 'icon':
            setTabIndex(2)
            break
          case 'image':
            setTabIndex(3)
            break
          default:
            setTabIndex(0)
        }
      }
    }

    const onMouseDown = (options) => {
      if (options.target) {
        if (options.target.type === 'activeSelection' && !options.target.canvasId) {
          setTabIndex(0)
          setMultipleObj(options.target._objects)
          setSelectedObj(null)
        }
        else {
          setSelectedObj({ objType: options.target.objType, object: options.target })
          setMultipleObj([])

          switch (options.target.objType) {
            case 'text':
              setTabIndex(1)
              break
            case 'icon':
              setTabIndex(2)
              break
            case 'image':
              setTabIndex(3)
              break
            default:
              setTabIndex(0)
          }
        }
      }
    }

    canvas.on('selection:created', onSelect)
    canvas.on('object:selected', onSelect)
    canvas.on('selection:updated', onSelect)
    canvas.on('mouse:down', onMouseDown)

    canvas.on('before:selection:cleared', (options) => {
      setMultipleObj([])
      setSelectedObj(null)
    })

    const printableArea: any = new fabric.Rect({
      top: canvasValues.current.CANVAS_HEIGHT / 2,
      left: canvasValues.current.CANVAS_WIDTH / 2,
      originX: "center",
      originY: "center",
      width: 250,
      height: 300,
      fill: "transparent",
      stroke: "transparent",
      strokeWidth: 1,
      strokeDashArray: [3, 3],
      selectable: false,
      evented: false,
    });

    const areaText: any = new fabric.Text("PRINTABLE AREA", {
      top: printableArea.top + printableArea.height! / 2 + 15,
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

    const centralLine: any = new fabric.Line(
      [(canvas.width / 2), 0, (canvas.width / 2), printableArea.height],
      {
        top: printableArea.top - (printableArea.height / 2),
        stroke: 'transparent',
        strokeWidth: 1,
        selectable: false,
        evented: false
      }
    );

    printableArea.ignore = true
    areaText.ignore = true
    centralLine.ignore = true

    canvas.add(printableArea, areaText, centralLine);

    canvasRef.canvas = canvas;
    canvasRef.printableArea = printableArea;
    canvasRef.areaText = areaText;
    canvasRef.centralLine = centralLine;

    fabric.Object.prototype.setControlVisible('ml', false)
    fabric.Object.prototype.setControlVisible('mb', false)
    fabric.Object.prototype.setControlVisible('mr', false)
    fabric.Object.prototype.setControlVisible('mt', false)
    fabric.Object.prototype.transparentCorners = false
    fabric.Object.prototype.cornerColor = 'white'
    fabric.Object.prototype.cornerStrokeColor = 'white'
    fabric.Object.prototype.cornerSize = 10
    fabric.Object.prototype.rotatingPointOffset = 12
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

    canvas.on('object:rotating', (options) => {
      const object = options.target
      const objAngle = options.target.angle
      const snapThreshold = 10;

      const degrees = {
        Up: 0,
        UpRight: 45,
        Right: 90,
        DownRight: 135,
        Down: 180,
        LeftDown: 225,
        Left: 270,
        UpLeft: 315,
        Last: 360
      }

      for (const angle in degrees) {
        if (degrees[angle] - snapThreshold <= objAngle && objAngle <= degrees[angle] + snapThreshold) {
          object.set({
            angle: degrees[angle],
          })
          canvas.renderAll();
        }
      }
    })

    canvas.on('object:added', (options) => {
      const object = options.target

      if (object.ignore) return
      else canvas.setActiveObject(object);
    })

    const moveLimit = (options) => {
      const object = options.target;
      // limit object within canvas
      limitObjectWithinCanvas(options.target, canvas)

      // Define a threshold for how close an object should be to snap to the central line
      const snapThreshold = 10; // Adjust as needed
      const closeThreshold = 20; // Color as needed

      // Calculate the distance from the object's center to the central line
      const objectCenterX = object.left
      const distanceToCentralLine = Math.abs(objectCenterX - (canvasValues.current.CANVAS_WIDTH / 2));

      // Check if the object is close enough to the central line to snap
      if (distanceToCentralLine <= closeThreshold) {
        canvasRef.centralLine.set({ stroke: "#F94C10" });
      }
      else {
        canvasRef.centralLine.set({ stroke: "transparent" });
      }
      if (distanceToCentralLine <= snapThreshold) {
        // Snap the object to the central line
        object.set({
          left: canvasValues.current.CANVAS_WIDTH / 2
        });

        canvas.renderAll();
      }
    }

    function onCross(options) {
      moveLimit(options)

      options.target.relativeTop = (options.target.top - options.target.height / 2) - (canvasRef.printableArea.top - canvasRef.printableArea.height / 2)

      if (options.target.canvasId) {
        canvas.forEachObject((obj) => {
          if (obj.ignore) return;
          delete canvasValues.current.areaCrossed[canvasValues.current.side]['group']

          const objWidth1 = obj.width * obj.scaleX
          const objHeight1 = obj.height * obj.scaleY
          const objWidth2 = canvasRef.printableArea.width
          const objHeight2 = canvasRef.printableArea.height

          const left1 = obj.left - objWidth1 / 2
          const top1 = obj.top - objHeight1 / 2
          const right1 = left1 + objWidth1
          const bottom1 = top1 + objHeight1

          // Calculate the boundaries of object2
          const left2 = canvasRef.printableArea.left - objWidth2 / 2
          const top2 = canvasRef.printableArea.top - objHeight2 / 2
          const right2 = left2 + objWidth2
          const bottom2 = top2 + objHeight2
          // Check if object1 has crossed out of object2
          if (right1 > right2 || left1 < left2 || bottom1 > bottom2 || top1 < top2) {
            canvasValues.current.areaCrossed[canvasValues.current.side][obj.canvasId] = true
            // obj.set({ opacity: 0.5 }) changed because it affects image converting in server
            canvasRef.printableArea.set({
              stroke: 'red'
            })
            return canvas.renderAll()
          } else {
            canvasValues.current.areaCrossed[canvasValues.current.side][obj.canvasId] = false
            obj.set({ opacity: 1 })
            canvasRef.printableArea.set({
              stroke: 'white'
            })
            return canvas.renderAll()
          }
        })
      }
      else {
        const obj = options.target
        const childrenObjects = obj._objects

        childrenObjects.forEach((item) => {
          item.set({ opacity: 1 })
          delete canvasValues.current.areaCrossed[canvasValues.current.side][item.canvasId]
        })

        const objWidth1 = obj.width * obj.scaleX
        const objHeight1 = obj.height * obj.scaleY
        const objWidth2 = canvasRef.printableArea.width
        const objHeight2 = canvasRef.printableArea.height

        const left1 = obj.left - objWidth1 / 2
        const top1 = obj.top - objHeight1 / 2
        const right1 = left1 + objWidth1
        const bottom1 = top1 + objHeight1

        // Calculate the boundaries of object2
        const left2 = canvasRef.printableArea.left - objWidth2 / 2
        const top2 = canvasRef.printableArea.top - objHeight2 / 2
        const right2 = left2 + objWidth2
        const bottom2 = top2 + objHeight2
        // Check if object1 has crossed out of object2
        if (right1 > right2 || left1 < left2 || bottom1 > bottom2 || top1 < top2) {
          canvasValues.current.areaCrossed[canvasValues.current.side]['group'] = true
          // obj.set({ opacity: 0.5 }) changed because it affects image converting in server
          canvasRef.printableArea.set({
            stroke: 'red'
          })
          return canvas.renderAll()
        } else {
          canvasValues.current.areaCrossed[canvasValues.current.side]['group'] = false
          obj.set({ opacity: 1 })
          canvasRef.printableArea.set({
            stroke: 'white'
          })
          return canvas.renderAll()
        }
      }
    }

    canvas.on({
      'object:moving': onCross,
      'object:scaling': onCross,
      'object:rotating': onCross,
    });

    const onCanvasOver = () => {
      if (Object.values(canvasValues.current.areaCrossed[canvasValues.current.side]).includes(true)) {
        canvasRef.printableArea.set({
          stroke: 'red'
        })
      } else {
        canvasRef.printableArea.set({
          stroke: 'white'
        })
      }
      canvasRef.areaText.set({ fill: "white" });
      canvas.renderAll();
    }

    const onCanvasOut = () => {
      canvasRef.printableArea.set({ stroke: "transparent" });
      canvasRef.areaText.set({ fill: "transparent" });
      canvasRef.centralLine.set({ stroke: "transparent" });
      canvas.renderAll();
    }

    canvas.on({ "mouse:over": onCanvasOver, "mouse:move": onCanvasOver });
    canvas.on({ "mouse:out": onCanvasOut, "mouse:leave": onCanvasOut });

    function limitObjectWithinCanvas(obj, canvas) {
      const canvasWidth = canvasValues.current.CANVAS_WIDTH
      const canvasHeight = canvasValues.current.CANVAS_HEIGHT
      const objWidth = (obj.width * obj.scaleX) / 2
      const objHeight = (obj.height * obj.scaleY) / 2

      const objLeft = obj.left;
      const objTop = obj.top;
      const objRight = obj.left + obj.width * obj.scaleX;
      const objBottom = obj.top + obj.height * obj.scaleY;

      if (objLeft < objWidth) {
        obj.left = objWidth
      }
      if (objTop < objHeight) {
        obj.top = objHeight
      }
      if (objRight > canvasWidth + objWidth) {
        obj.left = canvasWidth - objWidth
      }
      if (objBottom > canvasHeight + objHeight) {
        obj.top = canvasHeight - objHeight
      }
    }

    // Initialize the canvas viewport
    updateCanvasViewport();
  }, [])

  useEffect(() => {
    setLoading(true)
    const canvas = canvasRef.canvas

    if (campaign.products.length) {
      setLoading(true)

      let imgElement = new Image();
      imgElement.crossOrigin = "anonymous";
      imgElement.src = campaign.products[campaign.selected.product].colors[campaign.selected.type].image[campaign.selected.side]

      imgElement.onload = function () {
        const fabricImage = new fabric.Image(imgElement);
        fabricImage.set({
          scaleX: (canvasValues.current.CANVAS_WIDTH || 1) / (fabricImage.width || 1),
          scaleY: (canvasValues.current.CANVAS_HEIGHT || 1) / (fabricImage.width || 1),
          selectable: false,
          top: canvasValues.current.CANVAS_WIDTH / 2,
          left: canvasValues.current.CANVAS_HEIGHT / 2,
          originX: "center",
          originY: "center",
        });
        setLoading(false)
        canvas.setBackgroundImage(fabricImage, canvas.renderAll.bind(canvas));
      };

      const printableArea = campaign.products[campaign.selected.product].printableArea[campaign.selected.side]
      canvasRef.printableArea.set({
        top: printableArea.top,
        left: printableArea.left,
        width: printableArea.width,
        height: printableArea.height,
      })
      canvasRef.areaText.set({
        top: printableArea.top + printableArea.height / 2 + 15,
        left: canvasValues.current.CANVAS_WIDTH / 2,
      })
      canvasRef.centralLine.set({
        top: printableArea.top - (printableArea.height / 2),
        left: canvasValues.current.CANVAS_WIDTH / 2,
        height: printableArea.height,
      })
      canvas.requestRenderAll()
    }

    fabric.Object.prototype.controls.deleteControl = new fabric.Control({
      x: 0,
      y: 0.5,
      offsetY: 15,
      cursorStyle: 'pointer',
      mouseUpHandler: deleteObject,
      render: renderIcon,
    });

    const fabricWithControlsUtils = fabric as typeof fabric & { controlsUtils: any };

    fabric.Object.prototype.controls.mtr = new fabric.Control({
      x: 0.5,
      y: 0,
      offsetX: 15,
      actionHandler: fabricWithControlsUtils.controlsUtils.rotationWithSnapping,
      cursorStyleHandler: fabricWithControlsUtils.controlsUtils.rotationStyleHandler,
      withConnection: true,
      actionName: 'rotate',
      render: renderRotateIcon,
    });

    const deleteImg = document.createElement('img')
    const rotateImg = document.createElement('img')
    deleteImg.src = DeleteIcon
    rotateImg.src = RotateIcon

    function renderRotateIcon(ctx, left, top, styleOverride, fabricObject) {
      const size = 24
      ctx.save();
      ctx.translate(left, top);
      ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
      ctx.drawImage(rotateImg, -size / 2, -size / 2, size, size);
      ctx.restore();
    }

    function deleteObject(eventData: MouseEvent, transform: Transform): boolean {
      const delElements = transform.target.canvas.getActiveObjects().map((elem: any) => elem.canvasId)
      const filteredElements = campaign.design[campaign.selected.side].filter((elem) => !delElements.includes(elem.canvasId))

      setCampaign({ ...campaign, design: { ...campaign.design, [campaign.selected.side]: [...filteredElements] } })
      delElements.forEach(obj => {
        delete canvasValues.current.areaCrossed[campaign.selected.side][obj]
        delete canvasValues.current.areaCrossed[campaign.selected.side]['group']
      });
      canvas.remove(...transform.target.canvas.getActiveObjects())
      canvas.discardActiveObject()
      canvas.renderAll()
      return true
    }

    function renderIcon(ctx, left, top, styleOverride, fabricObject) {
      const size = 24
      ctx.save();
      ctx.translate(left, top);
      ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
      ctx.drawImage(deleteImg, -size / 2, -size / 2, size, size);
      ctx.restore();
    }

    const deleteObjHandler = (event) => {
      if (event.keyCode === 46 && canvas.getActiveObjects().length > 0) {
        const delElements = canvas.getActiveObjects().map(elem => elem.canvasId)
        const filteredElements = campaign.design[campaign.selected.side].filter((elem) => !delElements.includes(elem.canvasId))

        setCampaign({ ...campaign, design: { ...campaign.design, [campaign.selected.side]: [...filteredElements] } })
        delElements.forEach(obj => {
          delete canvasValues.current.areaCrossed[campaign.selected.side][obj]
          delete canvasValues.current.areaCrossed[campaign.selected.side]['group']
        });
        canvas.remove(...canvas.getActiveObjects())
        canvas.discardActiveObject()
        canvas.renderAll()
      }
    }

    document.addEventListener('keydown', deleteObjHandler)

    return () => {
      document.removeEventListener('keydown', deleteObjHandler)
    }
  }, [campaign])

  const onChangeSide = () => {
    const canvas = canvasRef.canvas

    if (campaign.selected.side === 'front') {
      setCampaign({ ...campaign, selected: { ...campaign.selected, side: 'back' } })
      canvasValues.current.side = 'back'
      canvas.remove(...campaign.design.front)
      canvas.add(...campaign.design.back)
    }
    else {
      setCampaign({ ...campaign, selected: { ...campaign.selected, side: 'front' } })
      canvasValues.current.side = 'front'
      canvas.remove(...campaign.design.back)
      canvas.add(...campaign.design.front)
    }

    canvas.discardActiveObject()
    setTabIndex(0)
    canvas.renderAll()
  }

  const onChangeTab = (index) => {
    setTabIndex(index)

    setSelectedObj(null)
    setMultipleObj([])
  }

  return (
    <div id="designer">
      <div className="grid sm:grid-cols-1 lg:grid-cols-3">
        <div id="design-content" ref={containerRef} className="relative">
          <div className="lg:fixed top-0 mt-20 overflow-hidden left-0 bottom-0 sm:w-[100vw] lg:w-[66.6vw] flex items-center justify-center">
            {
              loading ? (
                <div className="absolute bg-white bg-opacity-20 z-50 top-0 left-0 right-0 bottom-0 flex items-center justify-center text-4xl">
                  <Loader />
                </div>
              ) : null
            }
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
                    setCanvasScale((prevValue) => (prevValue -= 50))
                  }
                  disabled={canvasScale <= 100}
                  id="zoom-out"
                  ref={zoomOutBtn}
                  className="flex items-center justify-center rounded-full p-1 border border-gray-300 disabled:opacity-30"
                >
                  <BsDashLg />
                </button>
                <span className="text-sm">
                  {canvasValues.current.scale * 100}%
                </span>
                <button
                  onClick={() =>
                    setCanvasScale((prevValue) => (prevValue += 50))
                  }
                  disabled={canvasScale >= 400}
                  id="zoom-in"
                  ref={zoomInBtn}
                  className="flex items-center justify-center rounded-full p-1 border border-gray-300 disabled:opacity-30"
                >
                  <BsPlusLg />
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
            <Tab.Group onChange={onChangeTab} selectedIndex={tabIndex}>
              <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                {Object.keys(categories).map((category) => (
                  <Tab
                    onClick={() => onChangeTab(tabIndex)}
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
                    {
                      multipleObj?.length && category.multiple ? (
                        <category.editor selectedObj={selectedObj} multipleObj={multipleObj} campaign={campaign} setCampaign={setCampaign} canvasRef={canvasRef} canvasValues={canvasValues} />
                      ) : (
                        selectedObj && category.editor ? (
                          <category.editor selectedObj={selectedObj} multipleObj={multipleObj} campaign={campaign} setCampaign={setCampaign} canvasRef={canvasRef} canvasValues={canvasValues} />
                        ) : (
                          <category.component canvasRef={canvasRef} campaign={campaign} setCampaign={setCampaign} canvasValues={canvasValues} />
                        )
                      )
                    }
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

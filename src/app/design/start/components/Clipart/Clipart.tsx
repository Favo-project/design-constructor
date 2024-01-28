import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { BiSearch } from "react-icons/bi";
import { SVG1, SVG2, SVG3, SVG4, SVG5, SVG6, SVG7 } from "../../assets/graphics";
import { fabric } from 'fabric'
import { v4 as uuidv4 } from 'uuid'

interface IGraph {
  icon: any;
  width: number;
  height: number;
}

export default function Clipart({ campaign, setCampaign, canvasRef, canvasValues }) {
  const [graphics] = useState([
    {
      icon: `${process.env.NEXT_PUBLIC_BASE_URL}/files/cliparts/icon.svg`,
      width: 100,
      height: 100,
    },
    {
      icon: `${process.env.NEXT_PUBLIC_BASE_URL}/files/cliparts/icon-1.svg`,
      width: 100,
      height: 100,
    },
    {
      icon: `${process.env.NEXT_PUBLIC_BASE_URL}/files/cliparts/icon-2.svg`,
      width: 100,
      height: 100,
    },
    {
      icon: `${process.env.NEXT_PUBLIC_BASE_URL}/files/cliparts/icon-3.svg`,
      width: 100,
      height: 100,
    },
    {
      icon: `${process.env.NEXT_PUBLIC_BASE_URL}/files/cliparts/icon-4.svg`,
      width: 100,
      height: 100,
    },
    {
      icon: `${process.env.NEXT_PUBLIC_BASE_URL}/files/cliparts/icon-5.svg`,
      width: 100,
      height: 100,
    },
    {
      icon: `${process.env.NEXT_PUBLIC_BASE_URL}/files/cliparts/icon-6.svg`,
      width: 100,
      height: 100,
    },
    {
      icon: `${process.env.NEXT_PUBLIC_BASE_URL}/files/cliparts/icon-7.svg`,
      width: 100,
      height: 100,
    },
    {
      icon: `${process.env.NEXT_PUBLIC_BASE_URL}/files/cliparts/icon-8.svg`,
      width: 100,
      height: 100,
    },
  ]);

  const graphicHandler = (graph) => {
    const canvas = canvasRef.canvas


    fabric.loadSVGFromURL(graph.icon, (objects, options) => {
      const svgObject: any = fabric.util.groupSVGElements(objects, options);
      svgObject.setControlVisible('ml', false)
      svgObject.setControlVisible('mb', false)
      svgObject.setControlVisible('mr', false)
      svgObject.setControlVisible('mt', false)

      svgObject.set({
        top: canvasValues.current.CANVAS_HEIGHT / 2 - 50,
        left: canvasValues.current.CANVAS_WIDTH / 2,
        originX: 'center',
        originY: 'center',
        fill: 'white',
        transparentCorners: false,
        cornerColor: 'white',
        cornerStrokeColor: '#ADC4CE',
        cornerSize: 10,
        rotatingPointOffset: 12,
      })

      svgObject._objects.map((elem) => elem.fill ? elem.set({ fill: 'white' }) : elem)

      svgObject.relativeTop = (svgObject.top - svgObject.height / 2) - (canvasRef.printableArea.top - canvasRef.printableArea.height / 2)
      svgObject.side = campaign.selected.side
      svgObject.canvasId = uuidv4()
      svgObject.objType = 'icon'
      svgObject.url = graph.icon
      setCampaign({ ...campaign, design: { ...campaign.design, [campaign.selected.side]: [...campaign.design[campaign.selected.side], svgObject] } })

      canvas.add(svgObject);
      canvas.renderAll()
    });
  }

  return (
    <div id="w-full py-4 px-4">
      <div>
        <div className="relative mt-2 rounded-md shadow-sm">
          <input
            type="text"
            name="search"
            className="block w-full outline-none rounded-md border-0 py-3 pl-4 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-magenta sm:text-sm sm:leading-6"
            placeholder="Search for something"
          />
          <div className="absolute inset-y-0 right-0 flex items-center">
            <button className="h-full rounded-md border-0 bg-transparent py-0 px-3 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-magenta sm:text-sm">
              <BiSearch className="text-xl" />
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3 py-6">
        {graphics?.map((graph: IGraph, index) => (
          <button
            onClick={() => graphicHandler(graph)}
            className={`py-2 px-4 flex items-center justify-center hover:ring-2 ring-gray-200 ring-opacity-40 rounded transition-all`}
            key={index}
          >
            <Image src={graph.icon} width={100} height={100} alt="graphic-icon" />
          </button>
        ))}
      </div>
    </div>
  );
}

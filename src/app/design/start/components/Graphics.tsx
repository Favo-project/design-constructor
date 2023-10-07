import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { BiSearch } from "react-icons/bi";
import { SVG1, SVG2, SVG3, SVG4, SVG5, SVG6, SVG7 } from "../assets/graphics";
import { fabric } from 'fabric'
import { v4 as uuidv4 } from 'uuid'

interface IGraph {
  icon: any;
  width: number;
  height: number;
}

export default function Graphics({ campaign, setCampaign, canvasRef, canvasValues }) {
  const [graphics] = useState([
    {
      icon: SVG1,
      width: 100,
      height: 50,
    },
    {
      icon: SVG2,
      width: 100,
      height: 100,
    },
    {
      icon: SVG3,
      width: 100,
      height: 100,
    },
    {
      icon: SVG4,
      width: 100,
      height: 100,
    },
    {
      icon: SVG5,
      width: 100,
      height: 100,
    },
    {
      icon: SVG6,
      width: 100,
      height: 100,
    },
    {
      icon: SVG7,
      width: 100,
      height: 100,
    },
  ]);

  const graphicHandler = (graph) => {
    const canvas = canvasRef.canvas

    const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
  <circle cx="50" cy="50" r="40" fill="blue" />
</svg>`;

    fabric.loadSVGFromString(svgString, (objects, options) => {
      const svgObject = fabric.util.groupSVGElements(objects, options);

      svgObject.width = 100
      svgObject.height = 100
      svgObject.fill = 'white'
      svgObject.top = canvasValues.current.CANVAS_HEIGHT / 2 - 100
      svgObject.left = canvasValues.current.CANVAS_WIDTH / 2
      svgObject.originX = 'center'
      svgObject.originY = 'center'
      svgObject.transparentCorners = false
      svgObject.cornerColor = 'white'
      svgObject.cornerStrokeColor = 'white'
      svgObject.cornerSize = 10
      svgObject.rotatingPointOffset = 12
      svgObject.dirty = true

      svgObject.setControlVisible('ml', false)
      svgObject.setControlVisible('mb', false)
      svgObject.setControlVisible('mr', false)
      svgObject.setControlVisible('mt', false)

      svgObject.side = campaign.selected.side
      svgObject.canvasId = uuidv4()
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
            className="block w-full outline-none rounded-md border-0 py-3 pl-4 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Search for something"
          />
          <div className="absolute inset-y-0 right-0 flex items-center">
            <button className="h-full rounded-md border-0 bg-transparent py-0 px-3 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm">
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
            <Image
              src={graph.icon}
              width={96}
              height={96}
              className="object-contain"
              alt="graphic-icon"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

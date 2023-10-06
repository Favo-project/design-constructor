import { useState, useRef } from "react";
import Image from "next/image";
import { BiSearch } from "react-icons/bi";
import { Lines, Bulb, Hand, Pen, Search, User } from "../assets/graphics";
import { fabric } from 'fabric'

interface IGraph {
  url: any;
  width: number;
  height: number;
}

export default function Graphics({ campaign, setCampaign, canvasRef }) {

  const [graphics] = useState([
    {
      url: 'https://www.bonfire.com/images/clipart/863933/preview.png',
      width: 100,
      height: 50,
    },
    {
      url: 'https://www.bonfire.com/images/clipart/729424/preview.png',
      width: 100,
      height: 100,
    },
    {
      url: 'https://www.bonfire.com/images/clipart/815466/preview.png',
      width: 100,
      height: 100,
    },
    {
      url: 'https://www.bonfire.com/images/clipart/577129/preview.png',
      width: 100,
      height: 100,
    },
    {
      url: 'https://www.bonfire.com/images/clipart/68237/preview.png',
      width: 100,
      height: 100,
    },
    {
      url: 'https://www.bonfire.com/images/clipart/984413/preview.png',
      width: 100,
      height: 100,
    },
  ]);

  const graphicsRef = useRef<any>({
    elements: []
  })
  const graphicHandler = (graph) => {
    const canvas = canvasRef.current

    fabric.Image.fromURL(graph.url, (img) => {
      img.scale(.5)

      graphicsRef.current.elements.push(img)

      canvas.add(img)
    })

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
              src={graph.url}
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

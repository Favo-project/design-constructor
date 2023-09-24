import { useState } from "react";
import Image from "next/image";
import { BiSearch } from "react-icons/bi";
import { Lines, Bulb, Hand, Pen, Search, User } from "../assets/graphics";

interface IGraph {
  icon: any;
  width: number;
  height: number;
}

export default function Graphics() {
  const [graphics] = useState([
    {
      icon: Lines,
      width: 100,
      height: 50,
    },
    {
      icon: Bulb,
      width: 100,
      height: 100,
    },
    {
      icon: Hand,
      width: 100,
      height: 100,
    },
    {
      icon: Pen,
      width: 100,
      height: 100,
    },
    {
      icon: Search,
      width: 100,
      height: 100,
    },
    {
      icon: User,
      width: 100,
      height: 100,
    },
  ]);

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
            className={`py-2 px-4 flex items-center justify-center hover:ring-2 ring-gray-200 ring-opacity-40 rounded transition-all`}
            key={index}
          >
            <Image
              src={graph.icon}
              width={graph.width}
              height={graph.height}
              className="object-contain"
              alt="graphic-icon"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

import { Fragment, useState, useEffect } from "react"
import { fabric } from 'fabric'
import { HiOutlineDuplicate } from "react-icons/hi"
import { BiSolidSelectMultiple } from "react-icons/bi"
import { v4 as uuidv4 } from 'uuid'
import { Popover, Transition } from "@headlessui/react"
import { BsCheckLg } from "react-icons/bs"
import { LuFlipHorizontal2, LuFlipVertical2 } from "react-icons/lu"
import Image from "next/image";
import { colors } from "@/constants"

export default function Editor({ selectedObj, campaign, setCampaign, canvasRef, canvasValues }) {
    const [selectedColor, setSelectedColor] = useState(null)
    const [rotate, setRotate] = useState(0)

    useEffect(() => {
        setSelectedColor(selectedObj.object.fill)
        setRotate(Math.floor(selectedObj.object.angle || 0))
        selectedObj.object.on('rotating', (options) => {
            setRotate(Math.floor(options.transform.target.angle))
        })
    }, [selectedObj.object.canvasId])


    const onChangeColor = (color) => {
        const canvas = canvasRef.canvas
        setSelectedColor(color)
        selectedObj.object._objects.map((elem) => elem.fill ? elem.set({ fill: color }) : elem)
        selectedObj.object.fill = color
        canvas.requestRenderAll()
    }

    const onChangeRotate = (e) => {
        const canvas = canvasRef.canvas
        const angle = e.target.value
        const maxAngle = 360
        const minAngle = 0

        if (e.target.value === '') {
            setRotate(null)
            selectedObj.object.rotate(0)
        }
        else if (angle < minAngle) {
            setRotate(minAngle)
            selectedObj.object.rotate(minAngle)
        }
        else if (angle > maxAngle) {
            setRotate(maxAngle)
            selectedObj.object.rotate(maxAngle)
        } else {
            setRotate(angle)
            selectedObj.object.rotate(angle)
        }
        canvas.renderAll()
    }

    const duplicateObj = () => {
        const canvas = canvasRef.canvas

        selectedObj.object.clone((clone) => {
            const duplicatedObject = clone

            duplicatedObject.top += 25
            duplicatedObject.left += 25
            duplicatedObject.side = campaign.selected.side
            duplicatedObject.canvasId = uuidv4()
            duplicatedObject.type = 'icon'
            duplicatedObject.ownCaching = false
            duplicatedObject.lineHeight = 0.9
            duplicatedObject.transparentCorners = false
            duplicatedObject.cornerColor = 'white'
            duplicatedObject.cornerStrokeColor = '#ADC4CE'
            duplicatedObject.cornerSize = 10
            duplicatedObject.setControlVisible('ml', false)
            duplicatedObject.setControlVisible('mb', false)
            duplicatedObject.setControlVisible('mr', false)
            duplicatedObject.setControlVisible('mt', false)

            duplicatedObject.url = selectedObj.object.url

            setCampaign({ ...campaign, design: { ...campaign.design, [campaign.selected.side]: [...campaign.design[campaign.selected.side], duplicatedObject] } })

            canvas.add(duplicatedObject);
            canvas.requestRenderAll()
        })
    }

    const selectAll = () => {
        const canvas = canvasRef.canvas

        const allObjects = canvas.getObjects().filter((obj) => obj.selectable && obj.evented)

        if (allObjects.length > 1) {
            canvas.discardActiveObject();
            canvas.setActiveObject(new fabric.ActiveSelection(allObjects, { canvas: canvas }));
            canvas.requestRenderAll();
        }
    }

    const flipX = () => {
        const canvas = canvasRef.canvas

        if (selectedObj.object.flipX) {
            selectedObj.object.set({ flipX: false })
        }
        else {
            selectedObj.object.set({ flipX: true })
        }
        canvas.renderAll()
    }

    const flipY = () => {
        const canvas = canvasRef.canvas

        if (selectedObj.object.flipY) {
            selectedObj.object.set({ flipY: false })
        }
        else {
            selectedObj.object.set({ flipY: true })
        }
        canvas.renderAll()
    }

    return (
        <div>
            <div className="my-8">
                <h3 className="font-semibold text-slate-600 mb-3 text-base uppercase font-mono">Preview</h3>
                <div className="flex">
                    <div className="p-1 rounded-md bg-indigo-300">
                        <Image src={selectedObj?.object?.url || ''} style={{ fill: 'red' }} alt="preview-img" width={65} height={65} />
                    </div>
                </div>
            </div>
            <div className="flex my-8 flex-wrap gap-4">
                <div id="color">
                    <h3 className="font-semibold text-slate-600 mb-3 text-base uppercase font-mono">Color</h3>
                    <div className="w-full max-w-sm px-2">
                        <Popover className="relative">
                            {({ open }) => (
                                <>
                                    <Popover.Button
                                        className={`
                ${open ? '' : 'text-opacity-90'}
                group inline-flex text-base font-medium text-white hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
                                    >
                                        <div className="rounded-full border border-gray-400 p-1 mx-1"><span className="block h-6 w-6 border border-gray-400 rounded-full" style={{ backgroundColor: selectedColor || 'white' }}></span></div>
                                    </Popover.Button>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-200"
                                        enterFrom="opacity-0 translate-y-1"
                                        enterTo="opacity-100 translate-y-0"
                                        leave="transition ease-in duration-150"
                                        leaveFrom="opacity-100 translate-y-0"
                                        leaveTo="opacity-0 translate-y-1"
                                    >
                                        <Popover.Panel className="absolute bg-white -bottom-52 -right-20 z-10 mt-3 w-screen max-w-sm transform px-4 sm:px-0 lg:max-w-sm">
                                            <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                                <div className="p-7">
                                                    <h3 className="text-2xl text-slate-800 font-mono mb-4">Choose color</h3>
                                                    <p className="text-slate-700 text-sm font-mono mb-4">USED IN YOUR DESIGN</p>
                                                    <div> <button className="rounded-full border border-gray-400 p-1 mx-1"><span className="flex items-center justify-center h-6 w-6 border border-gray-400 rounded-full" style={{ backgroundColor: selectedColor || 'white' }}>
                                                        <BsCheckLg />
                                                    </span></button></div>
                                                </div>
                                                <div className="relative bg-white px-7 pt-2 pb-7">
                                                    <p className="text-slate-700 text-sm font-mono mb-4">ALL COLORS</p>
                                                    <div className="grid lg:grid-cols-6">
                                                        {colors.map((item, index) => (
                                                            <div key={index}>
                                                                <button className="border border-gray-300 rounded-full shadow-md" onClick={() => onChangeColor(item.color)} >
                                                                    <span className="block w-8 h-8 rounded-full" style={{ backgroundColor: item.color }} />
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </Popover.Panel>
                                    </Transition>
                                </>
                            )}
                        </Popover>
                    </div>
                </div>
                <div id="flip">
                    <h3 className="font-semibold text-slate-600 mb-3 text-base uppercase font-mono">Color</h3>
                    <div className="flex items-center px-2">
                        <button onClick={flipX} className="text-2xl p-2 border-2 border-white rounded-md text-slate-700 hover:border-gray-200 transition-all">
                            <LuFlipHorizontal2 />
                        </button>
                        <button onClick={flipY} className="text-2xl p-2 border-2 border-white rounded-md text-slate-700 hover:border-gray-200 transition-all">
                            <LuFlipVertical2 />
                        </button>
                    </div>
                </div>
            </div>
            <div className="my-8">
                <div className="flex flex-col items-start">
                    <label htmlFor="rotate" className="font-semibold text-slate-600 mb-3 text-base uppercase font-mono">ROTATE</label>
                    <div className="w-full flex justify-between items-center">
                        <input type="range" className="transparent h-2 w-full rounded-md cursor-pointer appearance-none border-transparent bg-neutral-300" id="rotate" value={rotate} onChange={onChangeRotate} min={0} max={360} />
                        <input type="number" className="w-16 border rounded-md border-indigo-400 outline-none p-2 font-semibold text-slate-600 text-sm ml-3" value={rotate} min={0} max={360} onChange={onChangeRotate} />
                    </div>
                </div>
            </div>
            <div className="my-8">
                <h3 className="font-semibold text-slate-600 mb-3 text-base uppercase font-mono">ACTIONS</h3>
                <div className="flex items-start gap-4">
                    <button onClick={duplicateObj} className="flex flex-col items-center p-2 border-2 border-white rounded-md text-sm text-slate-700 hover:border-gray-200 transition-all">
                        <span className="text-lg mb-1">
                            <HiOutlineDuplicate />
                        </span>
                        Duplicate
                    </button>
                    <button onClick={selectAll} className="flex flex-col items-center p-2 border-2 border-white rounded-md text-sm text-slate-700 hover:border-gray-200 transition-all">
                        <span className="text-lg mb-1">
                            <BiSolidSelectMultiple />
                        </span>
                        Select All
                    </button>
                </div>
            </div>
        </div>
    )
}

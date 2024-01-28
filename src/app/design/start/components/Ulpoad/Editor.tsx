import Image from "next/image";
import { useEffect, useState } from "react";
import { LuFlipHorizontal2, LuFlipVertical2 } from "react-icons/lu";
import { fabric } from 'fabric'
import { v4 as uuidv4 } from 'uuid'
import { HiOutlineDuplicate } from "react-icons/hi";
import { BiSolidSelectMultiple } from "react-icons/bi";

export default function Editor({ selectedObj, campaign, setCampaign, canvasRef, canvasValues }) {
    const [rotate, setRotate] = useState(0)

    useEffect(() => {
        setRotate(Math.floor(selectedObj.object.angle || 0))
        selectedObj.object.on('rotating', (options) => {
            setRotate(Math.floor(options.transform.target.angle))
        })
    }, [selectedObj.object.canvasId])

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
            duplicatedObject.objType = 'image'
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
                    <div className="p-1 rounded-md bg-blue/20">
                        <Image src={selectedObj?.object?.imgUrl} alt="preview-img" width={65} height={65} />
                    </div>
                </div>
            </div>
            <div id="flip" className="my-8">
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
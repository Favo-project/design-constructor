import { useEffect, useState } from "react"
import { BiSelectMultiple } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";

export default function MultipleEditor({ multipleObj, campaign, setCampaign, canvasRef, canvasValues }) {
    const [rotate, setRotate] = useState(0)

    useEffect(() => {
        const canvas = canvasRef.canvas
        const group = canvas.getActiveObject()

        setRotate(group.angle)

        group.on('rotating', (options) => {
            setRotate(Math.floor(options.transform.target.angle))
        })
    }, [multipleObj])

    const onChangeRotate = (e) => {
        const canvas = canvasRef.canvas
        const angle = e.target.value
        const maxAngle = 360
        const minAngle = 0

        const selectedObj = canvas.getActiveObject()

        if (e.target.value === '') {
            setRotate(null)
            selectedObj.rotate(0)
        }
        else if (angle < minAngle) {
            setRotate(minAngle)
            selectedObj.rotate(minAngle)
        }
        else if (angle > maxAngle) {
            setRotate(maxAngle)
            selectedObj.rotate(maxAngle)
        } else {
            setRotate(angle)
            selectedObj.rotate(angle)
        }
        canvas.renderAll()
    }

    const deselect = () => {
        const canvas = canvasRef.canvas
        canvas.discardActiveObject()
        canvas.renderAll()
    }

    const deleteAll = () => {
        const canvas = canvasRef.canvas
        const delElements = canvas.getActiveObjects().map((elem: any) => elem.canvasId)
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

    return (
        <div>
            <p className="p-3 bg-slate-200 rounded-xl shadow-lg">You have selected multiple objects</p>
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
                    <button onClick={deselect} className="flex flex-col items-center p-2 border-2 border-white rounded-md text-sm text-slate-700 hover:border-gray-200 transition-all">
                        <span className="text-lg mb-1">
                            <BiSelectMultiple />
                        </span>
                        Deselect
                    </button>
                    <button onClick={deleteAll} className="flex flex-col items-center p-2 border-2 border-white rounded-md text-sm text-slate-700 hover:border-gray-200 transition-all">
                        <span className="text-lg mb-1">
                            <RiDeleteBin5Line />
                        </span>
                        Delete All
                    </button>
                </div>
            </div>
        </div>
    )
}
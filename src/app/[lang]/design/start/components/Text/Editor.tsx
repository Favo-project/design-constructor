import { useEffect, useState, Fragment } from "react"
import { Listbox, Transition, Popover } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { BsCheckLg } from "react-icons/bs"
import FontFaceObserver from 'fontfaceobserver'
import { fabric } from 'fabric'
import { HiOutlineDuplicate } from "react-icons/hi"
import { BiSolidSelectMultiple } from "react-icons/bi"
import { v4 as uuidv4 } from 'uuid'
import { colors, fonts } from "@/constants"
import { IoMdClose } from "react-icons/io"

export default function Editor({ resources, selectedObj, campaign, setCampaign, canvasRef, canvasValues }) {
    const [text, setText] = useState(selectedObj.object.text)
    const [selectedFont, setSelectedFont] = useState(fonts[0])
    const [selectedColor, setSelectedColor] = useState(null)
    const [isBold, setIsBold] = useState(false)
    const [isItalic, setIsItalic] = useState(false)
    const [size, setSize] = useState(1)
    const [spacing, setSpacing] = useState(0)
    const [rotate, setRotate] = useState(0)

    useEffect(() => {
        setText(selectedObj.object.text)
        if (selectedObj.object.fontWeight === 'bold') setIsBold(true)
        if (selectedObj.object.fontStyle === 'italic') setIsItalic(true)
        setSize(Math.floor(selectedObj.object.width * selectedObj.object.scaleX))
        setSelectedFont(selectedObj.object.fontFamily)
        setSelectedColor(selectedObj.object.fill)
        setSpacing(Math.floor(selectedObj.object.charSpacing / 10) || 0)
        setRotate(Math.floor(selectedObj.object.angle || 0))

        selectedObj.object.on('scaling', (options) => {
            const maxSize = canvasValues.current.CANVAS_WIDTH
            const newSize = Math.floor(options.transform.target.scaleX * options.transform.target.width)
            if (newSize > maxSize) {
                setSize(maxSize)
            }
            else {
                setSize(newSize)
            }
        })

        selectedObj.object.on('rotating', (options) => {
            setRotate(Math.floor(options.transform.target.angle))
        })

    }, [selectedObj.object.canvasId])

    const onChangeText = (e) => {
        const maxSize = canvasValues.current.CANVAS_WIDTH
        const canvas = canvasRef.canvas
        selectedObj.object.set({ text: e.target.value || '' })
        const newSize = Math.floor(selectedObj.object.width * selectedObj.object.scaleX)
        if (newSize > maxSize) {
            setSize(maxSize)
            selectedObj.object.set({
                width: maxSize
            })
        }
        else {
            setSize(newSize)
        }
        setText(e.target.value)
        canvas.renderAll()
    }

    const onBold = () => {
        const canvas = canvasRef.canvas
        if (isBold) {
            selectedObj.object.set({ fontWeight: 'normal' })
            canvas.renderAll()
            setIsBold(false)
        }
        else {
            selectedObj.object.set({ fontWeight: 'bold' })
            canvas.renderAll()
            setIsBold(true)
        }
    }

    const onItalic = () => {
        const canvas = canvasRef.canvas
        if (isItalic) {
            selectedObj.object.set({ fontStyle: 'normal' })
            canvas.renderAll()
            setIsItalic(false)
        }
        else {
            selectedObj.object.set({ fontStyle: 'italic' })
            canvas.renderAll()
            setIsItalic(true)
        }
    }

    const onChangeFont = (font) => {

        const setFont = (fontFamily) => {
            const canvas = canvasRef.canvas
            setSelectedFont(fontFamily)

            selectedObj.object.set("fontFamily", fontFamily);
            setSize(Math.floor(selectedObj.object.width))
            canvas.renderAll();
        }

        if (font === 'Arial') {
            setFont('Arial')
        } else {
            const myfont = new FontFaceObserver(font);
            myfont.load().then(
                () => setFont(font)
            )
        }
    }

    const onChangeColor = (color) => {
        const canvas = canvasRef.canvas
        setSelectedColor(color)
        selectedObj.object.set({ fill: color })
        canvas.requestRenderAll()
    }

    const onChangeSize = (e) => {
        const canvas = canvasRef.canvas
        const size = Number(e.target.value)
        const oldSize = Math.floor(selectedObj.object.width)
        const maxSize = canvasValues.current.CANVAS_WIDTH

        let scale = size / oldSize

        if (e.target.value === '') {
            setSize(null)
        }
        else if (size <= 0 && e.target.value) {
            setSize(0)
            selectedObj.object.scale(1)
        }
        else if (size >= maxSize) {
            setSize(maxSize)
            scale = maxSize / size
            selectedObj.object.scale(maxSize)
        }
        else {
            setSize(size)
            selectedObj.object.scale(scale)
        }
        canvas.requestRenderAll()
    }

    const onChangeSpacing = (e) => {
        const canvas = canvasRef.canvas
        const spacing = Number(e.target.value)
        const maxSpacing = 180
        const minSpacing = -20

        if (e.target.value === '') {
            setSpacing(null)
            selectedObj.object.set({ charSpacing: 0 })
        }
        else if (spacing < minSpacing) {
            setSpacing(minSpacing)
            selectedObj.object.set({ charSpacing: 0 })
        }
        else if (spacing > maxSpacing) {
            setSpacing(maxSpacing)
            selectedObj.object.set({ charSpacing: maxSpacing * 10 })
        }
        else {
            setSpacing(spacing)
            selectedObj.object.set({ charSpacing: spacing * 10 })
        }
        canvas.requestRenderAll()
        setSize(Math.floor(selectedObj.object.width))
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
        setSize(Math.floor(selectedObj.object.width))
    }

    const duplicateObj = () => {
        const canvas = canvasRef.canvas

        selectedObj.object.clone((clone) => {
            const duplicatedObject = clone

            duplicatedObject.top += 25
            duplicatedObject.left += 25
            duplicatedObject.side = campaign.selected.side
            duplicatedObject.canvasId = uuidv4()
            duplicatedObject.objType = 'text'
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

    return (
        <div>
            <div id="edit-text">
                <h3 className="font-semibold text-slate-600 mb-3 text-base uppercase font-mono">{resources.design.editor.edittext}</h3>
                <textarea
                    onChange={onChangeText}
                    value={text}
                    id="design-text"
                    name="text"
                    placeholder="Your text"
                    rows={4}
                    className="block w-full font-semibold text-gray-600 outline-none rounded-md border-0 py-4 px-3 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                ></textarea>
            </div>
            <div className="flex items-start mt-6 flex-wrap gap-4 ">
                <div id="font">
                    <h3 className="font-semibold text-slate-600 mb-3 text-base uppercase font-mono">{resources.design.editor.font}</h3>
                    <div className="flex items-center justify-between">
                        <Listbox value={selectedFont} onChange={onChangeFont}>
                            <div className="relative z-15 mt-1">
                                <Listbox.Button className="relative w-44 cursor-pointer rounded-lg bg-gray-100 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-magenta focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-magenta/40 sm:text-sm">
                                    <span className="block truncate">{selectedFont}</span>
                                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                        <ChevronUpDownIcon
                                            className="h-5 w-5 text-gray-400"
                                            aria-hidden="true"
                                        />
                                    </span>
                                </Listbox.Button>
                                <Transition
                                    as={Fragment}
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-72 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                        {fonts.map((font, idx) => (
                                            <Listbox.Option
                                                key={idx}
                                                className={({ active }) =>
                                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-indigo-100 text-blue' : 'text-gray-900'
                                                    }`
                                                }
                                                value={font}
                                            >
                                                {({ selected }) => (
                                                    <>
                                                        <span
                                                            style={{
                                                                fontFamily: font
                                                            }}
                                                            className={`block truncate text-[17px] ${selected ? 'font-medium' : 'font-normal'
                                                                }`}
                                                        >
                                                            {font}
                                                        </span>
                                                        {selected ? (
                                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600">
                                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                            </span>
                                                        ) : null}
                                                    </>
                                                )}
                                            </Listbox.Option>
                                        ))}
                                    </Listbox.Options>
                                </Transition>
                            </div>
                        </Listbox>
                        <button onClick={onBold} className={`font-bold text-lg px-3 py-1 mx-1 border-2 rounded-md ${isBold ? 'bg-magenta/10 border-magenta hover:bg-magenta/20 text-zinc-700' : 'border-slate-100 hover:bg-magenta/10'}`}>B</button>
                        <button onClick={onItalic} className={`font-semibold italic border-2 font-serif text-lg px-3 py-1 mx-1 rounded-md ${isItalic ? 'bg-magenta/10 border-magenta hover:bg-magenta/20 text-zinc-700' : 'border-slate-100 hover:bg-magenta/10'}`}>I</button>
                    </div>
                </div>
                <div id="color">
                    <h3 className="font-semibold text-slate-600 mb-3 text-base uppercase font-mono">{resources.design.editor.color}</h3>

                    <div className="w-full max-w-sm px-2">
                        <Popover className="relative">
                            {({ open, close }) => (
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
                                        <Popover.Panel className="lg:absolute fixed top-20 right-12 left-0 bg-white lg:-bottom-32 lg:top-auto lg:left-auto lg:-right-12 z-20 mt-3 w-screen max-w-sm transform lg:max-w-sm">
                                            <div className="overflow-hidden bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                                <button onClick={close} className="text-3xl text-slate-500 absolute top-3 right-2 p-3 cursor-pointer">
                                                    <IoMdClose />
                                                </button>
                                                <div className="p-7">
                                                    <h3 className="text-2xl text-slate-800 font-mono mb-4">{resources.design.editor.choosecolor}</h3>
                                                    <p className="text-slate-700 text-sm font-mono mb-4">{resources.design.editor.usedcolor}</p>
                                                    <div> <button className="rounded-full border border-gray-400 p-1 mx-1"><span className="flex items-center justify-center h-6 w-6 border border-gray-400 rounded-full" style={{ backgroundColor: selectedColor || 'white' }}>
                                                        <BsCheckLg />
                                                    </span></button></div>
                                                </div>
                                                <div className="relative bg-white px-7 pt-2 pb-7">
                                                    <p className="text-slate-700 text-sm font-mono mb-4 uppercase">{resources.design.editor.allcolors}</p>
                                                    <div className="grid grid-cols-6">
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
                <div id="size">
                    <h3 className="font-semibold text-slate-600 mb-3 text-base uppercase font-mono">{resources.design.editor.size}</h3>
                    <input onChange={onChangeSize} value={size} type="number" name="size" min={1} max={canvasValues.current.CANVAS_WIDTH} placeholder="Size" className="w-full outline-none p-2 border-2 border-slate-200 rounded-md" />
                </div>
            </div>
            <div className="my-8">
                <div className="flex flex-col items-start mb-4">
                    <label htmlFor="spacing" className="font-semibold text-slate-600 mb-3 text-base uppercase font-mono">{resources.design.editor.spacing}</label>
                    <div className="w-full flex justify-between items-center">
                        <input type="range" className="transparent h-2 w-full rounded-md cursor-pointer appearance-none border-transparent bg-neutral-300" id="spacing" value={spacing} onChange={onChangeSpacing} min={-20} max={180} />
                        <input type="number" className="w-16 border rounded-md border-magenta outline-none p-2 font-semibold text-slate-600 text-sm ml-3" value={spacing} min={-20} max={180} onChange={onChangeSpacing} />
                    </div>
                </div>
                <div className="flex flex-col items-start">
                    <label htmlFor="rotate" className="font-semibold text-slate-600 mb-3 text-base uppercase font-mono">{resources.design.editor.rotate}</label>
                    <div className="w-full flex justify-between items-center">
                        <input type="range" className="transparent h-2 w-full rounded-md cursor-pointer appearance-none border-transparent bg-neutral-300" id="rotate" value={rotate} onChange={onChangeRotate} min={0} max={360} />
                        <input type="number" className="w-16 border rounded-md border-magenta outline-none p-2 font-semibold text-slate-600 text-sm ml-3" value={rotate} min={0} max={360} onChange={onChangeRotate} />
                    </div>
                </div>
            </div>
            <div className="my-8">
                <h3 className="font-semibold text-slate-600 mb-3 text-base uppercase font-mono">{resources.design.editor.actions}</h3>
                <div className="flex items-start gap-4">
                    <button onClick={duplicateObj} className="flex flex-col items-center p-2 border-2 border-white rounded-md text-sm text-slate-700 hover:border-gray-200 transition-all">
                        <span className="text-lg mb-1">
                            <HiOutlineDuplicate />
                        </span>
                        {resources.design.editor.duplicate}
                    </button>
                    <button onClick={selectAll} className="flex flex-col items-center p-2 border-2 border-white rounded-md text-sm text-slate-700 hover:border-gray-200 transition-all">
                        <span className="text-lg mb-1">
                            <BiSolidSelectMultiple />
                        </span>
                        {resources.design.editor.selectall}
                    </button>
                </div>
            </div>
        </div>
    )
}
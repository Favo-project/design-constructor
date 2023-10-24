import { useEffect, useState, Fragment } from "react"
import { Listbox, Transition, Popover } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { BsCheckLg } from "react-icons/bs"
import FontFaceObserver from 'fontfaceobserver'

const fonts = [
    "Pacifico",
    "VT323",
    "Quicksand",
    "Inconsolata",
]

const colors = [
    {
        name: 'Red',
        color: '#C70039'
    },
    {
        name: 'Blue',
        color: '#6499E9'
    },
    {
        name: 'Gray',
        color: '#7D7C7C'
    },
    {
        name: 'Yellow',
        color: '#FFFD8C'
    },
    {
        name: 'Green',
        color: '#85E6C5'
    },
    {
        name: 'White',
        color: '#FFFFFF'
    },
]

export default function Editor({ selectedObj, campaign, setCampaign, canvasRef, canvasValues }) {
    const [text, setText] = useState(selectedObj.object.text)
    const [selectedFont, setSelectedFont] = useState(fonts[0])
    const [selectedColor, setSelectedColor] = useState(null)
    const [isBold, setIsBold] = useState(false)
    const [isItalic, setIsItalic] = useState(false)
    const [size, setSize] = useState(1)

    useEffect(() => {
        setText(selectedObj.object.text)
        if (selectedObj.object.fontWeight === 'bold') setIsBold(true)
        if (selectedObj.object.fontStyle === 'italic') setIsItalic(true)
        if (selectedObj.object.scaleRatio) setSize(Math.floor(selectedObj.object.scaleRatio * selectedObj.object.width))
        else setSize(Math.floor(selectedObj.object.width))
        setSelectedColor(selectedObj.object.fill)

    }, [selectedObj])

    const onChangeText = (e) => {
        const canvas = canvasRef.canvas
        selectedObj.object.set({ text: e.target.value || '' })
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
        const canvas = canvasRef.canvas
        setSelectedFont(font)

        var myfont = new FontFaceObserver('Roboto')
        myfont.load()
            .then(function () {
                canvas.getActiveObject().set("fontFamily", font);
                canvas.requestRenderAll();
            }).catch(function (e) {
                alert('font loading failed ' + font);
            });
    }

    const onChangeColor = (color) => {
        const canvas = canvasRef.canvas
        setSelectedColor(color)
        selectedObj.object.set({ fill: color })
        canvas.requestRenderAll()
    }

    const onChangeSize = (e) => {
        const canvas = canvasRef.canvas
        const size = e.target.value

        e.preventDefault()
        if (Number(size) <= 1) {
            setSize(1)
            selectedObj.object.scaleToWidth(1)
            selectedObj.object.scaleRatio = size / selectedObj.object.width
            canvas.requestRenderAll()
        }
        else if (Number(size) >= 400) {
            setSize(400)
            selectedObj.object.scaleToWidth(400)
            selectedObj.object.scaleRatio = size / selectedObj.object.width
            canvas.requestRenderAll()
        }
        else {
            setSize(size)
            selectedObj.object.scaleToWidth(size)
            selectedObj.object.scaleRatio = size / selectedObj.object.width
            canvas.requestRenderAll()
        }
    }

    return (
        <div>
            <div id="edit-text">
                <h3 className="font-semibold text-slate-600 mb-3 text-base uppercase font-mono">Edit Text</h3>
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
            <div className="flex items-start mt-6">
                <div id="font">
                    <h3 className="font-semibold text-slate-600 mb-3 text-base uppercase font-mono">Font</h3>
                    <div className="flex items-center justify-between">
                        <Listbox value={selectedFont} onChange={onChangeFont}>
                            <div className="relative mt-1">
                                <Listbox.Button className="relative w-40 cursor-pointer rounded-lg bg-gray-100 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-300 sm:text-sm">
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
                                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                        {fonts.map((person, personIdx) => (
                                            <Listbox.Option
                                                key={personIdx}
                                                className={({ active }) =>
                                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-indigo-100 text-indigo-900' : 'text-gray-900'
                                                    }`
                                                }
                                                value={person}
                                            >
                                                {({ selected }) => (
                                                    <>
                                                        <span
                                                            className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                                }`}
                                                        >
                                                            {person}
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
                        <button onClick={onBold} className={`font-bold text-lg px-3 py-1 mx-1 border-2 rounded-md ${isBold ? 'bg-indigo-200 border-indigo-500 hover:bg-indigo-200 text-indigo-700' : 'border-slate-100 hover:bg-slate-100'}`}>B</button>
                        <button onClick={onItalic} className={`font-semibold italic border-2 font-serif text-lg px-3 py-1 mx-1 rounded-md ${isItalic ? 'bg-indigo-200 border-indigo-500 hover:bg-indigo-200 text-indigo-700' : 'border-slate-100 hover:bg-slate-100'}`}>I</button>
                    </div>
                </div>
                <div id="color" className="mx-2">
                    <h3 className="font-semibold text-slate-600 mb-3 text-base uppercase font-mono">Color</h3>

                    <div className="top-16 w-full max-w-sm px-2">
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
                                        <Popover.Panel className="absolute bg-white -right-20 z-10 mt-3 w-screen max-w-sm transform px-4 sm:px-0 lg:max-w-sm">
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
                                                    <div className="grid gap-8  lg:grid-cols-6">
                                                        {colors.map((item, index) => (
                                                            <div key={index}>
                                                                <button className="p-2 rounded-full" onClick={() => onChangeColor(item.color)} >
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
                <div id="size" className="mx-2">
                    <h3 className="font-semibold text-slate-600 mb-3 text-base uppercase font-mono">Size</h3>
                    <input onChange={onChangeSize} value={size} type="number" name="size" min={1} max={400} placeholder="Size" className="w-full outline-none p-2 border-2 border-slate-200 rounded-md" />
                </div>
            </div>
        </div>
    )
}
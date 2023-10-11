import { useEffect, useRef, useState } from "react";
import { fabric } from 'fabric'
import { v4 as uuidv4 } from 'uuid'

export default function Text({ campaign, setCampaign, canvasRef, canvasValues }) {
  const [text, setText] = useState("");

  const addText = () => {
    const canvas = canvasRef.canvas

    const canvasText: any = new fabric.Text(text, {
      top: canvasValues.current.CANVAS_HEIGHT / 2 - 100,
      left: canvasValues.current.CANVAS_WIDTH / 2,
      fontSize: 62,
      originX: 'center',
      originY: 'center',
      fontFamily: 'Arial',
      fill: 'white',
      lineHeight: 0.9,
      transparentCorners: false,
      cornerColor: 'white',
      cornerStrokeColor: '#ADC4CE',
      cornerSize: 10,
      rotatingPointOffset: 0,
    })

    canvasText.setControlVisible('ml', false)
    canvasText.setControlVisible('mb', false)
    canvasText.setControlVisible('mr', false)
    canvasText.setControlVisible('mt', false)

    canvasText.side = campaign.selected.side
    canvasText.canvasId = uuidv4()

    setCampaign({ ...campaign, design: { ...campaign.design, [campaign.selected.side]: [...campaign.design[campaign.selected.side], canvasText] } })

    setText('')
    canvas.add(canvasText)
    canvas.renderAll()
  }

  return (
    <div id="w-full py-4 px-4">
      <div className="col-span-full">
        <div className="mt-2">
          <textarea
            onChange={(e) => setText(e.target.value)}
            value={text}
            id="design-text"
            name="text"
            placeholder="Your text"
            rows={4}
            className="block w-full font-semibold text-gray-600 outline-none rounded-md border-0 py-4 px-3 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
          ></textarea>
        </div>
        <div className="flex flex-1 items-center justify-end mt-4">
          <button onClick={addText} disabled={!text} className="bg-indigo-500 text-slate-100 py-2 px-4 rounded-md bg-opacity-80 hover:bg-opacity-100 disabled:bg-opacity-60 disabled:cursor-not-allowed">Add text</button>
        </div>
      </div>
    </div>
  );
}

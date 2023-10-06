import { useEffect, useRef, useState } from "react";
import { fabric } from 'fabric'
import { v4 as uuidv4 } from 'uuid'

export default function Text({ campaign, setCampaign, canvasRef }) {
  const [text, setText] = useState("");
  const textRef = useRef<any>({
    elements: []
  })

  const addText = () => {
    const canvas = canvasRef.canvas

    const canvasText = new fabric.Text(text, {
      top: canvas.height / 2 - 100,
      left: canvas.width / 2,
      fontSize: 62,
      originX: 'center',
      originY: 'center',
      fontFamily: 'Arial',
      fill: 'white',
      transparentCorners: false,
      cornerColor: 'white',
      cornerStrokeColor: 'white',
      cornerSize: 10,
      rotatingPointOffset: 12,
      dirty: true
    })

    canvasText.setControlVisible('ml', false)
    canvasText.setControlVisible('mb', false)
    canvasText.setControlVisible('mr', false)
    canvasText.setControlVisible('mt', false)

    var deleteIcon = "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";

    var img = document.createElement('img');
    img.src = deleteIcon;


    fabric.Object.prototype.controls.deleteControl = new fabric.Control({
      x: 0.5,
      y: -0.5,
      offsetY: 16,
      cursorStyle: 'pointer',
      mouseUpHandler: deleteObject,
      render: renderIcon,
      cornerSize: 24
    });

    function deleteObject(eventData, transform) {
      // delete from the array
      const targetId = transform.target.canvasId
      const filteredElements = textRef.current.elements.filter((elem) => elem.canvasId !== targetId)
      textRef.current.elements = filteredElements

      var target = transform.target;
      var canvas = target.canvas;
      canvas.remove(target);
      canvas.requestRenderAll();
    }

    function renderIcon(ctx, left, top, styleOverride, fabricObject) {
      var size = this.cornerSize;
      ctx.save();
      ctx.translate(left, top);
      ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
      ctx.drawImage(img, -size / 2, -size / 2, size, size);
      ctx.restore();
    }

    canvasText.side = campaign.selected.side
    canvasText.canvasId = uuidv4()
    textRef.current.elements.push(canvasText)

    setText('')
    canvas.add(canvasText)
    canvas.renderAll()
  }

  useEffect(() => {
    const canvas = canvasRef.canvas

    if (campaign.selected.side === 'front' && textRef.current.elements.length) {
      const backElements = textRef.current.elements.filter((elem) => elem.side === 'back')
      const frontElements = textRef.current.elements.filter((elem) => elem.side === 'front')
      canvas.remove(...backElements)
      canvas.add(...frontElements)
    }
    if (campaign.selected.side === 'back' && textRef.current.elements.length) {
      const backElements = textRef.current.elements.filter((elem) => elem.side === 'back')
      const frontElements = textRef.current.elements.filter((elem) => elem.side === 'front')
      canvas.remove(...frontElements)
      canvas.add(...backElements)
    }
  }, [campaign])

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

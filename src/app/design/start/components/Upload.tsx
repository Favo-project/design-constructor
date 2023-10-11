import UploadGuide from "./UploadGuid";
import { FileDrop } from "@/components/FileDrop";
import { useEffect, useState } from "react";
import { fabric } from 'fabric'
import { v4 as uuidv4 } from 'uuid'


export default function Upload({ campaign, setCampaign, canvasRef, canvasValues }) {
  const [file, setFile] = useState<File>();
  const [userRights, setUserRights] = useState(false);


  const onUpload = () => {
    const canvas = canvasRef.canvas
    const reader: any = new FileReader();

    reader.readAsDataURL(file!);

    const centerTop = canvasValues.current.CANVAS_HEIGHT / 2 - 100
    const centerLeft = canvasValues.current.CANVAS_WIDTH / 2
    const imageW = 200

    reader.addEventListener("load", () => {
      fabric.Image.fromURL(reader.result, (img: any) => {
        img.originX = "center"
        img.originY = "center"
        img.top = centerTop
        img.left = centerLeft
        img.scale(1 / (img.width / imageW))

        img.transparentCorners = false
        img.cornerColor = 'white'
        img.cornerStrokeColor = 'white'
        img.cornerSize = 10
        img.rotatingPointOffset = 12

        img.setControlVisible('ml', false)
        img.setControlVisible('mb', false)
        img.setControlVisible('mr', false)
        img.setControlVisible('mt', false)

        img.side = campaign.selected.side
        img.canvasId = uuidv4()
        setCampaign({ ...campaign, design: { ...campaign.design, [campaign.selected.side]: [...campaign.design[campaign.selected.side], img] } })

        setFile(null)
        setUserRights(false)
        canvas.add(img);
        canvas.requestRenderAll();
      });
    });
  }

  return (
    <div id="w-full py-4 px-4">
      <UploadGuide />
      <div>
        <FileDrop setFile={setFile} file={file} />
        <div className="flex items-center py-4">
          <input
            checked={userRights}
            onChange={(e) => setUserRights(!userRights)}
            type="checkbox"
            name="user-rights"
            id="user-rights"
            className="block w-10 h-10 mr-3"
          />
          <label htmlFor="user-rights">
            By uploading the image, I agree that I have the legal right to
            reproduce and sell the design, and that I am in full compliance with
            Bonfire’s Terms of Use.
          </label>
        </div>
        <button
          onClick={onUpload}
          disabled={!userRights || !file}
          className="p-4 w-full justify-center items-center text-slate-100 bg-indigo-600 bg-opacity-75 rounded-md disabled:opacity-60 disabled:cursor-not-allowed"
        >
          Upload
        </button>
      </div>
    </div>
  );
}

import UploadGuide from "./UploadGuide";
import { FileDrop } from "@/components/FileDrop";
import { useState } from "react";
import { fabric } from 'fabric'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'
import SolidBtn from "@/components/form-elements/SolidBtn";

interface CanvasObj extends fabric.Image {
  relativeTop?: number, side?: string, canvasId?: string, objType?: string, imgUrl?: string
}

export default function Upload({ campaign, setCampaign, canvasRef, canvasValues }) {
  const [loading, setLoading] = useState(false)

  const [file, setFile] = useState<File>();
  const [userRights, setUserRights] = useState(false);

  const onUpload = async () => {
    setLoading(true)

    const canvas = canvasRef.canvas

    const formData = new FormData();
    formData.append('image', file);

    try {
      const { data: response } = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      const centerTop = canvasValues.current.CANVAS_HEIGHT / 2 - 100
      const centerLeft = canvasValues.current.CANVAS_WIDTH / 2
      const imageW = 150

      let imgElement = new Image();
      imgElement.crossOrigin = "anonymous";
      imgElement.src = `${process.env.NEXT_PUBLIC_BASE_URL}` + response.data.image

      imgElement.onload = function () {
        const fabricImage: CanvasObj = new fabric.Image(imgElement);

        fabricImage.originX = "center"
        fabricImage.originY = "center"
        fabricImage.top = centerTop
        fabricImage.left = centerLeft
        fabricImage.scale(1 / (fabricImage.width / imageW))

        fabricImage.transparentCorners = false
        fabricImage.cornerColor = 'white'
        fabricImage.cornerStrokeColor = 'white'
        fabricImage.cornerSize = 10
        fabricImage.rotatingPointOffset = 12

        fabricImage.setControlVisible('ml', false)
        fabricImage.setControlVisible('mb', false)
        fabricImage.setControlVisible('mr', false)
        fabricImage.setControlVisible('mt', false)

        fabricImage.relativeTop = (fabricImage.top - fabricImage.height / 2) - (canvasRef.printableArea.top - canvasRef.printableArea.height / 2)
        fabricImage.side = campaign.selected.side
        fabricImage.canvasId = uuidv4()
        fabricImage.objType = 'image'
        fabricImage.imgUrl = `${process.env.NEXT_PUBLIC_BASE_URL}` + response.data.image
        setCampaign({ ...campaign, design: { ...campaign.design, [campaign.selected.side]: [...campaign.design[campaign.selected.side], fabricImage] } })

        setFile(null)
        setUserRights(false)
        canvas.add(fabricImage);
        canvas.requestRenderAll();
      }

      setLoading(false)
    } catch (error) {
      console.error('Error uploading file:', error);
      setLoading(false)
    }

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
        <SolidBtn
          onClick={onUpload}
          disabled={!userRights || !file || loading}
        >
          {loading ? 'Uploading...' : 'Upload'}
        </SolidBtn>
      </div>
    </div>
  );
}

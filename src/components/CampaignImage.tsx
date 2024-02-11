'use client'
import { useLayoutEffect, useRef, useState } from "react";
import { fabric } from 'fabric'
import { campaignUtils } from "@/actions/campaign";
import Image from "next/image";
import { CampaignLayout } from "@/assets";

export default function CampaignImage({ design, pArea, background, width = 600, main = false }) {
    const [loading, setLoading] = useState(true)

    const canvasValues = useRef({
        CANVAS_WIDTH: 700,
        CANVAS_HEIGHT: 700,
    });

    const designContainer = useRef(null)
    const canvasRef = useRef(null)
    const canvas = useRef(null)

    useLayoutEffect(() => {
        const applyDesign = async () => {
            try {
                setLoading(true)

                // static canvas for rendering campaign images
                canvas.current = new fabric.StaticCanvas(canvasRef.current, {
                    width: canvasValues.current.CANVAS_WIDTH,
                    height: canvasValues.current.CANVAS_HEIGHT,
                    selection: false,
                });

                // adding all design objects to campaign canvas
                await Promise.all(
                    design.map(async (obj) => {
                        if (obj.objType === "text") {
                            await campaignUtils.addText(canvas.current, obj, pArea);
                        }
                        if (obj.objType === "icon") {
                            await campaignUtils.addClipart(canvas.current, obj, pArea);
                        }
                        if (obj.objType === "image") {
                            await campaignUtils.addImage(canvas.current, obj, pArea);
                        }
                    })
                )

                // loading campaign design background
                let imgElement = new window.Image();
                imgElement.crossOrigin = "anonymous";
                imgElement.src = background
                imgElement.onload = function () {
                    const fabricImage = new fabric.Image(imgElement);
                    fabricImage.set({
                        scaleX: (canvasValues.current.CANVAS_WIDTH || 1) / (fabricImage.width || 1),
                        scaleY: (canvasValues.current.CANVAS_HEIGHT || 1) / (fabricImage.width || 1),
                        selectable: false,
                        top: canvasValues.current.CANVAS_WIDTH / 2,
                        left: canvasValues.current.CANVAS_HEIGHT / 2,
                        originX: "center",
                        originY: "center",
                    });
                    setLoading(false)
                    canvas.current.setBackgroundImage(fabricImage, canvas.current.renderAll.bind(canvas.current));
                };

                canvas.current.renderAll()
            }
            catch (err) {
                console.log(err?.message);
            }
        }

        applyDesign()

        // resizes handler that resizes the campaign image according to its design container
        const resizeHandler = () => {
            if (main) {
                // scale ratio which helps to scale the canvas width
                const scaleRatio = designContainer.current.clientWidth / canvasValues.current.CANVAS_WIDTH

                // changes all dimensions of canvas with the current scale ratio
                canvas.current.setDimensions({ width: canvasValues.current.CANVAS_WIDTH * scaleRatio, height: canvasValues.current.CANVAS_HEIGHT * scaleRatio });

                // zooms the canvas by the scale ratio
                canvas.current.setZoom(scaleRatio)
            }
            else {//the same above but its used for sub images of campaign
                const scaleRatio = width / canvasValues.current.CANVAS_WIDTH

                canvas.current.setDimensions({ width: canvasValues.current.CANVAS_WIDTH * scaleRatio, height: canvasValues.current.CANVAS_HEIGHT * scaleRatio });

                canvas.current.setZoom(scaleRatio)
            }

            canvas.current.renderAll()
        }

        resizeHandler()

        window.addEventListener('resize', resizeHandler)

        return () => {
            window.removeEventListener('resize', resizeHandler)
        }
    }, [design, pArea, background, width, main])

    return (
        <div id="campaign-image" className="w-full relative">
            <div>
                <div className={`w-full min-w-full min-h-full relative`} ref={designContainer}>
                    <canvas id="design" className="w-full" ref={canvasRef} />
                    {
                        loading && main ? (
                            <div className={`w-full absolute top-0 left-0 bottom-0 right-0 z-20 bg-white`}>
                                <Image src={CampaignLayout} className="w-full h-full object-contain opacity-50" alt="campaign-picture" width={600} height={600} />
                            </div>
                        ) : null
                    }
                </div>
            </div>
        </div>
    )
}
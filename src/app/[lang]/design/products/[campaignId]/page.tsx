'use client'
import { campaignAtom, designAtom } from "@/constants"
import { useAtom } from "jotai"
import DesignProducts from "../../start/components/Products";
import { useLayoutEffect, useRef, useState } from "react"
import { VscRefresh } from "react-icons/vsc"
import { campaignUtils } from "@/actions/campaign"
import { fabric } from 'fabric'
import Loader from "@/components/Loader";
import { IoTimeOutline } from "react-icons/io5";
import DraftDialog from "../../components/DraftDialog";
import { useParams, useRouter } from "next/navigation";

export default function Products() {
    const router = useRouter()
    const { campaignId } = useParams()
    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [toEdit, setToEdit] = useState(false)

    // campaign state
    const [campaign, setCampaign] = useAtom(campaignAtom)

    // design state to save design object from server
    const [savedDesign] = useAtom(designAtom)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const canvasRef: any = useRef(null);
    const canvasValues: any = useRef({
        areaCrossed: {
            front: {},
            back: {},
        },
        side: 'front',
        scale: 1,
        offsetX: 0,
        offsetY: 0,
        lastX: null,
        lastY: null,
        CANVAS_WIDTH: 700,
        CANVAS_HEIGHT: 700,
        MIN_OFFSET_X: 0,
        MAX_OFFSET_X: 0,
        MIN_OFFSET_Y: 0,
        MAX_OFFSET_Y: 0,
        isPanning: false,
    });

    const onChangeSide = () => {
        const canvas = canvasRef.canvas

        if (campaign.selected.side === 'front') {
            setCampaign({ ...campaign, selected: { ...campaign.selected, side: 'back' } })
            canvasValues.current.side = 'back'
            canvas.remove(...campaign.design.front)
            canvas.add(...campaign.design.back)
        }
        else {
            setCampaign({ ...campaign, selected: { ...campaign.selected, side: 'front' } })
            canvasValues.current.side = 'front'
            canvas.remove(...campaign.design.back)
            canvas.add(...campaign.design.front)
        }

        canvas.renderAll()
    }

    useLayoutEffect(() => {
        if (campaign.status === 'Draft') {
            router.push('/design/start/' + campaignId)
        }

        const canvas = new fabric.StaticCanvas(canvasRef.current, {
            width: canvasValues.current.CANVAS_WIDTH,
            height: canvasValues.current.CANVAS_HEIGHT,
            selection: false,
        });

        canvasRef.canvas = canvas;

        const fetch = async () => {
            const design = await campaignUtils.addObjects(canvasRef.canvas, savedDesign, campaign.products[0].printableArea, campaign.selected.side)
            canvasRef.canvas.renderAll()

            setCampaign({
                ...campaign,
                design: {
                    ...design
                }
            })
        }


        fetch()
    }, [])

    useLayoutEffect(() => {
        setLoading(true)
        const canvas = canvasRef.canvas

        if (campaign.products.length) {
            setLoading(true)

            let imgElement = new Image();
            imgElement.crossOrigin = "anonymous";
            imgElement.src = campaign.products[campaign.selected.product].colors[campaign.selected.type].image[campaign.selected.side]

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
                canvas.setBackgroundImage(fabricImage, canvas.renderAll.bind(canvas));
            };

            const printableArea = campaign.products[campaign.selected.product].printableArea[campaign.selected.side]

            // setting clippath to object
            Object.values(campaign.design).forEach(side => {
                side.forEach(obj => {
                    campaignUtils.setPrintClip(obj, printableArea)
                })
            })

            canvas.requestRenderAll()
        }
    }, [campaign])

    return (
        <div id="products">
            <div className="grid sm:grid-cols-1 lg:grid-cols-3">
                <div id="design-content" className="relative overflow-hidden">
                    <div className="lg:fixed top-0 bottom-0 lg:mt-20 overflow-hidden sm:w-[100vw] lg:w-[65.7vw] flex items-center justify-center">
                        {
                            loading ? (
                                <div className="absolute bg-white bg-opacity-20 z-50 top-0 left-0 right-0 bottom-0 flex items-center justify-center text-4xl">
                                    <Loader />
                                </div>
                            ) : null
                        }
                        <div id="design-container" className="scale-[.8] lg:scale-100" onClick={() => setToEdit((prev) => !prev)}>
                            <canvas id="design" ref={canvasRef} />
                        </div>
                        <div
                            id="controls"
                            className="flex items-center p-3 absolute bottom-16 left-[50%] translate-x-[-50%] rounded-md bg-white"
                        >
                            <button
                                onClick={onChangeSide}
                                className="flex items-center py-1 px-2 text-xs rounded-md border-opacity-70 border-slate-300 border-2 uppercase"
                            >
                                <VscRefresh className="mr-2 text-lg" /> Show {campaign.selected.side === 'front' ? 'back' : 'front'}
                            </button>
                        </div>
                        {
                            toEdit ? (
                                <div className="flex flex-col p-4 w-[80%] sm:w-auto bg-white rounded-lg shadow-2xl shadow-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                    <h2 className="text-xl font-semibold font-sans text-slate-700 mb-2">
                                        Want to edit your design?
                                    </h2>
                                    <p className="font-sans text-slate-700">
                                        You can <button className="font-medium text-magenta" onClick={openModal}>revert your campaign to draft</button> to make any changes to your design.
                                    </p>
                                </div>
                            ) : null
                        }
                    </div>
                </div>
                <div></div>
                <div className="px-4 lg:p-8 shadow-xl min-h-[100vh]">
                    <h3 className="text-gray-700 text-2xl font-semibold mt-6">
                        Edit your products
                    </h3>
                    <p className="p-3 bg-slate-200 rounded-lg text-slate-600 font-medium text-sm flex items-center mt-8 tracking-normal"><span className="text-xl text-slate-600 mr-1.5"><IoTimeOutline /></span> Any changes will apply to all future orders.</p>
                    <div className="w-full px-2 sm:px-0">
                        <div className="rounded-xl bg-white py-3 ring-white focus:outline-none">
                            <DesignProducts campaign={campaign} canvasRef={canvasRef} canvasValues={canvasValues} setCampaign={setCampaign} />
                        </div>
                    </div>
                </div>
            </div>
            <DraftDialog closeModal={closeModal} isOpen={isOpen} />
        </div>
    )
}
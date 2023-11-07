import { useEffect, useState } from "react"

export default function MultipleEditor({ multipleObj, campaign, setCampaign, canvasRef,  }) {
    const [rotate, setRotate] = useState(0)

    console.log(multipleObj);

    // useEffect(() => {
    //     setRotate(Math.floor(multipleObj.angle || 0))
    //     multipleObj.on('rotating', (options) => {
    //         setRotate(Math.floor(options.angle))
    //     })
    // }, [multipleObj])



    // const onChangeRotate = (e) => {
    //     const canvas = canvasRef.canvas
    //     const angle = e.target.value
    //     const maxAngle = 360
    //     const minAngle = 0

    //     if (e.target.value === '') {
    //         setRotate(null)
    //         selectedObj.object.rotate(0)
    //     }
    //     else if (angle < minAngle) {
    //         setRotate(minAngle)
    //         selectedObj.object.rotate(minAngle)
    //     }
    //     else if (angle > maxAngle) {
    //         setRotate(maxAngle)
    //         selectedObj.object.rotate(maxAngle)
    //     } else {
    //         setRotate(angle)
    //         selectedObj.object.rotate(angle)
    //     }
    //     canvas.renderAll()
    // }

    return (
        <div>
            <p>You have selected multiple objects</p>
        </div>
    )
}
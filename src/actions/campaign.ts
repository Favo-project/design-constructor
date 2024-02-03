import { fabric } from 'fabric'
import FontFaceObserver from 'fontfaceobserver'

function executeAsyncOperation(callback) {
    return new Promise((resolve, reject) => {
        // Execute asynchronous operation and invoke callback
        callback((error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
};


class Campaign {

    async addObjects(canvas: fabric.Canvas | fabric.StaticCanvas | fabric.StaticCanvas, design, pArea, selectedSide) {
        const front = await Promise.all(design.front.map(async (obj) => {
            if (obj.objType === "text") {
                return await this.addText(canvas, obj, pArea.front);
            }
            if (obj.objType === "icon") {
                return await this.addClipart(canvas, obj, pArea.front);
            }
            if (obj.objType === "image") {
                return await this.addImage(canvas, obj, pArea.front);
            }
        }))

        const back = await Promise.all(design.back.map(async (obj) => {
            if (obj.objType === "text") {
                return await this.addText(canvas, obj, pArea.back);
            }
            if (obj.objType === "icon") {
                return await this.addClipart(canvas, obj, pArea.back);
            }
            if (obj.objType === "image") {
                return await this.addImage(canvas, obj, pArea.back);
            }
        }))

        if (selectedSide === 'front') {
            canvas.remove(...back)
        } else {
            canvas.remove(...front)
        }

        return {
            front, back
        }
    }

    // add text to canvas instance
    async addText(canvas: fabric.Canvas | fabric.StaticCanvas, obj, pArea) {
        if (obj.fontFamily === 'Arial') {
            const text = new fabric.Text(obj.text, {
                ...obj,
                top: pArea.top - pArea.height / 2 + obj.relativeTop + obj.height / 2,
            });

            this.setPrintClip(text, pArea)
            canvas.add(text);

            return text
        }
        else {
            const myfont = new FontFaceObserver(obj.fontFamily);
            return await myfont.load().then(
                () => {
                    const text = new fabric.Text(obj.text, {
                        ...obj,
                        top: pArea.top - pArea.height / 2 + obj.relativeTop + obj.height / 2,
                    });

                    this.setPrintClip(text, pArea)
                    canvas.add(text);

                    return text
                }
            )
        }
    }

    // add svg to canvas instance
    async addClipart(canvas: fabric.Canvas | fabric.StaticCanvas, obj, pArea) {
        return await executeAsyncOperation((cb) => {
            fabric.loadSVGFromURL(obj.url, (objects, options) => {
                const svgObject: any = fabric.util.groupSVGElements(objects, options);
                svgObject.set({
                    ...obj,
                    top: pArea.top - pArea.height / 2 + obj.relativeTop + obj.height / 2,
                });

                // changes SVG color, svg containes a lot of sub objects this iteration changes all of their colors
                svgObject._objects.map((elem) => {
                    return elem.fill ? elem.set({ fill: obj.fill }) : elem;
                });

                this.setPrintClip(svgObject, pArea)
                canvas.add(svgObject);
                cb(null, svgObject);
            })
        })
    }

    // add image to canvas instance
    async addImage(canvas: fabric.Canvas | fabric.StaticCanvas, obj, pArea) {
        return await executeAsyncOperation((cb) => {
            fabric.Image.fromURL(obj.imgUrl, (image) => {
                image.set({
                    ...obj,
                    top: pArea.top - pArea.height / 2 + obj.relativeTop + obj.height / 2,
                });

                this.setPrintClip(image, pArea)
                canvas.add(image);
                cb(null, image);
            })
        })
    }

    setPrintClip(obj: fabric.Object, pArea) {
        obj?.set?.({
            clipPath: new fabric.Rect({
                originX: 'center',
                originY: 'center',
                top: pArea.top,
                left: pArea.left,
                width: pArea.width,
                height: pArea.height,
                absolutePositioned: true,
                fill: 'transparent',
                selectable: false, evented: false,
            })
        })
    }

}

export const campaignUtils = new Campaign()

// init canvas

// add objects

// edit objects

// delete object

// event handlers

// switch products

// save canvas
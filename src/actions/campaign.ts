import { fabric } from 'fabric'

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

    async addObjects(canvas: fabric.Canvas, design, pArea, selectedSide) {
        const front = await Promise.all(design.front.map(async (obj) => {
            if (obj.objType === "text") {
                return this.addText(canvas, obj, pArea.front);
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
                return this.addText(canvas, obj, pArea.back);
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
    addText(canvas: fabric.Canvas, obj, pArea) {
        const text = new fabric.Text(obj.text, {
            ...obj,
            top: pArea.top - pArea.height / 2 + obj.relativeTop + obj.height / 2,
        });

        canvas.add(text);

        return text
    }

    // add svg to canvas instance
    async addClipart(canvas: fabric.Canvas, obj, pArea) {
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

                canvas.add(svgObject);
                cb(null, svgObject);
            })
        })
    }

    // add image to canvas instance
    async addImage(canvas: fabric.Canvas, obj, pArea) {
        return await executeAsyncOperation((cb) => {
            fabric.Image.fromURL(obj.src, (image) => {
                image.set({
                    ...obj,
                    top: pArea.top - pArea.height / 2 + obj.relativeTop + obj.height / 2,
                });

                canvas.add(image);
                cb(null, image);
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
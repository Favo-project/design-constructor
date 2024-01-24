import axios from "axios";

export const navigation = {
    products: '/design/products',
    start: '/design/start',
    profits: '/design/profits',
    details: '/design/details',
    preview: '/design/preview',
}

export const designNavigation = [
    { name: "Design", href: "/design/start", level: 1, passed: false },
    { name: "Profits", href: "/design/profits", level: 2, passed: false },
    { name: "Details", href: "/design/details", level: 3, passed: false },
    { name: "Edit & Preview", href: "/design/preview", level: 4, passed: false },
];
export const launchedNavigation = [
    { name: "Products", href: "/design/products", level: 1, passed: false },
    { name: "Profits", href: "/design/profits", level: 2, passed: false },
    { name: "Details", href: "/design/details", level: 3, passed: false },
    { name: "Edit & Preview", href: "/design/preview", level: 4, passed: false },
];

class CampaignTools {
    async saveCampaign(pathname: string, authToken: string, campaignId: string | string[], campaign) {
        if (pathname.indexOf(navigation.start) !== -1) {

            return await this.save(authToken, campaignId, campaign)
        }
        else if (pathname.indexOf(navigation.products) !== -1) {

            return await this.save(authToken, campaignId, campaign)
        }
        else if (pathname.indexOf(navigation.profits) !== -1) {

            const filteredCampaign = { ...campaign }

            delete filteredCampaign.design

            return await this.modify(authToken, campaignId, filteredCampaign)
        }
        else if (pathname.indexOf(navigation.details) !== -1) {

            const filteredCampaign = { ...campaign }

            delete filteredCampaign.design

            return await this.modify(authToken, campaignId, filteredCampaign)
        }
        else if (pathname.indexOf(navigation.preview) !== -1) {

            const filteredCampaign = { ...campaign }

            delete filteredCampaign.design

            return await this.modify(authToken, campaignId, filteredCampaign)
        }
        else {
            throw new Error('Could not find the page pathname!')
        }
    }

    async initCampaign(authToken: string, campaign) {
        const camp = JSON.parse(JSON.stringify(campaign))

        const filteredFront = this.filterObjects(campaign.design.front)
        const filteredBack = this.filterObjects(campaign.design.back)

        camp.design.front = filteredFront
        camp.design.back = filteredBack

        if (camp.design.front.length || camp.design.back.length) {
            try {
                const { data: response } = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/campaigns`, camp, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${authToken || localStorage.getItem('user_at')}`
                    }
                });

                return response
            }
            catch (err) {
                throw err
            }
        }
        else {
            throw new Error('You need to make at least one change!')
        }
    }

    private async save(authToken: string, campaignId: string | string[], campaign) {
        const camp = JSON.parse(JSON.stringify(campaign))

        const filteredFront = this.filterObjects(campaign.design.front)
        const filteredBack = this.filterObjects(campaign.design.back)

        camp.design.front = filteredFront
        camp.design.back = filteredBack

        if (camp.design.front.length || camp.design.back.length) {
            try {
                const { data: response } = await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/campaigns/${campaignId}`, camp, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${authToken || localStorage.getItem('user_at')}`
                    }
                });

                return response
            }
            catch (err) {
                throw err
            }
        }
        else {
            return {
                success: true,
                message: 'Your campaign is saved!'
            }
        }
    }

    private async modify(authToken: string, campaignId: string | string[], campaign) {
        try {
            const { data: response } = await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/campaigns/${campaignId}`, campaign, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authToken || localStorage.getItem('user_at')}`
                }
            });

            return response
        }
        catch (err) {
            throw err
        }
    }

    private filterObjects(objects: fabric.Object[] | { objType: string }[]) {
        return objects.map((elem) => {
            if (elem.objType === 'text') {
                return {
                    originX: elem.originX,
                    originY: elem.originX,
                    width: elem.width,
                    height: elem.height,
                    top: elem.top,
                    left: elem.left,
                    scaleX: elem.scaleX,
                    scaleY: elem.scaleY,
                    type: elem.type,
                    objType: elem.objType,
                    side: elem.side,
                    canvasId: elem.canvasId,
                    relativeTop: elem.relativeTop,
                    text: elem.text,
                    fontFamily: elem.fontFamily,
                    fontSize: elem.fontSize,
                    fontWeight: elem.fontWeight,
                    fontStyle: elem.fontStyle,
                    textAlign: elem.textAlign,
                    textBaseline: elem.textBaseline,
                    fill: elem.fill,
                    opacity: elem.opacity,
                    shadow: elem.shadow,
                    underline: elem.underline,
                    overline: elem.overline,
                    linethrough: elem.linethrough,
                    angle: elem.angle,
                    flipX: elem.flipX,
                    flipY: elem.flipY,
                    charSpacing: elem.charSpacing,
                    lineHeight: elem.lineHeight,
                }
            }
            else if (elem.objType === 'icon') {
                return {
                    originX: elem.originX,
                    originY: elem.originX,
                    width: elem.width,
                    height: elem.height,
                    top: elem.top,
                    left: elem.left,
                    scaleX: elem.scaleX,
                    scaleY: elem.scaleY,
                    type: elem.type,
                    objType: elem.objType,
                    side: elem.side,
                    canvasId: elem.canvasId,
                    relativeTop: elem.relativeTop,
                    url: elem.url,
                    fill: elem.fill,
                    opacity: elem.opacity,
                    shadow: elem.shadow,
                    angle: elem.angle,
                    flipX: elem.flipX,
                    flipY: elem.flipY,
                }
            }
            else if (elem.objType === 'image') {
                return {
                    originX: elem.originX,
                    originY: elem.originX,
                    width: elem.width,
                    height: elem.height,
                    top: elem.top,
                    left: elem.left,
                    scaleX: elem.scaleX,
                    scaleY: elem.scaleY,
                    type: elem.type,
                    objType: elem.objType,
                    side: elem.side,
                    canvasId: elem.canvasId,
                    relativeTop: elem.relativeTop,
                    fill: elem.fill,
                    opacity: elem.opacity,
                    shadow: elem.shadow,
                    angle: elem.angle,
                    flipX: elem.flipX,
                    flipY: elem.flipY,
                    src: elem?._element?.src
                }
            }
        })
    }

    nextCheck(pathname: string, campaign) {
        if (!campaign || !campaign.design || !campaign.products) {
            return false
        }

        if (pathname.indexOf(navigation.products) !== -1) {
            if ((campaign.design.front.length || campaign.design.back.length) && campaign.products.length) return true
            return false
        }
        if (pathname.indexOf(navigation.start) !== -1) {
            if (campaign.design.front.length || campaign.design.back.length) return true
            return false
        }
        if (pathname.indexOf(navigation.profits) !== -1) {
            let check: boolean = true
            campaign.products.forEach((product) => {
                if (product.baseCost > product.sellingPrice || product.sellingPrice > product.maxCost) {
                    check = false
                }
            })
            return check
        }
        if (pathname.indexOf(navigation.details) !== -1) {
            if (campaign.tags.length) return true
            return false
        }
    }

    launchCheck(campaign) {
        if (!campaign || !campaign.design || !campaign.products.length) {
            return false
        }
        else if (!campaign.title) {
            return false
        }
        else if (!campaign.description) {
            return false
        }
        else if (campaign.campaignLevel < 3) {
            return false
        }
        else if (!campaign.tags.length) {
            return false
        }
        return true
    }

    async changeLevel(authToken: string, pathname: string, campaignId: string | string[], campaign) {
        let campaignLevel = 0
        if (pathname.indexOf(navigation.start) !== -1 && campaign.campaignLevel < 1) {
            campaignLevel = 1

            return await this.modify(authToken, campaignId, { campaignLevel })
        }
        else if (pathname.indexOf(navigation.profits) !== -1 && campaign.campaignLevel < 2) {
            campaignLevel = 2

            return await this.modify(authToken, campaignId, { campaignLevel })
        }
        else if (pathname.indexOf(navigation.details) !== -1 && campaign.campaignLevel < 3) {
            campaignLevel = 3

            return await this.modify(authToken, campaignId, { campaignLevel })
        }
        else if (pathname.indexOf(navigation.preview) !== -1 && campaign.campaignLevel < 4) {
            campaignLevel = 4

            return await this.modify(authToken, campaignId, { campaignLevel })
        }
        else {
            return {
                data: {
                    campaignLevel: campaign.campaignLevel
                }
            }
        }
    }

    navigation(campaign, campaignId) {
        if (campaign.status === 'Launched') {
            return launchedNavigation.map((link) => {
                if (campaign.campaignLevel >= link.level) {
                    return {
                        ...link,
                        passed: true,
                        href: `${link.href}/${campaignId}`
                    }
                }
                else {
                    return {
                        ...link,
                        href: `${link.href}/${campaignId}`
                    }
                }
            })
        }
        else if (campaignId) {
            return designNavigation.map((link) => {
                if (campaign.campaignLevel >= link.level) {
                    return {
                        ...link,
                        passed: true,
                        href: `${link.href}/${campaignId}`
                    }
                }
                else {
                    return {
                        ...link,
                        href: `${link.href}/${campaignId}`
                    }
                }
            })
        }
        else {
            return designNavigation.map((link) => {
                if (campaign.campaignLevel >= link.level) {
                    return {
                        ...link,
                        passed: true,
                        href: `${link.href}`
                    }
                }
                else {
                    return {
                        ...link,
                        href: `${link.href}`
                    }
                }
            })
        }
    }

    async launchCampaign(authToken, campaignId) {
        try {
            return await this.modify(authToken, campaignId, { status: 'Launched' })
        }
        catch (err) {
            throw err
        }
    }

    async draftCampaign(authToken, campaignId) {
        try {
            return await this.modify(authToken, campaignId, { status: 'Draft' })
        }
        catch (err) {
            throw err
        }
    }

}


export function formatCurrency(amount, currencyCode = 'UZS') {
    // Create a NumberFormat object for the specified currency
    const formatter = new Intl.NumberFormat('en-US');

    // Format the amount using the formatter
    return formatter.format(amount) + ' so\'m'
}

export const campaignTools = new CampaignTools()
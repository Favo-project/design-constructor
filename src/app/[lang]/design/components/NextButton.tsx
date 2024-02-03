import { useParams, usePathname } from "next/navigation"
import { useLayoutEffect, useState } from "react"
import Link from "next/link"
import { campaignTools, navigation } from "@/actions/campaignTools"
import CrossedDialog from "./CrossedDialog"
import { useAtom } from "jotai"
import { campaignPrintCrossed } from "@/constants"

export default function NextButton({ loaded, onNext, onLaunch, loading, campaign, onSave, isSaved }) {
    const pathname = usePathname()
    const { campaignId } = useParams()
    const [isNext, setIsNext] = useState(false)
    const [isLaunch, setIsLaunch] = useState(false)

    const [nextUrl, setNextUrl] = useState('')
    const [isCrossedOpen, setIsCrossedOpen] = useState(false)

    // state for identifing the print area cross
    const [printCrossed, setPrintCrossed] = useAtom(campaignPrintCrossed)

    function closeCrossModal() {
        setIsCrossedOpen(false)
    }

    function openCrossModal() {
        setIsCrossedOpen(true)
    }

    useLayoutEffect(() => {
        if (pathname.indexOf(navigation.start) !== -1 && campaignId) {
            setNextUrl(`${navigation.profits}/${campaignId}`)
        }
        if (pathname.indexOf(navigation.products) !== -1 && campaignId) {
            setNextUrl(`${navigation.profits}/${campaignId}`)
        }
        else if (pathname.indexOf(navigation.profits) !== -1 && campaignId) {
            setNextUrl(`${navigation.details}/${campaignId}`)
        }
        else if (pathname.indexOf(navigation.details) !== -1 && campaignId) {
            setNextUrl(`${navigation.preview}/${campaignId}`)
        }
        else if (pathname.indexOf(navigation.preview) !== -1 && campaignId) {
            setNextUrl('/dashboard/campaigns')
        }

        setIsNext(campaignTools.nextCheck(pathname, campaign))
        setIsLaunch(campaignTools.launchCheck(campaign))
    }, [pathname, campaignId, campaign])

    if (printCrossed === true) {
        return (
            <>
                <button onClick={openCrossModal} className="bg-gradient-to-r from-magenta to-blue rounded-md text-white shadow-md px-3 p-1 disabled:opacity-70 disabled:shadow-none disabled:cursor-not-allowed">
                    Next
                </button>
                <CrossedDialog isOpen={isCrossedOpen} closeModal={closeCrossModal} nextUrl={nextUrl} onSave={onSave} />
            </>
        )
    }

    if (pathname.indexOf(navigation.preview) !== -1 && campaignId) {
        if (campaign.status === 'Launched') {
            return (
                <button onClick={onSave} disabled={!loaded || loading} className="text-sm flex uppercase tracking-tight bg-gradient-to-r from-magenta to-blue text-white rounded-md">
                    <Link href={nextUrl} className="block text-white rounded-md shadow-md px-2 p-2">
                        Save & Close
                    </Link>
                </button>
            )
        }

        if (!isLaunch) {
            return (
                <button disabled className="block bg-gradient-to-r from-magenta to-blue text-white rounded-md shadow-md px-3 p-1 disabled:opacity-70 disabled:shadow-none disabled:cursor-not-allowed">
                    Launch
                </button>
            )
        }

        return (
            <button onClick={onLaunch} disabled={!loaded || loading} className="block bg-gradient-to-r from-magenta to-blue text-white rounded-md shadow-md px-3 p-1 disabled:opacity-70 disabled:shadow-none disabled:cursor-not-allowed">
                Launch
            </button>
        )
    }

    if (!isNext || isSaved || !loaded || loading) {
        return (
            <button disabled className="bg-gradient-to-r from-magenta to-blue rounded-md text-white shadow-md px-3 p-1 disabled:opacity-70 disabled:shadow-none disabled:cursor-not-allowed">
                Next
            </button>
        )
    }

    return (
        <button onClick={onNext} disabled={!loaded || loading} className="bg-gradient-to-r from-magenta to-blue rounded-md disabled:opacity-70 disabled:shadow-none disabled:cursor-not-allowed">
            <Link href={nextUrl} className="block text-white rounded-md shadow-md px-3 p-1">
                Next
            </Link>
        </button>
    )
}


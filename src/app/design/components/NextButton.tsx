import { useParams, usePathname } from "next/navigation"
import { useLayoutEffect, useState } from "react"
import Link from "next/link"
import { campaignTools, navigation } from "../actions/campaignTools"

export default function NextButton({ loaded, onNext, onLaunch, loading, campaign, onSave }) {
    const pathname = usePathname()
    const { campaignId } = useParams()
    const [isNext, setIsNext] = useState(false)
    const [isLaunch, setIsLaunch] = useState(false)

    const [nextUrl, setNextUrl] = useState('')

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



    if (pathname.indexOf(navigation.preview) !== -1 && campaignId) {
        if (campaign.status === 'Launched') {
            return (
                <button onClick={onSave} disabled={!loaded || loading} className="text-sm flex uppercase tracking-tight bg-indigo-500 text-white rounded-md">
                    <Link href={nextUrl} className="block text-white rounded-md shadow-md px-2 p-2">
                        Save & Close
                    </Link>
                </button>
            )
        }

        if (!isLaunch) {
            return (
                <button disabled className="block bg-indigo-500 text-white rounded-md shadow-md px-3 p-1 disabled:bg-indigo-300 disabled:shadow-none disabled:cursor-not-allowed">
                    Launch
                </button>
            )
        }

        return (
            <button onClick={onLaunch} disabled={!loaded || loading} className="block bg-indigo-500 text-white rounded-md shadow-md px-3 p-1 disabled:bg-indigo-300 disabled:shadow-none disabled:cursor-not-allowed">
                Launch
            </button>
        )
    }

    if (!isNext) {
        return (
            <button disabled className="bg-indigo-500 rounded-md text-white shadow-md px-3 p-1 disabled:bg-indigo-300 disabled:shadow-none disabled:cursor-not-allowed">
                Next
            </button>
        )
    }

    return (
        <button onClick={onNext} disabled={!loaded || loading} className="bg-indigo-500 rounded-md disabled:bg-indigo-300 disabled:shadow-none disabled:cursor-not-allowed">
            <Link href={nextUrl} className="block text-white rounded-md shadow-md px-3 p-1">
                Next
            </Link>
        </button>
    )
}


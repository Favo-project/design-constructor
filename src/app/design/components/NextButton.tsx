import { useParams, usePathname } from "next/navigation"
import SaveLoader from "./SaveLoader"
import { useLayoutEffect, useState } from "react"
import Link from "next/link"
import { campaignTools } from "../actions/campaignTools"

const navigation = {
    start: '/design/start',
    profits: '/design/profits',
    details: '/design/details',
    preview: '/design/preview',
}

export default function NextButton({ loaded, onNext, onLaunch, loading, campaign }) {
    const pathname = usePathname()
    const { campaignId } = useParams()
    const [isNext, setIsNext] = useState(false)

    const [nextUrl, setNextUrl] = useState('')

    useLayoutEffect(() => {
        if (pathname.indexOf(navigation.start) !== -1 && campaignId) {
            setNextUrl(`${navigation.profits}/${campaignId}`)
        }
        else if (pathname.indexOf(navigation.profits) !== -1 && campaignId) {
            setNextUrl(`${navigation.details}/${campaignId}`)
        }
        else if (pathname.indexOf(navigation.details) !== -1 && campaignId) {
            setNextUrl(`${navigation.preview}/${campaignId}`)
        }
        else if (pathname.indexOf(navigation.preview) !== -1 && campaignId) {
            setNextUrl('')
        }

        setIsNext(campaignTools.nextCheck(pathname, campaign))
    }, [pathname, campaignId, campaign])


    if (pathname.indexOf(navigation.preview) !== -1 && campaignId) return (
        <button onClick={onLaunch} disabled={!loaded || loading} className="block bg-indigo-500 text-white rounded-md shadow-md px-3 p-1 disabled:bg-indigo-300 disabled:shadow-none disabled:cursor-not-allowed">
            Launch
        </button>
    )

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


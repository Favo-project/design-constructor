'use client'
import Link from "next/link"
import AuthModal from "./AuthModal"
import { useAtom } from "jotai"
import { userAtom } from "@/constants"

export default function StartBtn({ href = '/dashboard/overview', context = 'Get started', contextOut = 'Get started' }) {
    const [user] = useAtom(userAtom)

    return (
        user.loaded ? (
            <>
                <Link
                    href={href}
                    className="rounded-md bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all"
                >
                    {context}
                </Link>
            </>
        ) : (
            <AuthModal>
                <div
                    className="rounded-md bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all"
                >
                    {contextOut}
                </div>
            </AuthModal>
        )
    )
}
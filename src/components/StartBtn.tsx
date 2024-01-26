'use client'
import AuthModal from "./AuthModal"
import { useAtom } from "jotai"
import { userAtom } from "@/constants"
import SolidBtn from "./form-elements/SolidBtn"

export default function StartBtn({ href = '/dashboard/overview', context = 'Get started', contextOut = 'Get started' }) {
    const [user] = useAtom(userAtom)

    return (
        user.loaded ? (
            <>
                <SolidBtn
                    href={href}
                >
                    {context}
                </SolidBtn>
            </>
        ) : (
            <AuthModal>
                <SolidBtn div>
                    {contextOut}
                </SolidBtn>
            </AuthModal>
        )
    )
}
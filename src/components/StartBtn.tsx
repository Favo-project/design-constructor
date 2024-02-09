'use client'
import AuthModal from "./AuthModal"
import { useAtom } from "jotai"
import { userAtom } from "@/constants"
import SolidBtn from "./form-elements/SolidBtn"

export default function StartBtn({ resources, href = '/dashboard/overview', context = 'Get started', contextOut = context }) {
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
            <AuthModal resources={resources}>
                <SolidBtn div>
                    {contextOut}
                </SolidBtn>
            </AuthModal>
        )
    )
}
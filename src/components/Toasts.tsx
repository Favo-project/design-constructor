'use client'
import { toastAtom } from "@/constants"
import { useAtom } from "jotai"
import { useEffect } from "react"

export default function Toasts() {
    const [toast, setToast] = useAtom(toastAtom)

    useEffect(() => {
        const timout = setTimeout(() => {
            setToast({ ...toastAtom.init })
        }, 3000)

        return () => clearTimeout(timout)
    }, [toast, setToast])

    const toastColor = (type) => {
        if (type === 'warning') {
            return 'border-orange-500'
        }
        else if (type === 'info') {
            return 'border-indigo-500'
        }
        else if (type === 'success') {
            return 'border-green-500'
        }
        else {
            return 'border-red-500'
        }
    }

    const onClose = () => {
        setToast({ ...toastAtom.init })
    }

    return (
        <div>
            <div onClick={onClose} className={`${toast.message ? 'right-4' : '-right-[100%]'} max-w-sm px-8 py-3 bg-slate-200 fixed top-8  z-[100] border-l-4 transition-all shadow-xl overflow-hidden duration-300 ${toastColor(toast.type)}`}>
                <p className="text-slate-600 font-sans">{toast.message}</p>
            </div>
        </div>
    )
}
import Link from "next/link";

interface IButton {
    children?: React.ReactNode;
    href?: string
    disabled?: boolean
    type?: "button" | "submit" | 'reset'
    className?: string,
    style?: React.CSSProperties
    div?: boolean
    onClick?: () => void
}

export default function OutlineBtn({
    children, href = '', disabled = false, type = 'button', className = '', style = {}, div = false, onClick
}: IButton) {

    if (div) {
        return (
            <button
                className={`inline-flex text-sm items-center px-3 py-2.5 sm:px-4 sm:py-[12.5px] font-semibold text-center border-2 rounded-sm border-dark text-dark outline-none transition-all duration-300 hover:bg-dark hover:text-white ${className}`}>
                {children}
            </button>
        )
    }

    if (href && !disabled) {
        return <Link href={href} className={`inline-flex text-sm items-centerpx-2 px-3 py-2.5 sm:px-4 sm:py-[12.5px] font-semibold text-center border-2 rounded-sm border-dark text-dark outline-none transition-all duration-300 hover:bg-dark hover:text-white ${className}`}>
            {children}
        </Link>
    }

    if (disabled) {
        return (
            <button disabled className={`inline-flex text-sm items-center px-3 py-2.5 sm:px-4 sm:py-[12.5px] font-semibold text-center border-2 rounded-sm border-dark text-dark outline-none transition-all duration-300 hover:bg-dark hover:text-white disabled:opacity-60 disabled:cursor-not-allowed ${className}`}>
                {children}
            </button>
        )
    }

    return (
        <button disabled={disabled} type={type} onClick={onClick}
            className={`inline-flex text-sm items-center px-3 py-2.5 sm:px-4 sm:py-[12.5px] font-semibold text-center border-2 rounded-sm border-dark text-dark outline-none transition-all duration-300 hover:bg-dark hover:text-white disabled:opacity-60 disabled:cursor-not-allowed ${className}`}>
            {children}
        </button>
    );
}

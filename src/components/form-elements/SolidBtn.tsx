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

export default function SolidBtn({
  children, href = '', disabled = false, type = 'button', className = '', style = {}, div = false, onClick
}: IButton) {

  if (div) {
    return (
      <div
        className={`inline-flex text-sm items-center px-6 py-3.5 font-semibold text-center text-white rounded-sm from-magenta to-blue bg-gradient-to-r hover:from-blue hover:to-magenta hover:bg-gradient-to-tr outline-none transition-all duration-300 ${className}`}>
        {children}
      </div>
    )
  }

  if (href && !disabled) {
    return <Link href={href} className={`inline-flex text-sm items-center px-6 py-3.5 font-semibold text-center text-white rounded-sm from-magenta to-blue bg-gradient-to-r hover:from-blue hover:to-magenta hover:bg-gradient-to-tr outline-none transition-all duration-300 ${className}`}>
      {children}
    </Link>
  }

  if (disabled) {
    return (
      <button disabled
        className={`inline-flex text-sm items-center px-6 py-3.5 font-semibold text-center text-white rounded-sm from-magenta to-blue bg-gradient-to-r hover:from-blue hover:to-magenta hover:bg-gradient-to-tr outline-none transition-all duration-300 disabled:opacity-60 disabled:hover:bg-gradient-to-l disabled:cursor-not-allowed ${className}`}>
        {children}
      </button>
    )
  }

  return (
    <button disabled={disabled} type={type} onClick={onClick}
      className={`inline-flex text-sm items-center px-6 py-3.5 font-semibold text-center text-white rounded-sm from-magenta to-blue bg-gradient-to-r hover:from-blue hover:to-magenta hover:bg-gradient-to-tr outline-none transition-all duration-300 disabled:opacity-60 disabled:hover:bg-gradient-to-l disabled:cursor-not-allowed ${className}`}>
      {children}
    </button>
  );
}

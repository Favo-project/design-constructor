import './Checkbox.css'

export default function Checkbox({ required = false, children, className }: { required?: boolean, children?: React.ReactNode, id?: string, name?: string, className?: string }) {
    return (
        <label id='checkbox' className={`checkbox flex items-center text-lg leading-6 ml-3 text-slate-500 ${className}`}>{children}
            <input type="checkbox" id='checkbox' className='sr-only' required={required} />
            <span className="checkmark"></span>
        </label>
    )
}
import './Checkbox.css'

interface ICheckbox {
    required?: boolean,
    children?: React.ReactNode,
    id?: string,
    name?: string,
    className?: string,
    onChange?: (e: any) => void
    checked?: boolean
}

export default function Checkbox({ required = false, children, className, onChange, checked = false }: ICheckbox) {
    return (
        <label id='checkbox' className={`checkbox flex items-center text-lg leading-6 ml-3 text-slate-500 ${className}`}>{children}
            <input checked={checked} onChange={onChange} type="checkbox" id='checkbox' className='sr-only' required={required} />
            <span className="checkmark"></span>
        </label>
    )
}
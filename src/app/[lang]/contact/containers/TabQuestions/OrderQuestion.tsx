import SolidBtn from "@/components/form-elements/SolidBtn"
import { useState } from "react"

export default function OrderQuestion({ resources }) {
    const [orderNumber, setOrderNumber] = useState('')
    return (
        <div>
            <h2 className='text-2xl font-semibold tracking-wide text-slate-700 mb-8'>{resources.contact.orderquestion.title}.</h2>

            <form >
                <div className='mb-6'>
                    <label className='block font-semibold uppercase font-mono tracking-widest text-slate-700 mb-3' htmlFor='order-number'>{resources.contact.orderquestion.ordernumber}</label>
                    <p className='text-slate-700 font-sans font-medium mb-3'>{resources.contact.orderquestion.text}.</p>
                    <input className='w-full px-4 py-2.5 font-semibold border-2 border-slate-300 outline-none focus:border-slate-600 text-slate-600 placeholder:text-slate-400 rounded-lg transition-all' value={orderNumber} onChange={(e) => setOrderNumber(e.target.value)} placeholder={resources.contact.orderquestion.placeholder} name='order-number' id='order-number' type="text" />
                </div>
                <SolidBtn type='submit' disabled={!orderNumber}>
                    {resources.contact.orderquestion.continue}
                </SolidBtn>
            </form>
        </div>
    )
}
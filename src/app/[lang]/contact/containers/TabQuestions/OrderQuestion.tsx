import SolidBtn from "@/components/form-elements/SolidBtn"
import { useState } from "react"

export default function OrderQuestion() {
    const [orderNumber, setOrderNumber] = useState('')

    return (
        <div>
            <h2 className='text-2xl font-semibold tracking-wide text-slate-700 mb-8'>We just need some information from you.</h2>

            <form >
                <div className='mb-6'>
                    <label className='block font-semibold uppercase font-mono tracking-widest text-slate-700 mb-3' htmlFor='order-number'>ORDER NUMBER</label>
                    <p className='text-slate-700 font-sans font-medium mb-3'>You can find it in the confirmation email or by following these steps.</p>
                    <input className='w-full px-4 py-2.5 font-semibold border-2 border-slate-300 outline-none focus:border-slate-600 text-slate-600 placeholder:text-slate-400 rounded-lg transition-all' value={orderNumber} onChange={(e) => setOrderNumber(e.target.value)} placeholder='For example, 12-3456-789' name='order-number' id='order-number' type="text" />
                </div>
                <SolidBtn type='submit' disabled={!orderNumber}>
                    Continue
                </SolidBtn>
            </form>
        </div>
    )
}
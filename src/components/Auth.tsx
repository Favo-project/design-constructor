'use client'
import { Tab } from '@headlessui/react'
import { useState } from 'react'
import { useAtom } from 'jotai'
import { authAtom } from '@/constants'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

interface IReponse {
    accessToken: string
    message: string
    success: boolean
}

export default function Auth({ closeModal }) {
    const [auth, setAuth] = useAtom(authAtom)

    const [loginPhone, setLoginPhone] = useState('')
    const [loginPassword, setLoginPassword] = useState('')
    const [registerName, setRegisterName] = useState('')
    const [registerPhone, setRegisterPhone] = useState('')
    const [registerPassword, setRegisterPassword] = useState('')

    const onLoginSubmit = (e) => {
        e.preventDefault()

        const body = {
            phone: loginPhone,
            password: loginPassword
        }

        try {
            fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, {
                method: 'POST', headers: {
                    'Content-Type': 'application/json'
                }, body: JSON.stringify(body)
            }).then(res => res.json()).then((data: IReponse) => {
                if (data.success && data.accessToken) {
                    localStorage.setItem('user_at', data.accessToken)
                    setAuth(data.accessToken)
                    clear()
                    closeModal()
                }
            })
        }
        catch (e) {
            console.log(e.message);
            localStorage.removeItem('user_at')
        }
    }

    const onRegisterSubmit = (e) => {
        e.preventDefault()

        const body = {
            name: registerName,
            phone: registerPhone,
            password: registerPassword
        }

        try {
            fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/register`, {
                method: 'POST', headers: {
                    'Content-Type': 'application/json'
                }, body: JSON.stringify(body)
            }).then(res => res.json()).then((data: IReponse) => {
                if (data.success && data.accessToken) {
                    localStorage.setItem('user_at', data.accessToken)
                    setAuth(data.accessToken)
                    clear()
                    closeModal()
                }
            })
        }
        catch (e) {
            console.log(e.message);
            localStorage.removeItem('user_at')
        }
    }


    const clear = () => {
        setLoginPhone('')
        setLoginPassword('')
        setRegisterName('')
        setRegisterPhone('')
        setRegisterPassword('')
    }

    return (
        <div>
            <h2 className='text-xl font-semibold font-sans text-slate-700 mb-3'>Authentication</h2>
            <div>
                <Tab.Group>
                    <Tab.List className="flex space-x-1 rounded-xl p-1 mb-5">
                        <Tab
                            className={({ selected }) =>
                                classNames(
                                    'w-full py-2.5 text-sm font-medium leading-5 outline-none',
                                    selected
                                        ? 'text-indigo-500 border-b-2 border-indigo-500'
                                        : 'text-slate-600 hover:shadow shadow-lg hover:text-indigo-500'
                                )
                            }
                        >
                            Sign in
                        </Tab>
                        <Tab
                            className={({ selected }) =>
                                classNames(
                                    'w-full py-2.5 text-sm font-medium leading-5 outline-none',
                                    selected
                                        ? 'text-indigo-500 border-b-2 border-indigo-500'
                                        : 'text-slate-600 hover:shadow shadow-lg hover:text-indigo-500'
                                )
                            }
                        >
                            Sign up
                        </Tab>
                    </Tab.List>
                    <Tab.Panels className="mt-2">
                        <Tab.Panel className={'outline-none'}>
                            <form onSubmit={onLoginSubmit}>
                                <div className='flex flex-col w-full mb-4'>
                                    <label className='text-sm text-slate-500 mb-2' htmlFor="phone">Phone<span className='text-red-500'>*</span></label>
                                    <input value={loginPhone} onChange={e => setLoginPhone(e.target.value)} className='text-slate-600 font-semibold px-3 py-2.5 outline-none border-2 border-slate-300 rounded-md placeholder:font-medium hover:border-slate-500 focus:border-indigo-500 transition' type="text" name='phone' id='phone' placeholder='Phone' required />
                                </div>
                                <div className='flex flex-col w-full mb-4'>
                                    <label className='text-sm text-slate-500 mb-2' htmlFor="password">Password<span className='text-red-500'>*</span></label>
                                    <input value={loginPassword} onChange={e => setLoginPassword(e.target.value)} className='text-slate-600 font-semibold px-3 py-2.5 outline-none border-2 border-slate-300 rounded-md placeholder:font-medium hover:border-slate-500 focus:border-indigo-500 transition' type="password" name='password' id='password' placeholder='Password' required />
                                </div>
                                <div className='w-full mb-6 mt-8'>
                                    <button className='w-full text-white font-medium font-sans px-4 py-2.5 rounded-md bg-indigo-600' type='submit'>Signin</button>
                                </div>
                            </form>
                        </Tab.Panel>
                        <Tab.Panel className={'outline-none'}>
                            <form onSubmit={onRegisterSubmit}>
                                <div className='flex flex-col w-full mb-4'>
                                    <label className='text-sm text-slate-500 mb-2' htmlFor="name">Name<span className='text-red-500'>*</span></label>
                                    <input value={registerName} onChange={e => setRegisterName(e.target.value)} className='text-slate-600 font-semibold px-3 py-2.5 outline-none border-2 border-slate-300 rounded-md placeholder:font-medium hover:border-slate-500 focus:border-indigo-500 transition' type="text" name='name' id='name' placeholder='Name' required />
                                </div>
                                <div className='flex flex-col w-full mb-4'>
                                    <label className='text-sm text-slate-500 mb-2' htmlFor="phone">Phone<span className='text-red-500'>*</span></label>
                                    <input value={registerPhone} onChange={e => setRegisterPhone(e.target.value)} className='text-slate-600 font-semibold px-3 py-2.5 outline-none border-2 border-slate-300 rounded-md placeholder:font-medium hover:border-slate-500 focus:border-indigo-500 transition' type="text" name='phone' id='phone' placeholder='Phone' required />
                                </div>
                                <div className='flex flex-col w-full mb-4'>
                                    <label className='text-sm text-slate-500 mb-2' htmlFor="password">Password<span className='text-red-500'>*</span></label>
                                    <input value={registerPassword} onChange={e => setRegisterPassword(e.target.value)} className='text-slate-600 font-semibold px-3 py-2.5 outline-none border-2 border-slate-300 rounded-md placeholder:font-medium hover:border-slate-500 focus:border-indigo-500 transition' type="password" name='password' id='password' placeholder='Password' required />
                                </div>
                                <div className='flex mt-6'>
                                    <input type="checkbox" name='policy' id='policy' required />
                                    <label className='leading-6 ml-3 text-slate-500' htmlFor="policy">I agree to ArtVibe`s Privacy Policy & Terms and Conditions</label>
                                </div>
                                <div className='w-full mb-6 mt-6'>
                                    <button className='w-full text-white font-medium font-sans px-4 py-2.5 rounded-md bg-indigo-600' type='submit'>Signup</button>
                                </div>
                            </form>
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </div>
        </div>
    )
}
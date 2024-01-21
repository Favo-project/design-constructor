'use client'
import { Tab } from '@headlessui/react'
import { useState } from 'react'
import { useAtom } from 'jotai'
import { authAtom } from '@/constants'
import { PatternFormat } from 'react-number-format';
import axios from 'axios'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
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

        const fetch = async () => {
            const loginData = {
                phone: loginPhone,
                password: loginPassword
            }

            try {
                const { data: response } = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, loginData, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${auth || localStorage.getItem('user_at')}`
                    }
                })

                if (response.success && response.accessToken) {
                    localStorage.setItem('user_at', response.accessToken)
                    setAuth(response.accessToken)
                    clear()
                    closeModal()
                }
            }
            catch (e) {
                console.log(e.message);
                localStorage.removeItem('user_at')
                setAuth('')
            }
        }

        fetch()
    }

    const onRegisterSubmit = (e) => {
        e.preventDefault()

        const fetch = async () => {
            const registerData = {
                name: registerName,
                phone: registerPhone,
                password: registerPassword
            }

            try {
                const { data: response } = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/register`, registerData, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${auth || localStorage.getItem('user_at')}`
                    }
                })

                if (response.success && response.accessToken) {
                    localStorage.setItem('user_at', response.accessToken)
                    setAuth(response.accessToken)
                    clear()
                    closeModal()
                }
            }
            catch (e) {
                console.log(e.message);
                localStorage.removeItem('user_at')
                setAuth('')
            }
        }

        fetch()
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
                                    <PatternFormat
                                        value={loginPhone}
                                        type="tel"
                                        format="+998(##)###-##-##"
                                        mask="_"
                                        onValueChange={value => setLoginPhone(value.value)}
                                        required
                                        className='text-slate-600 font-semibold px-3 py-2.5 outline-none border-2 border-slate-300 rounded-md placeholder:font-medium hover:border-slate-500 focus:border-indigo-500 transition'
                                        name='phone'
                                        id='phone'
                                        placeholder='Phone'
                                    />
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
                                    <PatternFormat
                                        value={registerPhone}
                                        type="tel"
                                        format="+998(##)###-##-##"
                                        mask="_"
                                        onValueChange={value => setRegisterPhone(value.value)}
                                        required
                                        className='text-slate-600 font-semibold px-3 py-2.5 outline-none border-2 border-slate-300 rounded-md placeholder:font-medium hover:border-slate-500 focus:border-indigo-500 transition'
                                        name='phone'
                                        id='phone'
                                        placeholder='Phone'
                                    />
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
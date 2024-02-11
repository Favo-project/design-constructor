'use client'
import { Tab } from '@headlessui/react'
import { useEffect, useState } from 'react'
import { useAtom } from 'jotai'
import { authAtom } from '@/constants'
import { PatternFormat } from 'react-number-format';
import axios from 'axios'
import SolidBtn from './form-elements/SolidBtn'
import { LogoMain } from '@/assets'
import Link from '@/components/Link'
import Image from 'next/image'
import Checkbox from './form-elements/Checkbox'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Auth({ closeModal, resources }) {
    const [auth, setAuth] = useAtom(authAtom)
    const [selectedIdx, setSelectedIdx] = useState(0)
    const [errorMsg, setErrorMsg] = useState('')

    const [loginPhone, setLoginPhone] = useState('')
    const [loginPassword, setLoginPassword] = useState('')
    const [registerName, setRegisterName] = useState('')
    const [registerPhone, setRegisterPhone] = useState('')
    const [registerPassword, setRegisterPassword] = useState('')
    const [termsPolicy, setTermsPolicy] = useState(false)

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
                setErrorMsg(e?.response?.data?.error || 'Xatolik yuz berdi!')
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
                setErrorMsg(e?.response?.data?.error || 'Xatolik yuz berdi!')
                console.log(e?.message);
                localStorage.removeItem('user_at')
                setAuth('')
            }
        }

        fetch()
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (errorMsg) {
                setErrorMsg('')
            }
        }, 5000)

        return () => clearTimeout(timeout)
    }, [errorMsg])


    const clear = () => {
        setLoginPhone('')
        setLoginPassword('')
        setRegisterName('')
        setRegisterPhone('')
        setRegisterPassword('')
    }

    return (
        <div>
            <div className='flex flex-col items-center justify-center mt-4 mb-6'>
                <Link onClick={closeModal} href={'/'} className="block">
                    <Image src={LogoMain} alt="artvibe-logo" width={60} height={38} />
                </Link>
                <p className='text-center h-6 mt-5 flex items-center justify-center text-red-500 font-sans font-medium text-lg'><span>{errorMsg}</span></p>
            </div>
            <div>
                <Tab.Group selectedIndex={selectedIdx}>
                    <Tab.List className="flex space-x-1 rounded-xl p-1 mb-5">
                        <Tab
                            onClick={() => setSelectedIdx(0)}
                            className={({ selected }) =>
                                classNames(
                                    'w-full py-2.5 text-sm font-medium leading-5 outline-none',
                                    selected
                                        ? 'text-magenta border-b-2 border-magenta'
                                        : 'text-blue border shadow-md border-blue hover:text-magenta rounded-md'
                                )
                            }
                        >
                            {resources.auth.signin}
                        </Tab>
                        <Tab
                            onClick={() => setSelectedIdx(1)}
                            className={({ selected }) =>
                                classNames(
                                    'w-full py-2.5 text-sm font-medium leading-5 outline-none',
                                    selected
                                        ? 'text-magenta border-b-2 border-magenta'
                                        : 'text-blue border shadow-md border-blue hover:text-magenta rounded-md'
                                )
                            }
                        >
                            {resources.auth.signup}
                        </Tab>
                    </Tab.List>
                    <Tab.Panels className="mt-2">
                        <Tab.Panel className={'outline-none'}>
                            <form onSubmit={onLoginSubmit}>
                                <div className='flex flex-col w-full mb-4'>
                                    <label className='text-sm text-slate-500 mb-2' htmlFor="phone-login">{resources.auth.phone}<span className='text-red-500'>*</span></label>
                                    <PatternFormat
                                        value={loginPhone}
                                        type="tel"
                                        format="+998(##)### ## ##"
                                        mask="_"
                                        onValueChange={value => setLoginPhone(value.value)}
                                        required
                                        className='text-slate-600 font-semibold px-3 py-2.5 outline-none border-2 border-slate-300 rounded-md placeholder:font-medium hover:border-slate-500 focus:border-magenta transition'
                                        name='phone-login'
                                        id='phone-login'
                                        placeholder={resources.auth.phone}
                                    />
                                </div>
                                <div className='flex flex-col w-full mb-4'>
                                    <label className='text-sm text-slate-500 mb-2' htmlFor="password-login">{resources.auth.password}<span className='text-red-500'>*</span></label>
                                    <input value={loginPassword} onChange={e => setLoginPassword(e.target.value)} className='text-slate-600 font-semibold px-3 py-2.5 outline-none border-2 border-slate-300 rounded-md placeholder:font-medium hover:border-slate-500 focus:border-magenta transition' type="password" name='password-login' id='password-login' placeholder={resources.auth.password} required />
                                </div>
                                <div className='my-6 text-center text-gray-700'>
                                    <p>{resources.auth.newuser}? <button type='button' onClick={() => setSelectedIdx(1)} className='font-sans font-semibold text-magenta'>{resources.auth.signup}</button> </p>
                                </div>
                                <div className='w-full my-6'>
                                    <SolidBtn type='submit' className='w-full text-center justify-center'>{resources.auth.signin}</SolidBtn>
                                </div>
                            </form>
                        </Tab.Panel>
                        <Tab.Panel className={'outline-none'}>
                            <form onSubmit={onRegisterSubmit}>
                                <div className='flex flex-col w-full mb-4'>
                                    <label className='text-sm text-slate-500 mb-2' htmlFor="name-register">{resources.auth.name}<span className='text-red-500'>*</span></label>
                                    <input value={registerName} onChange={e => setRegisterName(e.target.value)} className='text-slate-600 font-semibold px-3 py-2.5 outline-none border-2 border-slate-300 rounded-md placeholder:font-medium hover:border-slate-500 focus:border-magenta transition' type="text" name='name-register' id='name-register' placeholder={resources.auth.name} required />
                                </div>
                                <div className='flex flex-col w-full mb-4'>
                                    <label className='text-sm text-slate-500 mb-2' htmlFor="phone-register">{resources.auth.phone}<span className='text-red-500'>*</span></label>
                                    <PatternFormat
                                        value={registerPhone}
                                        type="tel"
                                        format="+998(##)### ## ##"
                                        mask="_"
                                        onValueChange={value => setRegisterPhone(value.value)}
                                        required
                                        className='text-slate-600 font-semibold px-3 py-2.5 outline-none border-2 border-slate-300 rounded-md placeholder:font-medium hover:border-slate-500 focus:border-magenta transition'
                                        name='phone-register'
                                        id='phone-register'
                                        placeholder={resources.auth.phone}
                                    />
                                </div>
                                <div className='flex flex-col w-full mb-4'>
                                    <label className='text-sm text-slate-500 mb-2' htmlFor="password-register">{resources.auth.password}<span className='text-red-500'>*</span></label>
                                    <input value={registerPassword} onChange={e => setRegisterPassword(e.target.value)} className='text-slate-600 font-semibold px-3 py-2.5 outline-none border-2 border-slate-300 rounded-md placeholder:font-medium hover:border-slate-500 focus:border-magenta transition' type="password" name='password-register' id='password-register' placeholder={resources.auth.password} required />
                                </div>
                                <div className='flex mt-6'>
                                    <Checkbox onChange={() => setTermsPolicy(!termsPolicy)} checked={termsPolicy} required={true}>{resources.auth.terms1} <span className='bg-gradient-to-r from-magenta to-blue text-transparent bg-clip-text font-medium'>ArtVibe</span> {resources.auth.terms2}</Checkbox>
                                </div>
                                <div className='w-full mb-6 mt-6'>
                                    <SolidBtn type='submit' className='w-full text-center justify-center'>{resources.auth.signup}</SolidBtn>
                                </div>
                            </form>
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </div>
        </div>
    )
}
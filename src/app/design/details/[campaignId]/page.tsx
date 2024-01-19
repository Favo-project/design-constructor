'use client'
import Loader from '@/components/Loader'
import { authAtom, campaignAtom, userAtom } from '@/constants'
import axios from 'axios'
import { useAtom } from 'jotai'
import { useParams, useRouter } from 'next/navigation'
import { useLayoutEffect, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'

export default function Details() {
    const router = useRouter()
    const { campaignId } = useParams()
    const [loading, setLoading] = useState(true)

    const [auth, setAuth] = useAtom(authAtom)
    const [user, setUser] = useAtom(userAtom)
    const [campaign, setCampaign] = useAtom(campaignAtom)

    const [addButton, setAddButton] = useState(false)
    const [newTag, setNewTag] = useState('')

    const [tags, setTags] = useState([
        {
            name: 'Advocacy',
            relatedTags: [
                {
                    name: 'Advocacy 2',
                },
                {
                    name: 'Animal Rescue 2'
                },
                {
                    name: 'Animals 2'
                },
                {
                    name: 'Art & Illustrations 2'
                },
                {
                    name: 'Awareness 2'
                },
                {
                    name: 'Business 2'
                },
            ]
        },
        {
            name: 'Animal Rescue'
        },
        {
            name: 'Animals'
        },
        {
            name: 'Art & Illustrations'
        },
        {
            name: 'Awareness'
        },
        {
            name: 'Business'
        },
        {
            name: 'Child Adoption'
        },
        {
            name: 'Conservation'
        },
        {
            name: 'Creator'
        },
        {
            name: 'Entertainment'
        },
        {
            name: 'Event'
        },
        {
            name: 'Fundraiser'
        },
        {
            name: 'GivingTuesday'
        },
        {
            name: 'Hobby'
        },
        {
            name: 'Holiday'
        },
        {
            name: 'Medical'
        },
        {
            name: 'Mission Trip'
        },
        {
            name: 'Nature'
        },
        {
            name: 'Nonprofit'
        },
    ])
    const [additionalTags, setAdditionalTags] = useState([])

    useLayoutEffect(() => {
        const fetch = async () => {
            setLoading(true)
            try {
                const { data: response } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/campaigns/${campaignId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${auth || localStorage.getItem('user_at')}`
                    }
                })

                let copyAdditionalTags = [...additionalTags]

                response.data.tags.forEach((tag) => {
                    if (tag.relatedTags) {
                        const relatedTag = tags.find(t => t.name === tag.name)
                        copyAdditionalTags.push(...relatedTag.relatedTags)
                    }
                    else if (tag.customTag) {
                        copyAdditionalTags.push(tag)
                    }
                })

                setAdditionalTags([...copyAdditionalTags])
                setCampaign({ ...campaignAtom.init, ...response.data })
                setLoading(false)
            }
            catch (e) {
                if (e?.response?.status === 403) {
                    router.push('/')
                    setAuth('')
                    setUser({
                        name: null,
                        phone: null,
                        loaded: false
                    })
                    localStorage.removeItem('user_at')
                }
                setLoading(false)
            }
        }

        fetch()
    }, [])

    const onToggleSelect = (tag) => {
        const selectedTag = campaign.tags.find((t) => t.name === tag.name)

        if (selectedTag) {
            let filteredTags = campaign.tags.filter(t => t.name !== tag.name)
            filteredTags = filteredTags.filter(t => t.relatedTo !== tag.name)
            if (tag.relatedTags) {
                const fAdditionalTags = additionalTags.filter((t) => t.relatedTo !== tag.name)
                setAdditionalTags([...fAdditionalTags])
            }
            setCampaign({ ...campaign, tags: [...filteredTags] })
        }
        else {
            const newTag = {
                ...tag
            }
            if (tag.relatedTags?.length) {
                newTag.relatedTags = true

                const newAdditionalTags = tag.relatedTags.map(t => {
                    return { ...t, relatedTo: tag.name }
                })
                setAdditionalTags([...additionalTags, ...newAdditionalTags])
            }

            setCampaign({ ...campaign, tags: [...campaign.tags, newTag] })
        }
    }

    const onAddTag = async (e) => {
        e.preventDefault()
        const tag = { name: newTag, customTag: true }
        setAdditionalTags([...additionalTags, tag])
        setTimeout(() => {
            setCampaign({ ...campaign, tags: [...campaign.tags, tag] })
        }, 500)
        setNewTag('')
        setAddButton(false)
    }

    const isSelected = (name) => {
        const selectedTag = campaign.tags.find(t => t.name === name)

        return selectedTag ? true : false
    }

    return (
        loading ? (
            <Loader />
        ) : (
            <div className="container m-auto w-full max-w-7xl pt-12 px-6" >
                <h2 className="text-4xl font-sans font-semibold text-slate-700 mt-8 mb-6">
                    What’s the best way to describe your campaign?
                </h2>

                <div>
                    <div className='flex flex-wrap gap-3'>
                        {
                            tags.map((tag, index) => (
                                <button onClick={() => onToggleSelect(tag)} className={`${isSelected(tag.name) ? 'bg-slate-600 border-slate-600 text-white' : 'border-slate-300 text-slate-600'} text-md px-4 py-2 rounded-full border-2 hover:border-slate-600 transition`} key={index}>{tag.name}</button>
                            ))
                        }
                    </div>
                </div>

                <div className='mt-10'>
                    <h3 className='font-medium text-base text-gray-600 mb-6'>SELECT ADDITIONAL TAGS (OPTIONAL)</h3>
                    <div className='flex flex-wrap gap-3'>
                        {
                            additionalTags.map((tag, index) => (
                                <button onClick={() => onToggleSelect(tag)} className={`${isSelected(tag.name) ? 'bg-slate-600 border-slate-600 text-white' : 'border-slate-300 text-slate-600'} text-md px-4 py-2 rounded-full border-2 hover:border-slate-600 transition`} key={index}>{tag.name}</button>
                            ))
                        }
                    </div>
                    <div className='mt-6'>
                        <button type='button' onClick={() => setAddButton(true)}>
                            {
                                addButton ? (
                                    <form autoFocus onSubmit={onAddTag} className='flex'>
                                        <input onChange={(e) => setNewTag(e.target.value)} value={newTag} className='border-2 rounded-md text-gray-600 font-medium outline-none px-4 py-2 border-slate-300 bg-white' autoFocus type="text" />
                                        <button type='submit' className='text-lg rounded-md text-white h-full px-4 py-3 flex justify-center items-center bg-indigo-600'>
                                            <AiOutlinePlus />
                                        </button>
                                    </form>
                                ) : <span className='flex border-2 rounded-full px-4 py-2 text-gray-600 border-slate-200 bg-slate-200 hover:bg-slate-100 hover:border-slate-400'>Add your own</span>
                            }
                        </button>
                    </div>
                </div>
            </div >
        )
    )
}
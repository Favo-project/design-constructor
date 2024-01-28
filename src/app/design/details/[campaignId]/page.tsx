'use client'
import { campaignAtom, isSavedAtom } from '@/constants'
import { useAtom } from 'jotai'
import { useParams, useRouter } from 'next/navigation'
import { useLayoutEffect, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'

export default function Details() {
    const { campaignId } = useParams()
    const [campaign, setCampaign] = useAtom(campaignAtom)
    const [isSaved] = useAtom(isSavedAtom)

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
        let copyAdditionalTags = [...additionalTags]

        campaign.tags.forEach((tag) => {
            if (tag.relatedTags) {
                const relatedTag = tags.find(t => t.name === tag.name)
                copyAdditionalTags.push(...relatedTag.relatedTags)
            }
            else if (tag.customTag) {
                copyAdditionalTags.push(tag)
            }
        })

        setAdditionalTags([...copyAdditionalTags])
    }, [campaignId, tags])

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

                const filterAdditionals = tag.relatedTags.filter(t => {
                    const addTag = additionalTags.find(tag => tag.name === t.name)
                    if (addTag) return false
                    return true
                })

                const newAdditionalTags = filterAdditionals.map(t => {
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
        <div className="container m-auto w-full max-w-7xl py-12 lg:px-6 px-4" >
            <h2 className="text-4xl font-sans font-semibold text-slate-700 mt-8 mb-6">
                What’s the best way to describe your campaign?
            </h2>

            <div>
                <div className='flex flex-wrap gap-3'>
                    {
                        tags.map((tag, index) => (
                            <button disabled={isSaved} onClick={() => onToggleSelect(tag)} className={`${isSelected(tag.name) ? 'bg-slate-600 border-slate-600 text-white' : 'border-slate-300 text-slate-600'} text-md px-4 py-2 rounded-full border-2 hover:border-slate-600 transition disabled:opacity-70 disabled:hover:border-slate-300`} key={index}>{tag.name}</button>
                        ))
                    }
                </div>
            </div>

            <div className='mt-10'>
                <h3 className='font-medium text-base text-gray-600 mb-6'>SELECT ADDITIONAL TAGS (OPTIONAL)</h3>
                <div className='flex flex-wrap gap-3'>
                    {
                        additionalTags.map((tag, index) => (
                            <button disabled={isSaved} onClick={() => onToggleSelect(tag)} className={`${isSelected(tag.name) ? 'bg-slate-600 border-slate-600 text-white' : 'border-slate-300 text-slate-600'} text-md px-4 py-2 rounded-full border-2 hover:border-slate-600 transition disabled:opacity-70 disabled:hover:border-slate-300`} key={index}>{tag.name}</button>
                        ))
                    }
                </div>
                <div className='mt-6'>
                    <button type='button' onClick={() => setAddButton(true)}>
                        {
                            addButton ? (
                                <form autoFocus onSubmit={onAddTag} className='flex'>
                                    <input onChange={(e) => setNewTag(e.target.value)} value={newTag} className='border-2 rounded-md text-gray-600 font-medium outline-none px-4 py-2 border-slate-300 bg-white' autoFocus type="text" />
                                    <button type='submit' className='text-lg rounded-md text-white h-full px-4 py-3 flex justify-center items-center bg-blue'>
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
}
'use client'
import { useState } from 'react'

export default function Details() {
    const [addButton, setAddButton] = useState(false)

    const [tags, setTags] = useState([
        {
            name: 'Advocacy',
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

    const [additionalTags, setAdditionalTags] = useState([
        {
            name: 'Advocacy',
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
    ])

    const onToggle = (name) => {
        const tagsClone = tags.map((tag) => tag.name === name ? { name, selected: true } : tag)

        setTags(tagsClone)

    }

    return <div className="container m-auto">
        <h2 className="text-4xl font-sans font-semibold text-slate-700 mt-8 mb-6">
            What’s the best way to describe your campaign?
        </h2>

        <div>
            <div className='flex flex-wrap gap-3'>
                {
                    tags.map((tag, index) => (
                        <button onClick={() => onToggle(tag)} className={`text-md px-4 py-2 rounded-full border-2 border-slate-300 hover:border-slate-600 transition focus:border-slate-600 focus:bg-slate-600 focus:text-white`} key={index}>{tag.name}</button>
                    ))
                }
            </div>
        </div>

        <div className='mt-10'>
            <h3 className='font-medium text-base text-gray-600 mb-6'>SELECT ADDITIONAL TAGS (OPTIONAL)</h3>
            <div className='flex flex-wrap gap-3'>
                {
                    additionalTags.map((tag, index) => (
                        <button onClick={() => onToggle(tag)} className={`text-md px-4 py-2 rounded-full border-2 border-slate-300 hover:border-slate-600 transition focus:border-slate-600 focus:bg-slate-600 focus:text-white`} key={index}>{tag.name}</button>
                    ))
                }
            </div>
            <div className='mt-6'>
                <button onClick={() => setAddButton(true)}>
                    {
                        addButton ? (
                            <input className='border-2 rounded-md text-gray-600 font-medium outline-none px-4 py-2 border-slate-300 bg-white' autoFocus onBlur={() => setAddButton(false)} type="text" />
                        ) : <span className='flex border-2 rounded-full px-4 py-2 text-gray-600 border-slate-200 bg-slate-200 hover:bg-slate-100 hover:border-slate-400'>Add your own</span>
                    }
                </button>
            </div>
        </div>
    </div>
}
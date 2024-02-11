'use client'
import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { useParams, usePathname } from 'next/navigation';
import Image from 'next/image';
import { EnIco, RuIco, UzIco } from '@/assets';
import { Locale } from '@/i18n.config';
import Link from 'next/link';
import { MdLanguage } from 'react-icons/md';

interface ILanguage {
    name: string, locale: Locale, icon: React.ReactNode
}

const langs: ILanguage[] = [
    {
        name: 'Eng',
        locale: 'en',
        icon: <Image src={EnIco} width={20} height={20} alt='lang-icon' />
    },
    {
        name: 'Uzb',
        locale: 'uz',
        icon: <Image src={UzIco} width={20} height={20} alt='lang-icon' />
    },
    {
        name: 'Rus',
        locale: 'ru',
        icon: <Image src={RuIco} width={20} height={20} alt='lang-icon' />
    },
]

export default function LocaleSwitcher({ theme = 'dark' }: { theme?: 'light' | 'dark' }) {
    const { lang } = useParams();
    const pathname = usePathname();
    const [selected, setSelected] = useState(() => langs.find(l => l.locale === lang) || langs[0])

    const redirectedPathName = (locale: Locale) => {
        if (!pathname) return "/";
        const segments = pathname.split("/");
        segments[1] = locale;
        return segments.join("/");
    };

    const onChangeLang = (locale) => {
        try {
            localStorage.setItem('selectLocale', locale)
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <Listbox value={selected} onChange={setSelected}>
                <div className="relative mt-1">
                    <Listbox.Button className="relative w-full cursor-pointer flex items-center px-2 py-2 hover:border-magenta rounded-md border transition-all">
                        <span className={`block truncate uppercase text-sm font-sans font-medium ${theme === 'dark' ?
                            'bg-gradient-to-r bg-clip-text from-magenta to-blue text-transparent' : 'text-white'}`}>{selected.locale}</span>
                        <span className="sm:block hidden pl-2">
                            <MdLanguage
                                className={`h-5 w-5 ${theme === 'dark' ? 'text-blue' : 'text-white'}`}
                                aria-hidden="true"
                            />
                        </span>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="absolute mt-1 w-28 -translate-x-1/2 sm:translate-x-0 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                            {langs.map((lang, personIdx) => (
                                <Listbox.Option
                                    key={personIdx}
                                    className={({ active }) =>
                                        `relative select-none ${active ? 'bg-magenta/10 text-dark font-medium' : 'text-zinc-600'
                                        } flex items-start`
                                    }
                                    value={lang}
                                >
                                    {({ selected }) => (
                                        <Link className='flex w-full items-center gap-2 px-3 py-2 ' onClick={() => onChangeLang(lang.locale)} href={redirectedPathName(lang.locale)}>
                                            <div className='block w-5 h-5'>
                                                {lang.icon}
                                            </div>
                                            <span
                                                className={`block ${selected ? 'font-medium' : 'font-normal'
                                                    }`}
                                            >
                                                {lang.name}
                                            </span>
                                            {selected ? (
                                                <span className="flex items-center text-magenta ml-auto">
                                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                </span>
                                            ) : null}
                                        </Link>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    )
};

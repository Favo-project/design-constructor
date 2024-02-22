"use client";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Dialog } from '@headlessui/react'
import { AiOutlineHome } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";
import { MdLogout, MdCheck } from "react-icons/md";
import { useEffect, useState } from "react";
import Link from "@/components/Link";
import AuthModal from "@/components/AuthModal";
import { useAtom } from "jotai";
import { authAtom, campaignAtom, campaignStart, designAtom, isSavedAtom, toastAtom, userAtom } from "@/constants";
import { useRouter, useParams, usePathname } from "next/navigation";
import { campaignTools, designNavigation, launchedNavigation } from "@/actions/campaignTools";
import SaveButton from "./SaveButton";
import NextButton from "./NextButton";
import SaveDialog from "./SaveDialog";
import LaunchDialog from "./LaunchDialog";
import Image from "next/image";
import NavbarArrow from "./NavbarArrow";
import Toasts from "@/components/Toasts";
import { LogoMain } from "@/assets";
import UserDropdown from "@/components/UserDropdown";
import { EnIco, RuIco, UzIco } from '@/assets'
import { Locale } from '@/i18n.config'
import { RadioGroup } from '@headlessui/react'
import { revalidateTag } from "next/cache";

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

export default function DesignNavbar({ resources }) {
  const { lang } = useParams();
  const [selectedLang, setSelectedLang] = useState(() => langs.find(l => l.locale === lang) || langs[0])
  const [toast, setToast] = useAtom(toastAtom)
  const router = useRouter()
  const pathname = usePathname()
  const { campaignId } = useParams()
  const [saveDialog, setSaveDialog] = useState(false)
  const [launchDialog, setLaunchDialog] = useState(false)

  const [loading, setLoading] = useState(false)
  const [isSaved, setIsSaved] = useAtom(isSavedAtom)

  const [user, setUser] = useAtom(userAtom)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [auth, setAuth] = useAtom(authAtom)

  const [campaign, setCampaign] = useAtom(campaignAtom)
  const [campaignBlank, setCampaignBlank] = useAtom(campaignStart)
  const [savedDesign, setSavedDesign] = useAtom(designAtom)

  const onLogout = () => {
    setMobileMenuOpen(false)
    try {
      setAuth('')
      setUser({
        ...userAtom.init
      })
      localStorage.removeItem('user_at')
      router.push('/')
    }
    catch (e) {
      router.push('/')
    }
  }

  const onSave = async () => {
    try {
      if (campaignId) {
        setLoading(true)
        const response = await campaignTools.saveCampaign(pathname, auth, campaignId, campaign)

        setIsSaved(true)
        if (response.updated) {
          setSavedDesign({ ...response.data.design })
          setCampaign({ ...campaign, products: [...response?.data?.products] })
        }

        setTimeout(() => {
          setIsSaved(false)
        }, 3000)

        setLoading(false)
        return response.data
      }
      else {
        setSaveDialog(true)
        const response = await campaignTools.initCampaign(auth, campaignBlank)
        setCampaignBlank({
          ...campaignStart.init,
          products: [...campaignBlank.products]
        })
        setCampaign({ ...campaign, ...response.data })
        setSavedDesign({ ...response.data.design })
        router.push(`/design/start/${response?.data?._id}`)
        return response.data
      }
    }
    catch (err) {
      setSaveDialog(false)
      if (err?.response?.status === 403) {
        router.push('/')
        setAuth('')
        setUser({
          ...userAtom.init
        })
        localStorage.removeItem('user_at')
      }
      else {
        console.log(err?.message);
        setToast({ type: "warning", message: err?.message || 'Xatolik yuz berdi, qayta uruning' })
      }
    }
  }

  const onNext = async () => {
    try {
      const data = await onSave()
      if (campaignId) {
        const response = await campaignTools.changeLevel(auth, pathname, campaignId, campaign)
        setCampaign({ ...campaign, products: [...data?.products], campaignLevel: response?.data?.campaignLevel })
      }
      else {
        const response = await campaignTools.changeLevel(auth, pathname, data?._id, data)
        setCampaign({ ...campaign, ...data, campaignLevel: response?.data?.campaignLevel })
      }
    }
    catch (err) {
      if (err?.response?.status === 403) {
        router.push('/')
        setAuth('')
        setUser({
          ...userAtom.init
        })
        localStorage.removeItem('user_at')
        setSaveDialog(false)
      }
      else {
        console.log(err);
        setToast({ type: "warning", message: err?.message || 'Xatolik yuz berdi, qayta uruning' })
      }
    }
  }

  const onLaunch = async () => {
    try {
      await onSave()
      setLaunchDialog(true)
      setToast({ type: "success", message: `Dizayn  - "${campaign.title}" yakullandi` })
      const response = await campaignTools.changeLevel(auth, pathname, campaignId, campaign)
      const launchData = await campaignTools.launchCampaign(auth, campaignId)
      setCampaign({ ...campaign, campaignLevel: response?.data?.campaignLevel, status: launchData?.data?.status })
      // revalidateTag('campaign-public')
    }
    catch (err) {
      if (err?.response?.status === 403) {
        router.push('/')
        setAuth('')
        setUser({
          ...userAtom.init
        })
        localStorage.removeItem('user_at')
      }
      else {
        setToast({ type: "warning", message: err?.message || 'Xatolik yuz berdi, qayta uruning' })
      }
      setSaveDialog(false)
      setLaunchDialog(false)
    }
  }

  useEffect(() => {
    if (saveDialog && campaignId) {
      setSaveDialog(false)
    }
  }, [saveDialog, campaignId])

  function closeLaunchModal() {
    setLaunchDialog(false)
  }

  const isActive = (index) => {
    const href = campaign.status === 'Launched' ? launchedNavigation[index].href : designNavigation[index].href
    return pathname.indexOf(href) !== -1
  }

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
    <>
      <Toasts />
      <SaveDialog resources={resources} isOpen={saveDialog} />
      <LaunchDialog resources={resources} isOpen={launchDialog} closeModal={closeLaunchModal} />

      <nav
        className="flex z-50 fixed top-0 left-0 right-0 bg-white items-center justify-between p-4 lg:px-8 lg:py-0 shadow-sm"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <div className="lg:hidden">
            {
              user.loaded ? (
                <Link href={'/'} className="block scale-75 md:scale-100">
                  <Image src={LogoMain} alt="artvibe-logo" width={60} height={38} />
                </Link>
              ) : (
                <AuthModal resources={resources}>
                  <div className="font-semibold leading-6 text-dark hover:text-transparent bg-gradient-to-r from-magenta to-blue bg-clip-text transition-all">
                    {resources.designnavbar.login}
                  </div>
                </AuthModal>
              )
            }
          </div>
          <div className="hidden lg:block">
            <Link href={'/'} className="block scale-75 md:scale-100">
              <Image src={LogoMain} alt="artvibe-logo" width={60} height={38} />
            </Link>
          </div>
        </div>
        <div className="order-3 flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex items-center">
          {campaignTools.navigation(campaign, campaignId).map((link, index) => (
            <div key={index} className="flex items-center">
              {isActive(index) ? (
                <span className="text-white bg-magenta rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-1">
                  {index + 1}
                </span>
              ) : (
                <span className="text-slate-400 bg-white rounded-full w-6 h-6 border-2 border-slate-400 text-sm flex items-center justify-center font-semibold mr-1">
                  {index + 1}
                </span>
              )}
              {
                link.passed ? (
                  <div className="flex items-center">
                    <Link
                      href={link.href}
                      className="text-sm py-6 font-semibold leading-6 text-slate-700 hover:text-magenta transition-all"
                    >
                      {resources.designnavbar[link.name]}
                    </Link>
                    <span className="ml-1 text-green-600 text-lg">
                      <MdCheck />
                    </span>
                  </div>
                ) : (
                  <button className="text-sm py-6 font-semibold leading-6 text-slate-700 cursor-default">{resources.designnavbar[link.name]}</button>
                )
              }
              {campaignTools.navigation(campaign, campaignId).length !== index + 1 && <NavbarArrow />}
            </div>
          ))}
        </div>
        <div className="flex lg:flex-1 lg:justify-end gap-1 xl:gap-3 items-center">
          <SaveButton resources={resources} loaded={user.loaded} onSave={onSave} loading={loading} isSaved={isSaved} />
          <NextButton resources={resources} loaded={user.loaded} onNext={onNext} onLaunch={onLaunch} loading={loading} campaign={campaignId ? campaign : campaignBlank} onSave={onSave} isSaved={isSaved} />

          <div className="hidden lg:block">
            {
              user.loaded ? (
                <div>
                  <UserDropdown resources={resources} />
                </div>
              ) : (
                <AuthModal resources={resources}>
                  <div className="font-semibold leading-6 text-dark hover:text-transparent bg-gradient-to-r from-magenta to-blue bg-clip-text transition-all">
                    {resources.designnavbar.login}
                  </div>
                </AuthModal>
              )
            }
          </div>

        </div >
      </nav >
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50 bg-black bg-opacity-25" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-4 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">{resources.designnavbar.yourcampaign}</span>
              <Link href={'/'} className="block scale-75 md:scale-100">
                <Image src={LogoMain} alt="artvibe-logo" width={60} height={38} />
              </Link>
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {campaignTools.navigation(campaign, campaignId).map((link, index) => (
                  <div key={index} className="flex items-center">
                    {isActive(index) ? (
                      <span className="text-white bg-magenta rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-1">
                        {index + 1}
                      </span>
                    ) : (
                      <span className="text-slate-400 bg-white rounded-full w-6 h-6 border-2 border-slate-400 text-sm flex items-center justify-center font-semibold mr-1">
                        {index + 1}
                      </span>
                    )}
                    {
                      link.passed ? (
                        <div className="flex items-center">
                          <Link
                            href={link.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-sm py-4 font-semibold leading-6 text-slate-700 hover:text-transparent hover:bg-gradient-to-r from-magenta to-blue hover:bg-clip-text transition-all"
                          >
                            {resources.designnavbar[link.name]}
                          </Link>
                          <span className="ml-1 text-green-600 text-lg">
                            <MdCheck />
                          </span>
                        </div>
                      ) : (
                        <button className="text-sm py-4 font-semibold leading-6 text-slate-700 cursor-default">{resources.designnavbar[link.name]}</button>
                      )
                    }
                  </div>
                ))}
              </div>
              <div className="py-6">
                {
                  user.loaded ? (
                    <div>
                      <h3 className="flex flex-wrap py-3 tracking-tight text-slate-700">{resources.designnavbar.welcome}, <strong className='ml-1 block text-transparent font-medium bg-gradient-to-r from-magenta to-blue bg-clip-text'>{user.name}!</strong></h3>

                      <div className='py-1 px-2'>
                        <RadioGroup value={selectedLang} onChange={setSelectedLang}>
                          <RadioGroup.Label className="sr-only">Select language</RadioGroup.Label>
                          <div className="flex items-center gap-2">
                            {langs.map((lang) => (
                              <RadioGroup.Option
                                key={lang.name}
                                value={lang}
                                className={({ checked }) =>
                                  `${checked ? 'bg-blue' : 'bg-white border border-slate-300'} relative flex cursor-pointer rounded-md outline-none shadow-md`
                                }
                              >
                                {({ checked }) => (
                                  <Link onClick={() => onChangeLang(lang.locale)} href={redirectedPathName(lang.locale)} className="flex items-center gap-1 px-1.5 py-1.5 rounded-lg cursor-pointer">
                                    <RadioGroup.Label className={'cursor-pointer'}>
                                      {lang.icon}
                                    </RadioGroup.Label>
                                    <RadioGroup.Description
                                      as="span"
                                      className={`inline font-medium ${checked ? 'text-white' : 'text-gray-700'
                                        } text-sm`}
                                    >
                                      {lang.name}
                                    </RadioGroup.Description>
                                  </Link>
                                )}
                              </RadioGroup.Option>
                            ))}
                          </div>
                        </RadioGroup>
                      </div>
                      <Link onClick={() => setMobileMenuOpen(false)} className="flex items-center mb-2 py-2.5 text-dark hover:text-magenta transition-all font-sans font-semibold hover:bg-slate-100" href={'/dashboard/overview'}>
                        <span className="text-2xl mr-2">
                          <AiOutlineHome />
                        </span> {resources.designnavbar.dashboard}
                      </Link>
                      <Link onClick={() => setMobileMenuOpen(false)} className="flex items-center mb-2 py-2.5 text-dark hover:text-magenta transition-all font-sans font-semibold hover:bg-slate-100" href={'/dashboard/account'}>
                        <span className="text-2xl mr-2">
                          <IoSettingsOutline />
                        </span> {resources.designnavbar.account}
                      </Link>
                      <button onClick={onLogout} className="w-full flex items-center mb-2 py-2.5 text-dark hover:text-magenta transition-all font-sans font-semibold hover:bg-slate-100">
                        <span className="text-2xl mr-2">
                          <MdLogout />
                        </span> {resources.designnavbar.logout}
                      </button>
                    </div>
                  ) : (
                    <AuthModal resources={resources}>
                      <div className="font-semibold leading-6 text-dark hover:text-transparent bg-gradient-to-r from-magenta to-blue bg-clip-text transition-all">
                        {resources.designnavbar.login}
                      </div>
                    </AuthModal>
                  )
                }
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </>
  );
}

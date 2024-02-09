'use client'
import Image from "next/image";
import { heroImg1, heroImg2, heroImg3, heroImg4, heroImg5 } from "./assets";
import { GoSearch } from "react-icons/go";
import { userAtom } from "@/constants";
import { useAtom } from "jotai";
import OutlineBtn from "@/components/form-elements/OutlineBtn";
import SolidBtn from "@/components/form-elements/SolidBtn";

export default function Hero({ resources }) {
  const [user] = useAtom(userAtom)

  return (
    <div className="bg-white pt-[70px]">
      <div className="relative isolate px-4 sm:px-6 lg:pt-14 pt-8 lg:px-5">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>

        <div className="container m-auto max-w-7xl flex lg:flex-nowrap flex-wrap gap-10">
          <div className="py-8 sm:py-12 lg:py-20">
            <h1 className="text-[32px] sm:text-[36px] md:text-[48px] max-w-lg font-semibold leading-tight font-sans text-gray-800 ">
              {resources.home.hero.title}
            </h1>
            <div className="mt-10 flex items-center gap-x-4 mb-12">
              {
                user.loaded ? (
                  <>
                    <SolidBtn
                      href="/design/start"
                    >
                      {resources.home.hero.startbtn}
                    </SolidBtn>
                    <OutlineBtn
                      href="/dashboard/overview"
                    >
                      {resources.home.hero.dashboard}
                    </OutlineBtn>
                  </>
                ) : (
                  <SolidBtn
                    href="/design/start"
                  >
                    {resources.home.hero.startbtn}
                  </SolidBtn>
                )
              }

            </div>
            <form className="relative shadow-[2px_2px_14px_0px_#bdc8d9] border-slate-200 focus-within:hover:shadow-none hover:shadow-none focus-within:shadow-none rounded-xl max-w-md transition-all">
              <input className="px-4 py-3.5 rounded-xl w-full hover:shadow-[inset_0_0_0_2px_#bdc8d9] outline-none hover:focus-within:shadow-[inset_0_0_0_2px_#474E68] focus-within:shadow-[inset_0_0_0_2px_#474E68] transition-all duration-300 font-semibold text-slate-600" type="text" placeholder={resources.home.hero.search} />
              <button type="submit" className="absolute top-[50%] translate-y-[-50%] right-0 text-2xl py-3.5 px-4">
                <GoSearch />
              </button>
            </form>
          </div>
          <div className="items-center flex-wrap justify-center gap-4 xl:gap-8 hidden md:flex">
            <div className="flex flex-col lg:gap-6 gap-3">
              <div className="h-[150px] w-[150px] lg:h-[200px] lg:w-[200px] rounded-[40px] overflow-hidden shadow-xl">
                <Image className="w-[100%] h-[100%] object-cover hover:scale-125 transition-all duration-500" src={heroImg5} alt="hero-image" />
              </div>
              <div className="h-max w-[150px] lg:w-[200px] rounded-[40px] overflow-hidden shadow-xl">
                <Image className="w-[100%] h-[100%] object-cover hover:scale-125 transition-all duration-500" src={heroImg1} alt="hero-image" width={180} height={100} />
              </div>
            </div>
            <div className="flex flex-col gap-3 lg:gap-6">
              <div className="h-max w-[150px] lg:w-[200px] rounded-[40px] overflow-hidden shadow-xl">
                <Image className="w-[100%] h-[100%] object-cover hover:scale-125 transition-all duration-500" src={heroImg2} alt="hero-image" width={180} height={100} />
              </div>
              <div className="h-[150px] w-[150px] lg:h-[200px] lg:w-[200px] rounded-[40px] overflow-hidden shadow-xl">
                <Image className="w-[100%] h-[100%] object-cover hover:scale-125 transition-all duration-500" src={heroImg4} alt="hero-image" width={180} height={100} />
              </div>
            </div>
            <div className="h-max w-[150px] lg:w-[200px] rounded-[40px] overflow-hidden shadow-xl hidden xl:block">
              <Image className="w-[100%] h-[100%] object-cover hover:scale-125 transition-all duration-500" src={heroImg3} alt="hero-image" width={180} height={400} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

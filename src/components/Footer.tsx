import Link from "@/components/Link";
import { FaInstagram, FaTiktok } from "react-icons/fa6";
import { FaTelegramPlane, FaFacebook } from "react-icons/fa";
import StartBtn from "./StartBtn";
import Image from "next/image";
import { LogoMain } from "@/assets";

export default function Footer({ resources }) {
  return (
    <div className="py-12 bg-dark">
      <footer className="container mx-auto max-w-7xl px-4">
        <ul className="grid lg:grid-cols-4 grid-cols-2 gap-3 mx-2 my-6">
          <div className="mb-6">
            <Link href={'/'} className="flex items-center justify-center p-2 mb-6 rounded-full bg-white bg-opacity-90 w-20 h-20 shadow-md">
              <Image src={LogoMain} alt="artvibe-logo" width={60} height={38} />
            </Link>
            <p className="text-sm max-w-[190px] text-slate-300 mb-10 font-sans">{resources.footer.subtitle}.</p>
            <StartBtn resources={resources} href="/dashboard/overview" context={resources.footer.mydashboard} contextOut={resources.footer.start} />
          </div>
          <ul className="flex flex-col gap-2">
            <li>
              <h4 className="font-bold text-slate-300 tracking-wide font-sans">{resources.footer.company}</h4>
            </li>
            <li>
              <Link className="text-slate-100 font-sans hover:text-slate-400 transition" href={"/about"}>{resources.footer.about}</Link>
            </li>
            <li>
              <Link className="text-slate-100 font-sans hover:text-slate-400 transition" href={"/help"}>{resources.footer.help}</Link>
            </li>
            <li>
              <Link className="text-slate-100 font-sans hover:text-slate-400 transition" href={"/contact"}>{resources.footer.contact}</Link>
            </li>
          </ul>
          <ul className="flex flex-col gap-2">
            <li>
              <h4 className="font-bold text-slate-300 tracking-wide font-sans">{resources.footer.creator}</h4>
            </li>
            <li>
              <Link className="text-slate-100 font-sans hover:text-slate-400 transition" href={"/online-stores"}>{resources.footer.store}</Link>
            </li>
            <li>
              <Link className="text-slate-100 font-sans hover:text-slate-400 transition" href={"/sell-online"}>{resources.footer.sell}</Link>
            </li>
          </ul>
          <ul className="flex flex-col gap-2">
            <li>
              <h4 className="font-bold text-slate-300 tracking-wide font-sans">{resources.footer.contacts}</h4>
            </li>
            <li>
              <h5 className="text-sm font-sans text-slate-300 mt-2">{resources.footer.callus}:</h5>
              <Link className="text-slate-100 font-sans hover:text-slate-400 transition" href={"tel:+998949434672"}>+998 94 943 46 72</Link>
            </li>
            <li>
              <h5 className="text-sm font-sans text-slate-300 mt-2">Telegram:</h5>
              <Link className="text-slate-100 font-sans hover:text-slate-400 transition" href={"https://t.me/artvibeuz"}>@artvibeuz</Link>
            </li>
          </ul>
        </ul>
        <div className="w-full lg:px-12 px-6 py-8 mt-16 flex justify-between items-center rounded-2xl bg-dark bg-opacity-80">
          <p className="text-slate-300 font-sans tracking-tight">© 2023 ArtVibe.uz</p>

          <div className="flex items-center md:gap-3 gap-1">
            <a className="p-2.5 rounded-full flex items-center justify-center text-2xl text-slate-100 hover:bg-gray-500 transition-all hover:shadow-md" target="_blank" href="https://instagram.com/artvibe">
              <FaInstagram />
            </a>
            <a className="p-2.5 rounded-full flex items-center justify-center text-2xl text-slate-100 hover:bg-gray-500 transition-all hover:shadow-md" target="_blank" href="https://t.me/artvibeuz">
              <FaTelegramPlane />
            </a>
            <a className="p-2.5 rounded-full flex items-center justify-center text-2xl text-slate-100 hover:bg-gray-500 transition-all hover:shadow-md" target="_blank" href="#">
              <FaFacebook />
            </a>
            <a className="p-2.5 rounded-full flex items-center justify-center text-2xl text-slate-100 hover:bg-gray-500 transition-all hover:shadow-md" target="_blank" href="#">
              <FaTiktok />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

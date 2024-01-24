import Link from "next/link";
import { FaInstagram, FaTiktok } from "react-icons/fa6";
import { FaTelegramPlane, FaFacebook } from "react-icons/fa";
import StartBtn from "./StartBtn";

export default function Footer() {
  return (
    <div className="py-12 bg-slate-600">
      <footer className="container mx-auto max-w-7xl px-4">
        <ul className="grid lg:grid-cols-4 grid-cols-2 gap-3 mx-2 my-6">
          <div className="mb-6">
            <Link href={'/'} className="logo p-2 mb-6 rounded-full bg-white bg-opacity-90 inline-block w-12 h-12 shadow-lg hover:shadow-indigo-600">
              <img
                width={32}
                height={32}
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt="logo"
              />
            </Link>
            <p className="text-sm max-w-[190px] text-slate-300 mb-10 font-sans">Where the world goes for premium custom shirts.</p>
            <StartBtn href="/dashboard/overview" context="My dashboard" contextOut="Get started" />
          </div>
          <ul className="flex flex-col gap-2">
            <li>
              <h4 className="font-bold text-slate-300 tracking-wide font-sans">Company</h4>
            </li>
            <li>
              <Link className="text-slate-100 font-sans hover:text-slate-400 transition" href={"/about"}>About us</Link>
            </li>
            <li>
              <Link className="text-slate-100 font-sans hover:text-slate-400 transition" href={"/help"}>Get help</Link>
            </li>
            <li>
              <Link className="text-slate-100 font-sans hover:text-slate-400 transition" href={"/contact"}>Contact</Link>
            </li>
          </ul>
          <ul className="flex flex-col gap-2">
            <li>
              <h4 className="font-bold text-slate-300 tracking-wide font-sans">For creators</h4>
            </li>
            <li>
              <Link className="text-slate-100 font-sans hover:text-slate-400 transition" href={"/online-stores"}>Create store</Link>
            </li>
            <li>
              <Link className="text-slate-100 font-sans hover:text-slate-400 transition" href={"/sell-online"}>Sell on ArtVibe</Link>
            </li>
          </ul>
          <ul className="flex flex-col gap-2">
            <li>
              <h4 className="font-bold text-slate-300 tracking-wide font-sans">Contacts</h4>
            </li>
            <li>
              <h5 className="text-sm font-sans text-slate-300 mt-2">Call us:</h5>
              <Link className="text-slate-100 font-sans hover:text-slate-400 transition" href={"tel:+998949434672"}>+998 94 943 46 72</Link>
            </li>
            <li>
              <h5 className="text-sm font-sans text-slate-300 mt-2">Telegram:</h5>
              <Link className="text-slate-100 font-sans hover:text-slate-400 transition" href={"https://t.me/artvibeuz"}>@artvibeuz</Link>
            </li>
          </ul>
        </ul>
        <div className="w-full lg:px-12 px-6 py-8 mt-16 flex justify-between items-center rounded-2xl bg-gray-700">
          <p className="text-slate-300 font-sans tracking-tight">© 2023 ArtVibe.uz</p>

          <div className="flex items-center gap-3">
            <a className="p-2.5 rounded-full flex items-center justify-center text-2xl text-slate-100 hover:bg-slate-600 transition-all hover:shadow-md" target="_blank" href="https://instagram.com/artvibe">
              <FaInstagram />
            </a>
            <a className="p-2.5 rounded-full flex items-center justify-center text-2xl text-slate-100 hover:bg-slate-600 transition-all hover:shadow-md" target="_blank" href="https://t.me/artvibeuz">
              <FaTelegramPlane />
            </a>
            <a className="p-2.5 rounded-full flex items-center justify-center text-2xl text-slate-100 hover:bg-slate-600 transition-all hover:shadow-md" target="_blank" href="#">
              <FaFacebook />
            </a>
            <a className="p-2.5 rounded-full flex items-center justify-center text-2xl text-slate-100 hover:bg-slate-600 transition-all hover:shadow-md" target="_blank" href="#">
              <FaTiktok />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

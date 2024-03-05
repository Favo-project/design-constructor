'use client'
import { useLayoutEffect, useState } from "react";
import About from "./components/About";
import Content from "./components/Content";
import Header from "./components/Header";
import Info from "./components/Info";
import Navbar from "./components/Navbar";
import { useAtom } from "jotai";
import { authAtom } from "@/constants";
import { getStore } from "@/api/store";

export default function Page({ resources }) {
    const [store, setStore] = useState(null)

    const [auth, setAuth] = useAtom(authAtom)

    useLayoutEffect(() => {
        const fetch = async () => {
            const data = await getStore(auth || localStorage.getItem('user_at'))

            console.log(data);
        }

        fetch()
    }, [])

    return (
        <div id="edit-store">
            <Navbar resources={resources} />
            <Header />

            <div className="container m-auto max-w-7xl p-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr]">
                    <div className="w-full h-full relative">
                        <Info />
                    </div>
                    <div>
                        <Content />
                    </div>
                </div>
            </div>

            <div className="py-20">
                <About />
            </div>
        </div>
    )
};

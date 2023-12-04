'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Slider() {
    const [slides] = useState([
        {
            name: 'Nonprofits',
            image: 'https://c.bonfireassets.com/images/stores/store-nonprofit.jpg',
            href: 'austin-society'
        },
        {
            name: 'Animal Rescues',
            image: 'https://c.bonfireassets.com/images/stores/store-creator.jpg',
            href: 'ok-boomer'
        },
        {
            name: 'Creators',
            image: 'https://c.bonfireassets.com/images/stores/store-nonprofit.jpg',
            href: 'austin-society'
        },
        {
            name: 'Schools',
            image: 'https://c.bonfireassets.com/images/stores/store-creator.jpg',
            href: 'ok-boomer'
        },
    ])

    return (
        <section className="overflow-hidden py-20 relative before:block before:-z-10 before:absolute before:bg-[#3d4853] before:top-0 before:left-0 before:right-0 before:h-[80%]">
            <div className="flex flex-col items-center">
                <h2 className='text-center text-slate-100 text-2xl font-sans font-semibold leading-normal tracking-wide max-w-[530px] mb-8'>We make it easy to create a professional looking store — no matter what your story is.</h2>
                <p className='text-center text-slate-300 font-sans tracking-wide max-w-[530px] mb-14'>Draw inspiration for your online store from the thousands of sellers who are already using stores on Bonfire to sell their custom apparel.</p>
            </div>
            <div className='px-32'>
                <Swiper navigation={true} modules={[Navigation]} style={{ overflow: 'unset' }} className="mySwiper">
                    {
                        slides.map((slide, index) => (
                            <SwiperSlide className='flex items-center justify-center' key={index}>
                                <Link href={slide.href} className='relative block max-w-[730px] m-auto w-full'>
                                    <div className='w-full rounded-lg overflow-hidden shadow-xl'>
                                        <span className='flex top-0 right-0 left-0 w-full h-[30px] bg-[#8693a6] items-center justify-center after:block after:w-[40%] after:h-[8px] after:bg-[rgba(189,202,216,.24)] after:rounded-[8px]' />
                                        <Image src={slide.image} className='w-full' alt='slide-image' width={730} height={500} />
                                    </div>
                                    <p className='text-slate-600 font-sans mt-4'>{slide.name}</p>
                                </Link>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </section>
    )
}
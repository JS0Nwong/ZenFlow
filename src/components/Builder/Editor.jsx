import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'

import Input from './Input'
import History from './History'
import BackToTop from './BackToTop'


export default function Editor() {
    const [isScrolledBeyond, setIsScrolledBeyond] = useState(false)

    window.onscroll = () => {
        if (window.scrollY > 300) {
            setIsScrolledBeyond(true)
        } else {
            setIsScrolledBeyond(false)
        }
    }

    return (
        <>
            <div className='flex flex-col w-full h-max justify-center items-center pt-16 pb-8 pl-6 pr-6 sm:pl-[30rem] sm:pr-[30rem] divide-y divide-neutral-200 bg-neutral-100 dark:bg-neutral-1000 dark:divide-neutral-800'>
                <form 
                    name='user-input-form'
                    className='w-full rounded-lg flex-none'>
                    <Input />
                </form>
                <History />
                {/* <div className='sticky bg-neutral-100 bottom-0 w-full h-20 border-none z-0'/> */}
            </div>
            <AnimatePresence>
                {isScrolledBeyond && <BackToTop />}
            </AnimatePresence>
        </>
    )
}

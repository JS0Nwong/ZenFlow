import { motion } from 'framer-motion'
import { useState } from 'react';
import { RiMenu4Line } from "react-icons/ri";
import {
    Popover,
    PopoverHandler,
    PopoverContent,
} from "@material-tailwind/react";

import { useBoundStore } from "../../stores/storeBinder";
export default function Toolbar() {
    const [open, setOpen] = useState(false)

    const { 
        toggleBlur,
        toggleZen, 
        toggleSearch,
        setToggleSearch, 
        setToggleZen, 
        setToggleTheme,
        setToggleBlur,
        clearHistory,
    } = useBoundStore((state) => ({
        toggleBlur: state.toggleBlur,
        toggleZen: state.toggleZen,
        toggleSearch: state.toggleSearch,
        setToggleSearch: state.setToggleSearch,
        setToggleZen: state.setToggleZen,
        setToggleTheme: state.setToggleTheme,
        setToggleBlur: state.setToggleBlur,
        clearHistory: state.clearHistory,
    }))

    const logoVariants = {
        open: {
            x: '-50%',
            display: 'none',
            opacity: 0,
            transition: {
                ease: 'easeOut',
                stiffness: 400,
                damping: 40
            },
            transitionEnd: {
                display: 'none'
            }
        },
        closed: {
            x: '5%',
            opacity: 1,
            display: 'flex',
            transition: {
                ease: 'easeIn',
                stiffness: 400,
                damping: 40
            },
        },
    }

    const toolBarVariants = {
        open: {
            x: '50%',
            display: 'none',
            opacity: 0,
            transition: {
                ease: 'easeOut',
                stiffness: 400,
                damping: 40
            },
        },
        closed: {
            x: '5%',
            opacity: 1,
            display: 'flex',
            transition: {
                ease: 'easeIn',
                stiffness: 400,
                damping: 40
            },
        },
    }

    const handleBlur = (toggle) => {
        setToggleBlur(toggle)
    }

    return (
        <header className='
            flex 
            flex-row 
            w-full
            pl-6
            pr-6
            pt-10
            sm:p-10 
            justify-between 
            items-center 
        '>
            <motion.div
                initial={false}
                animate={toggleZen ? "open" : "closed"}
                transition={{ duration: 0.15 }}
                variants={logoVariants}
            >
                <p className='text-neutral-900 dark:text-neutral-100 font-semibold text-4xl'>禅</p>
            </motion.div>
            <motion.div 
                initial={false}
                animate={toggleZen ? "open" : "closed"}
                transition={{ duration: 0.15 }}
                variants={toolBarVariants}
                className='flex flex-row'
            >
                <Popover placement="bottom-end" className="border-none" open={open && !toggleZen} handler={() => setOpen(!open)}>
                    <PopoverHandler>
                        <button
                            tabIndex={!toggleZen ? 0 : -1}
                            data-ripple-light="true"
                            data-popover-target="popover"
                            type="button"
                            className='
                                text-sm  
                                mr-2
                                font-sm 
                                px-2.5
                                py-2.5
                                rounded 
                                transition 
                                ease
                                focus:outline-none
                                hover:bg-gray-900/5
                                focus:bg-gray-900/5 
                                dark:hover:bg-neutral-600
                                dark:focus:bg-neutral-600
                                text-neutral-900 
                                dark:text-neutral-100
                                z-50
                            '>
                            <i>
                                <RiMenu4Line className="text-3xl sm:text-xl" />
                            </i>
                        </button>
                    </PopoverHandler>
                    <PopoverContent
                        data-popover="popover-bottom-end"
                        className="
                        z-50
                        !border-none
                        absolute 
                        flex
                        flex-col
                        items-start
                        p-4 
                        font-sans 
                        text-sm 
                        font-normal 
                        break-words 
                        whitespace-normal 
                        bg-neutral-100
                        dark:bg-neutral-900                
                        rounded-lg 
                        shadow-lg 
                        w-52 
                        text-neutral-400                
                        focus:outline-none"
                    >
                        <button className="
                            p-0.5 
                            pr-1.5 
                            pl-1.5 
                            flex 
                            flex-row 
                            justify-between 
                            w-full 
                            items-center 
                            hover:bg-gray-900/5  
                            dark:hover:bg-neutral-600 
                            rounded 
                            hover:text-neutral-900 
                            dark:hover:text-neutral-300 
                            group"
                            onClick={() => handleBlur(!toggleBlur)}
                        >
                            Toggle Blur
                            <span className="text-xs bg-neutral-300 dark:bg-neutral-950 rounded p-0.5 pr-1.5 pl-1.5 group-hover:text-neutral-900 group-hover:dark:text-neutral-300">B</span>
                        </button>

                        <button
                            className="
                            p-0.5 
                            pr-1.5 
                            pl-1.5 
                            flex 
                            flex-row 
                            justify-between 
                            w-full 
                            items-center 
                            hover:bg-gray-900/5  
                            dark:hover:bg-neutral-600 
                            rounded 
                            hover:text-neutral-900 
                            dark:hover:text-neutral-300 
                            group"
                            onClick={() => setToggleZen(!toggleZen)}
                        >

                            Zen Mode
                            <span className="
                            text-xs 
                            bg-neutral-300 
                            dark:bg-neutral-950 
                            rounded-sm 
                            p-0.5 
                            pr-1.5 
                            pl-1.5 
                            group-hover:text-neutral-900 
                            group-hover:dark:text-neutral-300"
                        >Z</span>
                        </button>

                        <button 
                            className="p-0.5 pr-1.5 pl-1.5 flex flex-row justify-between w-full items-center hover:bg-gray-900/5  dark:hover:bg-neutral-600 rounded hover:text-neutral-900 dark:hover:text-neutral-300 group"
                            onClick={() => setToggleTheme()}
                        >
                            Toggle Theme
                            <span className="text-xs bg-neutral-300 dark:bg-neutral-950 rounded-sm p-0.5 pr-1.5 pl-1.5 group-hover:text-neutral-900 group-hover:dark:text-neutral-300">Q</span>
                        </button>

                        <button
                            className="p-0.5 pr-1.5 pl-1.5 flex flex-row justify-between w-full items-center hover:bg-gray-900/5  dark:hover:bg-neutral-600 rounded hover:text-neutral-900 dark:hover:text-neutral-300 group"
                            onClick={() => setToggleSearch(!toggleSearch)}
                        >
                            Search Thoughts
                            <span className="text-xs bg-neutral-300 dark:bg-neutral-950 rounded-sm p-0.5 pr-1.5 pl-1.5 group-hover:text-neutral-900 group-hover:dark:text-neutral-300">F</span>
                        </button>

                        <button className="
                            p-0.5 
                            pr-1.5 
                            pl-1.5 
                            flex 
                            flex-row 
                            justify-between 
                            w-full 
                            items-center 
                            hover:bg-gray-900/5  
                            dark:hover:bg-neutral-600 
                            rounded 
                            hover:text-neutral-900 
                            dark:hover:text-neutral-300 
                            group">
                            Clear Thoughts
                            <span className="text-xs bg-neutral-300 dark:bg-neutral-950 rounded-sm p-0.5 pr-1.5 pl-1.5 group-hover:text-neutral-900 group-hover:dark:text-neutral-300">C</span>
                        </button>
                        <button className="p-0.5 pr-1.5 pl-1.5 flex flex-row justify-between w-full items-center hover:bg-gray-900/5  dark:hover:bg-neutral-600 rounded hover:text-neutral-900 dark:hover:text-neutral-300 group">
                            Open Vault
                            <span className="text-xs bg-neutral-300 dark:bg-neutral-950 rounded-sm p-0.5 pr-1.5 pl-1.5 group-hover:text-neutral-900 group-hover:dark:text-neutral-300">V</span>
                        </button>
                    </PopoverContent>
                </Popover>
            </motion.div>
        </header>
    )
}

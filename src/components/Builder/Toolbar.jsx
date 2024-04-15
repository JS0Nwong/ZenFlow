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
        setToggleSearch, 
        setToggleZen, 
        toggleZen, 
        toggleSearch,
    } = useBoundStore((state) => ({
        toggleZen: state.toggleZen,
        toggleSearch: state.toggleSearch,
        setToggleSearch: state.setToggleSearch,
        setToggleZen: state.setToggleZen,
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

    return (
        <header className='
            flex 
            flex-row 
            flex-none
            w-full 
            p-10 
            justify-between 
            items-center 
        '>
            <motion.div
                initial={false}
                animate={toggleZen ? "open" : "closed"}
                transition={{ duration: 0.15 }}
                variants={logoVariants}
            >
                <p className='text-neutral-100 font-semibold text-4xl'>禅</p>
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
                                hover:bg-neutral-600
                                rounded 
                                transition 
                                ease
                                focus:outline-none
                                focus:bg-neutral-600
                            '>
                            <i>
                                <RiMenu4Line className="text-xl" />
                            </i>
                        </button>
                    </PopoverHandler>
                    <PopoverContent
                        data-popover="popover-bottom-end"
                        className="
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
                        bg-neutral-900                
                        rounded-lg 
                        shadow-lg 
                        w-52 
                        text-neutral-400                
                        focus:outline-none"
                    >
                        <button className="p-0.5 pr-1.5 pl-1.5 flex flex-row justify-between w-full items-center hover:bg-neutral-600 rounded">
                            Toggle Blur
                            <span className="text-xs bg-neutral-950 rounded p-0.5 pr-1.5 pl-1.5">B</span>
                        </button>

                        <button
                            className="p-0.5 pr-1.5 pl-1.5 flex flex-row justify-between w-full items-center hover:bg-neutral-600 rounded"
                            onClick={() => setToggleZen(!toggleZen)}
                        >

                            Zen Mode
                            <span className="text-xs bg-neutral-950 rounded-sm p-0.5 pr-1.5 pl-1.5">Z</span>
                        </button>

                        <button className="p-0.5 pr-1.5 pl-1.5 flex flex-row justify-between w-full items-center hover:bg-neutral-600 rounded">
                            Toggle Theme
                            <span className="text-xs bg-neutral-950 rounded-sm p-0.5 pr-1.5 pl-1.5">T</span>
                        </button>

                        <button
                            className="p-0.5 pr-1.5 pl-1.5 flex flex-row justify-between w-full items-center hover:bg-neutral-600 rounded"
                            onClick={() => setToggleSearch(!toggleSearch)}
                        >
                            Search Thoughts
                            <span className="text-xs bg-neutral-950 rounded-sm p-0.5 pr-1.5 pl-1.5">F</span>
                        </button>

                        <button className="p-0.5 pr-1.5 pl-1.5 flex flex-row justify-between w-full items-center hover:bg-neutral-600 rounded">
                            Clear Thoughts
                            <span className="text-xs bg-neutral-950 rounded-sm p-0.5 pr-1.5 pl-1.5">C</span>
                        </button>
                        <button className="p-0.5 pr-1.5 pl-1.5 flex flex-row justify-between w-full items-center hover:bg-neutral-600 rounded">
                            Open Vault
                            <span className="text-xs bg-neutral-950 rounded-sm p-0.5 pr-1.5 pl-1.5">V</span>
                        </button>
                    </PopoverContent>
                </Popover>
            </motion.div>
        </header>
    )
}

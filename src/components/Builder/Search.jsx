import { Input, IconButton } from "@material-tailwind/react";
import { easeIn, easeOut, motion } from 'framer-motion'

import { MdClear } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";

import { useBoundStore } from '../../stores/storeBinder'

export default function Search() {

    const { toggleSearch, setToggleSearch } = useBoundStore((state) => ({
        toggleSearch: state.toggleSearch,
        setToggleSearch: state.setToggleSearch
    }))

    const variants = {
        open: { 
            y: '0%',
            opacity: 1,
            display: 'flex',
            transition: {
                ease: 'easeIn',
                stiffness: 400,
                damping: 40
            },
        },
        closed: { 
            y: '-200%',
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
    }

    return (
        <>
            <motion.div
                initial={false}
                animate={toggleSearch ? "open" : "closed"}
                transition={{ duration: 0.1 }}
                variants={variants}
                className="fixed flex flex-row items-start justify-between mt-10">
                <div className="w-80 flex flex-row items-center">
                    <label
                        className="
                            relative 
                            block
                            w-full
                            after:content-[attr(data-search-count)]
                            after:absolute
                            after:right-1
                            after:top-3
                            after:text-sm
                            after:font-light
                            after:text-gray-500 
                        " data-search-count={`${0}/0`}>
                        <Input
                            type="text"
                            placeholder="Search"
                            className="
                            relative
                            block
                            !border-none
                            rounded-r-none
                            !bg-gray-100/10
                            text-neutral-200 
                            pr-16
                            placeholder:text-gray-500 
                            placeholder:opacity-100 
                            focus:outline-none
                            focus:bg-gray-100/10
                            "
                            labelProps={{
                                className: "hidden",
                            }}
                            containerProps={{ className: "min-w-[100px]" }}
                        />
                    </label>
                </div>
                <div className="flex flex-row">
                    <IconButton
                        ripple={false}
                        className="hover:bg-neutral-600 rounded-none
                        ">
                        <MdKeyboardArrowDown className="text-xl" />
                    </IconButton>
                    <IconButton
                        ripple={false}
                        className="hover:bg-neutral-600 rounded-none">
                        <i>
                            <MdKeyboardArrowUp className="text-xl " />
                        </i></IconButton>
                    <IconButton
                        ripple={false}
                        className="hover:bg-red-600 rounded-l-none"
                        onClick={() => setToggleSearch(false)}
                    >
                        <i>
                            <MdClear className="text-xl " />
                        </i>
                    </IconButton>
                </div>
            </motion.div>
        </>

    )
}

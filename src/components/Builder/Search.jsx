import { useCallback } from "react";
import debounce from 'lodash/debounce'
import { Input, IconButton } from "@material-tailwind/react";
import { motion, AnimatePresence } from 'framer-motion'

import { MdClear } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";

import { useBoundStore } from '../../stores/storeBinder'
import useSearch from "../../hooks/useSearch";

export default function Search() {
    const {
        toggleSearch,
        setToggleSearch,
    } = useBoundStore((state) => ({
        toggleSearch: state.toggleSearch,
        setToggleSearch: state.setToggleSearch,
    }))

    const { handleSearch, totalNumberOfResults, focusedIndex, handleNext, handlePrevious } = useSearch()

    const variants = {
        closed: {
            y: -300,
            opacity: 0,
        },
        open: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.25,
                type: "tween", 
                ease: 'easeOut',
            }
        },
        exit: {
            y: -300,
            opacity: 0,
            transition: {
                duration: 0.35,
                type: "tween", 
                ease: 'easeOut',
            },
        }
    }

    const handleSearchClose = () => {
        const list = document.querySelectorAll('li')
        list.forEach((element) => {
            element.classList.remove('unblur')
        })
        setToggleSearch(false)
    }

    const searchDebounce = useCallback(debounce(handleSearch, 250), [])

    return (
        <AnimatePresence >
            {toggleSearch && <motion.div
                key='searchbar'
                initial='closed'
                animate='open'
                exit='exit'
                variants={variants}
                transition={{ duration: 0.1 }}
                className="fixed flex flex-row items-start justify-between mt-10 rounded shadow-lg z-50">
                <div className="w-80 flex flex-row items-center">
                    <label
                        className="
                            relative 
                            block
                            w-full
                            after:content-[attr(data-search-count)]
                            after:absolute
                            after:right-2
                            after:top-3
                            after:text-sm
                            after:font-light
                            after:text-gray-500 
                        " data-search-count={`${focusedIndex }/${totalNumberOfResults}`}>
                        <Input
                            autoFocus
                            type="text"
                            placeholder="Find your thoughts"
                            className="
                            relative
                            block
                            !border-none
                            rounded-r-none
                            pr-16
                            !bg-neutral-200
                            text-neutral-500
                            dark:!bg-gray-900/80
                            dark:text-neutral-200 
                            placeholder:text-gray-500 
                            placeholder:opacity-100 
                            focus:outline-none
                            dark:focus:bg-gray-900/80
                            focus:bg-neutral-200
                            "
                            labelProps={{
                                className: "hidden",
                            }}
                            containerProps={{ className: "min-w-[100px]" }}
                            onChange={(e) => searchDebounce(e.target.value)}
                        />
                    </label>
                </div>
                <div className="flex flex-row">
                    <IconButton
                        ripple={false}
                        className="
                            text-neutral-900 
                            dark:text-white 
                            bg-neutral-200 
                            hover:bg-neutral-400 
                            dark:bg-gray-900/80
                            dark:hover:bg-neutral-600 
                            rounded-none 
                            shadow-none 
                            hover:shadow-none
                        "
                        onClick={() => handlePrevious()}
                    >
                        <i>
                            <MdKeyboardArrowUp className="text-xl " />
                        </i></IconButton>
                    <IconButton
                        ripple={false}
                        className="
                        text-neutral-900 
                        dark:text-white 
                        bg-neutral-200 
                        hover:bg-neutral-400 
                        dark:bg-gray-900/80
                        dark:hover:bg-neutral-600 
                        rounded-none 
                        shadow-none 
                        hover:shadow-none
                        "
                        onClick={() => handleNext()}
                    >
                        <MdKeyboardArrowDown className="text-xl" />
                    </IconButton>
                    <IconButton
                        ripple={false}
                        className="
                        text-neutral-900 
                        dark:text-white 
                        bg-neutral-200
                        dark:bg-gray-900/80
                        hover:bg-red-600 
                        rounded-l-none 
                        shadow-none 
                        hover:shadow-none
                        "
                        onClick={() => handleSearchClose()}>
                        <i>
                            <MdClear className="text-xl " />
                        </i>
                    </IconButton>
                </div>
            </motion.div>}
        </AnimatePresence >
    )
}

import { useState, useEffect } from 'react'
import { motion, usePresence, AnimatePresence } from 'framer-motion'
import { IconButton } from "@material-tailwind/react";

import { MdBookmarkBorder } from "react-icons/md";
import { MdContentCopy } from "react-icons/md";
import { MdSpatialAudio } from "react-icons/md";

import { useBoundStore } from '../../stores/storeBinder'
import useElaspedTime from '../../hooks/useElaspedTime';

export default function HistoryText({
    input,
    timeStamp,
    readOnly,
    id,
    height,
    focused,
    setFocused
}) {
    const {
        setReadOnly,
        deleteEntry,
        editText,
        toggleBlur,
    } = useBoundStore((state) => ({
        setReadOnly: state.setReadOnly,
        deleteEntry: state.deleteEntry,
        editText: state.editText,
        toggleBlur: state.toggleBlur,
    }))

    const newTime = new Date(timeStamp)
    const [edit, setEdit] = useState(input)
    const { elapsedTime, isToday } = useElaspedTime(newTime)

    const animationTransition = { type: 'spring', stiffness: 500, damping: 50, mass: 1 }

    const variants = {
        in: {
            filter: 'blur(0px) brightness(100%)',
        },
        out: {
            filter: 'blur(4px) brightness(30%)',
            transition: {
                duration: 1.7,
                delay: 1.5
            }
        },
        hover: {
            filter: 'blur(0px) brightness(100%)',
            transition: {
                duration: 0.15,
                type: "tween",
            }
        },
        exit: {
            x: -300,
            opacity: 0,
            transition: {
                duration: 0.25,
                type: "tween",
            }
        },
        removeBlur: {
            filter: 'blur(0px) brightness(100%)',
            transition: {
                duration: .3,
            }
        }
    }

    // Listener to set read only after 5 minutes
    useEffect(() => {
        const readOnlyTimeout = setTimeout(() => {
            setReadOnly(id)
        }, 300000)

        // Cleanup function to clear the interval when the component unmounts
        return () => clearInterval(readOnlyTimeout);
    }, []);

    const autoResize = () => {
        const textArea = document?.querySelector(`[data-thought-id="${id}"]`)
        textArea.style.height = 'auto'
        const defaultPadding = textArea.style.padding
        textArea.style.height = textArea.scrollHeight + 'px'
        textArea.style.padding = defaultPadding
    }

    const handleEdit = () => {
        editText(edit, id)
    }

    const deleteListener = (e) => {
        if (e.keyCode === 8 && edit.trim() === '') {
            console.log('delete')
            e.preventDefault()
            deleteEntry(id)
        }
    }

    const textToSpeech = (text) => {
        const synth = window.speechSynthesis
        const utterThis = new SpeechSynthesisUtterance(text)
        utterThis.voice = synth.getVoices()[0]

        return synth.speak(utterThis)
    }

    return (
        <motion.li
            key={id}
            initial='in'
            animate={toggleBlur ? 'removeBlur' : 'out'}
            whileHover='hover'
            whileFocus='hover'
            exit='exit'
            transition={animationTransition}
            variants={variants}
            tabIndex={0}
            onFocus={() => setFocused(id)}
            onMouseEnter={() => setFocused(id)}
            className='relative w-full group h-max last:mb-6 mt-4 flex flex-col rounded-lg items-center focus:outline-none bg-transparent text-neutral-900 dark:text-neutral-200'
        >
            <textarea
                defaultValue={input}
                data-thought-id={id}
                rows='1'
                onChange={(e) => setEdit(e.target.value)}
                onInput={() => autoResize()}
                onKeyDown={(e) => deleteListener(e)}
                onBlur={() => handleEdit()}
                readOnly={readOnly}
                tabIndex={-1}
                autoComplete='off'
                type="text"
                spellCheck={false}
                placeholder={'Delete With Backspace'}
                style={{ height: height }}
                className='
                        border-none
                        focus:border-transparent 
                        leading-6 
                        p-3 
                        w-full 
                        text-lg 
                        font-normal 
                        transition 
                        ease-linear 
                        rounded-lg 
                        bg-transparent 
                        focus:outline-none 
                        overflow-y-hidden 
                        resize-none
                        z-50
                '/>
            <span  className={`text-neutral-500 font-normal text-sm absolute right-4 sm:right-0 sm:-left-20 top-4 ${toggleBlur ? 'flex' : 'hidden'} transition ease-linear group-hover:flex group-focus:flex`}
                style={{
                    display: 'hidden'
                }}
            >
                {!isToday
                    ? newTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
                    : (elapsedTime > 59 ? Math.floor(elapsedTime / 60) : elapsedTime)
                    + (elapsedTime > 59 ? 'm' : 's') + ' ' + 'ago'
                }
            </span>
            <div className={`absolute sm:top-3 sm:left-full sm:right-auto right-4 top-[120%] flex-row pl-3 pb-3 ${toggleBlur ? 'flex' : 'hidden'} transition ease-linear group-hover:flex group-focus:flex`}>
                <IconButton
                    aria-label='save to vault'
                    title='save to vault'
                    ripple={false}
                    className="bg-transparent h-5 w-5 mr-2 text-neutral-600 dark:text-neutral-300 shadow-none"
                >
                    <i>
                        <MdBookmarkBorder className="text-lg" />
                    </i>
                </IconButton>
                <IconButton
                    aria-label='copy to clipboard'
                    title='copy to clipboard'
                    ripple={false}
                    className="bg-transparent h-5 w-5 mr-2 text-neutral-600 dark:text-neutral-300 shadow-none"
                    onClick={() => navigator.clipboard.writeText(input)}
                >
                    <i>
                        <MdContentCopy className="text-lg " />
                    </i>
                </IconButton>
                <IconButton
                    aria-label='text to speech'
                    title='text to speech'
                    ripple={false}
                    className="bg-transparent h-5 w-5 text-neutral-600 dark:text-neutral-300 shadow-none"
                    onClick={() => textToSpeech(input)}
                >
                    <MdSpatialAudio className="text-lg" />
                </IconButton>
            </div>
            {focused == id ?
                <motion.div
                    layout={true}
                    transition={{
                        duration: 0.1,
                        ease: 'linear',
                    }}
                    className='absolute right-0 w-full h-full bg-gray-900/5 dark:bg-gray-100/10 rounded-lg z-0'
                    layoutId="highlight"
                />
                : null}
        </motion.li>
    )
}

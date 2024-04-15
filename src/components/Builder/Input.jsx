import { motion } from 'framer-motion'

import { useBoundStore } from '../../stores/storeBinder'
import { FaMicrophone } from "react-icons/fa6";

export default function Input() {
    const {
        currentUserInput,
        setCurrentUserInput,
        setInputHistory,
    } = useBoundStore((state) => ({
        currentUserInput: state.currentUserInput,
        setCurrentUserInput: state.setCurrentUserInput,
        setInputHistory: state.setInputHistory
    }))
    const autoResize = () => {
        const textArea = document?.getElementById('user-input')
        textArea.style.height = 'auto'
        const defaultPadding = textArea.style.padding
        textArea.style.height = textArea.scrollHeight + 'px'
        textArea.style.padding = defaultPadding
    }
    const resetTextAreaHeight = () => {
        const textArea = document?.getElementById('user-input')
        textArea.style.height = 'auto'
    }
    const setInput = (input) => {
        setCurrentUserInput(input)
    }
    const submitListener = (e) => {
        if (e.keyCode === 13 && currentUserInput.trim() !== '') {
            e.preventDefault()
            setInputHistory()
            resetTextAreaHeight()
        }
    }

    return (
        <div
            className='flex flex-col items-start mt-2'
        >
            <label
                htmlFor="user-input"
                className="
                    block 
                    mb-2 
                    text-3xl 
                    font-semibold
                    tracking-tight  
                    pl-2.5                  
                    text-gray-50 
                    dark:text-gray-50"
            >
                Today
            </label>
            <div className='flex flex-row w-full items-center relative'>
                <motion.textarea
                    spellCheck="false"
                    rows='1'
                    value={currentUserInput}
                    autoComplete='off'
                    type="text"
                    id="user-input"
                    className="
                        h-[24]
                        bg-transparent
                        text-gray-300 
                        text-lg 
                        rounded-lg
                        block 
                        p-2.5 
                        pr-12
                        transition
                        delay-100
                        ease
                        hover:delay-75
                        hover:bg-gray-100/10
                        dark:bg-transparent
                        dark:placeholder-neutral-500 
                        dark:text-gray-300
                        focus:outline-none
                        focus:bg-gray-100/10
                        grow
                        break-words
                        resize-none
                        overflow-y-hidden
                "
                    placeholder="What's on your mind?"
                    required
                    onKeyDown={(e) => submitListener(e)}
                    onChange={(e) => setInput(e.target.value)}
                    onInput={() => autoResize()}>
                </motion.textarea>
                <FaMicrophone className='absolute right-5 text-xl font-semibold' />
            </div>
        </div>
    )
}

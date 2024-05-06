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
            const height = document?.getElementById('user-input').scrollHeight
            e.preventDefault()
            setInputHistory(height)
            resetTextAreaHeight()
        }
    }

    return (
        <div className='flex flex-col items-start mt-2'>
            <label
                htmlFor="user-input"
                className="
                    block 
                    mb-2 
                    text-3xl 
                    font-semibold
                    tracking-tight  
                    pl-2.5        
                    pr-2.5          
                    text-neutral-900 
                    dark:text-neutral-50"
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
                        text-gray-800 
                        text-lg 
                        rounded-lg
                        block 
                        p-2.5 
                        pr-12
                        transition
                        delay-100
                        ease
                        hover:delay-75
                        hover:bg-gray-900/5
                        focus:bg-gray-900/5
                        dark:hover:bg-gray-100/10
                        dark:focus:bg-gray-100/10
                        dark:placeholder-neutral-500 
                        dark:text-gray-300
                        focus:outline-none
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
                <button
                    aria-label='write using voice'
                    title='write using voice'
                    data-ripple-light="true"
                    data-popover-target="popover"
                    type="button"
                    className='
                        z-10
                        absolute 
                        right-3 
                        text-xl  
                        font-semibold  
                        rounded 
                        transition 
                        ease
                        p-1.5
                        focus:outline-none
                        hover:bg-gray-900/5
                        focus:bg-gray-900/5 
                        dark:hover:bg-neutral-600
                        dark:focus:bg-neutral-600
                        text-neutral-600 
                        dark:text-neutral-300
                    '>
                    <i>
                        <FaMicrophone />
                    </i>
                </button>
            </div>
        </div>
    )
}

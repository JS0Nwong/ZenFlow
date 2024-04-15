import { delay, motion, usePresence } from 'framer-motion'
import TextToolbar from './TextToolbar'

export default function HistoryText({ input, tabIndex, timeStamp }) {
    const [isPresent, safeToRemove] = usePresence()
    const animationTransition = { type: 'tween', stiffness: 500, damping: 50, mass: 1 }

    timeStamp = new Date(timeStamp)

    const animations = {
        layout: true,
        initial: 'in',
        animate: isPresent ? 'out' : 'in',
        whileHover: 'hover',
        whileFocus: 'focus',
        variants: {
            in: { 
                filter: 'blur(0px) brightness(100%)',
                color: 'text-white',
                transition: {
                    delay: 0.2
                }
            },
            out: { 
                filter: 'blur(4px) brightness(50%)',
                transition: {
                    duration: 2,
                    delay: 1,
                }
            },
            hover: {
                filter: 'blur(0px) brightness(100%)',
            },
            focus: {
                filter: 'blur(0px) brightness(100%)',
            }
        },
        onAnimationComplete: () => !isPresent && safeToRemove(),
        animationTransition
    }

    return (
        <>
            <motion.div
                {...animations}
                tabIndex={tabIndex}
                className='
                p-3
                text-white
                text-lg
                font-normal
                border-zinc-100/30
                w-full
                transition
                delay-100
                ease-linear
                rounded-lg
                relative
                hover:bg-gray-100/10
                focus:bg-gray-100/10
                focus:outline-none
                first:mt-0
                mt-2
                group
            '>
                <p className='
                    text-neutral-500 
                    font-normal 
                    text-sm 
                    absolute 
                    -left-20
                    top-4
                    hidden
                    transition
                    ease-linear 
                    group-hover:block
                    group-focus:block
                '
                >
                    {timeStamp.toLocaleTimeString()}
                </p>
                <p>{input}</p>
                {/* <TextToolbar /> */}
            </motion.div>
        </>
    )
}

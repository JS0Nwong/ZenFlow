import { useAnimate, motion, stagger } from 'framer-motion'
import { MdSubdirectoryArrowRight } from "react-icons/md";
import { useBoundStore } from '../stores/storeBinder';
import { useEffect, useState } from 'react';

export default function Onboard() {
    const { setHasOnboarded } = useBoundStore((state) => ({
        hasOnboarded: state.hasOnboarded,
        setHasOnboarded: state.setHasOnboarded
    }))
    const [elapsedTime, setElapsedTime] = useState(0)
    const [focused, setFocused] = useState(null)
    const [scope, animate] = useAnimate()

    async function transition() {
        await animate('li', {
            opacity: 0,
        })
        await animate('li', {
            opacity: 1,
        },
            {
                delay: stagger(2.1, {
                    startDelay: 0.7
                })
            }
        )
    }

    const onboardArray = [
        'This is Zen.',
        'Clear your mind through raw, unfiltered writing.',
        'Your thoughts will fade into the background as you write.',
        'Feel free to alter your thoughts within 5 minutes, after which you can leave them to rest.',
        'Don\'t worry. You can always come back to read your thought process by hovering over your thoughts.'
    ]

    useEffect(() => {
        const intervalId = setInterval(() => {
            setElapsedTime(elapsedTime + 1)
        }, 1000)

        return () => clearInterval(intervalId)
    }, [elapsedTime])

    useEffect(() => {
        transition()
    }, [])

    return (
        <motion.div
            key='onboard'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 1 } }}
            exit={{ opacity: 0, transition: { duration: 2 } }}
            className='absolute w-full h-full z-50 flex flex-col 
                pt-48 pb-8 pl-6 pr-6 sm:pl-[4rem] sm:pr-[4rem] md:pr-24 md:pl-24 lg:pl-[28rem] lg:pr-[28rem]'
        >
            <p className="text-3xl font-semibold mb-4 transition opacity-100">Onboarding</p>
            <hr />
            <motion.ul
                layout={true}
                className="flex flex-col pt-3 "
                onMouseLeave={() => setFocused(null)}
                ref={scope}
            >
                {onboardArray.map((text, index) =>
                    <motion.li
                        tabIndex={index}
                        whileHover="hover"
                        whileFocus='hover'
                        initial='initial'
                        animate="hide"
                        variants={{
                            hide: {
                                filter: "blur(4px) brightness(30%)",
                                transition: {
                                    delay: (2.8 * index + 1.7),
                                    duration: 1.7,
                                },
                            },
                            hover: {
                                filter: 'blur(0px) brightness(100%)',
                            }
                        }}
                        onFocus={() => setFocused(text)}
                        onMouseEnter={() => setFocused(text)}
                        key={index + text}
                        className="list-none relative w-full h-max text-lg text-neutral-200 rounded-lg p-3 focus:outline-none group"
                    >
                        {focused === text ?
                            <motion.div
                                layout='position'
                                exit={{ x: -300, opacity: 0}}
                                transition={{
                                    duration: 0.1,
                                    ease: 'linear',
                                }}
                                className='absolute right-0 top-0 w-full h-full bg-gray-900/5 dark:bg-gray-100/10 rounded-lg z-0'
                                layoutId="highlight"
                            />
                            : null}
                        <span className='text-neutral-500 font-normal text-sm absolute sm:-left-16 top-4 hidden transition ease-linear group-hover:block group-focus:block'>
                            {elapsedTime > 60 ? Math.floor(elapsedTime / 60) : elapsedTime}{elapsedTime > 60 ? 'm' : 's'} ago
                        </span>
                        <p>{text}</p>
                    </motion.li>
                )}
            </motion.ul>
            <motion.button
                initial={{
                    opacity: 0,
                    display: 'none',
                }}
                animate={{
                    display: 'block',
                    opacity: 1,
                    transition: {
                        duration: 1,
                        delay: 11.5
                    },
                }}
                type='submit'
                className='w-fit mt-1 p-3 rounded-md transition ease focus:outline-none hover:bg-gray-900/5 focus:bg-gray-900/5 
                         dark:hover:bg-gray-100/10  dark:focus:bg-gray-100/10  text-neutral-900 dark:text-neutral-100'
                onClick={() => setHasOnboarded(true)}
            >
                <i><MdSubdirectoryArrowRight /></i>
            </motion.button>
        </motion.div>
    )
}

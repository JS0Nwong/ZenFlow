import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import Editor from '../components/Builder/Editor'
import Toolbar from '../components/Builder/Toolbar'
import Search from '../components/Builder/Search'
import Onboard from '../components/Onboard'

import useKeyPress from '../hooks/useKeyPress'
import { useBoundStore } from '../stores/storeBinder'

import { 
    isLastWeek, 
    isToday,
    isYesterday,
    isMoreThanAWeekAgo,
    formatDateToMonthDay, 
    formatDateToLastWeekDateName,
    getDayName,
} from '../components/utils'

export default function Builder() {
    const {
        toggleBlur,
        toggleZen,
        toggleSearch,
        hasOnboarded,
        setToggleZen,
        setToggleSearch,
        setToggleTheme,
        clearHistory,
        formattedThoughts,
        formatHistory,
    } = useBoundStore((state) => ({
        hasOnboarded: state.hasOnboarded,
        toggleSearch: state.toggleSearch,
        toggleZen: state.toggleZen,
        toggleBlur: state.toggleBlur,
        setToggleZen: state.setToggleZen,
        setToggleSearch: state.setToggleSearch,
        setToggleTheme: state.setToggleTheme,
        clearHistory: state.clearHistory,
        formattedThoughts: state.formattedThoughts,
        formatHistory: state.formatHistory,
    }))

    const onHotkeyPress = (e) => {
        if (e.key.toLowerCase() === 'f' && e.ctrlKey && e.shiftKey) {
            e.preventDefault()
            setToggleSearch(!toggleSearch)
        }
        if (e.key.toLowerCase() === 'b' && e.ctrlKey && e.shiftKey) {
            e.preventDefault()
            toggleBlur(!toggleBlur)
        }
        if (e.key.toLowerCase() === 'z' && e.ctrlKey && e.shiftKey) {
            e.preventDefault()
            setToggleZen(!toggleZen)
        }
        if (e.key.toLowerCase() === 'q' && e.ctrlKey && e.shiftKey) {
            e.preventDefault()
            setToggleTheme()
        }
        if (e.key.toLowerCase() === 'c' && e.ctrlKey && e.shiftKey) {
            e.preventDefault()
            clearHistory()
            document.getElementById('user-input').focus()
        }
        if (e.key.toLowerCase() === 'v' && e.ctrlKey && e.shiftKey) {
            e.preventDefault()
        }
    }
    // useKeyPress hook to listen to valid hotkey keys(f, b, z, q, c, v, ctrl, shift)
    useKeyPress([70, 66, 90, 81, 67, 86, 17, 16], onHotkeyPress)

    useEffect(() => {
        const thoughts = formattedThoughts
        const keys = Object.keys(thoughts)
        const groups = {}
        
        // Format the thoughts object to group thoughts by day
        keys.forEach((key) => {
            const date = thoughts[key][0]?.timeStamp
            let dayName = getDayName(date)
            if (isToday(date)) { dayName = 'Today' }
            if (isYesterday(date)) { dayName = 'Yesterday' }
            if (isLastWeek(date)) { dayName = formatDateToLastWeekDateName(date) }
            if (isMoreThanAWeekAgo(date)) { dayName = formatDateToMonthDay(date) }
            if (!groups[dayName]) {
                groups[dayName] = []
            }
            groups[dayName] = thoughts[key]
        })
        formatHistory(groups)
    }, [])

    return (
        <>
            <div className='bg-neutral-100 dark:bg-neutral-1000 w-full h-screen items-center selection:bg-neutral-900 selection:text-neutral-100 dark:selection:bg-neutral-100 dark:selection:text-neutral-900'>
                {hasOnboarded
                    ? <AnimatePresence>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{
                                opacity: 1,
                                transition: {
                                    duration: 1
                                }
                            }}
                            exit={{ opacity: 0 }}
                            className='flex flex-col items-center h-full w-full'
                        >
                            <Search />
                            <Toolbar />
                            <Editor />
                        </motion.div>
                    </AnimatePresence>
                    : <AnimatePresence>
                        <Onboard />
                    </AnimatePresence>
                }
            </div>
        </>
    )
}

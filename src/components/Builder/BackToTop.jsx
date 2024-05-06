import { motion } from 'framer-motion'
import { RiArrowUpSLine } from "react-icons/ri";

export default function BackToTop() {
    const handleReturnToTop = () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    return (
        <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed bottom-0 right-0 w-16 h-16 dark:bg-neutral-200 bg-neutral-950 p-5 m-14 rounded-full flex items-center justify-center'
            onClick={() => handleReturnToTop()}
        >
            <RiArrowUpSLine className='dark:text-neutral-900 text-neutral-200s p-0 m-0 text-8xl'/>
        </motion.button>
    )
}

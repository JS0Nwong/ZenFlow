import { motion } from 'framer-motion'

import HistoryText from './HistoryText'
import { useBoundStore } from '../../stores/storeBinder'

export default function History() {
    const { inputHistory } = useBoundStore((state) => ({ inputHistory: state.inputHistory }))

    return (
        <>
            <motion.div 
                className='
                    flex
                    flex-col
                    h-full
                    w-full 
                    mt-2 
                    pt-5 
                    flex-auto
                    grow
                '>
                {[...inputHistory].map((input, index) =>
                    <HistoryText
                        key={input.id}
                        input={input.text}
                        timeStamp={input.timeStamp}
                        tabIndex={index}
                    />
                )}
            </motion.div>
        </>
    )
}

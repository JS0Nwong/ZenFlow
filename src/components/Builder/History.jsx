import {  useState } from 'react'
import {  AnimatePresence } from 'framer-motion'

import HistoryText from './HistoryText'
import { useBoundStore } from '../../stores/storeBinder'

export default function History() {
    const { formattedThoughts } = useBoundStore((state) => ({ formattedThoughts: state.formattedThoughts }))    
    const [focused, setFocused] = useState(null)

    return (
        <>
            <div className='flex flex-col w-full h-full mt-4 pt-2 flex-auto grow dark:bg-neutral-1000 z-40'>
                {Object.keys(formattedThoughts).map((thought, index) =>
                    <article key={index} className='mt-2 flex flex-col w-full rounded-lg mb-2 divide-y divide-neutral-200 dark:divide-neutral-800'>
                        {thought === 'Today'
                            ? null
                            : <p className='text-3xl font-semibold tracking-tight pl-2.5 pr-2.5 text-neutral-900 dark:text-neutral-50 mb-4'>
                                {thought}
                            </p>}
                        <ul className='list-none' onMouseLeave={() => setFocused(null)}>
                            <AnimatePresence initial={false}>
                                {formattedThoughts[thought].map((text, index) =>
                                    <HistoryText
                                        key={text.id}
                                        id={text.id}
                                        input={text.text}
                                        timeStamp={text.timeStamp}
                                        readOnly={text.readOnly}
                                        height={text.height}
                                        focused={focused}
                                        setFocused={setFocused}
                                    />
                                )}
                            </AnimatePresence>
                        </ul>
                    </article>
                )}
            </div>
        </>
    )
}

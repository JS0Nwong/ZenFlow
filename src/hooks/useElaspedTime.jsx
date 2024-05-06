import { useEffect, useState } from 'react'

export default function useElaspedTime(newTime) {
    const [elapsedTime, setElapsedTime] = useState(0)
    const [isToday, setIsToday] = useState(false)
    const oneHourInMills = 3600000

    // Attach interval timer to show elasped time after new submission
    useEffect(() => {
        // Check if the newTime is within the last hour
        const isWithinLastHour = Date.now() - newTime.setTime(newTime.getTime()) > oneHourInMills
        if (isWithinLastHour) return 
        setIsToday(true)
        const interval = setInterval(() => {
            setElapsedTime(elapsedTime + 1)
        }, 1000)

        return () => clearInterval(interval)
    }, [elapsedTime])

    return { isToday, elapsedTime }
}

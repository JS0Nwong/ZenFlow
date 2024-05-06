import { 
  isLastWeek, 
  isToday,
  isYesterday,
  isMoreThanAWeekAgo,
  formatDateToMonthDay, 
  formatDateToLastWeekDateName,
  getDayName,
} from '../components/utils'

export default function useObjectFormatter() {
  const thoughts = formattedThoughts
  const keys = Object.keys(thoughts)
  const groups = {}
  
  // Format the thoughts object to group thoughts by day
  keys.forEach((key) => {
      const date = thoughts[key][0].timeStamp
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

  return groups
}

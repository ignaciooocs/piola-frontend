import moment from 'moment'
import 'moment-timezone'

export const convertToChileTime = (dateString) => {
  const date = new Date(dateString)
  date.setTime(date.getTime() - (0 * 60 * 60 * 1000))
  const options = {
    timeZone: 'America/Santiago',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }
  return date.toLocaleString('es-CL', options)
}

export const formatDate = (utcDate) => {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const localDate = moment.utc(utcDate).tz(timezone)
  return localDate.format('ll')
}

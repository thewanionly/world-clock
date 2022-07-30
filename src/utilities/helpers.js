const getLocalDate = (timeZone, options = {}) => {
  return new Date().toLocaleString('en-US', {
    timeZone,
    ...options
  })
}

const getLocalTime = (timeZone) => {
  const timeOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false
  }

  return getLocalDate(timeZone, timeOptions)
}

const getTimeDifference = (baseTimeZone, timeZone, unit = 'hours') => {
  // Convert dates to ms
  const baseTime = new Date(getLocalDate(baseTimeZone)).getTime()
  const time = new Date(getLocalDate(timeZone)).getTime()

  // Get diff in ms
  const timeDiffMs = time - baseTime
  if (unit === 'ms') return timeDiffMs

  // Get diff in seconds
  const timeDiffSec = Math.floor(timeDiffMs / 1000)
  if (unit === 'seconds') return timeDiffSec

  // Get diff in minutes

  const timeDiffMin = Math.floor(timeDiffSec / 60)
  if (unit === 'minutes') return timeDiffMin

  // Get diff in hours
  const timeDiffHr = Math.floor(timeDiffMin / 60)
  return timeDiffHr
}

// Format diff to text
const formatTimeDifference = (timeDiff, baseCity, timeUnit = 'hours') => {
  let adverb = ''

  if (timeDiff < 0) {
    adverb = 'behind'
  } else if (timeDiff > 0) {
    adverb = 'ahead'
  }

  if (adverb) return `${Math.abs(timeDiff)} ${timeUnit} ${adverb} ${baseCity}`

  return `Same time as ${baseCity}`
}

export { getLocalDate, getLocalTime, getTimeDifference, formatTimeDifference }

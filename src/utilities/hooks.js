import { useState, useEffect } from 'react'

const useRealTimeClock = (timeZone) => {
  const [date, setDate] = useState(new Date())

  const localTime = date.toLocaleString('en-US', {
    timeZone,
    hour: 'numeric',
    minute: 'numeric',
    hour12: false
  })

  useEffect(() => {
    const intervalId = setInterval(() => setDate(new Date()), 1000)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  return [localTime]
}

export { useRealTimeClock }

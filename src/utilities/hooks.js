import { useState, useEffect, useRef } from 'react'

/**
 * Detects if the user clicks outside the specified ref/element.
 */
const useClickOutside = (action) => {
  const elementRef = useRef()

  useEffect(() => {
    const handleClick = (e) => {
      if (elementRef?.current && !elementRef.current.contains(e.target)) {
        // call action callback when user clicked outside
        action?.()
      }
    }

    window.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('click', handleClick)
    }
  }, [elementRef, action])

  return elementRef
}

/**
 * Returns a real-time clock in HH:MM format depending on the given timezone
 */
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

export { useClickOutside, useRealTimeClock }

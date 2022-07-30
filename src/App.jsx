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

const App = () => {
  const myCity = 'Cebu City'
  const myTImeZone = 'Asia/Manila'

  const [localTime] = useRealTimeClock(myTImeZone)

  return (
    <div className='app'>
      <section className='my-city'>
        <div className='container'>
          <h3 data-testid='my-city-name'>{myCity}</h3>
          <h1 data-testid='my-city-time'>{localTime}</h1>
        </div>
      </section>
    </div>
  )
}

export default App

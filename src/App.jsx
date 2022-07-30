import { useState } from 'react'

import { useRealTimeClock } from './utilities/hooks'

const App = () => {
  const myCity = 'Cebu City'
  const myTImeZone = 'Asia/Manila'

  const [myLocalTime] = useRealTimeClock(myTImeZone)
  const [cities, setCities] = useState([])

  return (
    <div className='app'>
      <section className='my-city'>
        <div className='container'>
          <h3 data-testid='my-city-name'>{myCity}</h3>
          <h1 data-testid='my-city-time'>{myLocalTime}</h1>
        </div>
      </section>
      <section className='cities'>
        <div className='container cities__container'>
          <button className='cities__add-button'>Add city</button>
          <div className='cities__city-list' data-testid='city-list'>
            {cities.map((city) => (
              <div key={city.id}>{city.name}</div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default App

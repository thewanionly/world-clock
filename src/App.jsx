import { useCallback, useState } from 'react'

import { useRealTimeClock } from './utilities/hooks'

import CityCard from './components/CityCard'
import AddCityModal from './components/AddCityModal'

const App = () => {
  const myCity = {
    name: 'Cebu City',
    timezone: 'Asia/Manila'
  }

  const [myLocalTime] = useRealTimeClock(myCity.timezone)
  const [showAddModal, setShowAddModal] = useState(false)
  const [cities, setCities] = useState([
    {
      name: 'London',
      label: 'Nice city',
      timezone: 'Europe/London',
      timezoneAbbreviation: 'BST'
    },
    {
      name: 'Tokyo',
      label: 'Busy city',
      timezone: 'Asia/Tokyo',
      timezoneAbbreviation: 'JST'
    },
    {
      name: 'New York',
      timezone: 'America/New_York',
      timezoneAbbreviation: 'AEST'
    },
    {
      name: 'Sydney',
      timezone: 'Australia/Sydney',
      timezoneAbbreviation: 'EDT'
    }
  ])

  const handleShowModal = () => {
    setShowAddModal(true)
  }

  const handleCloseModal = useCallback(() => {
    setShowAddModal(false)
  }, [])

  return (
    <div className='app'>
      {showAddModal && <AddCityModal handleClose={handleCloseModal} />}
      <section className='my-city'>
        <div className='container'>
          <h3 data-testid='my-city-name'>{myCity.name}</h3>
          <h1 data-testid='my-city-time'>{myLocalTime}</h1>
        </div>
      </section>
      <section className='cities'>
        <div className='container cities__container'>
          <button className='cities__add-button' onClick={handleShowModal}>
            Add city
          </button>
          <div className='cities__city-list' data-testid='city-list'>
            {cities.map((city) => (
              <CityCard
                key={city.timezone}
                className='cities__city-item'
                city={city}
                baseCity={myCity}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default App

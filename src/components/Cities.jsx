import { useContext } from 'react'

import { myCity } from '../utilities/constants'

import StoreContext from '../store/storeContext'
import CityCard from './CityCard'

import EmptyCitiesState from './EmptyCitiesState'

const Cities = () => {
  const { cities = [], handleShowModal } = useContext(StoreContext)

  return (
    <section className='cities'>
      <div className='container'>
        {cities.length > 0 ? (
          <div className='cities__city-list' data-testid='city-list'>
            {cities.map((city) => (
              <CityCard
                key={city.timezone}
                className='cities__city-item'
                city={city}
                baseCity={myCity}
                handleShowModal={handleShowModal}
              />
            ))}
          </div>
        ) : (
          <EmptyCitiesState />
        )}
      </div>
    </section>
  )
}

export default Cities

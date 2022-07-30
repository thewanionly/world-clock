import { useContext } from 'react'

import { myCity } from '../utilities/constants'

import StoreContext from '../store/storeContext'
import CityCard from './CityCard'
import { ReactComponent as EmptyCitiesImg } from '../assets/images/in_no_time.svg'

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
          <div className='cities__empty-image'>
            <h4>No cities to show</h4>
            <p>Click on "Add city" button above to add one.</p>
            <EmptyCitiesImg />
          </div>
        )}
      </div>
    </section>
  )
}

export default Cities

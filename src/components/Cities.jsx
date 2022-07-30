import { useContext } from 'react'

import { myCity } from '../utilities/constants'

import StoreContext from '../store/storeContext'
import CityCard from './CityCard'

const Cities = () => {
  const { cities, handleShowModal } = useContext(StoreContext)

  return (
    <section className='cities'>
      <div className='container cities__container'>
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
      </div>
    </section>
  )
}

export default Cities

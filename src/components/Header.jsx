import { useContext } from 'react'
import { myCity } from '../utilities/constants'

import StoreContext from '../store/storeContext'
import Button from './Button'
import Clock from './Clock'

const Header = () => {
  const { cities, handleShowModal } = useContext(StoreContext)

  return (
    <section className='header my-city'>
      <div className='container header__container'>
        <div className='header__left'>
          <h3 className='my-city__name' data-testid='my-city-name'>
            {myCity.name}
          </h3>
          <div className='my-city__timezone'>
            <Clock className='my-city__time' dataTestId='my-city-time' timezone={myCity.timezone} />
            <h4 className='my-city__tmz-abbrev' data-testid='my-city-tmz-abbrev'>
              {myCity.timezoneAbbrevation}
            </h4>
          </div>
        </div>
        <div className='header__right'>
          <Button
            className='header__add-button button__primary'
            onClick={() => handleShowModal('add')}
            disabled={cities.length >= 4}
            dataTestId='header-add-city-button'
          >
            Add city
          </Button>
          <p className='header__add-city-limit'>
            <em>You can add up to 4 cities</em>
          </p>
        </div>
      </div>
    </section>
  )
}

export default Header

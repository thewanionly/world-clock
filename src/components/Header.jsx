import { myCity } from '../utilities/constants'

import Button from './Button'
import Clock from './Clock'

const Header = ({ cities, handleShowModal }) => {
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
            className='cities__add-button button__primary'
            onClick={() => handleShowModal('add')}
            disabled={cities.length >= 4}
          >
            Add city
          </Button>
        </div>
      </div>
    </section>
  )
}

export default Header

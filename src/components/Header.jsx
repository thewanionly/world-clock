import { myCity } from '../utilities/constants'
import { useRealTimeClock } from '../utilities/hooks'

const Header = () => {
  const [myLocalTime] = useRealTimeClock(myCity.timezone)

  return (
    <section className='header my-city'>
      <div className='container header__container'>
        <div className='header__left'>
          <h3 className='my-city__name' data-testid='my-city-name'>
            {myCity.name}
          </h3>
          <div className='my-city__timezone'>
            <h1 className='my-city__time' data-testid='my-city-time'>
              {myLocalTime}
            </h1>
            <h4 className='my-city__tmz-abbrev' data-testid='my-city-tmz-abbrev'>
              {myCity.timezoneAbbrevation}
            </h4>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Header

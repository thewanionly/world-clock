import { useRealTimeClock } from '../utilities/hooks'
import { getTimeDifference, formatTimeDifference } from '../utilities/helpers'

const CityCard = ({ className = '', city, baseCity, handleShowModal }) => {
  const { name, label, timezone, timezoneAbbreviation } = city || {}

  const [time] = useRealTimeClock(timezone)

  return (
    <div data-testid='city-item' className={`city-card ${className}`}>
      <div className='city-card__description'>
        <h3 data-testid='city-name'>{name}</h3>
        <p data-testid='city-label'>{label}</p>
      </div>
      <h2 data-testid='city-time'>{time}</h2>
      <div className='city-card__timezone'>
        <h4 data-testid='city-tmz-abbrev'>{timezoneAbbreviation}</h4>
        <p data-testid='city-time-diff'>
          {formatTimeDifference(getTimeDifference(baseCity.timezone, timezone), baseCity.name)}
        </p>
      </div>
      <button
        className='city-card__delete-button'
        data-testid='city-delete-button'
        onClick={() => handleShowModal('delete', city)}
      >
        Delete
      </button>
    </div>
  )
}

export default CityCard

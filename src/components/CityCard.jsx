import PropTypes from 'prop-types'
import { getTimeDifference, formatTimeDifference } from '../utilities/helpers'

import Button from './Button'
import Clock from './Clock'

const AREA_COLORS = {
  Asia: 'dark-blue',
  Australia: 'sky-blue',
  Europe: 'purple',
  America: 'orange'
}

const CityCard = ({ className = '', city, baseCity, handleShowModal }) => {
  const { name, label, timezone, timezoneAbbreviation } = city || {}

  const borderTopColor = AREA_COLORS[timezone.split('/')[0]]

  return (
    <div data-testid='city-item' className={`city-card ${className} border-top-${borderTopColor}`}>
      <div className='city-card__description'>
        <h3 className='city-card__name' data-testid='city-name'>
          {name}
        </h3>
        <p className='city-card__label' data-testid='city-label'>
          {label}
        </p>
      </div>
      <div className='city-card__timezone'>
        <div className='city-card__timezone-text'>
          <Clock
            className='city-card__time'
            dataTestId='city-time'
            timezone={timezone}
            size='medium'
          />
          <h4 className='city-card__tmz-abbrev' data-testid='city-tmz-abbrev'>
            {timezoneAbbreviation}
          </h4>
        </div>
      </div>
      <p className='city-card__time-diff' data-testid='city-time-diff'>
        <em>
          {formatTimeDifference(getTimeDifference(baseCity.timezone, timezone), baseCity.name)}
        </em>
      </p>
      <Button
        className='city-card__delete-button button__danger'
        dataTestId='city-delete-button'
        onClick={() => handleShowModal('delete', city)}
      >
        Delete
      </Button>
    </div>
  )
}

CityCard.propTypes = {
  className: PropTypes.string,
  city: PropTypes.object,
  baseCity: PropTypes.object,
  handleShowModal: PropTypes.func
}

export default CityCard

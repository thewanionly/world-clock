import PropTypes from 'prop-types'
import { useRealTimeClock } from '../utilities/hooks'

const CLOCK_TAG_MAP = {
  large: 'h1',
  medium: 'h2',
  small: 'h3'
}

const Clock = ({ className = '', timezone, size = 'large', dataTestId }) => {
  const [time] = useRealTimeClock(timezone)

  const ClockTag = CLOCK_TAG_MAP[size]

  return (
    <ClockTag className={`clock ${className}`} data-testid={dataTestId}>
      {time}
    </ClockTag>
  )
}

Clock.propTypes = {
  className: PropTypes.string,
  timezone: PropTypes.string,
  size: PropTypes.oneOf(Object.keys(CLOCK_TAG_MAP)),
  dataTestId: PropTypes.string
}

export default Clock

import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

import { getLocalTime, getTimeDifference, formatTimeDifference } from './utilities/helpers'
import App from './App'
import CityCard from './components/CityCard'

const myCity = {
  name: 'Cebu City',
  timezone: 'Asia/Manila'
}

const setup = () => {
  render(<App />)
}

describe('My City section', () => {
  it('displays my city name', () => {
    setup()

    const myCityName = screen.getByTestId('my-city-name')
    expect(myCityName.textContent).toBe(myCity.name)
  })

  it(`displays my local time in my city's timezone`, () => {
    setup()

    const myCityTime = screen.getByTestId('my-city-time')
    expect(myCityTime.textContent).toBe(getLocalTime(myCity.timezone))
  })
})

describe('Cities section', () => {
  xit('displays an empty list by default', () => {
    setup()

    const cityList = screen.getByTestId('city-list')
    expect(cityList).toBeEmptyDOMElement()
  })

  it('displays an enabled "Add city" button', () => {
    setup()

    const addCityButton = screen.getByRole('button', { name: 'Add city' })
    expect(addCityButton).toBeEnabled()
  })
})

describe('City Card component', () => {
  const city = {
    name: 'London',
    label: 'Nice city',
    timezone: 'Europe/London',
    timezoneAbbreviation: 'BST'
  }

  const setup = () => {
    render(<CityCard city={city} baseCity={myCity} />)
  }

  it('displays city name', () => {
    setup()

    const cityName = screen.getByTestId('city-name')
    expect(cityName.textContent).toBe(city.name)
  })

  it('displays city label', () => {
    setup()

    const cityLabel = screen.getByTestId('city-label')
    expect(cityLabel.textContent).toBe(city.label)
  })

  it('displays city time', () => {
    setup()

    const cityTime = screen.getByTestId('city-time')
    expect(cityTime.textContent).toBe(getLocalTime(city.timezone))
  })

  it('displays city timezone abbreviation', () => {
    setup()

    const cityTmzAbbrev = screen.getByTestId('city-tmz-abbrev')
    expect(cityTmzAbbrev.textContent).toBe(city.timezoneAbbreviation)
  })

  it(`displays time difference between the city's timezone and the base timezone`, () => {
    setup()

    const cityTimeDiff = screen.getByTestId('city-time-diff')
    expect(cityTimeDiff.textContent).toBe(
      formatTimeDifference(getTimeDifference(myCity.timezone, city.timezone), myCity.name)
    )
  })
})

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

  it(`displays "Add city" modal after clicking "Add city" button`, () => {
    setup()

    expect(screen.queryByTestId('modal')).not.toBeInTheDocument()

    const addCityButton = screen.getByRole('button', { name: 'Add city' })
    userEvent.click(addCityButton)

    expect(screen.getByTestId('modal')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Add City' })).toBeInTheDocument()
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

describe('Add modal', () => {
  const setup = () => {
    render(<App />)

    const addCityButton = screen.getByRole('button', { name: 'Add city' })
    userEvent.click(addCityButton)
  }

  describe('Layout', () => {
    it('displays "Add city" modal header', () => {
      setup()
      const header = screen.getByRole('heading', { name: 'Add City' })
      expect(header).toBeInTheDocument()
    })

    it('displays close button', () => {
      setup()
      const closeButton = screen.getByTestId('close-button')
      expect(closeButton).toBeInTheDocument()
    })

    it('displays city name input field', () => {
      setup()
      const cityNameField = screen.getByLabelText('Name of city')
      expect(cityNameField).toBeInTheDocument()
    })

    it('displays short label input field', () => {
      setup()
      const shortLabel = screen.getByLabelText('Short label')
      expect(shortLabel).toBeInTheDocument()
    })

    it('displays save button', () => {
      setup()
      const saveButton = screen.getByRole('button', { name: 'Save' })
      expect(saveButton).toBeInTheDocument()
    })
  })

  describe('Interaction', () => {
    it('can close modal', () => {
      setup()
      const closeButton = screen.getByTestId('close-button')
      userEvent.click(closeButton)

      expect(screen.queryByRole('heading', { name: 'Add City' })).not.toBeInTheDocument()
    })

    it(`cannot input more than 20 characters in Short label field`, () => {
      setup()

      const inputText = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      const allowedText = inputText.slice(0, 20)

      userEvent.type(screen.getByLabelText('Short label'), inputText)

      expect(screen.getByLabelText('Short label')).toHaveValue(allowedText)
    })

    it(`should show validation error when saving the form without a city name value`, () => {
      setup()

      userEvent.clear(screen.getByLabelText('Name of city'))

      const saveButton = screen.getByRole('button', { name: 'Save' })
      userEvent.click(saveButton)

      expect(screen.getByText('Please select a city name')).toBeInTheDocument()
    })

    it(`hides validation error when user starts typing on the city name field`, () => {
      setup()

      userEvent.clear(screen.getByLabelText('Name of city'))

      const saveButton = screen.getByRole('button', { name: 'Save' })
      userEvent.click(saveButton)

      userEvent.type(screen.getByLabelText('Name of city'), 'test')

      expect(screen.queryByText('Please select a city name')).not.toBeInTheDocument()
    })
  })
})

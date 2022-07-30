import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

import { getLocalTime, getTimeDifference, formatTimeDifference } from './utilities/helpers'
import App from './App'
import CityCard from './components/CityCard'

const myCity = {
  name: 'Cebu City',
  timezone: 'Asia/Manila'
}

const ALLOWED_CITIES = [
  {
    label: 'Singapore',
    value: 'Asia/Singapore'
  },
  {
    label: 'Tokyo',
    value: 'Asia/Tokyo'
  },
  {
    label: 'Seoul',
    value: 'Asia/Seoul'
  },
  {
    label: 'Melbourne',
    value: 'Australia/Melbourne'
  },
  {
    label: 'Sydney',
    value: 'Australia/Sydney'
  },
  {
    label: 'London',
    value: 'Europe/London'
  },
  {
    label: 'Paris',
    value: 'Europe/Paris'
  },
  {
    label: 'Berlin',
    value: 'Europe/Berlin'
  },
  {
    label: 'New York',
    value: 'America/New_York'
  },
  {
    label: 'Los Angeles',
    value: 'America/Los_Angeles'
  }
]

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

    it('shows only the allowed cities in the city name options', async () => {
      setup()

      userEvent.click(screen.getByTestId('name-select-field-container'))
      await screen.findByTestId('name-select-menu')

      const options = screen.getAllByTestId('name-select-option')

      expect(options.length).toBe(ALLOWED_CITIES.length)

      options.forEach((option, index) => {
        expect(option.textContent).toBe(ALLOWED_CITIES[index].label)
      })
    })

    it(`should show validation error when saving the form without a selected city name`, () => {
      setup()

      userEvent.clear(screen.getByLabelText('Name of city'))

      const saveButton = screen.getByRole('button', { name: 'Save' })
      userEvent.click(saveButton)

      expect(screen.getByText('Please select a city name')).toBeInTheDocument()
    })

    it(`hides validation error when user already selected a city name`, async () => {
      setup()

      userEvent.clear(screen.getByLabelText('Name of city'))

      const saveButton = screen.getByRole('button', { name: 'Save' })
      userEvent.click(saveButton)

      userEvent.click(screen.getByTestId('name-select-field-container'))
      await screen.findByTestId('name-select-menu')
      userEvent.click(screen.getAllByTestId('name-select-option')[0])

      expect(screen.queryByText('Please select a city name')).not.toBeInTheDocument()
    })

    xit('can add a new city without description', async () => {
      setup()

      const closeButton = screen.getByTestId('close-button')
      userEvent.click(closeButton)

      // Check the existing cities
      const existingCities = screen.getAllByTestId('city-item')
      console.log(existingCities)
      // existingCities.forEach((cityItem, index) => {
      //   expect(cityItem.textContent).toBe(ALLOWED_CITIES[index].label)
      // })

      // expect(screen.getAllByTestId('city-item').length).toBe(0)

      // // Open modal
      // setup()

      // // Select the first city
      // userEvent.click(screen.getByTestId('name-select-field-container'))
      // await screen.findByTestId('name-select-menu')

      // const selectedCity = screen.getAllByTestId('name-select-option')[0]
      // userEvent.click(selectedCity)

      // // Save
      // userEvent.click(screen.getByRole('button', { name: 'Save' }))

      // // Wait for modal to be removed
      // await waitForElementToBeRemoved(screen.queryByRole('heading', { name: 'Add City' }))

      // // Get all cities
      // const cityItems = screen.getAllByTestId('city-item')

      // // Expect the selected city to be in the cities list
      // expect(cityItems.length).toBe(existingCitiesLength + 1)
      // expect(cityItems[cityItems.length - 1].textContent).toBe(selectedCity.textContent)
    })

    xit('does not include the already added cities in the city name options', async () => {
      setup()

      // Select the first city
      userEvent.click(screen.getByTestId('name-select-field-container'))
      await screen.findByTestId('name-select-menu')
      userEvent.click(screen.getAllByTestId('name-select-option')[0])

      // Save
      userEvent.click(screen.getByRole('button', { name: 'Save' }))

      // Wait for modal to be removed
      await waitForElementToBeRemoved(screen.queryByRole('heading', { name: 'Add City' }))

      // Open the modal again
      userEvent.click(screen.getByRole('button', { name: 'Add city' }))

      // Open select city dropdown
      userEvent.click(screen.getByTestId('name-select-field-container'))
      await screen.findByTestId('name-select-menu')
      const options = screen.getAllByTestId('name-select-option')

      // Expect the first city not to be in the dropdown
      expect(options.length).toBe(ALLOWED_CITIES.length - 1)
      expect(options[0].textContent).toBe(ALLOWED_CITIES[1].label)
    })

    it(`cannot input more than 20 characters in Short label field`, () => {
      setup()

      const inputText = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      const allowedText = inputText.slice(0, 20)

      userEvent.type(screen.getByLabelText('Short label'), inputText)

      expect(screen.getByLabelText('Short label')).toHaveValue(allowedText)
    })

    xit('can add a new city with description', async () => {
      setup()
    })
  })
})

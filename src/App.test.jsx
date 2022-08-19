import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

import { myCity, ALLOWED_CITIES } from './utilities/constants'
import { getLocalTime, getTimeDifference, formatTimeDifference } from './utilities/helpers'

import App from './App'
import StoreProvider from './store/StoreProvider'
import CityCard from './components/CityCard'

const setup = () => {
  render(
    <StoreProvider>
      <App />
    </StoreProvider>
  )
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

  it(`displays my city's timezone`, () => {
    setup()

    const myCityTimeZone = screen.getByTestId('my-city-tmz-abbrev')
    expect(myCityTimeZone.textContent).toBe(myCity.timezoneAbbrevation)
  })

  it('displays an enabled "Add city" button', () => {
    setup()

    const addCityButton = screen.getByTestId('header-add-city-button')
    expect(addCityButton).toBeEnabled()
  })

  it(`displays "Add city" modal after clicking "Add city" button`, () => {
    setup()

    expect(screen.queryByTestId('add-modal-open-indicator')).not.toBeInTheDocument()

    const addCityButton = screen.getByTestId('header-add-city-button')
    userEvent.click(addCityButton)

    expect(screen.getByTestId('add-modal')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Add City' })).toBeInTheDocument()
  })
})

describe('Cities section', () => {
  it('displays an empty list by default', () => {
    setup()

    const cityList = screen.queryAllByTestId('city-item')
    expect(cityList.length).toBe(0)
  })
})

describe('Addding a city', () => {
  const setup = () => {
    render(
      <StoreProvider>
        <App />
      </StoreProvider>
    )

    const addCityButton = screen.getByTestId('header-add-city-button')
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
      const closeButton = screen.getByTestId('add-close-button')
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
    it('can close modal through "X" button', () => {
      setup()
      const closeButton = screen.getByTestId('add-close-button')
      userEvent.click(closeButton)

      expect(screen.queryByTestId('add-modal-open-indicator')).not.toBeInTheDocument()
    })

    it('shows only the allowed cities in the city name options', async () => {
      setup()

      userEvent.click(screen.getByTestId('timezone-select-field-container'))
      await screen.findByTestId('timezone-select-menu')

      const options = screen.getAllByTestId('timezone-select-option')

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

      userEvent.click(screen.getByTestId('timezone-select-field-container'))
      await screen.findByTestId('timezone-select-menu')
      userEvent.click(screen.getAllByTestId('timezone-select-option')[0])

      expect(screen.queryByText('Please select a city name')).not.toBeInTheDocument()
    })

    it('can add a new city without short label', async () => {
      render(
        <StoreProvider>
          <App />
        </StoreProvider>
      )
      // Check the existing cities
      expect(screen.queryAllByTestId('city-item').length).toBe(0)

      // Open modal
      userEvent.click(screen.getByTestId('header-add-city-button'))

      // Select the 2nd city in the options
      userEvent.click(screen.getByTestId('timezone-select-field-container'))
      await screen.findByTestId('timezone-select-menu')
      userEvent.click(screen.getAllByTestId('timezone-select-option')[1])

      // Save
      userEvent.click(screen.getByRole('button', { name: 'Save' }))

      // Wait for modal to be removed
      await waitForElementToBeRemoved(() => screen.queryByTestId('add-modal-open-indicator'))

      // Get all cities
      const cityList = screen.getAllByTestId('city-item')

      // Expected output when selecting the 2nd city
      const expectedOutput = {
        name: ALLOWED_CITIES[1].value.split('/')[1].replace('_', ' '),
        label: '',
        timezone: ALLOWED_CITIES[1].value,
        timezoneAbbreviation: 'JST'
      }

      // Expect the selected city to be in the cities list
      expect(cityList.length).toBe(1)
      expect(screen.getByTestId('city-name').textContent).toBe(expectedOutput.name)
      expect(screen.getByTestId('city-label').textContent).toBe(expectedOutput.label)
      expect(screen.getByTestId('city-time').textContent).toBe(
        getLocalTime(expectedOutput.timezone)
      )
      expect(screen.getByTestId('city-tmz-abbrev').textContent).toBe(
        expectedOutput.timezoneAbbreviation
      )
      expect(screen.getByTestId('city-time-diff').textContent).toBe(
        formatTimeDifference(
          getTimeDifference(myCity.timezone, expectedOutput.timezone),
          myCity.name
        )
      )
    })

    it('can add a new city with short label', async () => {
      render(
        <StoreProvider>
          <App />
        </StoreProvider>
      )

      // Check the existing cities
      expect(screen.queryAllByTestId('city-item').length).toBe(0)

      // Open modal
      userEvent.click(screen.getByTestId('header-add-city-button'))

      // Select the 2nd city in the options
      userEvent.click(screen.getByTestId('timezone-select-field-container'))
      await screen.findByTestId('timezone-select-menu')
      userEvent.click(screen.getAllByTestId('timezone-select-option')[1])

      // Input a short label
      userEvent.type(screen.getByLabelText('Short label'), 'test label')

      // Save
      userEvent.click(screen.getByRole('button', { name: 'Save' }))

      // Wait for modal to be removed
      await waitForElementToBeRemoved(() => screen.queryByTestId('add-modal-open-indicator'))

      // Get all cities
      const cityList = screen.getAllByTestId('city-item')

      // Expected output when selecting the 2nd city
      const expectedOutput = {
        name: ALLOWED_CITIES[1].value.split('/')[1].replace('_', ' '),
        label: 'test label',
        timezone: ALLOWED_CITIES[1].value,
        timezoneAbbreviation: 'JST'
      }

      // Expect the selected city to be in the cities list
      expect(cityList.length).toBe(1)
      expect(screen.getByTestId('city-name').textContent).toBe(expectedOutput.name)
      expect(screen.getByTestId('city-label').textContent).toBe(expectedOutput.label)
      expect(screen.getByTestId('city-time').textContent).toBe(
        getLocalTime(expectedOutput.timezone)
      )
      expect(screen.getByTestId('city-tmz-abbrev').textContent).toBe(
        expectedOutput.timezoneAbbreviation
      )
      expect(screen.getByTestId('city-time-diff').textContent).toBe(
        formatTimeDifference(
          getTimeDifference(myCity.timezone, expectedOutput.timezone),
          myCity.name
        )
      )
    })

    it('does not include the already added cities in the city name options', async () => {
      render(
        <StoreProvider>
          <App />
        </StoreProvider>
      )

      // Check the existing cities
      expect(screen.queryAllByTestId('city-item').length).toBe(0)

      // Open modal
      userEvent.click(screen.getByTestId('header-add-city-button'))

      // Select the 1st city in the options
      userEvent.click(screen.getByTestId('timezone-select-field-container'))
      await screen.findByTestId('timezone-select-menu')
      userEvent.click(screen.getAllByTestId('timezone-select-option')[0])

      // Save
      userEvent.click(screen.getByRole('button', { name: 'Save' }))

      // Wait for modal to be removed
      await waitForElementToBeRemoved(() => screen.queryByTestId('add-modal-open-indicator'))

      // Open the modal again
      userEvent.click(screen.getByTestId('header-add-city-button'))

      // Open select city dropdown
      userEvent.click(screen.getByTestId('timezone-select-field-container'))
      await screen.findByTestId('timezone-select-menu')
      const options = screen.getAllByTestId('timezone-select-option')

      // Expect the 1st city not to be in the dropdown
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

    it('disabled "Add city" button when there are already 4 cities in the list', async () => {
      render(
        <StoreProvider>
          <App />
        </StoreProvider>
      )

      // Add city four times
      for (let i = 0; i < 4; i++) {
        // Open modal
        userEvent.click(screen.getByTestId('header-add-city-button'))

        // Select the 2nd city in the options
        userEvent.click(screen.getByTestId('timezone-select-field-container'))
        await screen.findByTestId('timezone-select-menu')
        userEvent.click(screen.getAllByTestId('timezone-select-option')[1])

        // Save
        userEvent.click(screen.getByRole('button', { name: 'Save' }))

        // Wait for modal to be removed
        await waitForElementToBeRemoved(() => screen.queryByTestId('add-modal-open-indicator'))
      }

      const addCityButton = screen.getByTestId('header-add-city-button')
      expect(addCityButton).toBeDisabled()
    })
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

  it('displays delete city button', () => {
    setup()

    const cityDeleteButton = screen.getByTestId('city-delete-button')
    expect(cityDeleteButton).toBeInTheDocument()
  })

  it('opens Delete city confirmation modal after clicking delete button', async () => {
    render(
      <StoreProvider>
        <App />
      </StoreProvider>
    )

    expect(screen.queryByTestId('delete-modal-open-indicator')).not.toBeInTheDocument()

    // Open add modal
    userEvent.click(screen.getByTestId('header-add-city-button'))

    // Select the 2nd city in the options
    userEvent.click(screen.getByTestId('timezone-select-field-container'))
    await screen.findByTestId('timezone-select-menu')
    userEvent.click(screen.getAllByTestId('timezone-select-option')[1])

    // Save
    userEvent.click(screen.getByRole('button', { name: 'Save' }))

    // Wait for modal to be removed
    await waitForElementToBeRemoved(() => screen.queryByTestId('add-modal-open-indicator'))

    const cityDeleteButton = await screen.findByTestId('city-delete-button')
    userEvent.click(cityDeleteButton)

    expect(screen.getByTestId('delete-modal')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Delete City' })).toBeInTheDocument()
  })
})

describe('Deleting a city', () => {
  const setup = async () => {
    render(
      <StoreProvider>
        <App />
      </StoreProvider>
    )

    // Open add modal
    userEvent.click(screen.getByTestId('header-add-city-button'))

    // Select the 2nd city in the options
    userEvent.click(screen.getByTestId('timezone-select-field-container'))
    await screen.findByTestId('timezone-select-menu')
    userEvent.click(screen.getAllByTestId('timezone-select-option')[1])

    // Save
    userEvent.click(screen.getByRole('button', { name: 'Save' }))

    // Wait for modal to be removed
    await waitForElementToBeRemoved(() => screen.queryByTestId('add-modal-open-indicator'))

    const cityDeleteButton = await screen.findByTestId('city-delete-button')
    userEvent.click(cityDeleteButton)
  }

  describe('Layout', () => {
    it('displays "Delete city" modal header', async () => {
      await setup()
      const header = screen.getByRole('heading', { name: 'Delete City' })
      expect(header).toBeInTheDocument()
    })

    it('displays close button', async () => {
      await setup()
      const closeButton = screen.getByTestId('delete-close-button')
      expect(closeButton).toBeInTheDocument()
    })

    it('displays a delete confirmation message', async () => {
      await setup()
      const cityName = 'Tokyo' //2nd option from the dropdown which was added in setup fn
      const confirmationMessage = screen.getByText(
        `Are you sure you want to delete ${cityName} from the list?`
      )
      expect(confirmationMessage).toBeInTheDocument()
    })

    it('displays Delete button', async () => {
      await setup()
      const deleteButton = screen.getByTestId('delete-modal-primary-button')
      expect(deleteButton).toBeInTheDocument()
    })

    it('displays Cancel button', async () => {
      await setup()
      const cancelButton = screen.getByTestId('delete-modal-secondary-button')
      expect(cancelButton).toBeInTheDocument()
    })
  })

  describe('Interaction', () => {
    it('can close modal through "X" button', async () => {
      await setup()
      const closeButton = screen.getByTestId('delete-close-button')
      userEvent.click(closeButton)

      expect(screen.queryByTestId('delete-modal-open-indicator')).not.toBeInTheDocument()
    })

    it('closes the modal when Cancel button is clicked', async () => {
      await setup()
      const cancelButton = screen.getByTestId('delete-modal-secondary-button')
      userEvent.click(cancelButton)

      expect(screen.queryByTestId('delete-modal-open-indicator')).not.toBeInTheDocument()
    })

    it('deletes the city from the list when Delete button is clicked', async () => {
      render(
        <StoreProvider>
          <App />
        </StoreProvider>
      )

      // Open add modal
      userEvent.click(screen.getByTestId('header-add-city-button'))

      // Select the 1st city in the options
      userEvent.click(screen.getByTestId('timezone-select-field-container'))
      await screen.findByTestId('timezone-select-menu')
      userEvent.click(screen.getAllByTestId('timezone-select-option')[0])

      // Add a short label
      userEvent.type(screen.getByLabelText('Short label'), 'nice city')

      // Save
      userEvent.click(screen.getByRole('button', { name: 'Save' }))

      // Wait for modal to be removed
      await waitForElementToBeRemoved(() => screen.queryByTestId('add-modal-open-indicator'))

      // Open add modal again
      userEvent.click(screen.getByTestId('header-add-city-button'))

      // Select the 1st city in the options (2nd city in the ALLOWED_CITIES array)
      userEvent.click(screen.getByTestId('timezone-select-field-container'))
      await screen.findByTestId('timezone-select-menu')
      userEvent.click(screen.getAllByTestId('timezone-select-option')[0])

      // Add a short label
      userEvent.type(screen.getByLabelText('Short label'), 'peaceful city')

      // Save
      userEvent.click(screen.getByRole('button', { name: 'Save' }))

      // Wait for modal to be removed
      await waitForElementToBeRemoved(() => screen.queryByTestId('add-modal-open-indicator'))

      const cityCardDeleteButtons = await screen.findAllByTestId('city-delete-button')

      // Click the delete button on the 2nd city card
      userEvent.click(cityCardDeleteButtons[1])

      // Delete the city (2nd city)
      const deleteButton = screen.getByTestId('delete-modal-primary-button')
      userEvent.click(deleteButton)

      // Expected data of the 2nd city
      const expectedOutput = {
        name: ALLOWED_CITIES[1].value.split('/')[1].replace('_', ' '),
        label: 'peaceful city',
        timezone: ALLOWED_CITIES[1].value,
        timezoneAbbreviation: 'JST'
      }

      // Expect the selected city not to be in the cities list
      expect(screen.queryByTestId('city-name').textContent).not.toBe(expectedOutput.name)
      expect(screen.queryByTestId('city-label').textContent).not.toBe(expectedOutput.label)
      expect(screen.queryByTestId('city-time').textContent).not.toBe(
        getLocalTime(expectedOutput.timezone)
      )
      expect(screen.queryByTestId('city-tmz-abbrev').textContent).not.toBe(
        expectedOutput.timezoneAbbreviation
      )
      expect(screen.queryByTestId('city-time-diff').textContent).not.toBe(
        formatTimeDifference(
          getTimeDifference(myCity.timezone, expectedOutput.timezone),
          myCity.name
        )
      )
    })

    it('shows the city back in the Add city options after deleting the city from the list', async () => {
      render(
        <StoreProvider>
          <App />
        </StoreProvider>
      )

      // Open add modal
      userEvent.click(screen.getByTestId('header-add-city-button'))

      // Select the 1st city in the options
      userEvent.click(screen.getByTestId('timezone-select-field-container'))
      await screen.findByTestId('timezone-select-menu')
      userEvent.click(screen.getAllByTestId('timezone-select-option')[0])

      // Save
      userEvent.click(screen.getByRole('button', { name: 'Save' }))

      // Wait for modal to be removed
      await waitForElementToBeRemoved(() => screen.queryByTestId('add-modal-open-indicator'))

      // Open add modal again
      userEvent.click(screen.getByTestId('header-add-city-button'))

      // Open select city dropdown
      userEvent.click(screen.getByTestId('timezone-select-field-container'))
      await screen.findByTestId('timezone-select-menu')
      const optionsBefore = screen.getAllByTestId('timezone-select-option')

      // Expect the 1st city not to be in the dropdown
      expect(optionsBefore.length).toBe(ALLOWED_CITIES.length - 1)
      expect(optionsBefore[0].textContent).toBe(ALLOWED_CITIES[1].label)

      // Close modal
      userEvent.click(screen.getByTestId('add-close-button'))

      // Click the delete button on the 1st city card
      userEvent.click(await screen.findByTestId('city-delete-button'))

      // Delete the 1st city
      const deleteButton = screen.getByTestId('delete-modal-primary-button')
      userEvent.click(deleteButton)

      // Open add modal again
      userEvent.click(screen.getByTestId('header-add-city-button'))

      // Open select city dropdown
      userEvent.click(screen.getByTestId('timezone-select-field-container'))
      await screen.findByTestId('timezone-select-menu')
      const optionsAfter = screen.getAllByTestId('timezone-select-option')

      // Expect the 1st city to be back in the dropdown
      expect(optionsAfter.length).toBe(ALLOWED_CITIES.length)
      expect(optionsAfter[0].textContent).toBe(ALLOWED_CITIES[0].label)
    })
  })
})

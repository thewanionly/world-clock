import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import App from './App'

const myCity = 'Cebu City'
const myTImeZone = 'Asia/Manila'

const setup = () => {
  render(<App />)
}

const getLocalTime = (timeZone) => {
  return new Date().toLocaleString('en-US', {
    timeZone,
    hour: 'numeric',
    minute: 'numeric',
    hour12: false
  })
}

describe('My City section', () => {
  it('displays my city name', () => {
    setup()

    const myCityName = screen.getByTestId('my-city-name')
    expect(myCityName.textContent).toBe(myCity)
  })

  it(`displays my local time in my city's timezone`, () => {
    setup()

    const myCityTime = screen.getByTestId('my-city-time')
    expect(myCityTime.textContent).toBe(getLocalTime(myTImeZone))
  })
})

describe('Cities section', () => {
  it('displays an empty list by default', () => {
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

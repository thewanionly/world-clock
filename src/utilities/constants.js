const myCity = {
  name: 'Cebu City',
  timezone: 'Asia/Manila',
  timezoneAbbrevation: 'PST'
}

const API_URL = 'https://worldtimeapi.org/api/timezone'

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

export { myCity, ALLOWED_CITIES, API_URL }

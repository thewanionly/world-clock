import { memo, useState, useRef } from 'react'
import Input from './Input'
import Select from './Select'
import Modal from './Modal'

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

const AddCityModal = memo(({ cities, setCities, handleClose }) => {
  const formRef = useRef(null)
  const [fields, setFields] = useState({
    timezone: '',
    label: ''
  })
  const [errors, setErrors] = useState({
    timezone: '',
    label: ''
  })

  const [isSaving, setIsSaving] = useState(false)

  const validCityOptions = ALLOWED_CITIES.filter(
    ({ value }) => !cities.length || !cities.some(({ timezone }) => timezone === value)
  )

  const handleFieldChange = (event) => {
    const { name, value } = event.target

    setFields((prevFields) => ({
      ...prevFields,
      [name]: value
    }))
  }

  const handleSelectFieldChange = (name, value) => {
    setFields((prevFields) => ({
      ...prevFields,
      [name]: value
    }))

    if (name && errors[name]) {
      handleErrorChange(name, '')
    }
  }

  const handleErrorChange = (name, value) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value
    }))
  }

  const handleSave = async () => {
    if (formRef.current.checkValidity()) {
      try {
        // Set isLoading to true
        setIsSaving(true)

        const response = await fetch(`${API_URL}/${fields.timezone}`)
        const data = await response.json()

        if (!response.ok) throw new Error(`Error fetching data: (${response.status})`)

        // Add the city to the city list
        setCities((prevCities) => [
          ...prevCities,
          {
            name: data.timezone.split('/')[1].replace('_', ' '),
            label: fields.label,
            timezone: data.timezone,
            timezoneAbbreviation: data.abbreviation
          }
        ])

        // Set isLoading to false
        setIsSaving(false)

        // Close modal
        handleClose()
      } catch (error) {
        console.error(error)

        // Set isLoading to false
        setIsSaving(false)
      }
    } else {
      formRef.current.reportValidity()
      handleErrorChange('timezone', 'Please select a city name')
    }
  }

  const primaryButton = {
    label: 'Save',
    handler: handleSave
  }

  return (
    <Modal title='Add City' handleClose={handleClose} primaryButton={primaryButton}>
      <form ref={formRef} className='form-group'>
        <Select
          className='form-input'
          label='Name of city'
          placeholder='Select a city...'
          id='timezone'
          name='timezone'
          options={validCityOptions}
          value={validCityOptions.find(({ value }) => value === fields.timezone)?.label || ''}
          onChange={handleSelectFieldChange}
          required
          error={errors.timezone}
        />
        <Input
          className='form-input'
          label='Short label'
          description='Add a short label (up to 20 characters)'
          id='label'
          name='label'
          type='textarea'
          maxLength='20'
          value={fields.label}
          onChange={handleFieldChange}
          error={errors.label}
        />
      </form>
    </Modal>
  )
})

export default AddCityModal

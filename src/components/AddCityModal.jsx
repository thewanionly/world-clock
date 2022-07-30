import { memo, useContext, useState, useRef } from 'react'
import { toast } from 'react-toastify'

import { ALLOWED_CITIES, API_URL } from '../utilities/constants'
import StoreContext from '../store/storeContext'
import Input from './Input'
import Select from './Select'
import Modal from './Modal'

const AddCityModal = memo(() => {
  const formRef = useRef(null)
  const { cities, setCities, handleClose, setIsModalSaving } = useContext(StoreContext)

  const [fields, setFields] = useState({
    timezone: '',
    label: ''
  })
  const [errors, setErrors] = useState({
    timezone: '',
    label: ''
  })

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
      let toastId
      const toastOptions = {
        isLoading: false,
        autoClose: 5000,
        closeButton: true
      }

      const cityName = fields.timezone.split('/')[1].replace('_', ' ')

      try {
        // Set isLoading to true
        setIsModalSaving(true)
        toastId = toast.loading(`Adding ${cityName} to the list. Please wait...`)

        const response = await fetch(`${API_URL}/${fields.timezone}`)
        const data = await response.json()

        if (!response.ok) throw new Error(`Error fetching data: (${response.status})`)

        // Add the city to the city list
        setCities((prevCities) => [
          ...prevCities,
          {
            name: cityName,
            label: fields.label,
            timezone: data.timezone,
            timezoneAbbreviation: data.abbreviation
          }
        ])

        toast.update(toastId, {
          render: `Added ${cityName} to the list successfully`,
          type: 'success',
          ...toastOptions
        })

        // Set isLoading to false
        setIsModalSaving(false)

        // Close modal
        handleClose()
      } catch (error) {
        console.error(error)

        toast.update(toastId, {
          render: `Problem adding ${cityName} to the list. Please check the console for errors.`,
          type: 'error',
          ...toastOptions
        })

        // Set isLoading to false
        setIsModalSaving(false)
      }
    } else {
      formRef.current.reportValidity()
      handleErrorChange('timezone', 'Please select a city name')
    }
  }

  const primaryButton = {
    label: 'Save',
    labelLoading: 'Saving...',
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

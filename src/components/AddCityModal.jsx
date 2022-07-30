import { memo, useState, useRef } from 'react'
import Input from './Input'
import Select from './Select'
import Modal from './Modal'

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

const AddCityModal = memo(({ handleClose }) => {
  const formRef = useRef(null)
  const [fields, setFields] = useState({
    name: '',
    label: ''
  })
  const [errors, setErrors] = useState({
    name: '',
    label: ''
  })

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

  const handleSave = () => {
    if (formRef.current.checkValidity()) {
      console.log('save', fields)
    } else {
      formRef.current.reportValidity()
      handleErrorChange('name', 'Please select a city name')
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
          id='name'
          name='name'
          options={ALLOWED_CITIES}
          value={fields.name}
          onChange={handleSelectFieldChange}
          required
          error={errors.name}
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

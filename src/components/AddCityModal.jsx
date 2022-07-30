import { memo, useState, useRef } from 'react'
import Input from './Input'
import Modal from './Modal'

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

    if (name && errors[name]) {
      handleErrorChange(name, '')
    }
  }

  const handleErrorChange = (name, value) => {
    setErrors((prevFields) => ({
      ...prevFields,
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
        <Input
          className='form-input'
          label='Name of city'
          id='name'
          name='name'
          value={fields.name}
          onChange={handleFieldChange}
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

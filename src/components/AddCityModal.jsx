import { memo, useState, useRef } from 'react'
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
      <form ref={formRef}>
        <div>
          <label htmlFor='name'>Name of city</label>
          <input
            id='name'
            type='text'
            name='name'
            value={fields.name}
            onChange={handleFieldChange}
            required
          />
          {errors.name && <span>{errors.name}</span>}
        </div>
        <div>
          <label htmlFor='label'>Short label</label>
          <textarea
            id='label'
            name='label'
            maxLength='20'
            value={fields.label}
            onChange={handleFieldChange}
          />
          {errors.label && <span>{errors.label}</span>}
        </div>
      </form>
    </Modal>
  )
})

export default AddCityModal

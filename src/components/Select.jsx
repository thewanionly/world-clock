import PropTypes from 'prop-types'

import { useState } from 'react'

const Select = ({
  className = '',
  id,
  name,
  label,
  description,
  options = [],
  value,
  onChange,
  required,
  error
}) => {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false)

  const handleToggleOptions = () => {
    setIsOptionsOpen((prevValue) => !prevValue)
  }

  const handleCloseOptions = () => {
    setIsOptionsOpen(false)
  }

  const handleSelectOption = (e, value) => {
    e.stopPropagation()
    onChange(name, value)
    handleCloseOptions()
  }

  return (
    <div className={`select ${className}`}>
      <label className='select__label' htmlFor={id}>
        {label}
      </label>
      {required && <span className='select__required-indicator'>*</span>}
      {description && <p className='select__description'>{description}</p>}
      <div
        className={`select__container ${error ? 'has-error' : ''} ${
          isOptionsOpen ? 'is-focused' : ''
        }`}
        onClick={handleToggleOptions}
      >
        <div data-testid={`${id}-select-field-container`} className='select__field-container'>
          <input
            data-testid={`${id}-select-field`}
            className='select__field'
            id={id}
            name={name}
            value={value}
            required={required}
            onChange={() => {}}
            autoComplete='off'
          />
        </div>
        <div
          data-testid={`${id}-select-menu`}
          className={`select__menu ${!isOptionsOpen ? ' hide' : ''}`}
        >
          {options.map(({ value, label }) => (
            <div
              data-testid={`${id}-select-option`}
              className='select__option'
              key={value}
              onClick={(e) => handleSelectOption(e, value)}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
      {error && <p className='select__error'>{error}</p>}
    </div>
  )
}

Select.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  description: PropTypes.string,
  options: PropTypes.array,
  value: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  error: PropTypes.string
}

export default Select

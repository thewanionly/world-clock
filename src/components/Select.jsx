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

  const handleSelectOption = (value) => {
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
      >
        <div
          data-testid={`${id}-select-field-container`}
          className='select__field-container'
          onClick={handleToggleOptions}
        >
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
              onClick={() => handleSelectOption(value)}
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

export default Select

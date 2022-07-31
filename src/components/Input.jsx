import PropTypes from 'prop-types'

const Input = ({
  className = '',
  id,
  name,
  label,
  description,
  type = 'text',
  value,
  maxLength,
  onChange,
  required,
  error
}) => {
  return (
    <div className={`input ${className}`}>
      <label className='input__label' htmlFor={id}>
        {label}
      </label>
      {required && <span className='input__required-indicator'>*</span>}
      {description && <p className='input__description'>{description}</p>}
      <div className={`input__container ${error ? 'has-error' : ''}`}>
        <input
          className='input__field'
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          maxLength={maxLength}
        />
      </div>
      {error && <p className='input__error'>{error}</p>}
    </div>
  )
}

Input.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  description: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  maxLength: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  error: PropTypes.string
}

export default Input

import PropTypes from 'prop-types'

const Button = ({ className = '', onClick, children, disabled, dataTestId }) => {
  return (
    <button
      className={`button ${className}`}
      onClick={onClick}
      disabled={disabled}
      data-testid={dataTestId}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  disabled: PropTypes.bool,
  dataTestId: PropTypes.string
}

export default Button

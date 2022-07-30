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

export default Button

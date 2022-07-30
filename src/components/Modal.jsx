const Modal = ({ title, handleClose, primaryButton, secondaryButton, children }) => {
  return (
    <div className='modal' data-testid='modal'>
      <div className='modal__content'>
        <div className='modal__header'>
          <h2 className='modal__title'>{title}</h2>
          <span
            className='modal__close-button'
            data-testid='close-button'
            onClick={handleClose}
          ></span>
        </div>
        <div className='modal__body'>{children}</div>
        <div className='modal__footer'>
          {primaryButton && (
            <button className='modal__primary-button' onClick={primaryButton.handler}>
              {primaryButton.label}
            </button>
          )}
          {secondaryButton && (
            <button className='modal__secondary-button' onClick={secondaryButton.handler}>
              {secondaryButton.label}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Modal

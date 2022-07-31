import PropTypes from 'prop-types'

import { useContext } from 'react'

import StoreContext from '../store/storeContext'
import Button from './Button'

const Modal = ({ id, className, title, handleClose, primaryButton, secondaryButton, children }) => {
  const { isModalSaving } = useContext(StoreContext)

  return (
    <div className={`modal ${className}`} data-testid={`${id}-modal`}>
      <div className='modal__content'>
        <div className='modal__header'>
          <h3 className='modal__title'>{title}</h3>
          <span
            className='modal__close-button'
            data-testid={`${id}-close-button`}
            onClick={handleClose}
          ></span>
        </div>
        <div className='modal__body'>{children}</div>
        <div className='modal__footer'>
          {primaryButton && (
            <Button
              dataTestId={`${id}-modal-primary-button`}
              className={`modal__primary-button ${
                primaryButton.isDanger ? 'button__danger' : 'button__primary'
              }`}
              onClick={primaryButton.handler}
              disabled={isModalSaving}
            >
              <span>
                {!isModalSaving
                  ? primaryButton.label
                  : primaryButton.labelLoading || primaryButton.label}
              </span>
            </Button>
          )}
          {secondaryButton && (
            <Button
              dataTestId={`${id}-modal-secondary-button`}
              className='modal__secondary-button button__secondary'
              onClick={secondaryButton.handler}
              disabled={isModalSaving}
            >
              <span>{!isModalSaving ? secondaryButton.label : secondaryButton.labelLoading}</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

Modal.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  title: PropTypes.string,
  handleClose: PropTypes.func,
  primaryButton: PropTypes.object,
  secondaryButton: PropTypes.object,
  children: PropTypes.element
}
export default Modal

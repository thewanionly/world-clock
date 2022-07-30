import { useState, useCallback } from 'react'

import StoreContext from './storeContext'

const StoreProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false)
  const [cities, setCities] = useState([])
  const [isModalSaving, setIsModalSaving] = useState(false)

  const handleShowModal = (modalType, modalData) => {
    setShowModal({ type: modalType, data: modalData })
  }

  const handleCloseModal = useCallback(() => {
    setShowModal(false)
  }, [])

  return (
    <StoreContext.Provider
      value={{
        cities,
        setCities,
        showModal,
        handleShowModal,
        handleClose: handleCloseModal,
        isModalSaving,
        setIsModalSaving
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export default StoreProvider

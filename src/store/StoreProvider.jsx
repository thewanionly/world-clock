import { useState, useCallback } from 'react'

import StoreContext from './storeContext'

const StoreProvider = ({ children }) => {
  const [modalType, setModalType] = useState()
  const [modalData, setModalData] = useState()
  const [cities, setCities] = useState([])
  const [isModalSaving, setIsModalSaving] = useState(false)

  const handleShowModal = (modalType, modalData) => {
    setModalType(modalType)
    setModalData(modalData)
  }

  const handleCloseModal = useCallback(() => {
    setModalType(null)
  }, [])

  return (
    <StoreContext.Provider
      value={{
        cities,
        setCities,
        modalType,
        modalData,
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

import { useCallback, useState } from 'react'

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

  const handleAddCity = useCallback((newCity) => {
    setCities((prevCities) => [...prevCities, newCity])
  }, [])

  const handleDeleteCity = useCallback((toDeleteCity) => {
    setCities((prevCities) => prevCities.filter((city) => city.timezone !== toDeleteCity.timezone))
  }, [])

  return (
    <StoreContext.Provider
      value={{
        cities,
        handleAddCity,
        handleDeleteCity,
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

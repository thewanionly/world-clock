import { useCallback, useState } from 'react'

import { myCity } from './utilities/constants'

import AddCityModal from './components/AddCityModal'
import DeleteCityModal from './components/DeleteCityModal'
import Header from './components/Header'
import Cities from './components/Cities'

const App = () => {
  const [showModal, setShowModal] = useState(false)
  const [cities, setCities] = useState([])

  const handleShowModal = (modalType, modalData) => {
    setShowModal({ type: modalType, data: modalData })
  }

  const handleCloseModal = useCallback(() => {
    setShowModal(false)
  }, [])

  return (
    <div className='app'>
      {showModal.type === 'add' && (
        <AddCityModal cities={cities} setCities={setCities} handleClose={handleCloseModal} />
      )}
      {showModal.type === 'delete' && (
        <DeleteCityModal
          data={showModal.data}
          setCities={setCities}
          handleClose={handleCloseModal}
        />
      )}
      <Header cities={cities} handleShowModal={handleShowModal} />
      <Cities baseCity={myCity} cities={cities} handleShowModal={handleShowModal} />
    </div>
  )
}

export default App

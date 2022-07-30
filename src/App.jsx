import { useCallback, useState } from 'react'

import { useRealTimeClock } from './utilities/hooks'

import AddCityModal from './components/AddCityModal'
import DeleteCityModal from './components/DeleteCityModal'
import Cities from './components/Cities'

const App = () => {
  const myCity = {
    name: 'Cebu City',
    timezone: 'Asia/Manila',
    timezoneAbbrevation: 'PST'
  }

  const [myLocalTime] = useRealTimeClock(myCity.timezone)
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
      <section className='my-city'>
        <div className='container'>
          <h3 data-testid='my-city-name'>{myCity.name}</h3>
          <h1 data-testid='my-city-time'>{myLocalTime}</h1>
          <h4 data-testid='my-city-tmz-abbrev'>{myCity.timezoneAbbrevation}</h4>
        </div>
      </section>
      <Cities baseCity={myCity} cities={cities} handleShowModal={handleShowModal} />
    </div>
  )
}

export default App

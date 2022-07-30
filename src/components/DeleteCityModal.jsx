import { memo, useContext } from 'react'

import StoreContext from '../store/storeContext'
import Modal from './Modal'

const DeleteCityModal = memo(({ data }) => {
  const { setCities, handleClose } = useContext(StoreContext)

  const handleDelete = () => {
    setCities((prevCities) => prevCities.filter((city) => city.timezone !== data.timezone))

    handleClose()
  }

  const primaryButton = {
    label: 'Delete',
    handler: handleDelete,
    isDanger: true
  }

  const secondaryButton = {
    label: 'Cancel',
    handler: handleClose
  }

  return (
    <Modal
      title='Delete City'
      handleClose={handleClose}
      primaryButton={primaryButton}
      secondaryButton={secondaryButton}
    >
      <p>Are you sure you want to delete this city from the list?</p>
    </Modal>
  )
})

export default DeleteCityModal

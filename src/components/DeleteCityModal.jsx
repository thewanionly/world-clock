import { memo, useContext } from 'react'
import { toast } from 'react-toastify'

import StoreContext from '../store/storeContext'
import Modal from './Modal'

const DeleteCityModal = memo(() => {
  const { setCities, handleClose, modalType, modalData = {} } = useContext(StoreContext)

  const handleDelete = () => {
    try {
      setCities((prevCities) => prevCities.filter((city) => city.timezone !== modalData.timezone))
      toast.success(`Deleted ${modalData.name} from the list successfully`)

      handleClose()
    } catch (error) {
      console.error(error)
      toast.error(
        `Problem deleting ${modalData.name} from the list. Please check the console for errors.`
      )
    }
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
      id='delete'
      title='Delete City'
      isVisible={modalType === 'delete'}
      handleClose={handleClose}
      primaryButton={primaryButton}
      secondaryButton={secondaryButton}
    >
      <p>{`Are you sure you want to delete ${modalData.name} from the list?`}</p>
    </Modal>
  )
})

export default DeleteCityModal

import { memo, useContext } from 'react'
import { toast } from 'react-toastify'

import StoreContext from '../store/storeContext'
import Modal from './Modal'

const DeleteCityModal = memo(() => {
  const { setCities, handleClose, showModal } = useContext(StoreContext)

  const { data = {} } = showModal || {}

  const handleDelete = () => {
    try {
      setCities((prevCities) => prevCities.filter((city) => city.timezone !== data.timezone))
      toast.success(`Deleted ${data.name} from the list successfully`)

      handleClose()
    } catch (error) {
      console.error(error)
      toast.error(
        `Problem deleting ${data.name} from the list. Please check the console for errors.`
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
      isVisible={showModal.type === 'delete'}
      handleClose={handleClose}
      primaryButton={primaryButton}
      secondaryButton={secondaryButton}
    >
      <p>{`Are you sure you want to delete ${data.name} from the list?`}</p>
    </Modal>
  )
})

export default DeleteCityModal

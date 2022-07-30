import { memo, useState, useRef } from 'react'

import Modal from './Modal'

const DeleteCityModal = memo(({ handleClose }) => {
  return <Modal title='Delete City' handleClose={handleClose}></Modal>
})

export default DeleteCityModal

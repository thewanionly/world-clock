import { useContext } from 'react'

import StoreContext from '../store/storeContext'

import { ReactComponent as EmptyCitiesImg } from '../assets/images/no_time.svg'
import Button from './Button'

const EmptyCities = () => {
  const { handleShowModal } = useContext(StoreContext)

  return (
    <div className='empty-cities-state'>
      <EmptyCitiesImg className='empty-cities-state__img' />
      <h3 className='empty-cities-state__primary-text'>No cities to show</h3>
      <p className='empty-cities-state__secondary-text'>
        Click on "Add city" button below to add a city. You can only add up to 4 cities.
      </p>
      <Button className='button__primary' onClick={() => handleShowModal('add')}>
        Add city
      </Button>
    </div>
  )
}

export default EmptyCities

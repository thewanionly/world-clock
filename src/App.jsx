import { useContext } from 'react'

import { ToastContainer } from 'react-toastify'

import StoreContext from './store/storeContext'
import AddCityModal from './components/AddCityModal'
import DeleteCityModal from './components/DeleteCityModal'
import Header from './components/Header'
import Cities from './components/Cities'

import 'react-toastify/dist/ReactToastify.css'
import './styles/main.scss'

const App = () => {
  const { showModal } = useContext(StoreContext)

  return (
    <div className='app'>
      <ToastContainer />
      {showModal.type === 'add' && <AddCityModal />}
      {showModal.type === 'delete' && <DeleteCityModal data={showModal.data} />}
      <Header />
      <Cities />
    </div>
  )
}

export default App

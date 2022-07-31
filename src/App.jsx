import { ToastContainer } from 'react-toastify'

import AddCityModal from './components/AddCityModal'
import DeleteCityModal from './components/DeleteCityModal'
import Header from './components/Header'
import Cities from './components/Cities'

import 'react-toastify/dist/ReactToastify.css'
import './styles/main.scss'

const App = () => {
  return (
    <div className='app'>
      <ToastContainer />
      <AddCityModal />
      <DeleteCityModal />
      <Header />
      <Cities />
    </div>
  )
}

export default App

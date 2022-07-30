import React from 'react'
import ReactDOM from 'react-dom/client'

import StoreProvider from './store/StoreProvider'
import App from './App'

import './styles/main.scss'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </React.StrictMode>
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import FavCitiesContextProvider from './context/fav-cities-context'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <FavCitiesContextProvider>
      <App />
    </FavCitiesContextProvider>
  </React.StrictMode>
)

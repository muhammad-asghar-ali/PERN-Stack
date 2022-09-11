import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Home from './routes/Home';
import RestaurantDetailsPage from './routes/RestaurantDetailsPage';
import RestaurantUpdatePage from './routes/RestaurantUpdatePage';
import { RestaurantContextProvider } from './context/RestaurantContext'

const App = () => {
  return (
    <RestaurantContextProvider>
      <div className='container'>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/restaurant/:id" element={<RestaurantDetailsPage />} />
            <Route path="/restaurant/:id/update" element={<RestaurantUpdatePage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </RestaurantContextProvider>

  )
}

export default App
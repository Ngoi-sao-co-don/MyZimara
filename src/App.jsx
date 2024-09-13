import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import "react-bootstrap";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CartPage from './pages/cart_page';
import PlaceOrderPage from './pages/PlaceOrderPage';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/CartPage" element={<CartPage />} />
            <Route path="/PlaceOrderPage" element={<PlaceOrderPage />} />
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App

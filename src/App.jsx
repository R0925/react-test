import React from 'react'
import Login from './components/Login'
import Products from './components/Products'
import GridProducts from './components/GridProducts';
// import { Routes, Route, Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  return (

    <div className='flex w-full h-screen items-center'>
      <Router>
        <Routes>
          <Route index element={<Login />} />
          <Route path="products" element={<Products />} />
          <Route path="gridProducts" element={<GridProducts />} />
          <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
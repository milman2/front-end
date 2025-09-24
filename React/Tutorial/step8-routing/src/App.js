import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation';
import Home from './components/Home';
import About from './components/About';
import Products from './components/Products';
import ProductDetail from './components/ProductDetail';
import UserProfile from './components/UserProfile';
import Contact from './components/Contact';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Navigation />
        <main className='App-main'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/products' element={<Products />} />
            <Route path='/product/:id' element={<ProductDetail />} />
            <Route path='/user/:id' element={<UserProfile />} />
            <Route path='/contact' element={<Contact />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;

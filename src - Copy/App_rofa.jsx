import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './CartContext';

import NavbarComponent from './navbar';
import Home            from './home';
import Products        from './product';
import ProductDetail   from './productdetail';
import Cart            from './cart';
import Checkout        from './check';
import Footer          from './footer';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-vh-100 d-flex flex-column">
          <NavbarComponent />

          <main className="flex-grow-1">
            <Routes>
              <Route path="/"            element={<Home />} />
              <Route path="/products"    element={<Products />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/cart"        element={<Cart />} />
              <Route path="/checkout"    element={<Checkout />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;

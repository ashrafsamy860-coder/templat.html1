import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './CartContext';
import NavbarComponent from './navbar';
import Home from './home';
import Products from './product';
import ProductDetail from './productdetail';
import Cart from './cart';
import Checkout from './check';
import Footer from './footer';

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;900&family=Tajawal:wght@300;400;500;700&display=swap');

    :root {
      --gold: #C9A84C;
      --gold-light: #E8C97A;
      --gold-dark: #9B7A2F;
      --black: #0A0A0B;
      --surface: #121214;
      --surface2: #1A1A1E;
      --surface3: #222228;
      --border: rgba(201,168,76,0.15);
      --text: #F0EDE6;
      --text-muted: #8A8580;
      --accent: #C9A84C;
    }

    * { box-sizing: border-box; }

    body {
      background: var(--black) !important;
      color: var(--text) !important;
      font-family: 'Tajawal', sans-serif !important;
      direction: rtl;
      min-height: 100vh;
    }

    /* Typography */
    h1, h2, h3, h4, h5, h6 { font-family: 'Playfair Display', 'Tajawal', serif !important; }

    /* Scrollbar */
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: var(--black); }
    ::-webkit-scrollbar-thumb { background: var(--gold-dark); border-radius: 3px; }

    /* Bootstrap overrides */
    .btn-primary {
      background: linear-gradient(135deg, var(--gold), var(--gold-dark)) !important;
      border: none !important;
      color: #000 !important;
      font-weight: 700 !important;
      letter-spacing: 0.5px;
      transition: all 0.3s ease !important;
    }
    .btn-primary:hover {
      background: linear-gradient(135deg, var(--gold-light), var(--gold)) !important;
      transform: translateY(-1px);
      box-shadow: 0 8px 25px rgba(201,168,76,0.3) !important;
    }

    .btn-outline-primary {
      border-color: var(--gold) !important;
      color: var(--gold) !important;
      background: transparent !important;
    }
    .btn-outline-primary:hover {
      background: var(--gold) !important;
      color: #000 !important;
    }

    .btn-success {
      background: linear-gradient(135deg, #2D7A4F, #1A5C38) !important;
      border: none !important;
      font-weight: 700 !important;
    }
    .btn-outline-danger {
      border-color: #8B2020 !important;
      color: #D05050 !important;
    }
    .btn-outline-danger:hover {
      background: #8B2020 !important;
      border-color: #8B2020 !important;
    }
    .btn-outline-secondary {
      border-color: var(--border) !important;
      color: var(--text-muted) !important;
    }
    .btn-outline-secondary:hover {
      background: var(--surface3) !important;
      color: var(--text) !important;
    }
    .btn-danger { background: #8B2020 !important; border: none !important; }
    .btn-outline-light {
      border-color: var(--border) !important;
      color: var(--text) !important;
    }
    .btn-outline-light:hover {
      background: var(--surface3) !important;
    }

    .card {
      background: var(--surface2) !important;
      border: 1px solid var(--border) !important;
      transition: all 0.3s ease !important;
    }
    .card-hover:hover {
      transform: translateY(-6px);
      border-color: var(--gold-dark) !important;
      box-shadow: 0 20px 40px rgba(0,0,0,0.5), 0 0 20px rgba(201,168,76,0.1) !important;
    }

    .badge.bg-secondary {
      background: var(--surface3) !important;
      color: var(--gold) !important;
      border: 1px solid var(--border);
      font-family: 'Tajawal', sans-serif;
    }
    .badge.bg-danger { background: #6B1515 !important; }
    .badge.bg-success { background: #1A4A2E !important; color: #5ABF82 !important; }
    .badge.bg-warning { background: #4A3A00 !important; color: var(--gold) !important; }

    .form-control, .form-select {
      background: var(--surface3) !important;
      border: 1px solid var(--border) !important;
      color: var(--text) !important;
      font-family: 'Tajawal', sans-serif !important;
    }
    .form-control::placeholder { color: var(--text-muted) !important; }
    .form-control:focus, .form-select:focus {
      border-color: var(--gold) !important;
      box-shadow: 0 0 0 3px rgba(201,168,76,0.15) !important;
      background: var(--surface3) !important;
    }
    .form-select option {
      background: var(--surface3);
      color: var(--text);
    }
    .form-label { color: var(--text-muted) !important; font-size: 0.85rem; }

    .input-group-text {
      background: var(--surface3) !important;
      border: 1px solid var(--border) !important;
      color: var(--gold) !important;
    }

    .table {
      color: var(--text) !important;
    }
    .table-dark th {
      background: var(--surface3) !important;
      border-color: var(--border) !important;
      color: var(--gold) !important;
      font-size: 0.85rem;
      letter-spacing: 0.5px;
    }
    .table td { border-color: var(--border) !important; }
    .table tbody tr:hover { background: var(--surface2) !important; }

    .alert-info {
      background: rgba(201,168,76,0.08) !important;
      border: 1px solid var(--border) !important;
      color: var(--gold) !important;
    }
    .alert-success {
      background: rgba(90,191,130,0.1) !important;
      border-color: rgba(90,191,130,0.2) !important;
      color: #5ABF82 !important;
    }

    .pagination .page-link {
      background: var(--surface2) !important;
      border-color: var(--border) !important;
      color: var(--text-muted) !important;
    }
    .pagination .page-item.active .page-link {
      background: var(--gold) !important;
      border-color: var(--gold) !important;
      color: #000 !important;
    }
    .pagination .page-item.disabled .page-link { opacity: 0.3; }

    .text-primary { color: var(--gold) !important; }
    .text-muted { color: var(--text-muted) !important; }
    .text-success { color: #5ABF82 !important; }
    .text-warning { color: var(--gold) !important; }

    .bg-light { background: var(--surface) !important; }
    .bg-dark { background: var(--black) !important; }

    .shadow-sm { box-shadow: 0 4px 20px rgba(0,0,0,0.4) !important; }

    .sticky-top { top: 80px !important; }

    hr { border-color: var(--border) !important; }

    /* Gold shimmer animation */
    @keyframes shimmer {
      0% { background-position: -200% center; }
      100% { background-position: 200% center; }
    }
    .gold-text {
      background: linear-gradient(90deg, var(--gold-dark), var(--gold-light), var(--gold-dark));
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: shimmer 4s linear infinite;
    }

    /* Fade up animation */
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .fade-up { animation: fadeUp 0.6s ease forwards; }

    /* Gold divider */
    .gold-divider {
      height: 1px;
      background: linear-gradient(90deg, transparent, var(--gold), transparent);
      border: none;
      margin: 2rem 0;
    }

    .card-header.bg-dark {
      background: linear-gradient(135deg, var(--surface3), var(--surface2)) !important;
      border-bottom: 1px solid var(--border) !important;
    }
  `}</style>
);

function App() {
  return (
    <CartProvider>
      <Router>
        <GlobalStyles />
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <NavbarComponent />
          <main style={{ flexGrow: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from './CartContext';

const NavbarComponent = () => {
  const { cart, total } = useCart();
  const [search, setSearch] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/products?search=${encodeURIComponent(search)}`);
      setSearch('');
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <style>{`
        .navbar-luxury {
          position: sticky;
          top: 0;
          z-index: 1000;
          transition: all 0.4s ease;
          background: ${scrolled
            ? 'rgba(10,10,11,0.97)'
            : 'rgba(10,10,11,0.85)'};
          backdrop-filter: blur(20px);
          border-bottom: 1px solid ${scrolled ? 'rgba(201,168,76,0.25)' : 'rgba(201,168,76,0.08)'};
          box-shadow: ${scrolled ? '0 4px 30px rgba(0,0,0,0.6)' : 'none'};
        }
        .navbar-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 1.5rem;
          height: 70px;
          display: flex;
          align-items: center;
          gap: 2rem;
        }
        .brand {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          text-decoration: none;
          flex-shrink: 0;
        }
        .brand-icon {
          width: 38px;
          height: 38px;
          border: 1px solid rgba(201,168,76,0.4);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
        }
        .brand-text {
          font-family: 'Playfair Display', serif;
          font-size: 1.35rem;
          font-weight: 700;
          background: linear-gradient(135deg, #C9A84C, #E8C97A);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          letter-spacing: 0.5px;
        }
        .search-form {
          flex: 1;
          max-width: 380px;
          display: flex;
          gap: 0;
        }
        .search-input {
          flex: 1;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(201,168,76,0.15);
          border-right: none;
          color: #F0EDE6;
          padding: 0.5rem 1rem;
          font-family: 'Tajawal', sans-serif;
          font-size: 0.9rem;
          border-radius: 6px 0 0 6px;
          outline: none;
          transition: all 0.3s;
        }
        .search-input::placeholder { color: #5A5550; }
        .search-input:focus {
          border-color: rgba(201,168,76,0.4);
          background: rgba(255,255,255,0.07);
        }
        .search-btn {
          background: linear-gradient(135deg, #C9A84C, #9B7A2F);
          border: none;
          color: #000;
          padding: 0.5rem 1rem;
          border-radius: 0 6px 6px 0;
          cursor: pointer;
          font-size: 0.9rem;
          transition: all 0.3s;
        }
        .search-btn:hover {
          background: linear-gradient(135deg, #E8C97A, #C9A84C);
        }
        .nav-links {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          margin-right: auto;
        }
        .nav-link-item {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.5rem 0.9rem;
          text-decoration: none;
          color: #8A8580;
          font-family: 'Tajawal', sans-serif;
          font-size: 0.9rem;
          border-radius: 6px;
          transition: all 0.25s;
          white-space: nowrap;
          position: relative;
        }
        .nav-link-item:hover { color: #F0EDE6; background: rgba(255,255,255,0.05); }
        .nav-link-item.active { color: #C9A84C; }
        .nav-link-item.active::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 20%;
          right: 20%;
          height: 2px;
          background: linear-gradient(90deg, transparent, #C9A84C, transparent);
          border-radius: 1px;
        }
        .cart-link {
          position: relative;
          background: rgba(201,168,76,0.08);
          border: 1px solid rgba(201,168,76,0.2);
        }
        .cart-link:hover { background: rgba(201,168,76,0.15) !important; }
        .cart-badge {
          position: absolute;
          top: 2px;
          left: 2px;
          background: #8B2020;
          color: white;
          font-size: 0.6rem;
          font-weight: 700;
          min-width: 16px;
          height: 16px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 3px;
        }
        .cart-total {
          color: #C9A84C;
          font-size: 0.8rem;
          font-weight: 700;
        }
        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: 1px solid rgba(201,168,76,0.2);
          padding: 8px 10px;
          border-radius: 6px;
          cursor: pointer;
          margin-right: auto;
        }
        .hamburger span {
          display: block;
          width: 20px;
          height: 2px;
          background: #C9A84C;
          transition: all 0.3s;
        }
        @media (max-width: 768px) {
          .nav-links { display: none; }
          .hamburger { display: flex; }
          .search-form { max-width: 200px; }
          .nav-mobile {
            display: ${menuOpen ? 'flex' : 'none'};
            flex-direction: column;
            padding: 1rem 1.5rem;
            border-top: 1px solid rgba(201,168,76,0.1);
            gap: 0.25rem;
          }
        }
        @media (min-width: 769px) {
          .nav-mobile { display: none !important; }
        }
      `}</style>

      <nav className="navbar-luxury">
        <div className="navbar-inner">
          <Link to="/" className="brand">
            <div className="brand-icon">🛍️</div>
            <span className="brand-text">Rofa Store</span>
          </Link>

          <form className="search-form" onSubmit={handleSearch}>
            <input
              className="search-input"
              type="search"
              placeholder="ابحث عن منتج..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="search-btn" type="submit">🔍</button>
          </form>

          <nav className="nav-links">
            <Link to="/" className={`nav-link-item ${isActive('/') ? 'active' : ''}`}>
              🏠 الرئيسية
            </Link>
            <Link to="/products" className={`nav-link-item ${isActive('/products') ? 'active' : ''}`}>
              📦 المنتجات
            </Link>
            <Link to="/cart" className={`nav-link-item cart-link ${isActive('/cart') ? 'active' : ''}`}>
              {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
              🛒
              {total > 0 && (
                <span className="cart-total">{total.toLocaleString('ar-EG')} ج</span>
              )}
            </Link>
          </nav>

          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            <span />
            <span />
            <span />
          </button>
        </div>

        <div className="nav-mobile">
          <Link to="/" className={`nav-link-item ${isActive('/') ? 'active' : ''}`}>🏠 الرئيسية</Link>
          <Link to="/products" className={`nav-link-item ${isActive('/products') ? 'active' : ''}`}>📦 المنتجات</Link>
          <Link to="/cart" className={`nav-link-item ${isActive('/cart') ? 'active' : ''}`}>
            🛒 السلة {totalItems > 0 && `(${totalItems})`}
          </Link>
        </div>
      </nav>
    </>
  );
};

export default NavbarComponent;

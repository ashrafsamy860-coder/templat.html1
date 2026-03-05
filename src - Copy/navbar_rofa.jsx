import React, { useState } from 'react';
import {
  Navbar as BSNavbar, Nav, Container,
  Badge, Form, Button,
} from 'react-bootstrap';
import { FaHome, FaBox, FaShoppingCart, FaSearch } from 'react-icons/fa';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from './CartContext';

const NavbarComponent = () => {
  const { cart, total } = useCart();
  const [search, setSearch]   = useState('');
  const navigate  = useNavigate();
  const location  = useLocation();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/products?search=${encodeURIComponent(search)}`);
      setSearch('');
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <BSNavbar bg="dark" variant="dark" expand="lg" sticky="top" className="shadow-sm">
      <Container>
        {/* ── Brand ── */}
        <BSNavbar.Brand as={Link} to="/" className="fw-bold">
          <FaBox className="me-2 text-primary" />
          Rofa Store
        </BSNavbar.Brand>

        {/* ── Search ── */}
        <Form
          className="d-flex mx-auto"
          style={{ maxWidth: 400, width: '100%' }}
          onSubmit={handleSearch}
        >
          <Form.Control
            type="search"
            placeholder="ابحث عن منتج..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="me-2 bg-secondary border-0 text-white"
            style={{ '::placeholder': { color: '#aaa' } }}
          />
          <Button variant="outline-light" type="submit">
            <FaSearch />
          </Button>
        </Form>

        <BSNavbar.Toggle aria-controls="main-nav" />
        <BSNavbar.Collapse id="main-nav">
          <Nav className="ms-auto align-items-center gap-1">

            <Nav.Link
              as={Link} to="/"
              className={isActive('/') ? 'text-primary' : ''}
            >
              <FaHome className="me-1" />الرئيسية
            </Nav.Link>

            <Nav.Link
              as={Link} to="/products"
              className={isActive('/products') ? 'text-primary' : ''}
            >
              <FaBox className="me-1" />المنتجات
            </Nav.Link>

            <Nav.Link
              as={Link} to="/cart"
              className={`position-relative ${isActive('/cart') ? 'text-primary' : ''}`}
            >
              <FaShoppingCart size={20} />
              {totalItems > 0 && (
                <Badge
                  bg="danger"
                  className="position-absolute top-0 start-100 translate-middle"
                  style={{ fontSize: '.6rem' }}
                >
                  {totalItems}
                </Badge>
              )}
              {total > 0 && (
                <span className="ms-2 small text-warning fw-bold">
                  {total.toLocaleString('ar-EG')} جنيه
                </span>
              )}
            </Nav.Link>

          </Nav>
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  );
};

export default NavbarComponent;

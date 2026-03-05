import React, { useState } from 'react';
import { Navbar as BSNavbar, Nav, Container, Badge, Form, Button } from 'react-bootstrap';
import { FaHome, FaBox, FaShoppingCart, FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';


const NavbarComponent = () => {
  const { cart, total } = useCart();
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/products?search=${encodeURIComponent(search)}`);
      setSearch('');
    }
  };

  return (
    <BSNavbar bg="dark" variant="dark" expand="lg" sticky="top" className="shadow-sm">
      <Container>
        <BSNavbar.Brand as={Link} to="/">
          <FaBox className="me-2" />Rofa Store
        </BSNavbar.Brand>
        <Form className="d-flex mx-auto" style={{ maxWidth: '400px' }} onSubmit={handleSearch}>
          <Form.Control
            type="search"
            placeholder="ابحث عن منتج..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="me-2"
          />
          <Button variant="outline-light" type="submit">
            <FaSearch />
          </Button>
        </Form>
        <BSNavbar.Toggle />
        <BSNavbar.Collapse>
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={Link} to="/"><FaHome /> الرئيسية</Nav.Link>
            <Nav.Link as={Link} to="/products"><FaBox /> المنتجات</Nav.Link>
            <Nav.Link as={Link} to="/cart" className="position-relative">
              <FaShoppingCart size={20} />
              {totalItems > 0 && (
                <Badge bg="danger" className="position-absolute top-0 start-100 translate-middle">
                  {totalItems}
                </Badge>
              )}
              <span className="ms-2 small">{total.toLocaleString()} جنيه</span>
            </Nav.Link>
          </Nav>
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  );
};

export default NavbarComponent;

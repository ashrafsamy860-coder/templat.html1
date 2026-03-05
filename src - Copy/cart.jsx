import React from 'react';
import { Container, Table, Button, Row, Col, Badge } from 'react-bootstrap';
import { FaTrash, FaMinus, FaPlus, FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, total } = useCart();

  if (cart.length === 0) {
    return (
      <Container className="py-5 text-center">
        <FaShoppingCart size={100} className="text-muted mb-4" />
        <h2 className="mb-4">سلتك فارغة 😔</h2>
        <p className="lead mb-4">لم تقم بإضافة أي منتجات للسلة بعد</p>
        <Link to="/products" className="btn btn-primary btn-lg px-5">
          ابدأ التسوق الآن
        </Link>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <h1>سلة التسوق <Badge bg="primary">{cart.length} منتج</Badge></h1>
        <Link to="/products" className="btn btn-outline-primary">متابعة التسوق</Link>
      </div>

      <Table responsive className="mb-5">
        <thead className="table-dark">
          <tr>
            <th>المنتج</th>
            <th>السعر</th>
            <th>الكمية</th>
            <th>المجموع</th>
            <th>إجراءات</th>
          </tr>
        </thead>
        <tbody>
          {cart.map(item => (
            <tr key={item.id}>
              <td>
                <div className="d-flex align-items-center">
                  <img src={item.img} alt={item.name} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px', marginRight: '15px' }} />
                  <div>
                    <div className="fw-bold">{item.name}</div>
                    <small className="text-muted">الفئة: {item.category}</small>
                  </div>
                </div>
              </td>
              <td><strong>{item.price.toLocaleString()} جنيه</strong></td>
              <td>
                <div className="d-flex align-items-center">
                  <Button 
                    variant="outline-secondary" 
                    size="sm" 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="rounded-circle"
                    style={{ width: '32px', height: '32px' }}
                  >
                    <FaMinus />
                  </Button>
                  <span className="mx-3 px-3 py-1 bg-light rounded">{item.quantity}</span>
                  <Button 
                    variant="outline-secondary" 
                    size="sm" 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="rounded-circle"
                    style={{ width: '32px', height: '32px' }}
                  >
                    <FaPlus />
                  </Button>
                </div>
              </td>
              <td><strong>{(item.price * item.quantity).toLocaleString()} جنيه</strong></td>
              <td>
                <Button 
                  variant="danger" 
                  size="sm" 
                  onClick={() => removeFromCart(item.id)}
                >
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Row className="justify-content-end">
        <Col md={4}>
          <div className="p-4 border rounded shadow-lg bg-light">
            <div className="d-flex justify-content-between mb-3">
              <span>المجموع ({cart.length} منتج):</span>
              <strong>{total.toLocaleString()} جنيه</strong>
            </div>
            <hr />
            <div className="d-flex justify-content-between mb-4 fs-5">
              <span>الإجمالي النهائي:</span>
              <strong className="text-success">{total.toLocaleString()} جنيه</strong>
            </div>
            <Link to="/checkout" className="btn btn-success btn-lg w-100">
              إتمام الطلب ➡️
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;

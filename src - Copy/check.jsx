import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Alert, Card } from 'react-bootstrap';
import { FaCreditCard, FaUser } from 'react-icons/fa';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cart, total } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    paymentMethod: 'cash'
  });
  const [orderSuccess, setOrderSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // محاكاة إرسال الطلب
    setTimeout(() => {
      setOrderSuccess(true);
    }, 2000);
  };

  if (orderSuccess) {
    return (
      <Container className="py-5 text-center">
        <FaCreditCard size={100} className="text-success mb-4" />
        <h2 className="text-success mb-4">تم إتمام الطلب بنجاح! 🎉</h2>
        <p className="lead mb-4">رقم الطلب: #{Math.floor(Math.random() * 1000000)}</p>
        <p>سيتم التواصل معك قريباً لتأكيد التفاصيل</p>
        <Button variant="primary" size="lg" className="px-5" onClick={() => navigate('/')}>
          العودة للرئيسية
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row>
        <Col md={8}>
          <Card className="p-4 shadow-sm mb-4">
            <h3><FaUser className="me-2" /> بيانات العميل</h3>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>الاسم الكامل *</Form.Label>
                    <Form.Control 
                      required 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>رقم الهاتف *</Form.Label>
                    <Form.Control 
                      required 
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>البريد الإلكتروني</Form.Label>
                    <Form.Control 
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>طريقة الدفع *</Form.Label>
                    <Form.Select 
                      required
                      value={formData.paymentMethod}
                      onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                    >
                      <option value="cash">الدفع عند الاستلام</option>
                      <option value="card">بطاقة ائتمان</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>عنوان التوصيل *</Form.Label>
                <Form.Control 
                  as="textarea"
                  rows={3}
                  required
                  placeholder="العنوان التفصيلي، المدينة، الكود البريدي"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                />
              </Form.Group>

              <Button type="submit" className="btn btn-success btn-lg w-100">
                تأكيد الطلب ({total.toLocaleString()} جنيه)
              </Button>
            </Form>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="p-4 shadow-sm sticky-top" style={{ top: '20px' }}>
            <h4>ملخص الطلب</h4>
            <hr />
            <div className="d-flex justify-content-between mb-2">
              <span>عدد المنتجات:</span>
              <span>{cart.length}</span>
            </div>
            <div className="d-flex justify-content-between mb-4 fs-5 fw-bold">
              <span>المجموع:</span>
              <span className="text-success">{total.toLocaleString()} جنيه</span>
            </div>
            <Alert variant="info" className="small">
              ✅ شحن مجاني للطلبات فوق 1000 جنيه
            </Alert>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;

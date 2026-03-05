import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Badge, Carousel, Form } from 'react-bootstrap';
import { FaStar, FaHeart, FaCartPlus, FaMinus, FaPlus } from 'react-icons/fa';
import { useParams, Link } from 'react-router-dom';
import { useCart } from './CartContext';

const allProducts = [
  { id: 1, name: 'لابتوب i7', price: 25000, category: 'إلكترونيات', rating: 4.8, img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500', stock: 10, description: 'لابتوب قوي بمعالج i7 والكرت الشاشة RTX 3060' },
  { id: 2, name: 'iPhone 15 Pro', price: 35000, category: 'إلكترونيات', rating: 4.9, img: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500', stock: 5, description: 'آيفون 15 برو بكاميرا احترافية وسعرة بطارية كبيرة' },
  { id: 3, name: 'AirPods Pro', price: 5000, category: 'إلكترونيات', rating: 4.7, img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500', stock: 20, description: 'سماعات أير بودز برو مع إلغاء الضوضاء' },
  { id: 4, name: 'قميص قطني', price: 800, category: 'ملابس', rating: 4.5, img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500', stock: 50, description: 'قميص قطني 100% مريح بتصميم عصري' },
];

const ProductDetail = () => {
  const { id } = useParams();
  const product = allProducts.find(p => p.id === Number(id));
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts] = useState(allProducts
    .filter(p => p.category === product?.category && p.id !== Number(id))
    .slice(0, 4));

  if (!product) {
    return (
      <Container className="py-5 text-center">
        <h2>المنتج غير موجود 😔</h2>
        <Link to="/products" className="btn btn-primary">الرجوع للمنتجات</Link>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Link to="/products" className="btn btn-outline-secondary mb-4">
        ← العودة للمنتجات
      </Link>

      <Row>
        {/* صور المنتج */}
        <Col md={6}>
          <Carousel className="mb-4">
            <Carousel.Item>
              <img className="d-block w-100" src={product.img} style={{ height: '500px', objectFit: 'cover' }} alt={product.name} />
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" src={product.img} style={{ height: '500px', objectFit: 'cover' }} alt={product.name} />
            </Carousel.Item>
          </Carousel>
        </Col>

        {/* تفاصيل المنتج */}
        <Col md={6}>
          <h1 className="mb-4">{product.name}</h1>
          <div className="d-flex align-items-center mb-3">
            <div className="d-flex me-3">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className={i < Math.floor(product.rating) ? 'text-warning' : 'text-muted'} />
              ))}
              <span className="ms-2 fw-bold fs-5">{product.rating}</span>
            </div>
            <Badge bg={product.stock > 5 ? 'success' : 'warning'} className="fs-6">
              {product.stock} متبقي في المخزون
            </Badge>
          </div>

          <h2 className="text-primary mb-4">{product.price.toLocaleString()} جنيه</h2>
          
          <p className="lead mb-4">{product.description}</p>

          <div className="mb-4">
            <label className="form-label fs-5">الكمية:</label>
            <div className="d-flex align-items-center w-50">
              <Button 
                variant="outline-secondary" 
                size="sm" 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="me-2"
              >
                <FaMinus />
              </Button>
              <Form.Control 
                type="number" 
                value={quantity} 
                min={1} 
                max={product.stock}
                onChange={(e) => setQuantity(Math.min(product.stock, Math.max(1, parseInt(e.target.value))))}
                className="text-center mx-2" 
                style={{ width: '80px' }}
              />
              <Button 
                variant="outline-secondary" 
                size="sm" 
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
              >
                <FaPlus />
              </Button>
            </div>
          </div>

          <div className="d-flex gap-3 mb-4">
            <Button 
              variant="primary" 
              size="lg" 
              className="px-4"
              onClick={() => addToCart(product, quantity)}
              disabled={product.stock === 0}
            >
              <FaCartPlus className="me-2" /> أضف للسلة
            </Button>
            <Button variant="outline-danger" size="lg">
              <FaHeart className="me-2" /> المفضلة
            </Button>
          </div>

          <hr />
          <h5>الشحن والتوصيل</h5>
          <ul className="list-unstyled">
            <li>✅ شحن مجاني للطلبات فوق 1000 جنيه</li>
            <li>✅ التوصيل خلال 1-3 أيام</li>
            <li>✅ إرجاع خلال 30 يوم</li>
          </ul>
        </Col>
      </Row>

      {/* منتجات مشابهة */}
      {relatedProducts.length > 0 && (
        <>
          <hr className="my-5" />
          <h3 className="text-center mb-5">منتجات مشابهة</h3>
          <Row>
            {relatedProducts.map(p => (
              <Col md={3} key={p.id} className="mb-4">
                <Card className="h-100 card-hover shadow-sm">
                  <Link to={`/products/${p.id}`}>
                    <Card.Img src={p.img} height="200" className="object-fit-cover" />
                  </Link>
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="fs-6">{p.name}</Card.Title>
                    <div className="d-flex justify-content-between mt-auto">
                      <h6 className="text-primary">{p.price.toLocaleString()} جنيه</h6>
                      <FaStar className="text-warning" />
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}
    </Container>
  );
};

export default ProductDetail;

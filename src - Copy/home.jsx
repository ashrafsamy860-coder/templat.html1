import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { FaTruck, FaShieldAlt, FaHeadset, FaStar, FaShoppingCart } from 'react-icons/fa';
import Carousel from 'react-bootstrap/Carousel';

const Home = () => {
  return (
    <>
      {/* Hero Carousel كامل العرض */}
      <Carousel className="full-width-carousel mb-0">
        <Carousel.Item>
          <img 
            className="d-block w-100" 
            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1920&q=80"
            alt="عرض خاص"
          />
          <Carousel.Caption className="d-none d-md-block">
            <h1 className="display-2 fw-bold text-white drop-shadow">
              Rofa Store
            </h1>
            <Button size="lg" className="px-5 py-3 fs-5">
              <FaShoppingCart /> تسوق الآن
            </Button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img 
            className="d-block w-100" 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1920&q=80"
            alt="منتجات جديدة"
          />
          <Carousel.Caption className="d-none d-md-block">
            <h1 className="display-2 fw-bold text-white">منتجات جديدة</h1>
            <p className="display-5 text-white">آخر الموديلات وصلت للمتجر</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* مميزات المتجر */}
      <Container className="py-5">
        <Row className="text-center mb-5">
          <Col md={4} className="mb-4">
            <FaTruck size={60} className="text-primary mb-3" />
            <h3>شحن مجاني</h3>
            <p>لكل الطلبات فوق 1000 جنيه</p>
          </Col>
          <Col md={4} className="mb-4">
            <FaShieldAlt size={60} className="text-success mb-3" />
            <h3>ضمان الجودة</h3>
            <p>إرجاع خلال 30 يوم بدون تكلفة</p>
          </Col>
          <Col md={4} className="mb-4">
            <FaHeadset size={60} className="text-warning mb-3" />
            <h3>دعم 24/7</h3>
            <p>فريق دعم فني متواجد دائماً</p>
          </Col>
        </Row>

        {/* منتجات مميزة */}
        <h2 className="text-center mb-5">منتجات مميزة ⭐</h2>
        <Row>
          {/* المنتج 1 - لابتوب */}
          <Col md={3} className="mb-4">
            <Card className="card-hover h-100 shadow">
              <Card.Img
                src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&auto=format&fit=crop&q=80"
                height="200"
                style={{ objectFit: 'cover' }}
                onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=400'; }}
              />
              <Card.Body>
                <Card.Title>لابتوب i7</Card.Title>
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="text-primary mb-0">25,000 جنيه</h5>
                  <span className="text-warning fw-bold"><FaStar /> 4.8</span>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* المنتج 2 - iPhone */}
          <Col md={3} className="mb-4">
            <Card className="card-hover h-100 shadow">
              <Card.Img
                src="https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=400&auto=format&fit=crop&q=80"
                height="200"
                style={{ objectFit: 'cover' }}
                onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=400'; }}
              />
              <Card.Body>
                <Card.Title>iPhone 15 Pro</Card.Title>
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="text-primary mb-0">35,000 جنيه</h5>
                  <span className="text-warning fw-bold"><FaStar /> 4.9</span>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* المنتج 3 - AirPods */}
          <Col md={3} className="mb-4">
            <Card className="card-hover h-100 shadow">
              <Card.Img
                src="https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&auto=format&fit=crop&q=80"
                height="200"
                style={{ objectFit: 'cover' }}
                onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=400'; }}
              />
              <Card.Body>
                <Card.Title>AirPods Pro</Card.Title>
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="text-primary mb-0">5,000 جنيه</h5>
                  <span className="text-warning fw-bold"><FaStar /> 4.7</span>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* المنتج 4 - كاميرا DSLR */}
          <Col md={3} className="mb-4">
            <Card className="card-hover h-100 shadow">
              <Card.Img
                src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&auto=format&fit=crop&q=80"
                height="200"
                style={{ objectFit: 'cover' }}
                onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=400'; }}
              />
              <Card.Body>
                <Card.Title>كاميرا DSLR</Card.Title>
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="text-primary mb-0">15,000 جنيه</h5>
                  <span className="text-warning fw-bold"><FaStar /> 4.8</span>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* المنتج 5 - سماعات */}
          <Col md={3} className="mb-4">
            <Card className="card-hover h-100 shadow">
              <Card.Img
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&auto=format&fit=crop&q=80"
                height="200"
                style={{ objectFit: 'cover' }}
                onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=400'; }}
              />
              <Card.Body>
                <Card.Title>سماعات over-ear</Card.Title>
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="text-primary mb-0">3,000 جنيه</h5>
                  <span className="text-warning fw-bold"><FaStar /> 4.7</span>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* المنتج 6 - ساعة ذكية */}
          <Col md={3} className="mb-4">
            <Card className="card-hover h-100 shadow">
              <Card.Img
                src="https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&auto=format&fit=crop&q=80"
                height="200"
                style={{ objectFit: 'cover' }}
                onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=400'; }}
              />
              <Card.Body>
                <Card.Title>ساعة ذكية</Card.Title>
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="text-primary mb-0">3,500 جنيه</h5>
                  <span className="text-warning fw-bold"><FaStar /> 4.6</span>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { 
  FaFacebook, FaTwitter, FaInstagram, FaYoutube, 
  FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock 
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-dark text-light mt-auto">
      <Container className="py-5">
        <Row>
          {/* الشعار والوصف */}
          <Col md={4} className="mb-4">
            <h4 className="mb-3"><FaPhone className="me-2" />أشرف ستور</h4>
            <p>
              أشرف سامي سعد - دمنهور. أفضل المنتجات بأسعار تنافسية 
              وجودة عالية مضمونة مع خدمة عملاء 24/7.
            </p>
            <div className="d-flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light"
              >
                <FaYoutube size={24} />
              </a>
            </div>
          </Col>

          {/* روابط سريعة */}
          <Col md={2} className="mb-4">
            <h5>الروابط المهمة</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-light text-decoration-none">الرئيسية</a></li>
              <li><a href="/products" className="text-light text-decoration-none">المنتجات</a></li>
              <li><a href="#about" className="text-light text-decoration-none">من نحن</a></li>
              <li><a href="#contact" className="text-light text-decoration-none">اتصل بنا</a></li>
            </ul>
          </Col>

          {/* معلومات التواصل */}
          <Col md={3} className="mb-4">
            <h5>تواصل معنا</h5>
            <div className="mb-3">
              <FaMapMarkerAlt className="me-2" />
              دمنهور، البحيرة، مصر
            </div>
            <div className="mb-3">
              <FaPhone className="me-2" />
              0123 456 7890
            </div>
            <div className="mb-3">
              <FaEnvelope className="me-2" />
              ashraf@store.com
            </div>
            <div>
              <FaClock className="me-2" />
              10 صباحاً - 10 مساءً
            </div>
          </Col>

          {/* النشرة الإخبارية */}
          <Col md={3}>
            <h5>اشترك في النشرة</h5>
            <p>احصل على العروض الحصرية والخصومات أولاً!</p>
            <div className="input-group">
              <input 
                type="email" 
                className="form-control" 
                placeholder="أدخل بريدك الإلكتروني"
              />
              <button className="btn btn-primary">اشتراك</button>
            </div>
          </Col>
        </Row>

        <hr />
        <Row className="text-center">
          <Col>
            <p>&copy; 2026 أشرف ستور - جميع الحقوق محفوظة | تطوير: Ashraf Samy Saad</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;

import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {
  FaFacebook, FaTwitter, FaInstagram, FaYoutube,
  FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock,
} from 'react-icons/fa';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-dark text-light mt-auto">
      <Container className="py-5">
        <Row>
          {/* ── Brand ── */}
          <Col md={4} className="mb-4">
            <h4 className="mb-3">
              <FaPhone className="me-2 text-primary" />
              أشرف ستور
            </h4>
            <p className="text-secondary">
              أشرف سامي سعد — دمنهور. أفضل المنتجات بأسعار تنافسية
              وجودة عالية مضمونة مع خدمة عملاء 24/7.
            </p>
            <div className="d-flex gap-3 mt-3">
              {[
                { href: "https://facebook.com",  Icon: FaFacebook  },
                { href: "https://twitter.com",   Icon: FaTwitter   },
                { href: "https://instagram.com", Icon: FaInstagram },
                { href: "https://youtube.com",   Icon: FaYoutube   },
              ].map(({ href, Icon }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-light"
                  style={{ transition: 'color .2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#0d6efd'}
                  onMouseLeave={(e) => e.currentTarget.style.color = ''}
                >
                  <Icon size={22} />
                </a>
              ))}
            </div>
          </Col>

          {/* ── Quick Links ── */}
          <Col md={2} className="mb-4">
            <h5 className="mb-3">الروابط المهمة</h5>
            <ul className="list-unstyled">
              {[
                { to: "/",        label: "الرئيسية"  },
                { to: "/products", label: "المنتجات"  },
                { to: "/cart",    label: "السلة"     },
              ].map(({ to, label }) => (
                <li key={to} className="mb-2">
                  <Link
                    to={to}
                    className="text-secondary text-decoration-none"
                    style={{ transition: 'color .2s' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
                    onMouseLeave={(e) => e.currentTarget.style.color = ''}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </Col>

          {/* ── Contact ── */}
          <Col md={3} className="mb-4">
            <h5 className="mb-3">تواصل معنا</h5>
            {[
              { Icon: FaMapMarkerAlt, text: "دمنهور، البحيرة، مصر"  },
              { Icon: FaPhone,        text: "0123 456 7890"          },
              { Icon: FaEnvelope,     text: "ashraf@store.com"       },
              { Icon: FaClock,        text: "10 صباحاً – 10 مساءً"  },
            ].map(({ Icon, text }) => (
              <div key={text} className="mb-2 text-secondary d-flex align-items-center gap-2">
                <Icon className="text-primary flex-shrink-0" />
                <span>{text}</span>
              </div>
            ))}
          </Col>

          {/* ── Newsletter ── */}
          <Col md={3}>
            <h5 className="mb-3">اشترك في النشرة</h5>
            <p className="text-secondary small">احصل على العروض الحصرية والخصومات أولاً!</p>

            {subscribed ? (
              <div className="alert alert-success py-2 small">
                ✅ تم الاشتراك بنجاح!
              </div>
            ) : (
              <div className="input-group">
                <input
                  type="email"
                  className="form-control bg-secondary border-0 text-white"
                  placeholder="بريدك الإلكتروني"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
                />
                <button className="btn btn-primary" onClick={handleSubscribe}>
                  اشتراك
                </button>
              </div>
            )}
          </Col>
        </Row>

        <hr className="border-secondary" />

        <Row className="text-center">
          <Col>
            <p className="text-secondary small mb-0">
              &copy; 2026 أشرف ستور — جميع الحقوق محفوظة |{' '}
              <span className="text-primary">Ashraf Samy Saad</span>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;

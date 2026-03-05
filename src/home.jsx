import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';

const FEATURED = [
  { id: 1,  name: 'لابتوب i7',     price: 25000, rating: 4.8, category: 'إلكترونيات', img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500' },
  { id: 2,  name: 'iPhone 15 Pro', price: 35000, rating: 4.9, category: 'إلكترونيات', img: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=500' },
  { id: 4,  name: 'قميص قطني',     price: 800,   rating: 4.5, category: 'ملابس',       img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500' },
  { id: 5,  name: 'ساعة ذكية',     price: 4500,  rating: 4.6, category: 'إكسسوارات',  img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500' },
  { id: 3,  name: 'AirPods Pro',   price: 5000,  rating: 4.7, category: 'إلكترونيات', img: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500' },
  { id: 11, name: 'فستان صيفي',    price: 1500,  rating: 4.7, category: 'ملابس',       img: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500' },
  { id: 9,  name: 'حقيبة ظهر',     price: 900,   rating: 4.5, category: 'إكسسوارات',  img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500' },
  { id: 7,  name: 'كاميرا DSLR',   price: 15000, rating: 4.8, category: 'إلكترونيات', img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500' },
];

const SLIDES = [
  {
    img: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1600&auto=format&fit=crop',
    tag: 'مجموعة جديدة',
    title: 'تسوق بأسلوب راقٍ',
    sub: 'أفضل المنتجات بأسعار لا تُقاوم — من الإلكترونيات إلى الأزياء',
    btn: 'اكتشف المجموعة',
  },
  {
    img: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&auto=format&fit=crop',
    tag: 'صيحات الموسم',
    title: 'أحدث الموضة',
    sub: 'تصاميم عصرية وأناقة لا مثيل لها في كل مناسبة',
    btn: 'تصفح الملابس',
  },
  {
    img: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=1600&auto=format&fit=crop',
    tag: 'تقنية متقدمة',
    title: 'عالم الإلكترونيات',
    sub: 'أحدث الأجهزة بأفضل المواصفات وأقل الأسعار في السوق',
    btn: 'تصفح الإلكترونيات',
  },
];

const FEATURES = [
  { icon: '🚀', title: 'شحن سريع',     desc: 'توصيل خلال 1-3 أيام عمل في أنحاء مصر',        color: '#C9A84C' },
  { icon: '🛡️', title: 'ضمان الجودة',  desc: 'جميع المنتجات مضمونة مع إرجاع مجاني 30 يوم',  color: '#5ABF82' },
  { icon: '📞', title: 'دعم 24/7',     desc: 'فريق خدمة العملاء متاح دائماً لمساعدتك',       color: '#7090D0' },
  { icon: '💎', title: 'أسعار تنافسية', desc: 'أفضل الأسعار مع عروض وخصومات حصرية يومياً',   color: '#C9A84C' },
];

const STATS = [
  { num: '500+', label: 'منتج متاح' },
  { num: '10K+', label: 'عميل راضٍ' },
  { num: '99%',  label: 'تقييم إيجابي' },
  { num: '24/7', label: 'دعم متواصل' },
];

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div className="lux-product-card">
      <Link to={`/products/${product.id}`} style={{ textDecoration: 'none' }}>
        <div className="lux-product-img-wrap">
          <img
            src={product.img}
            alt={product.name}
            className="lux-product-img"
            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=300'; }}
          />
          <div className="lux-product-overlay">
            <span className="lux-category-tag">{product.category}</span>
          </div>
        </div>
      </Link>
      <div className="lux-product-body">
        <Link to={`/products/${product.id}`} style={{ textDecoration: 'none' }}>
          <h3 className="lux-product-name">{product.name}</h3>
        </Link>
        <div className="lux-product-footer">
          <div className="lux-product-price">{product.price.toLocaleString()} <span>ج.م</span></div>
          <div className="lux-product-rating">
            ⭐ <span>{product.rating}</span>
          </div>
        </div>
        <button
          className={`lux-add-btn ${added ? 'added' : ''}`}
          onClick={handleAdd}
        >
          {added ? '✅ تمت الإضافة' : '🛒 أضف للسلة'}
        </button>
      </div>
    </div>
  );
};

const Home = () => {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s + 1) % SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <style>{`
        /* ── Hero ── */
        .lux-hero {
          position: relative;
          height: 580px;
          overflow: hidden;
        }
        .lux-hero-slide {
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 1s ease;
        }
        .lux-hero-slide.active { opacity: 1; }
        .lux-hero-bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          transition: transform 8s ease;
        }
        .lux-hero-slide.active .lux-hero-bg { transform: scale(1.05); }
        .lux-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(10,10,11,0.85) 0%,
            rgba(10,10,11,0.5) 50%,
            rgba(10,10,11,0.3) 100%
          );
        }
        .lux-hero-content {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          padding: 0 8%;
        }
        .lux-hero-text { max-width: 560px; }
        .lux-hero-tag {
          display: inline-block;
          background: rgba(201,168,76,0.15);
          border: 1px solid rgba(201,168,76,0.4);
          color: #C9A84C;
          font-family: 'Tajawal', sans-serif;
          font-size: 0.8rem;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 0.3rem 1rem;
          border-radius: 2px;
          margin-bottom: 1.2rem;
        }
        .lux-hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.2rem, 5vw, 3.8rem);
          font-weight: 900;
          color: #F0EDE6;
          line-height: 1.1;
          margin-bottom: 1rem;
        }
        .lux-hero-title span {
          background: linear-gradient(135deg, #C9A84C, #E8C97A);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .lux-hero-sub {
          font-family: 'Tajawal', sans-serif;
          color: rgba(240,237,230,0.65);
          font-size: 1.05rem;
          line-height: 1.7;
          margin-bottom: 2rem;
        }
        .lux-hero-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          background: linear-gradient(135deg, #C9A84C, #9B7A2F);
          color: #000;
          font-family: 'Tajawal', sans-serif;
          font-weight: 700;
          font-size: 1rem;
          padding: 0.85rem 2.2rem;
          border-radius: 4px;
          text-decoration: none;
          border: none;
          cursor: pointer;
          transition: all 0.3s;
          letter-spacing: 0.5px;
        }
        .lux-hero-btn:hover {
          background: linear-gradient(135deg, #E8C97A, #C9A84C);
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(201,168,76,0.4);
          color: #000;
        }
        .lux-dots {
          position: absolute;
          bottom: 2rem;
          left: 8%;
          display: flex;
          gap: 0.6rem;
        }
        .lux-dot {
          width: 24px;
          height: 3px;
          border-radius: 2px;
          background: rgba(201,168,76,0.3);
          cursor: pointer;
          transition: all 0.3s;
          border: none;
        }
        .lux-dot.active {
          background: #C9A84C;
          width: 40px;
        }

        /* ── Stats ── */
        .lux-stats {
          background: linear-gradient(135deg, #111113, #0A0A0B);
          border-top: 1px solid rgba(201,168,76,0.1);
          border-bottom: 1px solid rgba(201,168,76,0.1);
          padding: 2.5rem 0;
        }
        .lux-stats-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 1.5rem;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
          text-align: center;
        }
        .lux-stat-num {
          font-family: 'Playfair Display', serif;
          font-size: 2.2rem;
          font-weight: 700;
          background: linear-gradient(135deg, #C9A84C, #E8C97A);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .lux-stat-label {
          font-family: 'Tajawal', sans-serif;
          color: #8A8580;
          font-size: 0.85rem;
          margin-top: 0.2rem;
          letter-spacing: 0.5px;
        }

        /* ── Features ── */
        .lux-features {
          padding: 5rem 0;
          max-width: 1280px;
          margin: 0 auto;
          padding-inline: 1.5rem;
        }
        .lux-section-header {
          text-align: center;
          margin-bottom: 3.5rem;
        }
        .lux-section-subtitle {
          font-family: 'Tajawal', sans-serif;
          color: #C9A84C;
          font-size: 0.8rem;
          letter-spacing: 3px;
          text-transform: uppercase;
          margin-bottom: 0.75rem;
        }
        .lux-section-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.6rem, 3vw, 2.4rem);
          font-weight: 700;
          color: #F0EDE6;
          margin: 0;
        }
        .lux-features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1.5rem;
        }
        .lux-feature-card {
          background: #121214;
          border: 1px solid rgba(201,168,76,0.1);
          border-radius: 8px;
          padding: 2rem 1.5rem;
          text-align: center;
          transition: all 0.3s;
        }
        .lux-feature-card:hover {
          border-color: rgba(201,168,76,0.35);
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
        }
        .lux-feature-icon {
          font-size: 2.2rem;
          margin-bottom: 1rem;
        }
        .lux-feature-title {
          font-family: 'Playfair Display', serif;
          color: #F0EDE6;
          font-size: 1.05rem;
          margin-bottom: 0.5rem;
        }
        .lux-feature-desc {
          font-family: 'Tajawal', sans-serif;
          color: #8A8580;
          font-size: 0.85rem;
          line-height: 1.6;
          margin: 0;
        }

        /* ── Products ── */
        .lux-products-section {
          background: #0D0D0F;
          padding: 5rem 0;
          border-top: 1px solid rgba(201,168,76,0.07);
        }
        .lux-products-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }
        .lux-products-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 3rem;
        }
        .lux-view-all {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          color: #C9A84C;
          text-decoration: none;
          font-family: 'Tajawal', sans-serif;
          font-size: 0.9rem;
          border-bottom: 1px solid rgba(201,168,76,0.3);
          padding-bottom: 2px;
          transition: all 0.3s;
        }
        .lux-view-all:hover {
          color: #E8C97A;
          border-color: #E8C97A;
        }
        .lux-products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 1.5rem;
        }
        .lux-product-card {
          background: #121214;
          border: 1px solid rgba(201,168,76,0.1);
          border-radius: 8px;
          overflow: hidden;
          transition: all 0.35s;
        }
        .lux-product-card:hover {
          border-color: rgba(201,168,76,0.35);
          transform: translateY(-6px);
          box-shadow: 0 25px 50px rgba(0,0,0,0.5), 0 0 25px rgba(201,168,76,0.08);
        }
        .lux-product-img-wrap {
          position: relative;
          overflow: hidden;
          height: 200px;
        }
        .lux-product-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .lux-product-card:hover .lux-product-img { transform: scale(1.07); }
        .lux-product-overlay {
          position: absolute;
          top: 0.75rem;
          right: 0.75rem;
        }
        .lux-category-tag {
          background: rgba(10,10,11,0.7);
          border: 1px solid rgba(201,168,76,0.3);
          color: #C9A84C;
          font-family: 'Tajawal', sans-serif;
          font-size: 0.7rem;
          padding: 0.2rem 0.6rem;
          border-radius: 3px;
          backdrop-filter: blur(10px);
          letter-spacing: 0.5px;
        }
        .lux-product-body { padding: 1.25rem; }
        .lux-product-name {
          font-family: 'Playfair Display', serif;
          color: #F0EDE6;
          font-size: 0.95rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
          line-height: 1.4;
        }
        .lux-product-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.85rem;
        }
        .lux-product-price {
          font-family: 'Tajawal', sans-serif;
          font-weight: 700;
          font-size: 1.05rem;
          color: #C9A84C;
        }
        .lux-product-price span { font-size: 0.75rem; opacity: 0.7; }
        .lux-product-rating {
          font-family: 'Tajawal', sans-serif;
          font-size: 0.8rem;
          color: #8A8580;
        }
        .lux-add-btn {
          width: 100%;
          background: transparent;
          border: 1px solid rgba(201,168,76,0.3);
          color: #C9A84C;
          font-family: 'Tajawal', sans-serif;
          font-size: 0.85rem;
          font-weight: 600;
          padding: 0.55rem 1rem;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.3s;
          letter-spacing: 0.3px;
        }
        .lux-add-btn:hover {
          background: linear-gradient(135deg, #C9A84C, #9B7A2F);
          border-color: transparent;
          color: #000;
          transform: none;
        }
        .lux-add-btn.added {
          background: rgba(90,191,130,0.12);
          border-color: rgba(90,191,130,0.3);
          color: #5ABF82;
          cursor: default;
        }

        /* ── CTA ── */
        .lux-cta {
          position: relative;
          padding: 6rem 0;
          text-align: center;
          overflow: hidden;
        }
        .lux-cta-bg {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 80% 60% at 50% 50%, rgba(201,168,76,0.08) 0%, transparent 70%),
            linear-gradient(135deg, #0A0A0B 0%, #111113 100%);
        }
        .lux-cta-border {
          position: absolute;
          inset: 2rem;
          border: 1px solid rgba(201,168,76,0.12);
          border-radius: 8px;
          pointer-events: none;
        }
        .lux-cta-content {
          position: relative;
          max-width: 600px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }
        .lux-cta-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }
        .lux-cta-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.8rem, 4vw, 2.8rem);
          font-weight: 700;
          color: #F0EDE6;
          margin-bottom: 0.75rem;
        }
        .lux-cta-sub {
          font-family: 'Tajawal', sans-serif;
          color: #8A8580;
          font-size: 1rem;
          margin-bottom: 2rem;
        }

        @media (max-width: 640px) {
          .lux-stats-inner { grid-template-columns: repeat(2, 1fr); }
          .lux-products-grid { grid-template-columns: repeat(2, 1fr); gap: 1rem; }
          .lux-hero { height: 480px; }
          .lux-products-header { flex-direction: column; gap: 1rem; align-items: flex-start; }
        }
      `}</style>

      {/* Hero */}
      <div className="lux-hero">
        {SLIDES.map((s, i) => (
          <div key={i} className={`lux-hero-slide ${i === slide ? 'active' : ''}`}>
            <div className="lux-hero-bg" style={{ backgroundImage: `url(${s.img})` }} />
            <div className="lux-hero-overlay" />
            <div className="lux-hero-content">
              <div className="lux-hero-text">
                <span className="lux-hero-tag">{s.tag}</span>
                <h1 className="lux-hero-title">
                  {s.title.split(' ').map((w, j) => (
                    j === s.title.split(' ').length - 1
                      ? <span key={j}>{w}</span>
                      : <React.Fragment key={j}>{w} </React.Fragment>
                  ))}
                </h1>
                <p className="lux-hero-sub">{s.sub}</p>
                <Link to="/products" className="lux-hero-btn">
                  {s.btn} ←
                </Link>
              </div>
            </div>
          </div>
        ))}
        <div className="lux-dots">
          {SLIDES.map((_, i) => (
            <button key={i} className={`lux-dot ${i === slide ? 'active' : ''}`} onClick={() => setSlide(i)} />
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="lux-stats">
        <div className="lux-stats-inner">
          {STATS.map(({ num, label }) => (
            <div key={label}>
              <div className="lux-stat-num">{num}</div>
              <div className="lux-stat-label">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div style={{ padding: '5rem 0', background: '#0A0A0B' }}>
        <div className="lux-features">
          <div className="lux-section-header">
            <div className="lux-section-subtitle">لماذا نحن</div>
            <h2 className="lux-section-title">تجربة تسوق استثنائية</h2>
          </div>
          <div className="lux-features-grid">
            {FEATURES.map(({ icon, title, desc }) => (
              <div key={title} className="lux-feature-card">
                <div className="lux-feature-icon">{icon}</div>
                <h3 className="lux-feature-title">{title}</h3>
                <p className="lux-feature-desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="lux-products-section">
        <div className="lux-products-inner">
          <div className="lux-products-header">
            <div>
              <div className="lux-section-subtitle">الأكثر طلباً</div>
              <h2 className="lux-section-title">منتجات مختارة بعناية</h2>
            </div>
            <Link to="/products" className="lux-view-all">عرض الكل →</Link>
          </div>
          <div className="lux-products-grid">
            {FEATURED.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="lux-cta">
        <div className="lux-cta-bg" />
        <div className="lux-cta-border" />
        <div className="lux-cta-content">
          <div className="lux-cta-icon">🎁</div>
          <h2 className="lux-cta-title">عروض حصرية يومياً</h2>
          <p className="lux-cta-sub">اشترك الآن واحصل على خصم 10% على أول طلب لك</p>
          <Link to="/products" className="lux-hero-btn">
            تسوق الآن ←
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;

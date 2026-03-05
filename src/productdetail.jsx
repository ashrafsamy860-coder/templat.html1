// ==================== productdetail.jsx ====================
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCart } from './CartContext';

const allProducts = [
  { id: 1,  name: 'لابتوب i7',       price: 25000, category: 'إلكترونيات', rating: 4.8, stock: 10, img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600', description: 'لابتوب قوي بمعالج i7 والكرت الشاشة RTX 3060، مثالي للعمل والألعاب.' },
  { id: 2,  name: 'iPhone 15 Pro',   price: 35000, category: 'إلكترونيات', rating: 4.9, stock: 5,  img: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=600', description: 'آيفون 15 برو بكاميرا احترافية 48MP وبطارية تدوم يومين كاملين.' },
  { id: 3,  name: 'AirPods Pro',     price: 5000,  category: 'إلكترونيات', rating: 4.7, stock: 20, img: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600', description: 'سماعات AirPods Pro مع خاصية إلغاء الضوضاء النشطة وصوت ثلاثي الأبعاد.' },
  { id: 4,  name: 'قميص قطني',       price: 800,   category: 'ملابس',       rating: 4.5, stock: 50, img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600', description: 'قميص قطني 100% مريح بتصميم عصري مناسب لجميع المناسبات.' },
  { id: 5,  name: 'ساعة ذكية',       price: 4500,  category: 'إكسسوارات',  rating: 4.6, stock: 15, img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600', description: 'ساعة ذكية تتابع صحتك وتبقيك متصلاً طوال اليوم.' },
  { id: 7,  name: 'كاميرا DSLR',     price: 15000, category: 'إلكترونيات', rating: 4.8, stock: 8,  img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600', description: 'كاميرا DSLR احترافية بدقة 24.2 ميجابيكسل مثالية للتصوير.' },
  { id: 9,  name: 'حقيبة ظهر',       price: 900,   category: 'إكسسوارات',  rating: 4.5, stock: 25, img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600', description: 'حقيبة ظهر عملية بتصميم أنيق ومساحة واسعة للاستخدام اليومي.' },
  { id: 11, name: 'فستان صيفي',      price: 1500,  category: 'ملابس',       rating: 4.7, stock: 35, img: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600', description: 'فستان صيفي أنيق خفيف ومريح لإطلالة مثالية.' },
];

const ProductDetail = () => {
  const { id } = useParams();
  const product = allProducts.find((p) => p.id === Number(id));
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div style={{ textAlign: 'center', padding: '5rem 1rem' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>😔</div>
        <h2 style={{ fontFamily: 'Playfair Display, serif', color: '#8A8580' }}>المنتج غير موجود</h2>
        <Link to="/products" style={{ display: 'inline-block', marginTop: '1.5rem', padding: '0.6rem 2rem', background: 'linear-gradient(135deg, #C9A84C, #9B7A2F)', color: '#000', borderRadius: '4px', textDecoration: 'none', fontFamily: 'Tajawal, sans-serif', fontWeight: 700 }}>
          الرجوع للمنتجات
        </Link>
      </div>
    );
  }

  const related = allProducts.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) addToCart({ ...product, quantity: 1 });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const stars = [...Array(5)].map((_, i) => i < Math.floor(product.rating) ? '★' : '☆');

  return (
    <>
      <style>{`
        .pd-container { max-width: 1280px; margin: 0 auto; padding: 3rem 1.5rem; }
        .pd-back {
          display: inline-flex; align-items: center; gap: 0.5rem;
          color: #8A8580; text-decoration: none;
          font-family: 'Tajawal', sans-serif; font-size: 0.85rem;
          margin-bottom: 2.5rem; border-bottom: 1px solid transparent;
          transition: all 0.25s;
        }
        .pd-back:hover { color: #C9A84C; border-color: rgba(201,168,76,0.3); }
        .pd-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: start; }
        .pd-img-wrap {
          position: relative; border-radius: 8px; overflow: hidden;
          border: 1px solid rgba(201,168,76,0.12);
          aspect-ratio: 1;
        }
        .pd-img { width: 100%; height: 100%; object-fit: cover; }
        .pd-img-badge {
          position: absolute; top: 1rem; right: 1rem;
          background: rgba(10,10,11,0.8); border: 1px solid rgba(201,168,76,0.35);
          color: #C9A84C; font-family: 'Tajawal', sans-serif;
          font-size: 0.75rem; padding: 0.25rem 0.8rem; border-radius: 3px;
          backdrop-filter: blur(10px); letter-spacing: 0.5px;
        }
        .pd-cat {
          display: inline-block;
          font-family: 'Tajawal', sans-serif; font-size: 0.75rem;
          color: #C9A84C; letter-spacing: 2px; text-transform: uppercase;
          margin-bottom: 0.75rem;
        }
        .pd-name {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.6rem, 3vw, 2.2rem);
          font-weight: 700; color: #F0EDE6;
          line-height: 1.2; margin-bottom: 1.25rem;
        }
        .pd-meta { display: flex; align-items: center; gap: 1.5rem; margin-bottom: 1.5rem; }
        .pd-stars { color: #C9A84C; font-size: 1.1rem; letter-spacing: 2px; }
        .pd-rating-num { font-family: 'Tajawal', sans-serif; color: #8A8580; font-size: 0.9rem; }
        .pd-stock-badge {
          font-family: 'Tajawal', sans-serif; font-size: 0.75rem;
          padding: 0.2rem 0.7rem; border-radius: 20px;
        }
        .pd-stock-ok { background: rgba(90,191,130,0.1); color: #5ABF82; border: 1px solid rgba(90,191,130,0.2); }
        .pd-stock-low { background: rgba(201,168,76,0.1); color: #C9A84C; border: 1px solid rgba(201,168,76,0.2); }
        .pd-divider { height: 1px; background: linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent); border: none; margin: 1.5rem 0; }
        .pd-price {
          font-family: 'Playfair Display', serif;
          font-size: 2rem; font-weight: 700;
          background: linear-gradient(135deg, #C9A84C, #E8C97A);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          margin-bottom: 1rem;
        }
        .pd-desc { font-family: 'Tajawal', sans-serif; color: #8A8580; line-height: 1.8; margin-bottom: 1.5rem; }
        .pd-qty-label { font-family: 'Tajawal', sans-serif; color: #8A8580; font-size: 0.85rem; margin-bottom: 0.5rem; }
        .pd-qty-ctrl { display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem; }
        .pd-qty-btn {
          width: 36px; height: 36px; background: transparent;
          border: 1px solid rgba(201,168,76,0.25); color: #C9A84C;
          border-radius: 4px; cursor: pointer; font-size: 1rem;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.25s;
        }
        .pd-qty-btn:hover { background: rgba(201,168,76,0.1); }
        .pd-qty-num { font-family: 'Playfair Display', serif; font-size: 1.2rem; color: #F0EDE6; min-width: 30px; text-align: center; }
        .pd-actions { display: flex; gap: 1rem; margin-bottom: 2rem; }
        .pd-add-btn {
          flex: 1; background: linear-gradient(135deg, #C9A84C, #9B7A2F);
          border: none; color: #000;
          font-family: 'Tajawal', sans-serif; font-weight: 700;
          font-size: 1rem; padding: 0.9rem 1.5rem; border-radius: 4px;
          cursor: pointer; transition: all 0.3s; letter-spacing: 0.5px;
        }
        .pd-add-btn:hover:not(:disabled) { background: linear-gradient(135deg, #E8C97A, #C9A84C); transform: translateY(-1px); box-shadow: 0 8px 25px rgba(201,168,76,0.3); }
        .pd-add-btn.added { background: linear-gradient(135deg, #1A4A2E, #2D7A4F); color: #5ABF82; }
        .pd-wish-btn {
          width: 52px; height: 52px;
          background: transparent; border: 1px solid rgba(201,168,76,0.2);
          border-radius: 4px; cursor: pointer; font-size: 1.3rem;
          transition: all 0.3s; display: flex; align-items: center; justify-content: center;
        }
        .pd-wish-btn:hover, .pd-wish-btn.active { border-color: #8B2020; background: rgba(139,32,32,0.1); }
        .pd-info-box {
          background: #111113; border: 1px solid rgba(201,168,76,0.08);
          border-radius: 6px; padding: 1.25rem;
        }
        .pd-info-title { font-family: 'Tajawal', sans-serif; font-weight: 700; color: #C9A84C; font-size: 0.85rem; margin-bottom: 0.75rem; letter-spacing: 0.5px; }
        .pd-info-item { display: flex; align-items: center; gap: 0.6rem; margin-bottom: 0.5rem; font-family: 'Tajawal', sans-serif; color: #8A8580; font-size: 0.85rem; }
        .pd-related { margin-top: 4rem; }
        .pd-related-title { font-family: 'Playfair Display', serif; color: #F0EDE6; font-size: 1.4rem; margin-bottom: 1.5rem; }
        .pd-related-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 1rem; }
        .pd-rel-card {
          background: #121214; border: 1px solid rgba(201,168,76,0.08);
          border-radius: 6px; overflow: hidden; transition: all 0.3s; text-decoration: none;
        }
        .pd-rel-card:hover { border-color: rgba(201,168,76,0.25); transform: translateY(-3px); }
        .pd-rel-img { width: 100%; height: 150px; object-fit: cover; display: block; }
        .pd-rel-body { padding: 0.85rem; }
        .pd-rel-name { font-family: 'Playfair Display', serif; color: #F0EDE6; font-size: 0.85rem; margin-bottom: 0.3rem; }
        .pd-rel-price { font-family: 'Tajawal', sans-serif; color: #C9A84C; font-size: 0.82rem; font-weight: 700; }
        @media (max-width: 768px) { .pd-grid { grid-template-columns: 1fr; gap: 2rem; } }
      `}</style>

      <div className="pd-container">
        <Link to="/products" className="pd-back">← العودة للمنتجات</Link>

        <div className="pd-grid">
          <div className="pd-img-wrap">
            <img src={product.img} alt={product.name} className="pd-img"
              onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=600'; }} />
            <span className="pd-img-badge">{product.category}</span>
          </div>

          <div>
            <span className="pd-cat">{product.category}</span>
            <h1 className="pd-name">{product.name}</h1>

            <div className="pd-meta">
              <div className="pd-stars">{stars.join('')}</div>
              <span className="pd-rating-num">{product.rating} / 5</span>
              <span className={`pd-stock-badge ${product.stock > 5 ? 'pd-stock-ok' : 'pd-stock-low'}`}>
                {product.stock} قطعة متبقية
              </span>
            </div>

            <hr className="pd-divider" />
            <div className="pd-price">{product.price.toLocaleString()} ج.م</div>
            <p className="pd-desc">{product.description}</p>

            <div className="pd-qty-label">الكمية:</div>
            <div className="pd-qty-ctrl">
              <button className="pd-qty-btn" onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
              <span className="pd-qty-num">{quantity}</span>
              <button className="pd-qty-btn" onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}>+</button>
            </div>

            <div className="pd-actions">
              <button className={`pd-add-btn ${added ? 'added' : ''}`} onClick={handleAdd} disabled={product.stock === 0}>
                {added ? '✅ تمت الإضافة!' : '🛒 أضف للسلة'}
              </button>
              <button className={`pd-wish-btn ${wishlisted ? 'active' : ''}`} onClick={() => setWishlisted(!wishlisted)}>
                {wishlisted ? '❤️' : '🤍'}
              </button>
            </div>

            <div className="pd-info-box">
              <div className="pd-info-title">الشحن والضمان</div>
              {[
                ['🚚', 'شحن مجاني للطلبات فوق 1000 جنيه'],
                ['⚡', 'توصيل خلال 1-3 أيام عمل'],
                ['↩️', 'إرجاع مجاني خلال 30 يوم'],
                ['🔒', 'ضمان الجودة والأصالة'],
              ].map(([icon, text]) => (
                <div key={text} className="pd-info-item"><span>{icon}</span>{text}</div>
              ))}
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="pd-related">
            <hr className="pd-divider" />
            <h3 className="pd-related-title">منتجات مشابهة</h3>
            <div className="pd-related-grid">
              {related.map((p) => (
                <Link key={p.id} to={`/products/${p.id}`} className="pd-rel-card">
                  <img src={p.img} alt={p.name} className="pd-rel-img"
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=300'; }} />
                  <div className="pd-rel-body">
                    <div className="pd-rel-name">{p.name}</div>
                    <div className="pd-rel-price">{p.price.toLocaleString()} ج.م</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductDetail;

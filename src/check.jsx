import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';

const Checkout = () => {
  const { cart, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderNum] = useState(() => Math.floor(100000 + Math.random() * 900000));
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', address: '', city: '', paymentMethod: 'cash',
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setOrderSuccess(true); clearCart(); }, 1800);
  };

  const shipping = total >= 1000 ? 0 : 50;

  if (cart.length === 0 && !orderSuccess) {
    return (
      <div style={{ textAlign: 'center', padding: '5rem 1rem' }}>
        <h3 style={{ fontFamily: 'Playfair Display, serif', color: '#8A8580' }}>السلة فارغة</h3>
        <Link to="/products" style={{ display: 'inline-block', marginTop: '1.5rem', padding: '0.6rem 2rem', background: 'linear-gradient(135deg, #C9A84C, #9B7A2F)', color: '#000', borderRadius: '4px', textDecoration: 'none', fontFamily: 'Tajawal, sans-serif', fontWeight: 700 }}>
          ابدأ التسوق
        </Link>
      </div>
    );
  }

  if (orderSuccess) {
    return (
      <>
        <style>{`
          .order-success { text-align: center; padding: 7rem 1rem; }
          .order-success-icon { font-size: 5rem; margin-bottom: 1.5rem; animation: pop 0.5s ease; }
          @keyframes pop { 0% { transform: scale(0); } 80% { transform: scale(1.1); } 100% { transform: scale(1); } }
          .order-success-title { font-family: 'Playfair Display', serif; font-size: 2rem; color: #5ABF82; margin-bottom: 0.75rem; }
          .order-success-num { font-family: 'Tajawal', sans-serif; color: #C9A84C; font-size: 1.2rem; margin-bottom: 0.5rem; font-weight: 700; }
          .order-success-sub { font-family: 'Tajawal', sans-serif; color: #8A8580; margin-bottom: 2.5rem; }
          .order-home-btn { display: inline-block; padding: 0.85rem 2.5rem; background: linear-gradient(135deg, #C9A84C, #9B7A2F); color: #000; font-family: 'Tajawal', sans-serif; font-weight: 700; border-radius: 4px; text-decoration: none; transition: all 0.3s; cursor: pointer; border: none; font-size: 1rem; }
          .order-home-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 30px rgba(201,168,76,0.3); color: #000; }
        `}</style>
        <div className="order-success">
          <div className="order-success-icon">✅</div>
          <h2 className="order-success-title">تم إتمام الطلب بنجاح!</h2>
          <div className="order-success-num">#{orderNum}</div>
          <p className="order-success-sub">سيتم التواصل معك قريباً لتأكيد التفاصيل</p>
          <button className="order-home-btn" onClick={() => navigate('/')}>العودة للرئيسية</button>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{`
        .chk-container { max-width: 1100px; margin: 0 auto; padding: 3rem 1.5rem; }
        .chk-title { font-family: 'Playfair Display', serif; font-size: 1.8rem; color: #F0EDE6; margin-bottom: 2rem; }
        .chk-layout { display: grid; grid-template-columns: 1fr 320px; gap: 2rem; align-items: start; }
        .chk-card { background: #111113; border: 1px solid rgba(201,168,76,0.1); border-radius: 8px; overflow: hidden; margin-bottom: 1.5rem; }
        .chk-card-header { padding: 1rem 1.5rem; border-bottom: 1px solid rgba(201,168,76,0.08); display: flex; align-items: center; gap: 0.6rem; }
        .chk-card-header-title { font-family: 'Playfair Display', serif; color: #C9A84C; font-size: 1rem; font-weight: 600; margin: 0; }
        .chk-card-body { padding: 1.5rem; }
        .chk-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
        .chk-field { margin-bottom: 0; }
        .chk-field label { display: block; font-family: 'Tajawal', sans-serif; color: #8A8580; font-size: 0.8rem; margin-bottom: 0.4rem; letter-spacing: 0.3px; }
        .chk-input, .chk-select, .chk-textarea {
          width: 100%; background: rgba(255,255,255,0.04);
          border: 1px solid rgba(201,168,76,0.12); color: #F0EDE6;
          font-family: 'Tajawal', sans-serif; font-size: 0.9rem;
          padding: 0.6rem 0.85rem; border-radius: 4px; outline: none; transition: border-color 0.3s;
        }
        .chk-input::placeholder, .chk-textarea::placeholder { color: #3A3530; }
        .chk-input:focus, .chk-select:focus, .chk-textarea:focus { border-color: rgba(201,168,76,0.4); }
        .chk-select option { background: #1A1A1E; }
        .chk-textarea { resize: vertical; min-height: 90px; }
        .chk-full { grid-column: 1 / -1; }
        .chk-submit-btn {
          width: 100%; background: linear-gradient(135deg, #C9A84C, #9B7A2F);
          border: none; color: #000;
          font-family: 'Tajawal', sans-serif; font-weight: 700;
          font-size: 1rem; padding: 0.95rem; border-radius: 4px;
          cursor: pointer; transition: all 0.3s; margin-top: 1.5rem; letter-spacing: 0.5px;
        }
        .chk-submit-btn:hover:not(:disabled) { background: linear-gradient(135deg, #E8C97A, #C9A84C); transform: translateY(-1px); box-shadow: 0 8px 25px rgba(201,168,76,0.3); }
        .chk-submit-btn:disabled { opacity: 0.7; cursor: not-allowed; }
        .chk-spinner { display: inline-block; width: 14px; height: 14px; border: 2px solid rgba(0,0,0,0.3); border-top-color: #000; border-radius: 50%; animation: spin 0.7s linear infinite; margin-left: 0.5rem; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .chk-summary { background: #111113; border: 1px solid rgba(201,168,76,0.12); border-radius: 8px; padding: 1.5rem; position: sticky; top: 90px; }
        .chk-summary-title { font-family: 'Playfair Display', serif; color: #F0EDE6; font-size: 1.05rem; margin-bottom: 1.25rem; padding-bottom: 0.85rem; border-bottom: 1px solid rgba(201,168,76,0.08); }
        .chk-order-item { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.6rem; font-family: 'Tajawal', sans-serif; font-size: 0.85rem; }
        .chk-order-item-name { color: #8A8580; flex: 1; }
        .chk-order-item-total { color: #F0EDE6; font-weight: 600; white-space: nowrap; margin-right: 0.5rem; }
        .chk-divider { height: 1px; background: linear-gradient(90deg, transparent, rgba(201,168,76,0.12), transparent); border: none; margin: 1rem 0; }
        .chk-total-row { display: flex; justify-content: space-between; font-family: 'Playfair Display', serif; font-size: 1.1rem; color: #F0EDE6; margin-top: 0.5rem; }
        .chk-total-val { color: #5ABF82; font-weight: 700; }
        .chk-free-ship-alert { background: rgba(90,191,130,0.07); border: 1px solid rgba(90,191,130,0.15); border-radius: 4px; padding: 0.6rem 0.85rem; font-family: 'Tajawal', sans-serif; font-size: 0.8rem; color: #5ABF82; margin-top: 0.75rem; text-align: center; }
        @media (max-width: 768px) {
          .chk-layout { grid-template-columns: 1fr; }
          .chk-row { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="chk-container">
        <h2 className="chk-title">💳 إتمام الطلب</h2>

        <div className="chk-layout">
          <div>
            <div className="chk-card">
              <div className="chk-card-header">
                <span>👤</span>
                <h3 className="chk-card-header-title">بيانات العميل</h3>
              </div>
              <div className="chk-card-body">
                <form onSubmit={handleSubmit}>
                  <div className="chk-row">
                    <div className="chk-field">
                      <label>الاسم الكامل *</label>
                      <input className="chk-input" required name="name" placeholder="أدخل اسمك الكامل" value={formData.name} onChange={handleChange} />
                    </div>
                    <div className="chk-field">
                      <label>رقم الهاتف *</label>
                      <input className="chk-input" required type="tel" name="phone" placeholder="01xxxxxxxxx" value={formData.phone} onChange={handleChange} />
                    </div>
                    <div className="chk-field">
                      <label>البريد الإلكتروني</label>
                      <input className="chk-input" type="email" name="email" placeholder="example@email.com" value={formData.email} onChange={handleChange} />
                    </div>
                    <div className="chk-field">
                      <label>طريقة الدفع *</label>
                      <select className="chk-select" required name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
                        <option value="cash">💵 الدفع عند الاستلام</option>
                        <option value="card">💳 بطاقة ائتمان</option>
                        <option value="instapay">📱 InstaPay</option>
                      </select>
                    </div>
                    <div className="chk-field chk-full">
                      <label>عنوان التوصيل *</label>
                      <textarea className="chk-textarea" required name="address" placeholder="العنوان التفصيلي، المدينة، الكود البريدي" value={formData.address} onChange={handleChange} />
                    </div>
                  </div>
                  <button type="submit" className="chk-submit-btn" disabled={loading}>
                    {loading ? (
                      <>جاري المعالجة...<span className="chk-spinner" /></>
                    ) : (
                      <>تأكيد الطلب — {(total + shipping).toLocaleString()} ج.م</>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="chk-summary">
            <div className="chk-summary-title">ملخص الطلب</div>
            {cart.map((i) => (
              <div key={i.id} className="chk-order-item">
                <span className="chk-order-item-name">{i.name} × {i.quantity}</span>
                <span className="chk-order-item-total">{(i.price * i.quantity).toLocaleString()}</span>
              </div>
            ))}
            <hr className="chk-divider" />
            <div className="chk-order-item">
              <span className="chk-order-item-name">الشحن</span>
              <span style={{ color: shipping === 0 ? '#5ABF82' : '#F0EDE6', fontFamily: 'Tajawal', fontSize: '0.85rem', fontWeight: 600 }}>
                {shipping === 0 ? 'مجاني 🎉' : `${shipping} ج.م`}
              </span>
            </div>
            <div className="chk-total-row">
              <span>المجموع</span>
              <span className="chk-total-val">{(total + shipping).toLocaleString()} ج.م</span>
            </div>
            {shipping === 0 && <div className="chk-free-ship-alert">✅ شحن مجاني على طلبك!</div>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, total, clearCart } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <>
        <style>{`
          .cart-empty { text-align: center; padding: 7rem 1rem; }
          .cart-empty-icon { font-size: 5rem; margin-bottom: 1.5rem; opacity: 0.4; }
          .cart-empty-title { font-family: 'Playfair Display', serif; font-size: 1.8rem; color: #8A8580; margin-bottom: 0.75rem; }
          .cart-empty-sub { font-family: 'Tajawal', sans-serif; color: #5A5550; margin-bottom: 2rem; }
          .cart-shop-btn {
            display: inline-block; padding: 0.85rem 2.5rem;
            background: linear-gradient(135deg, #C9A84C, #9B7A2F);
            color: #000; font-family: 'Tajawal', sans-serif; font-weight: 700;
            border-radius: 4px; text-decoration: none; transition: all 0.3s;
          }
          .cart-shop-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 30px rgba(201,168,76,0.3); color: #000; }
        `}</style>
        <div className="cart-empty">
          <div className="cart-empty-icon">🛒</div>
          <h2 className="cart-empty-title">السلة فارغة</h2>
          <p className="cart-empty-sub">لم تضف أي منتجات بعد</p>
          <Link to="/products" className="cart-shop-btn">تسوق الآن</Link>
        </div>
      </>
    );
  }

  const shipping = total >= 1000 ? 0 : 50;

  return (
    <>
      <style>{`
        .cart-container { max-width: 1280px; margin: 0 auto; padding: 3rem 1.5rem; }
        .cart-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2.5rem; }
        .cart-title { font-family: 'Playfair Display', serif; font-size: 1.8rem; color: #F0EDE6; margin: 0; }
        .cart-clear-btn {
          background: transparent; border: 1px solid rgba(139,32,32,0.4);
          color: #D05050; font-family: 'Tajawal', sans-serif; font-size: 0.85rem;
          padding: 0.4rem 1rem; border-radius: 4px; cursor: pointer; transition: all 0.3s;
        }
        .cart-clear-btn:hover { background: rgba(139,32,32,0.1); }
        .cart-layout { display: grid; grid-template-columns: 1fr 340px; gap: 2rem; align-items: start; }
        .cart-items { background: #111113; border: 1px solid rgba(201,168,76,0.08); border-radius: 8px; overflow: hidden; }
        .cart-item { display: grid; grid-template-columns: 80px 1fr auto auto auto; align-items: center; gap: 1.25rem; padding: 1.25rem 1.5rem; border-bottom: 1px solid rgba(201,168,76,0.06); }
        .cart-item:last-child { border-bottom: none; }
        .cart-item-img { width: 80px; height: 80px; object-fit: cover; border-radius: 6px; border: 1px solid rgba(201,168,76,0.1); }
        .cart-item-name { font-family: 'Playfair Display', serif; color: #F0EDE6; font-size: 0.95rem; font-weight: 600; margin-bottom: 0.25rem; }
        .cart-item-cat { font-family: 'Tajawal', sans-serif; color: #8A8580; font-size: 0.78rem; }
        .cart-item-price { font-family: 'Tajawal', sans-serif; color: #C9A84C; font-weight: 700; font-size: 0.95rem; white-space: nowrap; }
        .cart-qty-ctrl { display: flex; align-items: center; gap: 0.6rem; }
        .cart-qty-btn {
          width: 28px; height: 28px;
          background: transparent; border: 1px solid rgba(201,168,76,0.2);
          color: #C9A84C; border-radius: 4px; cursor: pointer; font-size: 0.9rem;
          display: flex; align-items: center; justify-content: center; transition: all 0.25s;
        }
        .cart-qty-btn:hover { background: rgba(201,168,76,0.1); }
        .cart-qty-num { font-family: 'Tajawal', sans-serif; color: #F0EDE6; font-weight: 700; min-width: 24px; text-align: center; }
        .cart-item-total { font-family: 'Tajawal', sans-serif; color: #5ABF82; font-weight: 700; white-space: nowrap; }
        .cart-remove-btn {
          background: transparent; border: none; color: #5A5550;
          cursor: pointer; font-size: 1rem; padding: 0.25rem;
          border-radius: 4px; transition: all 0.25s;
        }
        .cart-remove-btn:hover { color: #D05050; }
        .cart-summary { background: #111113; border: 1px solid rgba(201,168,76,0.12); border-radius: 8px; padding: 1.5rem; position: sticky; top: 90px; }
        .cart-summary-title { font-family: 'Playfair Display', serif; color: #F0EDE6; font-size: 1.1rem; margin-bottom: 1.5rem; padding-bottom: 1rem; border-bottom: 1px solid rgba(201,168,76,0.1); }
        .cart-summary-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.85rem; font-family: 'Tajawal', sans-serif; font-size: 0.9rem; color: #8A8580; }
        .cart-summary-row span:last-child { color: #F0EDE6; font-weight: 600; }
        .cart-free-ship { color: #5ABF82 !important; }
        .cart-divider { height: 1px; background: linear-gradient(90deg, transparent, rgba(201,168,76,0.15), transparent); border: none; margin: 1rem 0; }
        .cart-total-row { display: flex; justify-content: space-between; align-items: center; font-family: 'Playfair Display', serif; font-size: 1.1rem; margin-bottom: 1.25rem; color: #F0EDE6; }
        .cart-total-val { color: #5ABF82; font-weight: 700; }
        .cart-ship-alert { background: rgba(201,168,76,0.06); border: 1px solid rgba(201,168,76,0.15); border-radius: 4px; padding: 0.65rem 0.85rem; font-family: 'Tajawal', sans-serif; font-size: 0.82rem; color: #C9A84C; margin-bottom: 1.25rem; text-align: center; }
        .cart-checkout-btn {
          display: block; width: 100%;
          background: linear-gradient(135deg, #C9A84C, #9B7A2F); border: none;
          color: #000; font-family: 'Tajawal', sans-serif; font-weight: 700;
          font-size: 1rem; padding: 0.9rem; border-radius: 4px;
          cursor: pointer; transition: all 0.3s; margin-bottom: 0.75rem; letter-spacing: 0.5px;
        }
        .cart-checkout-btn:hover { background: linear-gradient(135deg, #E8C97A, #C9A84C); transform: translateY(-1px); box-shadow: 0 8px 25px rgba(201,168,76,0.3); }
        .cart-continue-link {
          display: block; text-align: center; padding: 0.7rem;
          border: 1px solid rgba(201,168,76,0.2); color: #C9A84C;
          font-family: 'Tajawal', sans-serif; font-size: 0.9rem;
          border-radius: 4px; text-decoration: none; transition: all 0.25s;
        }
        .cart-continue-link:hover { background: rgba(201,168,76,0.08); color: #E8C97A; }
        @media (max-width: 768px) {
          .cart-layout { grid-template-columns: 1fr; }
          .cart-item { grid-template-columns: 60px 1fr; gap: 0.75rem; }
          .cart-item-price, .cart-item-total, .cart-remove-btn { grid-column: 2; }
        }
      `}</style>

      <div className="cart-container">
        <div className="cart-header">
          <h2 className="cart-title">🛒 سلة التسوق</h2>
          <button className="cart-clear-btn" onClick={clearCart}>🗑️ إفراغ السلة</button>
        </div>

        <div className="cart-layout">
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.img} alt={item.name} className="cart-item-img"
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=100'; }} />
                <div>
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-cat">{item.category}</div>
                </div>
                <div className="cart-item-price">{item.price.toLocaleString()} ج.م</div>
                <div className="cart-qty-ctrl">
                  <button className="cart-qty-btn" onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                  <span className="cart-qty-num">{item.quantity}</span>
                  <button className="cart-qty-btn" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>
                <div className="cart-item-total">{(item.price * item.quantity).toLocaleString()} ج.م</div>
                <button className="cart-remove-btn" onClick={() => removeFromCart(item.id)}>✕</button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="cart-summary-title">ملخص الطلب</div>
            <div className="cart-summary-row">
              <span>عدد المنتجات:</span>
              <span>{cart.reduce((s, i) => s + i.quantity, 0)} قطعة</span>
            </div>
            <div className="cart-summary-row">
              <span>المجموع الفرعي:</span>
              <span>{total.toLocaleString()} ج.م</span>
            </div>
            <div className="cart-summary-row">
              <span>الشحن:</span>
              <span className={shipping === 0 ? 'cart-free-ship' : ''}>
                {shipping === 0 ? 'مجاني 🎉' : `${shipping} ج.م`}
              </span>
            </div>
            <hr className="cart-divider" />
            <div className="cart-total-row">
              <span>الإجمالي:</span>
              <span className="cart-total-val">{(total + shipping).toLocaleString()} ج.م</span>
            </div>
            {total < 1000 && (
              <div className="cart-ship-alert">
                أضف {(1000 - total).toLocaleString()} ج.م للحصول على شحن مجاني 🚀
              </div>
            )}
            <button className="cart-checkout-btn" onClick={() => navigate('/checkout')}>
              إتمام الشراء →
            </button>
            <Link to="/products" className="cart-continue-link">
              ← متابعة التسوق
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;

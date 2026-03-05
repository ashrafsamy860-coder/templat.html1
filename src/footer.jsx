import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (email.trim()) { setSubscribed(true); setEmail(''); }
  };

  return (
    <>
      <style>{`
        .footer {
          background: #080809;
          border-top: 1px solid rgba(201,168,76,0.1);
          padding: 4rem 0 0;
          margin-top: auto;
        }
        .footer-inner {
          max-width: 1280px; margin: 0 auto; padding: 0 1.5rem;
          display: grid; grid-template-columns: 2fr 1fr 1.5fr 1.5fr; gap: 3rem;
          margin-bottom: 3rem;
        }
        .footer-brand-name {
          font-family: 'Playfair Display', serif; font-size: 1.4rem; font-weight: 700;
          background: linear-gradient(135deg, #C9A84C, #E8C97A);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          margin-bottom: 0.75rem;
        }
        .footer-brand-desc {
          font-family: 'Tajawal', sans-serif; color: #5A5550; font-size: 0.88rem;
          line-height: 1.7; margin-bottom: 1.25rem;
        }
        .footer-socials { display: flex; gap: 0.6rem; }
        .footer-social {
          width: 36px; height: 36px;
          background: rgba(255,255,255,0.03); border: 1px solid rgba(201,168,76,0.12);
          border-radius: 6px; display: flex; align-items: center; justify-content: center;
          text-decoration: none; font-size: 0.9rem; transition: all 0.3s;
        }
        .footer-social:hover { border-color: rgba(201,168,76,0.4); background: rgba(201,168,76,0.08); transform: translateY(-2px); }
        .footer-col-title {
          font-family: 'Tajawal', sans-serif; color: #C9A84C; font-size: 0.75rem;
          font-weight: 700; letter-spacing: 2.5px; text-transform: uppercase;
          margin-bottom: 1.25rem;
        }
        .footer-links { list-style: none; padding: 0; margin: 0; }
        .footer-links li { margin-bottom: 0.6rem; }
        .footer-links a {
          font-family: 'Tajawal', sans-serif; color: #5A5550; text-decoration: none;
          font-size: 0.88rem; transition: color 0.25s;
        }
        .footer-links a:hover { color: #C9A84C; }
        .footer-contact-item {
          display: flex; align-items: flex-start; gap: 0.6rem;
          font-family: 'Tajawal', sans-serif; color: #5A5550; font-size: 0.85rem;
          margin-bottom: 0.65rem; line-height: 1.5;
        }
        .footer-contact-icon { color: #C9A84C; flex-shrink: 0; margin-top: 1px; }
        .footer-newsletter-desc { font-family: 'Tajawal', sans-serif; color: #5A5550; font-size: 0.82rem; margin-bottom: 1rem; line-height: 1.6; }
        .footer-sub-row { display: flex; }
        .footer-sub-input {
          flex: 1; background: rgba(255,255,255,0.03);
          border: 1px solid rgba(201,168,76,0.12); border-right: none;
          color: #F0EDE6; font-family: 'Tajawal', sans-serif; font-size: 0.85rem;
          padding: 0.55rem 0.85rem;
          border-radius: 4px 0 0 4px; outline: none; transition: border-color 0.3s;
        }
        .footer-sub-input::placeholder { color: #3A3530; }
        .footer-sub-input:focus { border-color: rgba(201,168,76,0.35); }
        .footer-sub-btn {
          background: linear-gradient(135deg, #C9A84C, #9B7A2F); border: none;
          color: #000; font-family: 'Tajawal', sans-serif; font-weight: 700;
          font-size: 0.82rem; padding: 0.55rem 1.1rem;
          border-radius: 0 4px 4px 0; cursor: pointer; transition: all 0.3s; white-space: nowrap;
        }
        .footer-sub-btn:hover { background: linear-gradient(135deg, #E8C97A, #C9A84C); }
        .footer-sub-success { font-family: 'Tajawal', sans-serif; color: #5ABF82; font-size: 0.85rem; }
        .footer-bottom {
          border-top: 1px solid rgba(201,168,76,0.06);
          padding: 1.25rem 1.5rem;
          max-width: 1280px; margin: 0 auto;
          display: flex; justify-content: space-between; align-items: center;
          flex-wrap: wrap; gap: 0.5rem;
        }
        .footer-copy { font-family: 'Tajawal', sans-serif; color: #3A3530; font-size: 0.8rem; }
        .footer-copy span { color: #C9A84C; }
        @media (max-width: 900px) { .footer-inner { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 560px) { .footer-inner { grid-template-columns: 1fr; } }
      `}</style>

      <footer className="footer">
        <div className="footer-inner">
          {/* Brand */}
          <div>
            <div className="footer-brand-name">🛍️ Rofa Store</div>
            <p className="footer-brand-desc">
              أشرف سامي سعد — دمنهور. أفضل المنتجات بأسعار تنافسية وجودة عالية مضمونة مع خدمة عملاء 24/7.
            </p>
            <div className="footer-socials">
              {[
                { href: 'https://facebook.com', icon: 'f' },
                { href: 'https://twitter.com', icon: '𝕏' },
                { href: 'https://instagram.com', icon: '◎' },
                { href: 'https://youtube.com', icon: '▶' },
              ].map(({ href, icon }) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="footer-social">
                  <span style={{ color: '#C9A84C', fontWeight: 700, fontSize: '0.85rem' }}>{icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <div className="footer-col-title">التنقل</div>
            <ul className="footer-links">
              {[
                { to: '/', label: 'الرئيسية' },
                { to: '/products', label: 'المنتجات' },
                { to: '/cart', label: 'السلة' },
                { to: '/checkout', label: 'إتمام الطلب' },
              ].map(({ to, label }) => (
                <li key={to}><Link to={to}>{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="footer-col-title">تواصل معنا</div>
            {[
              ['📍', 'دمنهور، البحيرة، مصر'],
              ['📞', '0123 456 7890'],
              ['✉️', 'ashraf@store.com'],
              ['⏰', '10 صباحاً – 10 مساءً'],
            ].map(([icon, text]) => (
              <div key={text} className="footer-contact-item">
                <span className="footer-contact-icon">{icon}</span>
                <span>{text}</span>
              </div>
            ))}
          </div>

          {/* Newsletter */}
          <div>
            <div className="footer-col-title">النشرة البريدية</div>
            <p className="footer-newsletter-desc">احصل على العروض الحصرية والخصومات أولاً!</p>
            {subscribed ? (
              <div className="footer-sub-success">✅ تم الاشتراك بنجاح!</div>
            ) : (
              <div className="footer-sub-row">
                <input
                  type="email" className="footer-sub-input"
                  placeholder="بريدك الإلكتروني"
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
                />
                <button className="footer-sub-btn" onClick={handleSubscribe}>اشتراك</button>
              </div>
            )}
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(201,168,76,0.06)', padding: '1.25rem 1.5rem' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
            <p className="footer-copy">© 2026 Rofa Store — جميع الحقوق محفوظة | <span>Ashraf Samy Saad</span></p>
            <p className="footer-copy">صُمِّم بـ ♥ في مصر</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;

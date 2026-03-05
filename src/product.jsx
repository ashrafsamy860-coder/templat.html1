import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useCart } from './CartContext';

const allProducts = [
  { id: 1,  name: 'لابتوب i7',         price: 25000, category: 'إلكترونيات', rating: 4.8, stock: 10, img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500' },
  { id: 2,  name: 'iPhone 15 Pro',      price: 35000, category: 'إلكترونيات', rating: 4.9, stock: 5,  img: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=500' },
  { id: 3,  name: 'AirPods Pro',        price: 5000,  category: 'إلكترونيات', rating: 4.7, stock: 20, img: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500' },
  { id: 7,  name: 'كاميرا DSLR',        price: 15000, category: 'إلكترونيات', rating: 4.8, stock: 8,  img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500' },
  { id: 10, name: 'طابعة ليزر',         price: 6000,  category: 'إلكترونيات', rating: 4.2, stock: 12, img: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=500' },
  { id: 17, name: 'لابتوب i9',          price: 40000, category: 'إلكترونيات', rating: 4.9, stock: 7,  img: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=500' },
  { id: 18, name: 'هاتف سامسونج',       price: 20000, category: 'إلكترونيات', rating: 4.6, stock: 15, img: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500' },
  { id: 28, name: 'ماوس لاسلكي',        price: 500,   category: 'إلكترونيات', rating: 4.3, stock: 50, img: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500' },
  { id: 30, name: 'هارد خارجي 1TB',     price: 2000,  category: 'إلكترونيات', rating: 4.4, stock: 40, img: 'https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=500' },
  { id: 33, name: 'سماعات over-ear',    price: 3000,  category: 'إلكترونيات', rating: 4.7, stock: 15, img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500' },
  { id: 35, name: 'ساعة ذكية',          price: 3500,  category: 'إلكترونيات', rating: 4.6, stock: 22, img: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500' },
  { id: 36, name: 'لابتوب اقتصادي',    price: 15000, category: 'إلكترونيات', rating: 4.3, stock: 28, img: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=500' },
  { id: 4,  name: 'قميص قطني',         price: 800,   category: 'ملابس', rating: 4.5, stock: 50, img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500' },
  { id: 8,  name: 'بنطال جينز',        price: 1200,  category: 'ملابس', rating: 4.3, stock: 40, img: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500' },
  { id: 11, name: 'فستان صيفي',        price: 1500,  category: 'ملابس', rating: 4.7, stock: 35, img: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500' },
  { id: 19, name: 'جاكيت شتوي',        price: 1800,  category: 'ملابس', rating: 4.4, stock: 30, img: 'https://images.unsplash.com/photo-1548126032-079a0fb0099d?w=500' },
  { id: 20, name: 'حذاء رياضي',        price: 1200,  category: 'ملابس', rating: 4.5, stock: 45, img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500' },
  { id: 42, name: 'قميص رسمي',         price: 1000,  category: 'ملابس', rating: 4.4, stock: 35, img: 'https://images.unsplash.com/photo-1598032895397-b9472444bf93?w=500' },
  { id: 43, name: 'فستان سهرة',        price: 2500,  category: 'ملابس', rating: 4.7, stock: 15, img: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=500' },
  { id: 44, name: 'جاكيت جلدي',        price: 3000,  category: 'ملابس', rating: 4.6, stock: 20, img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500' },
  { id: 50, name: 'بدلة عمل',          price: 4000,  category: 'ملابس', rating: 4.8, stock: 10, img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500' },
  { id: 5,  name: 'ساعة ذكية فاخرة',  price: 4500,  category: 'إكسسوارات', rating: 4.6, stock: 15, img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500' },
  { id: 9,  name: 'حقيبة ظهر',         price: 900,   category: 'إكسسوارات', rating: 4.5, stock: 25, img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500' },
  { id: 12, name: 'نظارات شمسية',      price: 700,   category: 'إكسسوارات', rating: 4.4, stock: 50, img: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500' },
  { id: 21, name: 'محفظة جلدية',       price: 600,   category: 'إكسسوارات', rating: 4.3, stock: 50, img: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=500' },
  { id: 54, name: 'قلادة ذهبية',       price: 2000,  category: 'إكسسوارات', rating: 4.7, stock: 20, img: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500' },
  { id: 57, name: 'حقيبة يد',          price: 1500,  category: 'إكسسوارات', rating: 4.6, stock: 30, img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500' },
  { id: 58, name: 'ساعة يد كلاسيكية',  price: 3000,  category: 'إكسسوارات', rating: 4.5, stock: 18, img: 'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=500' },
  { id: 62, name: 'حقيبة سفر',         price: 2500,  category: 'إكسسوارات', rating: 4.5, stock: 15, img: 'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=500' },
  { id: 63, name: 'أقراط',             price: 1200,  category: 'إكسسوارات', rating: 4.6, stock: 25, img: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500' },
  { id: 64, name: 'خاتم',              price: 1800,  category: 'إكسسوارات', rating: 4.7, stock: 20, img: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500' },
];

const ITEMS_PER_PAGE = 8;
const CATS = [
  { val: '',          label: 'الكل',        icon: '✦' },
  { val: 'إلكترونيات', label: 'إلكترونيات', icon: '💻' },
  { val: 'ملابس',     label: 'ملابس',       icon: '👗' },
  { val: 'إكسسوارات', label: 'إكسسوارات',  icon: '💍' },
];

const Products = () => {
  const [searchParams] = useSearchParams();
  const { addToCart } = useCart();
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('name');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [added, setAdded] = useState({});

  useEffect(() => {
    const q = searchParams.get('search') || '';
    setSearch(q);
    setPage(0);
  }, [searchParams]);

  const handleAdd = (product) => {
    addToCart(product);
    setAdded((p) => ({ ...p, [product.id]: true }));
    setTimeout(() => setAdded((p) => ({ ...p, [product.id]: false })), 1600);
  };

  const filtered = allProducts
    .filter((p) => !category || p.category === category)
    .filter((p) => !search || p.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) =>
      sort === 'price' ? a.price - b.price :
      sort === 'rating' ? b.rating - a.rating :
      a.name.localeCompare(b.name, 'ar')
    );

  const pageCount = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE);

  return (
    <>
      <style>{`
        .prod-hero {
          position: relative;
          height: 240px;
          background: url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&auto=format&fit=crop') center/cover;
          display: flex; align-items: center; justify-content: center;
          overflow: hidden;
        }
        .prod-hero::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(10,10,11,0.9) 0%, rgba(10,10,11,0.6) 100%);
        }
        .prod-hero-content { position: relative; text-align: center; }
        .prod-hero-tag {
          display: inline-block;
          background: rgba(201,168,76,0.12);
          border: 1px solid rgba(201,168,76,0.35);
          color: #C9A84C;
          font-family: 'Tajawal', sans-serif;
          font-size: 0.75rem;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          padding: 0.25rem 1rem;
          border-radius: 2px;
          margin-bottom: 0.75rem;
        }
        .prod-hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.6rem, 4vw, 2.4rem);
          font-weight: 700;
          color: #F0EDE6;
          margin: 0;
        }
        .prod-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 3rem 1.5rem;
        }
        .prod-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          align-items: center;
          margin-bottom: 2.5rem;
          padding: 1.5rem;
          background: #111113;
          border: 1px solid rgba(201,168,76,0.1);
          border-radius: 8px;
        }
        .prod-cat-tabs {
          display: flex;
          gap: 0.4rem;
          flex-wrap: wrap;
        }
        .prod-cat-tab {
          background: transparent;
          border: 1px solid rgba(201,168,76,0.15);
          color: #8A8580;
          font-family: 'Tajawal', sans-serif;
          font-size: 0.85rem;
          padding: 0.4rem 1rem;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.25s;
          white-space: nowrap;
        }
        .prod-cat-tab:hover { border-color: rgba(201,168,76,0.35); color: #F0EDE6; }
        .prod-cat-tab.active {
          background: linear-gradient(135deg, #C9A84C, #9B7A2F);
          border-color: transparent;
          color: #000;
          font-weight: 700;
        }
        .prod-sort {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(201,168,76,0.15);
          color: #F0EDE6;
          font-family: 'Tajawal', sans-serif;
          font-size: 0.85rem;
          padding: 0.4rem 1rem;
          border-radius: 4px;
          outline: none;
          cursor: pointer;
          transition: border-color 0.3s;
        }
        .prod-sort:focus { border-color: rgba(201,168,76,0.4); }
        .prod-search-wrap {
          display: flex;
          flex: 1;
          min-width: 160px;
          max-width: 280px;
        }
        .prod-search-icon {
          background: rgba(201,168,76,0.08);
          border: 1px solid rgba(201,168,76,0.15);
          border-right: none;
          color: #C9A84C;
          padding: 0.4rem 0.75rem;
          border-radius: 4px 0 0 4px;
          font-size: 0.85rem;
        }
        .prod-search-input {
          flex: 1;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(201,168,76,0.15);
          border-left: none;
          color: #F0EDE6;
          font-family: 'Tajawal', sans-serif;
          font-size: 0.85rem;
          padding: 0.4rem 0.75rem;
          border-radius: 0 4px 4px 0;
          outline: none;
          transition: border-color 0.3s;
        }
        .prod-search-input::placeholder { color: #5A5550; }
        .prod-search-input:focus { border-color: rgba(201,168,76,0.35); }
        .prod-count {
          font-family: 'Tajawal', sans-serif;
          font-size: 0.8rem;
          color: #8A8580;
          margin-right: auto;
          white-space: nowrap;
        }
        .prod-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 1.5rem;
        }
        .prod-card {
          background: #121214;
          border: 1px solid rgba(201,168,76,0.08);
          border-radius: 8px;
          overflow: hidden;
          transition: all 0.35s;
        }
        .prod-card:hover {
          border-color: rgba(201,168,76,0.3);
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.5), 0 0 20px rgba(201,168,76,0.06);
        }
        .prod-img-wrap {
          position: relative;
          height: 220px;
          overflow: hidden;
        }
        .prod-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s;
        }
        .prod-card:hover .prod-img { transform: scale(1.06); }
        .prod-badge {
          position: absolute;
          top: 0.75rem;
          right: 0.75rem;
          background: rgba(10,10,11,0.75);
          border: 1px solid rgba(201,168,76,0.25);
          color: #C9A84C;
          font-family: 'Tajawal', sans-serif;
          font-size: 0.7rem;
          padding: 0.2rem 0.6rem;
          border-radius: 3px;
          backdrop-filter: blur(8px);
        }
        .prod-out-badge {
          position: absolute;
          inset: 0;
          background: rgba(10,10,11,0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Tajawal', sans-serif;
          color: #8A8580;
          font-size: 0.85rem;
          letter-spacing: 1px;
        }
        .prod-body { padding: 1.2rem; }
        .prod-name {
          font-family: 'Playfair Display', serif;
          color: #F0EDE6;
          font-size: 0.9rem;
          font-weight: 600;
          margin-bottom: 0.7rem;
          line-height: 1.4;
        }
        .prod-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.85rem;
        }
        .prod-price {
          font-family: 'Tajawal', sans-serif;
          font-weight: 700;
          color: #C9A84C;
          font-size: 0.95rem;
        }
        .prod-price span { font-size: 0.72rem; opacity: 0.65; }
        .prod-rating {
          font-family: 'Tajawal', sans-serif;
          font-size: 0.78rem;
          color: #8A8580;
        }
        .prod-btn {
          width: 100%;
          background: transparent;
          border: 1px solid rgba(201,168,76,0.25);
          color: #C9A84C;
          font-family: 'Tajawal', sans-serif;
          font-size: 0.82rem;
          font-weight: 600;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.3s;
        }
        .prod-btn:hover {
          background: linear-gradient(135deg, #C9A84C, #9B7A2F);
          border-color: transparent;
          color: #000;
        }
        .prod-btn.added {
          background: rgba(90,191,130,0.1);
          border-color: rgba(90,191,130,0.25);
          color: #5ABF82;
          cursor: default;
        }
        .prod-empty {
          text-align: center;
          padding: 5rem 0;
        }
        .prod-empty-icon { font-size: 3.5rem; margin-bottom: 1rem; }
        .prod-empty-text {
          font-family: 'Playfair Display', serif;
          color: #8A8580;
          font-size: 1.1rem;
          margin-bottom: 1.5rem;
        }
        .prod-pagination {
          display: flex;
          justify-content: center;
          gap: 0.4rem;
          margin-top: 3rem;
        }
        .prod-page-btn {
          background: #121214;
          border: 1px solid rgba(201,168,76,0.12);
          color: #8A8580;
          font-family: 'Tajawal', sans-serif;
          font-size: 0.85rem;
          padding: 0.45rem 0.9rem;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.25s;
        }
        .prod-page-btn:hover { border-color: rgba(201,168,76,0.35); color: #F0EDE6; }
        .prod-page-btn.active {
          background: linear-gradient(135deg, #C9A84C, #9B7A2F);
          border-color: transparent;
          color: #000;
          font-weight: 700;
        }
        .prod-page-btn:disabled { opacity: 0.3; cursor: not-allowed; }
        @media (max-width: 640px) {
          .prod-grid { grid-template-columns: repeat(2, 1fr); gap: 0.75rem; }
        }
      `}</style>

      {/* Hero */}
      <div className="prod-hero">
        <div className="prod-hero-content">
          <div className="prod-hero-tag">مجموعتنا الكاملة</div>
          <h1 className="prod-hero-title">جميع المنتجات</h1>
        </div>
      </div>

      <div className="prod-container">
        {/* Filters */}
        <div className="prod-filters">
          <div className="prod-cat-tabs">
            {CATS.map(({ val, label, icon }) => (
              <button
                key={val}
                className={`prod-cat-tab ${category === val ? 'active' : ''}`}
                onClick={() => { setCategory(val); setPage(0); }}
              >
                {icon} {label}
              </button>
            ))}
          </div>
          <select
            className="prod-sort"
            value={sort}
            onChange={(e) => { setSort(e.target.value); setPage(0); }}
          >
            <option value="name">الاسم أ–ي</option>
            <option value="price">السعر (الأقل)</option>
            <option value="rating">الأعلى تقييماً</option>
          </select>
          <div className="prod-search-wrap">
            <span className="prod-search-icon">🔍</span>
            <input
              className="prod-search-input"
              placeholder="ابحث..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(0); }}
            />
          </div>
          <span className="prod-count">{filtered.length} منتج</span>
        </div>

        {/* Grid */}
        {paginated.length === 0 ? (
          <div className="prod-empty">
            <div className="prod-empty-icon">😔</div>
            <p className="prod-empty-text">لا توجد منتجات مطابقة</p>
            <button
              className="prod-btn"
              style={{ display: 'inline-block', width: 'auto', padding: '0.6rem 2rem' }}
              onClick={() => { setSearch(''); setCategory(''); }}
            >
              إعادة ضبط الفلاتر
            </button>
          </div>
        ) : (
          <div className="prod-grid">
            {paginated.map((product) => (
              <div key={product.id} className="prod-card">
                <div className="prod-img-wrap">
                  <Link to={`/products/${product.id}`}>
                    <img
                      src={product.img}
                      alt={product.name}
                      className="prod-img"
                      onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=400'; }}
                    />
                  </Link>
                  <span className="prod-badge">{product.category}</span>
                  {product.stock === 0 && <div className="prod-out-badge">نفد المخزون</div>}
                </div>
                <div className="prod-body">
                  <Link to={`/products/${product.id}`} style={{ textDecoration: 'none' }}>
                    <h3 className="prod-name">{product.name}</h3>
                  </Link>
                  <div className="prod-meta">
                    <div className="prod-price">{product.price.toLocaleString()} <span>ج.م</span></div>
                    <div className="prod-rating">⭐ {product.rating}</div>
                  </div>
                  {product.stock === 0 ? (
                    <button className="prod-btn" disabled style={{ opacity: 0.4 }}>نفد المخزون</button>
                  ) : (
                    <button
                      className={`prod-btn ${added[product.id] ? 'added' : ''}`}
                      onClick={() => !added[product.id] && handleAdd(product)}
                    >
                      {added[product.id] ? '✅ تمت الإضافة' : '🛒 أضف للسلة'}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {pageCount > 1 && (
          <div className="prod-pagination">
            <button className="prod-page-btn" onClick={() => setPage(page - 1)} disabled={page === 0}>
              السابق
            </button>
            {[...Array(pageCount)].map((_, i) => (
              <button key={i} className={`prod-page-btn ${page === i ? 'active' : ''}`} onClick={() => setPage(i)}>
                {i + 1}
              </button>
            ))}
            <button className="prod-page-btn" onClick={() => setPage(page + 1)} disabled={page === pageCount - 1}>
              التالي
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Products;

import { useState } from "react";
import ProductCard from "../components/ProductCard";
import { products, categories } from "../data/products";
import { FiFilter, FiGrid, FiList } from "react-icons/fi";

export default function Shop({ onAddToCart, searchTerm }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [priceRange, setPriceRange] = useState(100);

  const filtered = products
    .filter(p => activeCategory === "All" || p.category === activeCategory)
    .filter(p => !searchTerm || p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(p => p.price <= priceRange)
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });

  return (
    <div className="py-5" style={{ background: "#f8fffe", minHeight: "80vh" }}>
      <div className="container">
        {/* Header */}
        <div className="mb-4">
          <h2 className="fw-bold" style={{ fontFamily: "Georgia, serif" }}>Eco Shop</h2>
          <p className="text-muted">{filtered.length} sustainable products found</p>
        </div>

        <div className="row g-4">
          {/* Sidebar Filters */}
          <div className="col-lg-3">
            <div className="card border-0 shadow-sm p-4" style={{ borderRadius: "16px", position: "sticky", top: "80px" }}>
              <h6 className="fw-bold mb-3 d-flex align-items-center gap-2">
                <FiFilter className="text-success" /> Filters
              </h6>

              {/* Categories */}
              <div className="mb-4">
                <small className="text-muted text-uppercase fw-semibold" style={{ letterSpacing: "1px" }}>Category</small>
                <div className="mt-2 d-flex flex-column gap-2">
                  {categories.map(cat => (
                    <button key={cat}
                      className={`btn btn-sm text-start ${activeCategory === cat ? "btn-success" : "btn-outline-secondary"}`}
                      style={{ borderRadius: "8px" }}
                      onClick={() => setActiveCategory(cat)}>
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-4">
                <small className="text-muted text-uppercase fw-semibold" style={{ letterSpacing: "1px" }}>
                  Max Price: <span className="text-success">${priceRange}</span>
                </small>
                <input type="range" className="form-range mt-2" min="10" max="100" value={priceRange}
                  onChange={e => setPriceRange(Number(e.target.value))} />
              </div>

              {/* Sort */}
              <div>
                <small className="text-muted text-uppercase fw-semibold" style={{ letterSpacing: "1px" }}>Sort By</small>
                <select className="form-select form-select-sm mt-2 border-0 bg-light" value={sortBy}
                  onChange={e => setSortBy(e.target.value)}>
                  <option value="default">Default</option>
                  <option value="price-asc">Price: Low → High</option>
                  <option value="price-desc">Price: High → Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="col-lg-9">
            {filtered.length === 0 ? (
              <div className="text-center py-5">
                <span style={{ fontSize: "4rem" }}>🌿</span>
                <h5 className="mt-3 text-muted">No products found</h5>
              </div>
            ) : (
              <div className="row g-4">
                {filtered.map(product => (
                  <div key={product.id} className="col-sm-6 col-xl-4">
                    <ProductCard product={product} onAddToCart={onAddToCart} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

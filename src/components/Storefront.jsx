import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Leaf,
  Truck,
  ShieldCheck,
  Heart,
  MessageCircle
} from "lucide-react";

const money = (n, symbol = "₹") => `${symbol}${Number(n).toLocaleString("en-IN")}`;

// Map icon strings to Lucide components
const iconMap = {
  Sparkles: Sparkles,
  Leaf: Leaf,
  Truck: Truck,
  ShieldCheck: ShieldCheck
};

export default function Storefront({
  siteData,
  query,
  category,
  setCategory,
  wishlist,
  onToggleWishlist,
  onOpenCatalog
}) {
  const { hero, trustFeatures, collections, products, festiveSection, storySection, storeConfig } = siteData;

  // Filter products based on category and search query
  const filteredProducts = products.filter((p) => {
    if (category === "Wishlist") {
      return wishlist.includes(p.id);
    }
    const matchesCategory = category === "All" || p.category === category;
    const matchesQuery =
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      (p.fabric && p.fabric.toLowerCase().includes(query.toLowerCase())) ||
      (p.colour && p.colour.toLowerCase().includes(query.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  const handleGeneralWhatsApp = () => {
    const num = storeConfig.whatsappNumber || "919876543210";
    window.open(`https://wa.me/${num}?text=Hello%20SareeVira!%20I%20would%20like%20to%20view%20your%20latest%20festive%20collection.`, "_blank");
  };

  return (
    <main>
      {/* 1. HERO SECTION */}
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">
            <span /> {hero.eyebrow} <span />
          </p>
          <h1>
            {hero.titlePart1}
            <br />
            <em>{hero.titleAccent}</em>
          </h1>
          <p className="hero-text">{hero.description}</p>
          <div className="hero-ctas">
            <a className="button primary" href={hero.primaryCtaLink || "#collections"}>
              {hero.primaryCtaText || "Explore Collection"} <ArrowRight size={16} />
            </a>
            <a className="button secondary" href={hero.secondaryCtaLink || "#story"}>
              {hero.secondaryCtaText || "Discover Our Story"}
            </a>
          </div>
          {hero.badgeNote && (
            <div className="hero-note">
              <Sparkles size={16} /> {hero.badgeNote}
            </div>
          )}
        </div>

        <div className="hero-visual">
          <div className="hero-orb"></div>
          <img src={hero.heroImage} alt="Elegant saree editorial" />
        </div>
        <div className="hero-glow"></div>
      </section>

      {/* 2. COLLECTIONS GRID */}
      <section id="collections" className="section collections">
        <div className="section-heading">
          <p className="eyebrow">CURATED FOR YOU</p>
          <h2>Explore Our Collections</h2>
          <p>A beautiful drape for every mood and moment.</p>
        </div>

        <div className="collection-grid">
          {collections.map((col, i) => (
            <motion.button
              whileHover={{ y: -5 }}
              className="collection-card"
              key={col.id || col.name}
              onClick={() => {
                setCategory(col.categoryKey || col.name.split(" ")[0]);
                document.getElementById("arrivals")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <img src={col.image} alt={col.name} />
              <div className="collection-shade" />
              <span className="collection-num">0{i + 1}</span>
              <h3>{col.name}</h3>
              {col.tag && <span className="col-tag-chip">{col.tag}</span>}
              <span className="circle-arrow">
                <ArrowRight size={16} />
              </span>
            </motion.button>
          ))}
        </div>
      </section>

      {/* 4. FRESH DRAPES / PRODUCT CATALOG */}
      <section id="arrivals" className="arrivals">
        <div className="arrivals-inner">
          <div className="arrival-intro">
            <p className="eyebrow">JUST ARRIVED</p>
            <h2>
              Fresh Drapes
              <br />
              <em>This Season</em>
            </h2>
            <p>Discover our latest collection of authentic handlooms and trending designer sarees.</p>

            {/* Category Filter Pills */}
            <div className="category-filter-pills">
              {["All", "Silk", "Paithani", "Banarasi", "Cotton", "Designer"].map((cat) => (
                <button
                  key={cat}
                  className={`cat-filter-btn ${category === cat ? "active" : ""}`}
                  onClick={() => setCategory(cat)}
                >
                  {cat}
                </button>
              ))}
              {wishlist.length > 0 && (
                <button
                  className={`cat-filter-btn wish-btn ${category === "Wishlist" ? "active" : ""}`}
                  onClick={() => setCategory("Wishlist")}
                >
                  <Heart size={12} fill="currentColor" /> Wishlist ({wishlist.length})
                </button>
              )}
            </div>

            {category !== "All" && (
              <button className="button secondary reset-filter-btn" onClick={() => setCategory("All")}>
                View All Sarees <ArrowRight size={16} />
              </button>
            )}
          </div>

          <div className="product-grid">
            {filteredProducts.length === 0 ? (
              <div className="no-products-msg">
                <p>No sarees found matching your criteria.</p>
                <button className="button secondary" onClick={() => setCategory("All")}>
                  Clear filters
                </button>
              </div>
            ) : (
              filteredProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  p={p}
                  currency={storeConfig.currency}
                  wished={wishlist.includes(p.id)}
                  toggleWish={() => onToggleWishlist(p.id)}
                  onOpenCatalog={() => onOpenCatalog(p)}
                />
              ))
            )}
          </div>
        </div>
      </section>

      {/* 5. FESTIVE SHOWCASE */}
      <section className="festive">
        <div>
          <p className="eyebrow">{festiveSection.eyebrow}</p>
          <h2>
            {festiveSection.titlePart1}
            <br />
            <em>{festiveSection.titleAccent}</em>
          </h2>
          <p>{festiveSection.description}</p>
          <a className="button primary" href={festiveSection.ctaLink || "#arrivals"}>
            {festiveSection.ctaText || "Find Your Drape"} <ArrowRight size={16} />
          </a>
        </div>
        <div className="festive-image">
          <img src={festiveSection.image} alt="Festive saree editorial" />
        </div>
      </section>

      {/* 6. OUR HERITAGE STORY */}
      <section id="story" className="story">
        <span className="lotus">✿</span>
        <p className="eyebrow">{storySection.eyebrow}</p>
        <h2>
          {storySection.titlePart1}
          <br />
          <em>{storySection.titleAccent}</em>
        </h2>
        <p>{storySection.description}</p>
      </section>

      {/* FOOTER */}
      <footer>
        <a className="brand" href="#">
          <span className="lotus">✿</span>
          <span>
            <b>{storeConfig.storeName}</b>
            <small>{storeConfig.tagline}</small>
          </span>
        </a>
        <p>{storeConfig.footerText}</p>
        <button className="wa" onClick={handleGeneralWhatsApp}>
          <MessageCircle size={17} /> Chat with Drape Stylist
        </button>
        <small>{storeConfig.footerCopyright}</small>
      </footer>
    </main>
  );
}

function ProductCard({ p, currency = "₹", wished, toggleWish, onOpenCatalog }) {
  return (
    <motion.article
      className="product-card"
      whileHover={{ y: -4 }}
      role="button"
      tabIndex={0}
      aria-haspopup="dialog"
      aria-label={`View ${p.name} catalog`}
      onClick={onOpenCatalog}
      onKeyDown={(event) => {
        if (
          event.target === event.currentTarget &&
          (event.key === "Enter" || event.key === " ")
        ) {
          event.preventDefault();
          onOpenCatalog();
        }
      }}
    >
      <div className="flip-inner">
        <div className="product-front">
          <div className="product-image">
            <img src={p.image} alt={p.name} />
            {p.tag && <span className="tag">{p.tag}</span>}
            <button
              className={`heart ${wished ? "active" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                toggleWish();
              }}
              aria-label="Toggle wishlist"
            >
              <Heart size={18} fill={wished ? "currentColor" : "none"} />
            </button>
            <button
              className="flip-hint"
              onClick={(event) => {
                event.stopPropagation();
                onOpenCatalog();
              }}
            >
              View full catalog
            </button>
          </div>
          <div className="product-info">
            <h3>{p.name}</h3>
            <div className="price-row">
              <b>{money(p.price, currency)}</b>
              {p.mrp > p.price && (
                <>
                  <del>{money(p.mrp, currency)}</del>
                  <span>{Math.round(((p.mrp - p.price) / p.mrp) * 100)}% OFF</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

import React, { useState } from "react";
import {
  LayoutDashboard,
  Package,
  Image,
  Sliders,
  Sparkles,
  Shield,
  Phone,
  MessageSquare,
  Plus,
  Trash2,
  Edit3,
  Check,
  RotateCcw,
  ExternalLink,
  Save,
  Eye,
  X,
  Search,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import { sampleInquiries } from "../data/initialData";

export default function AdminDashboard({
  siteData,
  onUpdateSiteData,
  onResetToDefaults,
  onCloseDashboard,
  onLogout
}) {
  const [activeTab, setActiveTab] = useState("overview");
  const [toastMessage, setToastMessage] = useState("");
  const inquiries = siteData.inquiries?.length ? siteData.inquiries : sampleInquiries;

  // Product Add / Edit Modal state
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [productForm, setProductForm] = useState({
    name: "",
    category: "Silk",
    fabric: "",
    colour: "",
    price: "",
    mrp: "",
    tag: "New Arrival",
    image: "",
    detail: "",
    inStock: true,
    featured: false
  });

  // Product filter & search
  const [prodSearch, setProdSearch] = useState("");
  const [prodCategoryFilter, setProdCategoryFilter] = useState("All");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3200);
  };

  // Helper to update deeply nested fields in siteData
  const updateStoreConfig = (field, value) => {
    onUpdateSiteData({
      ...siteData,
      storeConfig: { ...siteData.storeConfig, [field]: value }
    });
    showToast(`Updated store config: ${field}`);
  };

  const updateHero = (field, value) => {
    onUpdateSiteData({
      ...siteData,
      hero: { ...siteData.hero, [field]: value }
    });
    showToast(`Updated Hero banner`);
  };

  const updateFestive = (field, value) => {
    onUpdateSiteData({
      ...siteData,
      festiveSection: { ...siteData.festiveSection, [field]: value }
    });
    showToast(`Updated Festive section`);
  };

  const updateStory = (field, value) => {
    onUpdateSiteData({
      ...siteData,
      storySection: { ...siteData.storySection, [field]: value }
    });
    showToast(`Updated Brand Heritage story`);
  };

  const updateTrustFeature = (index, field, value) => {
    const updated = [...siteData.trustFeatures];
    updated[index] = { ...updated[index], [field]: value };
    onUpdateSiteData({ ...siteData, trustFeatures: updated });
    showToast(`Updated Trust Guarantee`);
  };

  const updateCollection = (index, field, value) => {
    const updated = [...siteData.collections];
    updated[index] = { ...updated[index], [field]: value };
    onUpdateSiteData({ ...siteData, collections: updated });
    showToast(`Updated Collection card`);
  };

  const addCollection = () => {
    const newCol = {
      id: `col-${Date.now()}`,
      name: "New Handloom Collection",
      categoryKey: "Silk",
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=85",
      tag: "Special Edition"
    };
    onUpdateSiteData({
      ...siteData,
      collections: [...siteData.collections, newCol]
    });
    showToast("Added new collection card");
  };

  const deleteCollection = (index) => {
    const updated = siteData.collections.filter((_, i) => i !== index);
    onUpdateSiteData({ ...siteData, collections: updated });
    showToast("Deleted collection card");
  };

  // Product CRUD
  const openNewProductModal = () => {
    setEditingProductId(null);
    setProductForm({
      name: "",
      category: "Silk",
      fabric: "",
      colour: "",
      price: "",
      mrp: "",
      tag: "New Arrival",
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=85",
      detail: "",
      inStock: true,
      featured: false
    });
    setProductModalOpen(true);
  };

  const openEditProductModal = (prod) => {
    setEditingProductId(prod.id);
    setProductForm({
      name: prod.name,
      category: prod.category || "Silk",
      fabric: prod.fabric || "",
      colour: prod.colour || "",
      price: prod.price,
      mrp: prod.mrp,
      tag: prod.tag || "New",
      image: prod.image,
      detail: prod.detail || "",
      inStock: prod.inStock !== false,
      featured: prod.featured || false
    });
    setProductModalOpen(true);
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!productForm.name || !productForm.price) {
      alert("Please enter product name and price");
      return;
    }

    if (editingProductId) {
      // Edit existing
      const updatedProducts = siteData.products.map((p) =>
        p.id === editingProductId
          ? {
              ...p,
              ...productForm,
              price: Number(productForm.price),
              mrp: Number(productForm.mrp || productForm.price)
            }
          : p
      );
      onUpdateSiteData({ ...siteData, products: updatedProducts });
      showToast(`Updated product: ${productForm.name}`);
    } else {
      // Add new
      const newProduct = {
        id: `SR${Date.now().toString().slice(-4)}`,
        ...productForm,
        price: Number(productForm.price),
        mrp: Number(productForm.mrp || productForm.price),
        inStock: true
      };
      onUpdateSiteData({
        ...siteData,
        products: [newProduct, ...siteData.products]
      });
      showToast(`Added new saree: ${productForm.name}`);
    }
    setProductModalOpen(false);
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm("Are you sure you want to remove this saree from the catalog?")) {
      const updated = siteData.products.filter((p) => p.id !== id);
      onUpdateSiteData({ ...siteData, products: updated });
      showToast("Saree removed from catalog");
    }
  };

  const toggleProductStock = (id) => {
    const updated = siteData.products.map((p) =>
      p.id === id ? { ...p, inStock: !p.inStock } : p
    );
    onUpdateSiteData({ ...siteData, products: updated });
    showToast("Updated stock status");
  };

  // Filtered products for admin
  const filteredProducts = siteData.products.filter((p) => {
    const matchCat = prodCategoryFilter === "All" || p.category === prodCategoryFilter;
    const matchQuery =
      p.name.toLowerCase().includes(prodSearch.toLowerCase()) ||
      p.id.toLowerCase().includes(prodSearch.toLowerCase()) ||
      (p.fabric && p.fabric.toLowerCase().includes(prodSearch.toLowerCase()));
    return matchCat && matchQuery;
  });

  return (
    <div className="admin-dashboard-container">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="admin-toast">
          <CheckCircle2 size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Admin Navigation Bar */}
      <header className="admin-topbar">
        <div className="admin-brand-zone">
          <span className="lotus">✿</span>
          <div>
            <b>{siteData.storeConfig.storeName} Admin Control Center</b>
            <small>Full Website Content Management System</small>
          </div>
        </div>

        <div className="admin-top-actions">
          <button className="topbar-btn preview-btn" onClick={onCloseDashboard}>
            <Eye size={15} /> <span>View Live Website</span>
          </button>
          <button
            className="topbar-btn reset-btn"
            onClick={() => {
              if (window.confirm("Reset all website content back to factory demo defaults?")) {
                onResetToDefaults();
                showToast("All website content reset to defaults");
              }
            }}
            title="Reset to factory demo content"
          >
            <RotateCcw size={14} /> <span>Reset Defaults</span>
          </button>
          <div className="admin-user-pill">
            <Shield size={14} />
            <span>Super Admin (Vira Patel)</span>
          </div>
          <button className="topbar-btn exit-btn" onClick={onCloseDashboard}>
            <X size={16} />
          </button>
        </div>
      </header>

      {/* Dashboard Body with Left Sidebar and Main Content Area */}
      <div className="admin-main-layout">
        {/* Sidebar Nav */}
        <aside className="admin-sidebar">
          <div className="sidebar-group-title">WEBSITE MODULES</div>
          <nav className="admin-nav-menu">
            <button
              className={`admin-nav-item ${activeTab === "overview" ? "active" : ""}`}
              onClick={() => setActiveTab("overview")}
            >
              <LayoutDashboard size={18} />
              <span>Overview & Stats</span>
            </button>
            <button
              className={`admin-nav-item ${activeTab === "products" ? "active" : ""}`}
              onClick={() => setActiveTab("products")}
            >
              <Package size={18} />
              <span>Sarees & Inventory</span>
              <span className="nav-count-badge">{siteData.products.length}</span>
            </button>
            <button
              className={`admin-nav-item ${activeTab === "hero" ? "active" : ""}`}
              onClick={() => setActiveTab("hero")}
            >
              <Image size={18} />
              <span>Hero & Main Banner</span>
            </button>
            <button
              className={`admin-nav-item ${activeTab === "collections" ? "active" : ""}`}
              onClick={() => setActiveTab("collections")}
            >
              <Sliders size={18} />
              <span>Collections Cards</span>
              <span className="nav-count-badge">{siteData.collections.length}</span>
            </button>
            <button
              className={`admin-nav-item ${activeTab === "festive" ? "active" : ""}`}
              onClick={() => setActiveTab("festive")}
            >
              <Sparkles size={18} />
              <span>Festive & Story</span>
            </button>
            <button
              className={`admin-nav-item ${activeTab === "settings" ? "active" : ""}`}
              onClick={() => setActiveTab("settings")}
            >
              <Phone size={18} />
              <span>Store & Contact Info</span>
            </button>
            <button
              className={`admin-nav-item ${activeTab === "inquiries" ? "active" : ""}`}
              onClick={() => setActiveTab("inquiries")}
            >
              <MessageSquare size={18} />
              <span>Inquiries & Leads</span>
              <span className="nav-count-badge">{inquiries.length}</span>
            </button>
          </nav>

          <div className="sidebar-footer-card">
            <p><b>✨ Live Synced</b></p>
            <small>All edits immediately update the customer-facing website and persist in local storage.</small>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="admin-content-pane">
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="admin-tab-section">
              <div className="tab-header">
                <div>
                  <h2>Store Operations Overview</h2>
                  <p>Welcome back, Vira Patel. Real-time control center for {siteData.storeConfig.storeName}.</p>
                </div>
                <div className="tab-header-buttons">
                  <button className="button primary" onClick={openNewProductModal}>
                    <Plus size={15} /> Add New Saree
                  </button>
                  <button className="button secondary" onClick={onCloseDashboard}>
                    <Eye size={15} /> Open Live Site
                  </button>
                </div>
              </div>

              {/* Stat Cards */}
              <div className="metrics-grid">
                <div className="metric-card">
                  <div className="metric-icon p-icon"><Package size={22} /></div>
                  <div className="metric-data">
                    <span className="m-label">Total Sarees</span>
                    <b className="m-val">{siteData.products.length}</b>
                    <small className="m-sub">In active boutique catalog</small>
                  </div>
                </div>
                <div className="metric-card">
                  <div className="metric-icon c-icon"><Sliders size={22} /></div>
                  <div className="metric-data">
                    <span className="m-label">Active Collections</span>
                    <b className="m-val">{siteData.collections.length}</b>
                    <small className="m-sub">Paithani, Banarasi, Silk, Organza</small>
                  </div>
                </div>
                <div className="metric-card">
                  <div className="metric-icon i-icon"><MessageSquare size={22} /></div>
                  <div className="metric-data">
                    <span className="m-label">WhatsApp Leads</span>
                    <b className="m-val">{inquiries.length} Active</b>
                    <small className="m-sub">Recent buyer inquiries</small>
                  </div>
                </div>
                <div className="metric-card">
                  <div className="metric-icon t-icon"><Shield size={22} /></div>
                  <div className="metric-data">
                    <span className="m-label">Website Status</span>
                    <b className="m-val green-text">Published Live</b>
                    <small className="m-sub">Navbar height: 96px luxury</small>
                  </div>
                </div>
              </div>

              {/* Quick Actions & Live Control Shortcuts */}
              <div className="overview-split-row">
                <div className="overview-card">
                  <h3>⚡ Quick Content Controls</h3>
                  <div className="quick-action-list">
                    <button className="qa-btn" onClick={() => setActiveTab("products")}>
                      <Package size={16} />
                      <div>
                        <b>Manage Product Inventory</b>
                        <small>Edit pricing, add new weaves, toggle stock</small>
                      </div>
                      <ArrowRight size={15} />
                    </button>
                    <button className="qa-btn" onClick={() => setActiveTab("hero")}>
                      <Image size={16} />
                      <div>
                        <b>Customize Hero Drape Banner</b>
                        <small>Change headline, promotional image, and buttons</small>
                      </div>
                      <ArrowRight size={15} />
                    </button>
                    <button className="qa-btn" onClick={() => setActiveTab("settings")}>
                      <Phone size={16} />
                      <div>
                        <b>Update WhatsApp & Contact Number</b>
                        <small>Direct customer enquiries to your phone</small>
                      </div>
                      <ArrowRight size={15} />
                    </button>
                  </div>
                </div>

                <div className="overview-card">
                  <h3>💬 Recent Customer WhatsApp Inquiries</h3>
                  <div className="mini-inquiries-list">
                    {inquiries.slice(0, 3).map((inq) => (
                      <div key={inq.id} className="mini-inq-item">
                        <div className="inq-top">
                          <b>{inq.customerName}</b>
                          <span className="inq-tag">{inq.status}</span>
                        </div>
                        <p className="inq-prod">{inq.product}</p>
                        <small className="inq-phone">{inq.phone}</small>
                        <small className="inq-msg">"{inq.message}"</small>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PRODUCTS & SAREES */}
          {activeTab === "products" && (
            <div className="admin-tab-section">
              <div className="tab-header">
                <div>
                  <h2>Saree Catalog & Inventory</h2>
                  <p>Add new sarees, edit pricing & fabric specifications, or remove items.</p>
                </div>
                <button className="button primary" onClick={openNewProductModal}>
                  <Plus size={16} /> Add New Saree
                </button>
              </div>

              {/* Search & Filter Toolbar */}
              <div className="table-toolbar">
                <div className="table-search">
                  <Search size={16} />
                  <input
                    placeholder="Search sarees by name, ID or fabric..."
                    value={prodSearch}
                    onChange={(e) => setProdSearch(e.target.value)}
                  />
                </div>
                <div className="table-filters">
                  <label>Category:</label>
                  <select
                    value={prodCategoryFilter}
                    onChange={(e) => setProdCategoryFilter(e.target.value)}
                  >
                    <option value="All">All Categories</option>
                    <option value="Silk">Silk</option>
                    <option value="Paithani">Paithani</option>
                    <option value="Banarasi">Banarasi</option>
                    <option value="Cotton">Cotton</option>
                    <option value="Designer">Designer</option>
                  </select>
                </div>
              </div>

              {/* Products Table */}
              <div className="admin-table-wrapper">
                <table className="admin-data-table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Category</th>
                      <th>Fabric / Colour</th>
                      <th>Price (₹)</th>
                      <th>MRP (₹)</th>
                      <th>Tag</th>
                      <th>Status</th>
                      <th className="text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((p) => (
                      <tr key={p.id}>
                        <td>
                          <div className="table-product-cell">
                            <img src={p.image} alt={p.name} className="table-thumb" />
                            <div>
                              <b>{p.name}</b>
                              <span className="p-id">ID: {p.id}</span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="cat-pill">{p.category}</span>
                        </td>
                        <td>
                          <div>{p.fabric || "—"}</div>
                          <small className="muted-text">{p.colour || "—"}</small>
                        </td>
                        <td>
                          <b>₹{Number(p.price).toLocaleString("en-IN")}</b>
                        </td>
                        <td>
                          <del className="muted-text">₹{Number(p.mrp || p.price).toLocaleString("en-IN")}</del>
                        </td>
                        <td>
                          <span className="tag-pill">{p.tag || "Standard"}</span>
                        </td>
                        <td>
                          <button
                            className={`stock-badge ${p.inStock !== false ? "in-stock" : "out-of-stock"}`}
                            onClick={() => toggleProductStock(p.id)}
                            title="Click to toggle stock"
                          >
                            {p.inStock !== false ? "In Stock" : "Out of Stock"}
                          </button>
                        </td>
                        <td className="text-right">
                          <div className="table-action-btns">
                            <button
                              className="act-btn edit"
                              onClick={() => openEditProductModal(p)}
                              title="Edit Saree Details"
                            >
                              <Edit3 size={15} />
                            </button>
                            <button
                              className="act-btn delete"
                              onClick={() => handleDeleteProduct(p.id)}
                              title="Delete Saree"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: HERO & BANNER */}
          {activeTab === "hero" && (
            <div className="admin-tab-section">
              <div className="tab-header">
                <div>
                  <h2>Hero & Main Banner Customization</h2>
                  <p>Control the primary visual and headline displayed at the top of the storefront.</p>
                </div>
                <button className="button primary" onClick={onCloseDashboard}>
                  <Eye size={15} /> Preview On Website
                </button>
              </div>

              <div className="admin-card-grid">
                <div className="admin-form-card">
                  <h3>Headlines & Copy</h3>
                  <div className="form-group">
                    <label>Eyebrow Text</label>
                    <input
                      value={siteData.hero.eyebrow}
                      onChange={(e) => updateHero("eyebrow", e.target.value)}
                    />
                  </div>
                  <div className="form-row-2">
                    <div className="form-group">
                      <label>Headline Part 1</label>
                      <input
                        value={siteData.hero.titlePart1}
                        onChange={(e) => updateHero("titlePart1", e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Headline Accent (Italic Plum)</label>
                      <input
                        value={siteData.hero.titleAccent}
                        onChange={(e) => updateHero("titleAccent", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Hero Description</label>
                    <textarea
                      rows={3}
                      value={siteData.hero.description}
                      onChange={(e) => updateHero("description", e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Hero Quality Badge Note</label>
                    <input
                      value={siteData.hero.badgeNote}
                      onChange={(e) => updateHero("badgeNote", e.target.value)}
                    />
                  </div>
                </div>

                <div className="admin-form-card">
                  <h3>Visual & Action Buttons</h3>
                  <div className="form-group">
                    <label>Hero Image URL</label>
                    <input
                      value={siteData.hero.heroImage}
                      onChange={(e) => updateHero("heroImage", e.target.value)}
                    />
                  </div>
                  <div className="hero-img-preview-box">
                    <img src={siteData.hero.heroImage} alt="Hero Preview" />
                    <span>Live Hero Image Preview</span>
                  </div>

                  <div className="form-row-2" style={{ marginTop: "15px" }}>
                    <div className="form-group">
                      <label>Primary Button Label</label>
                      <input
                        value={siteData.hero.primaryCtaText}
                        onChange={(e) => updateHero("primaryCtaText", e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Primary Button Link</label>
                      <input
                        value={siteData.hero.primaryCtaLink}
                        onChange={(e) => updateHero("primaryCtaLink", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-row-2">
                    <div className="form-group">
                      <label>Secondary Button Label</label>
                      <input
                        value={siteData.hero.secondaryCtaText}
                        onChange={(e) => updateHero("secondaryCtaText", e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Secondary Button Link</label>
                      <input
                        value={siteData.hero.secondaryCtaLink}
                        onChange={(e) => updateHero("secondaryCtaLink", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: COLLECTIONS */}
          {activeTab === "collections" && (
            <div className="admin-tab-section">
              <div className="tab-header">
                <div>
                  <h2>Collections Grid Management</h2>
                  <p>Customize the featured category cards shown on the homepage.</p>
                </div>
                <button className="button primary" onClick={addCollection}>
                  <Plus size={15} /> Add Collection Card
                </button>
              </div>

              <div className="collections-admin-grid">
                {siteData.collections.map((col, idx) => (
                  <div key={col.id || idx} className="collection-admin-card">
                    <div className="col-preview-wrapper">
                      <img src={col.image} alt={col.name} />
                      <span className="col-number">Card #{idx + 1}</span>
                    </div>
                    <div className="col-inputs">
                      <div className="form-group">
                        <label>Collection Name</label>
                        <input
                          value={col.name}
                          onChange={(e) => updateCollection(idx, "name", e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label>Category Filter Target</label>
                        <select
                          value={col.categoryKey}
                          onChange={(e) => updateCollection(idx, "categoryKey", e.target.value)}
                        >
                          <option value="Silk">Silk</option>
                          <option value="Paithani">Paithani</option>
                          <option value="Banarasi">Banarasi</option>
                          <option value="Cotton">Cotton</option>
                          <option value="Designer">Designer</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Image URL</label>
                        <input
                          value={col.image}
                          onChange={(e) => updateCollection(idx, "image", e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label>Special Tag / Zari Note</label>
                        <input
                          value={col.tag || ""}
                          onChange={(e) => updateCollection(idx, "tag", e.target.value)}
                        />
                      </div>
                      <button
                        className="button secondary full-width delete-col-btn"
                        onClick={() => deleteCollection(idx)}
                      >
                        <Trash2 size={14} /> Remove Card
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: FESTIVE & STORY */}
          {activeTab === "festive" && (
            <div className="admin-tab-section">
              <div className="tab-header">
                <div>
                  <h2>Festive Banner & Brand Heritage</h2>
                  <p>Edit the seasonal promotional block and brand narrative section.</p>
                </div>
              </div>

              <div className="admin-card-grid">
                {/* Festive Banner */}
                <div className="admin-form-card">
                  <h3>Festive Promo Section</h3>
                  <div className="form-group">
                    <label>Eyebrow Text</label>
                    <input
                      value={siteData.festiveSection.eyebrow}
                      onChange={(e) => updateFestive("eyebrow", e.target.value)}
                    />
                  </div>
                  <div className="form-row-2">
                    <div className="form-group">
                      <label>Heading</label>
                      <input
                        value={siteData.festiveSection.titlePart1}
                        onChange={(e) => updateFestive("titlePart1", e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Accent Headline</label>
                      <input
                        value={siteData.festiveSection.titleAccent}
                        onChange={(e) => updateFestive("titleAccent", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      rows={3}
                      value={siteData.festiveSection.description}
                      onChange={(e) => updateFestive("description", e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>CTA Button Label</label>
                    <input
                      value={siteData.festiveSection.ctaText}
                      onChange={(e) => updateFestive("ctaText", e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Promo Image URL</label>
                    <input
                      value={siteData.festiveSection.image}
                      onChange={(e) => updateFestive("image", e.target.value)}
                    />
                  </div>
                </div>

                {/* Brand Story */}
                <div className="admin-form-card">
                  <h3>Brand Heritage Story</h3>
                  <div className="form-group">
                    <label>Story Eyebrow</label>
                    <input
                      value={siteData.storySection.eyebrow}
                      onChange={(e) => updateStory("eyebrow", e.target.value)}
                    />
                  </div>
                  <div className="form-row-2">
                    <div className="form-group">
                      <label>Story Title</label>
                      <input
                        value={siteData.storySection.titlePart1}
                        onChange={(e) => updateStory("titlePart1", e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Story Accent</label>
                      <input
                        value={siteData.storySection.titleAccent}
                        onChange={(e) => updateStory("titleAccent", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Brand Narrative Description</label>
                    <textarea
                      rows={4}
                      value={siteData.storySection.description}
                      onChange={(e) => updateStory("description", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: STORE & CONTACT SETTINGS */}
          {activeTab === "settings" && (
            <div className="admin-tab-section">
              <div className="tab-header">
                <div>
                  <h2>Store Branding & Contact Configuration</h2>
                  <p>Configure business details, WhatsApp enquiry receiver, and announcement bar.</p>
                </div>
              </div>

              <div className="admin-card-grid">
                <div className="admin-form-card">
                  <h3>Store Identity</h3>
                  <div className="form-group">
                    <label>Store Brand Name</label>
                    <input
                      value={siteData.storeConfig.storeName}
                      onChange={(e) => updateStoreConfig("storeName", e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Sub-Tagline</label>
                    <input
                      value={siteData.storeConfig.tagline}
                      onChange={(e) => updateStoreConfig("tagline", e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Top Announcement Bar Text</label>
                    <textarea
                      rows={2}
                      value={siteData.storeConfig.announcement}
                      onChange={(e) => updateStoreConfig("announcement", e.target.value)}
                    />
                  </div>
                </div>

                <div className="admin-form-card">
                  <h3>WhatsApp & Support Channels</h3>
                  <div className="form-group">
                    <label>WhatsApp Number (Country code + number, e.g. 918669851581)</label>
                    <input
                      value={siteData.storeConfig.whatsappNumber}
                      onChange={(e) => updateStoreConfig("whatsappNumber", e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Customer Support Email</label>
                    <input
                      value={siteData.storeConfig.email || "care@sareevira.com"}
                      onChange={(e) => updateStoreConfig("email", e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Physical Boutique Address</label>
                    <input
                      value={siteData.storeConfig.address || "Heritage Quarter, Mumbai"}
                      onChange={(e) => updateStoreConfig("address", e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Footer Copyright Note</label>
                    <input
                      value={siteData.storeConfig.footerCopyright}
                      onChange={(e) => updateStoreConfig("footerCopyright", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: INQUIRIES & LEADS */}
          {activeTab === "inquiries" && (
            <div className="admin-tab-section">
              <div className="tab-header">
                <div>
                  <h2>Customer Enquiries & WhatsApp Leads</h2>
                  <p>Inquiries received from customer product detail clicks and custom orders.</p>
                </div>
              </div>

              <div className="inquiries-table-box">
                <table className="admin-data-table">
                  <thead>
                    <tr>
                      <th>Time</th>
                      <th>Customer Name</th>
                      <th>Phone</th>
                      <th>Product Inquired</th>
                      <th>Message / Note</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inquiries.map((inq) => (
                      <tr key={inq.id}>
                        <td><small className="muted-text">{inq.time}</small></td>
                        <td><b>{inq.customerName}</b></td>
                        <td><code>{inq.phone}</code></td>
                        <td><span className="cat-pill">{inq.product}</span></td>
                        <td><p className="inq-table-msg">{inq.message}</p></td>
                        <td>
                          <span className={`status-pill ${inq.status === "New" ? "pending" : "green"}`}>
                            {inq.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Product Add / Edit Modal */}
      {productModalOpen && (
        <div className="modal-backdrop" onClick={() => setProductModalOpen(false)}>
          <div className="modal-card product-edit-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setProductModalOpen(false)}>
              <X size={20} />
            </button>
            <div className="modal-header">
              <h2>{editingProductId ? "Edit Saree Details" : "Add New Saree to Catalog"}</h2>
              <p>Update inventory attributes, photography URL, and pricing.</p>
            </div>

            <form onSubmit={handleSaveProduct} className="product-modal-form">
              <div className="form-group">
                <label>Saree Name *</label>
                <input
                  required
                  placeholder="e.g. Royal Peacock Paithani Saree"
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                />
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label>Category</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                  >
                    <option value="Silk">Silk</option>
                    <option value="Paithani">Paithani</option>
                    <option value="Banarasi">Banarasi</option>
                    <option value="Cotton">Cotton</option>
                    <option value="Designer">Designer</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Tag / Badge</label>
                  <input
                    placeholder="e.g. New Arrival, Bestseller"
                    value={productForm.tag}
                    onChange={(e) => setProductForm({ ...productForm, tag: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label>Selling Price (₹) *</label>
                  <input
                    type="number"
                    required
                    placeholder="6499"
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>MRP / Original Price (₹)</label>
                  <input
                    type="number"
                    placeholder="7999"
                    value={productForm.mrp}
                    onChange={(e) => setProductForm({ ...productForm, mrp: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label>Fabric Specification</label>
                  <input
                    placeholder="e.g. Pure Mulberry Silk"
                    value={productForm.fabric}
                    onChange={(e) => setProductForm({ ...productForm, fabric: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Colour Hue</label>
                  <input
                    placeholder="e.g. Deep Royal Purple"
                    value={productForm.colour}
                    onChange={(e) => setProductForm({ ...productForm, colour: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Image URL</label>
                <input
                  placeholder="https://images.unsplash.com/..."
                  value={productForm.image}
                  onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Description & Weave Story</label>
                <textarea
                  rows={3}
                  placeholder="Describe the pallu, zari work, and draping feel..."
                  value={productForm.detail}
                  onChange={(e) => setProductForm({ ...productForm, detail: e.target.value })}
                />
              </div>

              <div className="form-actions-row">
                <button
                  type="button"
                  className="button secondary"
                  onClick={() => setProductModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="button primary">
                  <Save size={16} /> Save Saree to Store
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

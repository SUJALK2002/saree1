import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Storefront from "./components/Storefront";
import AdminDashboard from "./components/AdminDashboard";
import LoginModal from "./components/LoginModal";
import CustomerModal from "./components/CustomerModal";
import SareeCatalogModal from "./components/SareeCatalogModal";
import { initialSiteData, demoAccounts } from "./data/initialData";

const STORAGE_KEY_SITE = "sareevira_cms_site_data";
const STORAGE_KEY_USER = "sareevira_auth_user";
const STORAGE_KEY_WISH = "sareevira_wishlist";

export default function App() {
  // 1. Central CMS Site Data State (persisted to localStorage)
  const [siteData, setSiteData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SITE);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.products) {
          parsed.products = parsed.products.map((p) => {
            const initial = initialSiteData.products.find((ip) => ip.id === p.id);
            if (initial && (!p.gallery || p.gallery.length === 0)) {
              return { ...p, gallery: initial.gallery, specs: initial.specs };
            }
            return p;
          });
        }
        return parsed;
      }
    } catch (e) {
      console.error("Error reading saved site data", e);
    }
    return initialSiteData;
  });

  // 2. Auth State (Customer / Admin / null)
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem(STORAGE_KEY_USER);
      if (savedUser) return JSON.parse(savedUser);
    } catch (e) {
      console.error("Error reading saved user", e);
    }
    return null;
  });

  // 3. View mode: viewing Admin Dashboard vs Storefront
  const [viewingAdminDashboard, setViewingAdminDashboard] = useState(false);

  // 4. Wishlist state
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_WISH);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Error reading wishlist", e);
    }
    return ["SR101", "SR103"];
  });

  // 5. Storefront filter & search query
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  // 6. Modals
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [loginModalTab, setLoginModalTab] = useState("customer");
  const [customerModalOpen, setCustomerModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Sync siteData to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_SITE, JSON.stringify(siteData));
    } catch (e) {
      console.error("Error saving site data", e);
    }
  }, [siteData]);

  // Sync user to localStorage
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(currentUser));
      } else {
        localStorage.removeItem(STORAGE_KEY_USER);
      }
    } catch (e) {
      console.error("Error syncing user", e);
    }
  }, [currentUser]);

  // Sync wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_WISH, JSON.stringify(wishlist));
    } catch (e) {
      console.error("Error syncing wishlist", e);
    }
  }, [wishlist]);

  // Handlers
  const handleLogin = (userObj) => {
    setCurrentUser(userObj);
    if (userObj.role === "admin") {
      setViewingAdminDashboard(true);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setViewingAdminDashboard(false);
  };

  const handleQuickDemoCustomer = () => {
    setCurrentUser(demoAccounts.customer);
    setViewingAdminDashboard(false);
  };

  const handleQuickDemoAdmin = () => {
    setCurrentUser(demoAccounts.admin);
    setViewingAdminDashboard(true);
  };

  const handleToggleWishlist = (productId) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const handleCreateInquiry = (inquiry) => {
    setSiteData((prev) => ({
      ...prev,
      inquiries: [inquiry, ...(prev.inquiries || [])]
    }));
  };

  const handleResetToDefaults = () => {
    setSiteData(initialSiteData);
    try {
      localStorage.setItem(STORAGE_KEY_SITE, JSON.stringify(initialSiteData));
    } catch (e) {
      console.error("Error resetting site data", e);
    }
  };

  return (
    <div className="site-wrapper">
      {/* If viewing Admin Dashboard, render the full admin dashboard screen */}
      {viewingAdminDashboard && currentUser?.role === "admin" ? (
        <AdminDashboard
          siteData={siteData}
          onUpdateSiteData={setSiteData}
          onResetToDefaults={handleResetToDefaults}
          onCloseDashboard={() => setViewingAdminDashboard(false)}
          onLogout={handleLogout}
        />
      ) : (
        /* Otherwise, render the Customer Storefront with tall navbar */
        <div className="site">
          {/* Admin Floating Quick Access Banner when logged in as admin while browsing the store */}
          {currentUser?.role === "admin" && (
            <div className="admin-preview-floating-bar">
              <div className="admin-bar-label">
                <span className="dot-pulse"></span>
                <b>Admin Mode Active:</b> You are viewing the live storefront as a customer would see it.
              </div>
              <div className="admin-bar-actions">
                <button
                  className="bar-btn-dash"
                  onClick={() => setViewingAdminDashboard(true)}
                >
                  ⚡ Open Full Admin Dashboard
                </button>
                <button
                  className="bar-btn-switch"
                  onClick={handleQuickDemoCustomer}
                >
                  Switch to Customer View
                </button>
              </div>
            </div>
          )}

          <Navbar
            storeConfig={siteData.storeConfig}
            query={query}
            setQuery={setQuery}
            wishlistCount={wishlist.length}
            onOpenWishlist={() => {
              setCategory("Wishlist");
              document.getElementById("arrivals")?.scrollIntoView({ behavior: "smooth" });
            }}
            currentUser={currentUser}
            onOpenLogin={(tab = "customer") => {
              setLoginModalTab(tab);
              setLoginModalOpen(true);
            }}
            onQuickDemoCustomer={handleQuickDemoCustomer}
            onQuickDemoAdmin={handleQuickDemoAdmin}
            onLogout={handleLogout}
            onOpenCustomerProfile={() => setCustomerModalOpen(true)}
            onOpenAdminDashboard={() => setViewingAdminDashboard(true)}
            viewingAdminDashboard={viewingAdminDashboard}
          />

          <Storefront
            siteData={siteData}
            query={query}
            category={category}
            setCategory={setCategory}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            onOpenCatalog={setSelectedProduct}
          />
        </div>
      )}

      {/* Login Modal for Customer & Admin */}
      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onLogin={handleLogin}
        initialTab={loginModalTab}
      />

      {/* Customer Profile & Orders Modal */}
      <CustomerModal
        isOpen={customerModalOpen}
        onClose={() => setCustomerModalOpen(false)}
        customer={demoAccounts.customer}
        wishlistCount={wishlist.length}
        onLogout={handleLogout}
        onGoToWishlist={() => {
          setCategory("Wishlist");
          document.getElementById("arrivals")?.scrollIntoView({ behavior: "smooth" });
        }}
      />

      <SareeCatalogModal
        product={selectedProduct}
        isOpen={Boolean(selectedProduct)}
        onClose={() => setSelectedProduct(null)}
        currency={siteData.storeConfig.currency}
        wished={selectedProduct ? wishlist.includes(selectedProduct.id) : false}
        onToggleWishlist={() => {
          if (selectedProduct) handleToggleWishlist(selectedProduct.id);
        }}
        whatsappNumber={siteData.storeConfig.whatsappNumber}
        onSubmitEnquiry={handleCreateInquiry}
      />
    </div>
  );
}
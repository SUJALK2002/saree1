import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, Menu, X, User, Shield, LogIn, LogOut, LayoutDashboard, ChevronDown } from "lucide-react";

export default function Navbar({
  storeConfig,
  currentUser,
  onOpenLogin,
  onQuickDemoCustomer,
  onQuickDemoAdmin,
  onLogout,
  onOpenCustomerProfile,
  onOpenAdminDashboard,
  viewingAdminDashboard
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const openWhatsApp = () => {
    const num = storeConfig.whatsappNumber || "918669851581";
    window.open(
      `https://wa.me/${num}?text=Hello%20SareeVira!%20I%20would%20like%20to%20enquire%20about%20your%20saree%20collections.`,
      "_blank"
    );
  };

  return (
    <>
      {/* Main Luxury Tall Navbar (96px height) */}
      <header className="nav nav-tall nav-simple">
        {/* Brand */}
        <a className="brand" href="#">
          <span className="lotus">✿</span>
          <span>
            <b>{storeConfig.storeName || "SareeVira"}</b>
            <small>{storeConfig.tagline || "ETHNIC DRAPES"}</small>
          </span>
        </a>

        {/* Clean & Simple Nav: Only Home, Collections, Enquire, Login */}
        <nav className="desktop-simple-nav">
          <a href="#" className="simple-nav-link">Home</a>
          <a href="#collections" className="simple-nav-link">Collections</a>
          
          <button className="simple-nav-link enquire-link-btn" onClick={openWhatsApp}>
            <MessageCircle size={15} /> Enquire
          </button>

          {/* Login Section */}
          <div className="login-dropdown-wrapper" ref={dropdownRef}>
            {!currentUser ? (
              <div className="login-trigger-group">
                <button
                  className="simple-login-btn"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  aria-expanded={dropdownOpen}
                >
                  <LogIn size={15} />
                  <span>Login</span>
                  <ChevronDown size={14} className={`caret ${dropdownOpen ? "rotate" : ""}`} />
                </button>

                {/* Dropdown Menu for 1] Customer and 2] Admin with Demo Logins */}
                {dropdownOpen && (
                  <div className="simple-login-dropdown">
                    <div className="dropdown-title">Choose Account Type</div>
                    
                    {/* 1] Customer Login Option */}
                    <div className="dropdown-role-card">
                      <div className="role-top">
                        <div className="role-label">
                          <User size={15} className="role-icon customer-icon" />
                          <b>1] Customer Login</b>
                        </div>
                        <button
                          className="quick-demo-pill"
                          onClick={() => {
                            setDropdownOpen(false);
                            onQuickDemoCustomer();
                          }}
                          title="Instant 1-Click Demo Login as Customer"
                        >
                          ⚡ 1-Click Demo
                        </button>
                      </div>
                      <p>View orders, wishlist & receive personal styling support.</p>
                      <button
                        className="role-signin-link"
                        onClick={() => {
                          setDropdownOpen(false);
                          onOpenLogin("customer");
                        }}
                      >
                        Sign In as Customer →
                      </button>
                    </div>

                    <div className="dropdown-divider" />

                    {/* 2] Admin Login Option */}
                    <div className="dropdown-role-card admin-highlight">
                      <div className="role-top">
                        <div className="role-label">
                          <Shield size={15} className="role-icon admin-icon" />
                          <b>2] Admin Portal</b>
                        </div>
                        <button
                          className="quick-demo-pill admin-pill"
                          onClick={() => {
                            setDropdownOpen(false);
                            onQuickDemoAdmin();
                          }}
                          title="Instant 1-Click Demo Login as Admin"
                        >
                          ⚡ 1-Click Demo
                        </button>
                      </div>
                      <p>Full control over sarees, hero banners, and site content.</p>
                      <button
                        className="role-signin-link"
                        onClick={() => {
                          setDropdownOpen(false);
                          onOpenLogin("admin");
                        }}
                      >
                        Sign In as Admin →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : currentUser.role === "customer" ? (
              /* When logged in as Customer */
              <div className="logged-in-container">
                <button
                  className="user-badge-btn simple-user-badge"
                  onClick={onOpenCustomerProfile}
                  title="View your customer orders & profile"
                >
                  <span className="user-avatar-circle">
                    {currentUser.name?.charAt(0) || "P"}
                  </span>
                  <span className="user-first-name">{currentUser.name?.split(" ")[0]}</span>
                </button>
                <button
                  className="simple-logout-btn"
                  onClick={onLogout}
                  title="Sign Out"
                >
                  <LogOut size={15} />
                </button>
              </div>
            ) : (
              /* When logged in as Admin */
              <div className="logged-in-container">
                <button
                  className={`simple-admin-dash-btn ${viewingAdminDashboard ? "active" : ""}`}
                  onClick={onOpenAdminDashboard}
                  title="Open Admin Dashboard to manage website content"
                >
                  <LayoutDashboard size={15} />
                  <span>Admin Dashboard</span>
                </button>
                <button
                  className="simple-logout-btn"
                  onClick={onLogout}
                  title="Sign Out"
                >
                  <LogOut size={15} />
                </button>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Hamburger Menu */}
        <button
          className="mobile-menu-btn"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </header>

      {/* Clean Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <nav className="simple-mobile-drawer" id="mobile-navigation" aria-label="Mobile navigation">
          <div className="mobile-simple-links">
            <a
              href="#"
              className="m-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </a>
            <a
              href="#collections"
              className="m-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              Collections
            </a>
            <button
              className="m-link m-enquire-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                openWhatsApp();
              }}
            >
              <MessageCircle size={18} /> Enquire on WhatsApp
            </button>
          </div>

          <div className="mobile-account-actions">
            {!currentUser ? (
            <button
              className="mobile-account-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLogin("customer");
              }}
            >
              <LogIn size={16} /> Sign in
            </button>
            ) : currentUser.role === "admin" ? (
            <>
              <button
                className="mobile-account-btn primary"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdminDashboard();
                }}
              >
                <LayoutDashboard size={16} /> Admin dashboard
              </button>
              <button
                className="mobile-account-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onLogout();
                }}
              >
                <LogOut size={15} /> Sign out
              </button>
            </>
            ) : (
            <>
              <button
                className="mobile-account-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCustomerProfile();
                }}
              >
                <User size={16} /> My account
              </button>
              <button
                className="mobile-account-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onLogout();
                }}
              >
                <LogOut size={15} /> Sign Out
              </button>
            </>
            )}
          </div>
        </nav>
      )}
    </>
  );
}

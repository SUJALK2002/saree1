import React, { useState } from "react";
import { X, User, Shield, CheckCircle, ArrowRight, Sparkles, Lock, Mail, Key } from "lucide-react";
import { demoAccounts } from "../data/initialData";

export default function LoginModal({ isOpen, onClose, onLogin, initialTab = "customer" }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [customerEmail, setCustomerEmail] = useState("priya@sareevira.com");
  const [customerPassword, setCustomerPassword] = useState("••••••••");
  const [adminEmail, setAdminEmail] = useState("admin@sareevira.com");
  const [adminPassword, setAdminPassword] = useState("••••••••");

  // Keep tab in sync if initialTab changes
  React.useEffect(() => {
    if (initialTab) setActiveTab(initialTab);
  }, [initialTab]);

  if (!isOpen) return null;

  const handleCustomerLogin = (e) => {
    e?.preventDefault();
    onLogin(demoAccounts.customer);
    onClose();
  };

  const handleAdminLogin = (e) => {
    e?.preventDefault();
    onLogin(demoAccounts.admin);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <div className="modal-header">
          <div className="modal-badge">
            <span className="lotus">✿</span>
            <span>SAREEVIRA PORTAL</span>
          </div>
          <h2>Welcome to SareeVira</h2>
          <p>Select your account type or use one of our instant 1-click demo logins below.</p>
        </div>

        {/* 2 Login Tabs */}
        <div className="login-tab-pills">
          <button
            className={`tab-pill ${activeTab === "customer" ? "active" : ""}`}
            onClick={() => setActiveTab("customer")}
          >
            <User size={16} />
            <span>1] Customer Login</span>
          </button>
          <button
            className={`tab-pill ${activeTab === "admin" ? "active" : ""}`}
            onClick={() => setActiveTab("admin")}
          >
            <Shield size={16} />
            <span>2] Admin Portal</span>
          </button>
        </div>

        {activeTab === "customer" ? (
          <div className="tab-body">
            <div className="demo-highlight-box customer-box">
              <div className="highlight-head">
                <Sparkles size={16} className="sparkle-icon" />
                <b>Instant Demo Customer Access</b>
              </div>
              <p>Experience the boutique as an existing VIP customer with order history, saved wishlist & priority WhatsApp drape booking.</p>
              <button className="button primary full-width demo-btn" onClick={handleCustomerLogin}>
                ⚡ 1-Click Demo Login as Customer (Priya Sharma) <ArrowRight size={15} />
              </button>
            </div>

            <div className="or-divider">
              <span>OR ENTER CREDENTIALS</span>
            </div>

            <form onSubmit={handleCustomerLogin} className="auth-form">
              <div className="form-group">
                <label><Mail size={14} /> Email Address</label>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="e.g. priya@sareevira.com"
                  required
                />
              </div>
              <div className="form-group">
                <label><Lock size={14} /> Password</label>
                <input
                  type="password"
                  value={customerPassword}
                  onChange={(e) => setCustomerPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>
              <div className="form-helper">
                <span>Demo Email: <code>priya@sareevira.com</code></span>
                <span>Pass: <code>demo123</code></span>
              </div>
              <button type="submit" className="button secondary full-width">
                Sign In as Customer <ArrowRight size={15} />
              </button>
            </form>
          </div>
        ) : (
          <div className="tab-body">
            <div className="demo-highlight-box admin-box">
              <div className="highlight-head">
                <Shield size={16} className="shield-icon" />
                <b>Instant Demo Admin Access</b>
              </div>
              <p>Access the full <b>Admin Dashboard</b> to edit hero banners, manage products, change prices, update collections, and control all website content.</p>
              <button className="button admin-accent full-width demo-btn" onClick={handleAdminLogin}>
                ⚡ 1-Click Demo Login as Admin (Super Admin) <ArrowRight size={15} />
              </button>
            </div>

            <div className="or-divider">
              <span>OR ENTER ADMIN CREDENTIALS</span>
            </div>

            <form onSubmit={handleAdminLogin} className="auth-form">
              <div className="form-group">
                <label><Mail size={14} /> Admin Email</label>
                <input
                  type="email"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  placeholder="admin@sareevira.com"
                  required
                />
              </div>
              <div className="form-group">
                <label><Key size={14} /> Admin Secret Key / Password</label>
                <input
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
              <div className="form-helper">
                <span>Demo Admin: <code>admin@sareevira.com</code></span>
                <span>Pass: <code>admin123</code></span>
              </div>
              <button type="submit" className="button primary full-width">
                Sign In to Admin Dashboard <ArrowRight size={15} />
              </button>
            </form>
          </div>
        )}

        <div className="modal-footer-notes">
          <CheckCircle size={13} />
          <span>Demo state persists in your browser. Feel free to add sarees, edit texts, or customize freely.</span>
        </div>
      </div>
    </div>
  );
}

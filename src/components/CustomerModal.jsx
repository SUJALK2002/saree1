import React, { useState } from "react";
import { X, Package, Heart, MapPin, Mail, Phone, Calendar, ArrowRight, LogOut } from "lucide-react";

export default function CustomerModal({ isOpen, onClose, customer, wishlistCount, onLogout, onGoToWishlist }) {
  const [logoutError, setLogoutError] = useState("");
  if (!isOpen || !customer) return null;

  const handleSignOut = async () => {
    setLogoutError("");
    try {
      const signedOut = await onLogout();
      if (!signedOut) throw new Error("Please try signing out again.");
      onClose();
    } catch (error) {
      setLogoutError(error.message || "Unable to sign out. Please try again.");
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card customer-profile-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <div className="customer-banner">
          <div className="customer-avatar-large">
            <span>{customer.name?.charAt(0) || "P"}</span>
          </div>
          <div className="customer-banner-info">
            <span className="customer-tag">SAREEVIRA CUSTOMER</span>
            <h3>{customer.name}</h3>
            <p><Mail size={13} /> {customer.email}</p>
          </div>
        </div>

        <div className="customer-quick-stats">
          <div className="c-stat">
            <Package size={18} />
            <div>
              <b>{customer.orders?.length || 0} Orders</b>
              <small>Order history</small>
            </div>
          </div>
          <div className="c-stat highlight" onClick={() => { onClose(); onGoToWishlist(); }}>
            <Heart size={18} />
            <div>
              <b>{wishlistCount} Wishlisted</b>
              <small>View items</small>
            </div>
          </div>
          <div className="c-stat">
            <Calendar size={18} />
            <div>
              <b>Account created</b>
              <small>{customer.memberSince || "Recently"}</small>
            </div>
          </div>
        </div>

        <div className="customer-section-box">
          <h4><Package size={16} /> Recent Orders</h4>
          <div className="orders-list">
            {customer.orders?.map((ord) => (
              <div key={ord.id} className="order-item">
                <div className="order-main">
                  <b>{ord.product}</b>
                  <div className="order-meta">
                    <span>Order #{ord.id}</span>
                    <span>•</span>
                    <span>{ord.date}</span>
                    <span>•</span>
                    <span className="order-price">₹{ord.price.toLocaleString("en-IN")}</span>
                  </div>
                </div>
                <div className="order-status-badge">
                  <span className="status-dot"></span> {ord.status}
                </div>
              </div>
            ))}
            {!customer.orders?.length && <p className="empty-orders">You have no orders yet.</p>}
          </div>
        </div>

        <div className="customer-section-box">
          <h4><MapPin size={16} /> Saved Shipping Information</h4>
          <div className="shipping-info-grid">
            <div>
              <small>Primary Phone</small>
              <p><Phone size={13} /> {customer.phone || "Not provided"}</p>
            </div>
            <div>
              <small>Delivery Address</small>
              <p>Address not saved</p>
            </div>
          </div>
        </div>

        <div className="customer-actions">
          {logoutError && <p className="auth-message error" role="alert">{logoutError}</p>}
          <button className="button secondary" onClick={handleSignOut}>
            <LogOut size={15} /> Sign Out of Customer Account
          </button>
          <button className="button primary" onClick={onClose}>
            Continue Shopping <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}

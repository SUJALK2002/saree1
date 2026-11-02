import React from "react";
import { X, User, Package, Heart, MapPin, Mail, Phone, Calendar, ArrowRight, LogOut, ExternalLink } from "lucide-react";

export default function CustomerModal({ isOpen, onClose, customer, wishlistCount, onLogout, onGoToWishlist }) {
  if (!isOpen || !customer) return null;

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
            <span className="customer-tag">VIP BOUTIQUE MEMBER</span>
            <h3>{customer.name}</h3>
            <p><Mail size={13} /> {customer.email}</p>
          </div>
        </div>

        <div className="customer-quick-stats">
          <div className="c-stat">
            <Package size={18} />
            <div>
              <b>{customer.orders?.length || 0} Orders</b>
              <small>Delivered safely</small>
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
              <b>Member Since</b>
              <small>{customer.memberSince || "2024"}</small>
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
          </div>
        </div>

        <div className="customer-section-box">
          <h4><MapPin size={16} /> Saved Shipping Information</h4>
          <div className="shipping-info-grid">
            <div>
              <small>Primary Phone</small>
              <p><Phone size={13} /> {customer.phone}</p>
            </div>
            <div>
              <small>Delivery Address</small>
              <p>{customer.city}</p>
            </div>
          </div>
        </div>

        <div className="customer-actions">
          <button className="button secondary" onClick={() => { onLogout(); onClose(); }}>
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

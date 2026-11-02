import React, { useState, useEffect } from "react";
import SafeImage from "./SafeImage";
import {
  X,
  Heart,
  MessageCircle,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Truck,
  Award,
  ArrowLeft,
  User,
  Phone
} from "lucide-react";

export default function SareeCatalogModal({
  product,
  isOpen,
  onClose,
  currency = "₹",
  wished = false,
  onToggleWishlist,
  whatsappNumber = "918669851581",
  onSubmitEnquiry,
  enquiryName = "",
  enquiryPhone = ""
}) {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [customerName, setCustomerName] = useState(enquiryName);
  const [customerPhone, setCustomerPhone] = useState(enquiryPhone);
  const [enquiryError, setEnquiryError] = useState("");
  const [savingEnquiry, setSavingEnquiry] = useState(false);
  const [whatsappFallbackUrl, setWhatsappFallbackUrl] = useState("");

  useEffect(() => {
    setActivePhotoIndex(0);
    setEnquiryOpen(false);
    setCustomerName(enquiryName);
    setCustomerPhone(enquiryPhone);
    setEnquiryError("");
    setWhatsappFallbackUrl("");
  }, [product, enquiryName, enquiryPhone]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  // Build gallery array (fallback to main image if gallery not provided)
  const gallery = product.gallery && product.gallery.length > 0
    ? product.gallery
    : [
        {
          part: "Full Drape",
          title: "Full Drape Silhouette",
          image: product.image,
          caption: "Editorial front drape view highlighting fall, pleats, and overall silhouette."
        },
        {
          part: "Pallu & Zari",
          title: "Pallu & Weave Detailing",
          image: product.image,
          caption: "Close-up of intricate zari threads and artisanal embellishments."
        },
        {
          part: "Border & Craft",
          title: "Border View",
          image: product.image,
          caption: "Precision edge borders woven to elevate drape presence."
        },
        {
          part: "Blouse Piece",
          title: "Blouse & Silk Texture",
          image: product.image,
          caption: "Coordinating unstitched blouse fabric included."
        }
      ];

  const currentPhoto = gallery[activePhotoIndex] || gallery[0];

  const money = (n) => `${currency}${Number(n).toLocaleString("en-IN")}`;

  const handleEnquirySubmit = async (event) => {
    event.preventDefault();
    const name = customerName.trim();
    const phone = customerPhone.trim();
    const message = `Enquiry for ${product.name} (ID: ${product.id})`;
    const whatsappRecipient = (whatsappNumber || "918669851581").replace(/\D/g, "");
    const whatsappMessage = `Hello SareeVira! I would like to enquire about:
*${product.name}* (ID: ${product.id})
Price: ${money(product.price)}
Name: ${name}
Contact: ${phone}
Currently viewing: ${currentPhoto.part} (${currentPhoto.title})

Please share availability and delivery details.`;
    const whatsappUrl = `https://wa.me/${whatsappRecipient}?text=${encodeURIComponent(whatsappMessage)}`;
    const whatsappWindow = window.open("about:blank", "_blank");
    if (whatsappWindow) whatsappWindow.opener = null;
    setSavingEnquiry(true);
    setEnquiryError("");

    try {
      await onSubmitEnquiry({
        customerName: name,
        phone,
        product: product.name,
        productId: product.id,
        message
      });
      if (whatsappWindow) {
        whatsappWindow.location.href = whatsappUrl;
        setEnquiryOpen(false);
      } else {
        setWhatsappFallbackUrl(whatsappUrl);
        setEnquiryError("Your enquiry was saved, but your browser blocked WhatsApp. Open WhatsApp to contact the store.");
      }
    } catch (error) {
      if (whatsappWindow) whatsappWindow.close();
      setEnquiryError(error.message || "Your enquiry could not be saved. Please try again.");
    } finally {
      setSavingEnquiry(false);
    }
  };

  const nextPhoto = () => {
    setActivePhotoIndex((prev) => (prev + 1) % gallery.length);
  };

  const prevPhoto = () => {
    setActivePhotoIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card saree-catalog-modal" onClick={(e) => e.stopPropagation()}>
        {/* Modal Close Button */}
        <button className="modal-close" onClick={onClose} aria-label="Close catalog">
          <X size={20} />
        </button>

        <div className="catalog-layout-grid">
          {/* =========================================================
              LEFT COLUMN: MULTI-VIEW PHOTOS & PARTS CATALOG
             ========================================================= */}
          <div className="catalog-gallery-pane">
            {/* Main High-Res Image Stage */}
            <div className="catalog-main-stage">
              <SafeImage
                src={currentPhoto.image}
                alt={`${product.name} - ${currentPhoto.part}`}
                className="catalog-stage-image"
              />

              {/* View Part Pill Badge */}
              <div className="stage-part-badge">
                <span className="part-dot"></span>
                <b>Part {activePhotoIndex + 1} of {gallery.length}:</b>
                <span>{currentPhoto.part}</span>
              </div>

              {/* Nav Arrows */}
              {gallery.length > 1 && (
                <>
                  <button
                    className="stage-nav-arrow prev"
                    onClick={(e) => {
                      e.stopPropagation();
                      prevPhoto();
                    }}
                    aria-label="Previous photo view"
                  >
                    <ChevronLeft size={22} />
                  </button>
                  <button
                    className="stage-nav-arrow next"
                    onClick={(e) => {
                      e.stopPropagation();
                      nextPhoto();
                    }}
                    aria-label="Next photo view"
                  >
                    <ChevronRight size={22} />
                  </button>
                </>
              )}
            </div>

            {/* View Caption / Explanation of this part */}
            <div className="stage-caption-box">
              <div className="caption-title-row">
                <b>{currentPhoto.title}</b>
                <span className="caption-tag">View angle {activePhotoIndex + 1}</span>
              </div>
              <p>{currentPhoto.caption}</p>
            </div>

            {/* Clickable Parts Thumbnails Strip */}
            <div className="catalog-thumbnails-strip">
              {gallery.map((item, idx) => (
                <button
                  key={idx}
                  className={`thumb-button ${activePhotoIndex === idx ? "active-thumb" : ""}`}
                  onClick={() => setActivePhotoIndex(idx)}
                >
                  <SafeImage src={item.image} alt={item.part} />
                  <span className="thumb-part-label">{item.part}</span>
                </button>
              ))}
            </div>
          </div>

          {/* =========================================================
              RIGHT COLUMN: SAREE DOSSIER & SPECIFICATIONS
             ========================================================= */}
          <div className="catalog-details-pane">
            <div className="details-header">
              <div className="category-meta-row">
                <span className="cat-chip">{product.category}</span>
                <span className="id-chip">ID: {product.id}</span>
                {product.tag && <span className="tag-chip">{product.tag}</span>}
              </div>

              <h2 className="catalog-product-title">{product.name}</h2>

              {/* Price Row */}
              <div className="catalog-price-row">
                <b className="current-price">{money(product.price)}</b>
                {product.mrp > product.price && (
                  <>
                    <del className="mrp-price">{money(product.mrp)}</del>
                    <span className="discount-pill">
                      {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% OFF
                    </span>
                  </>
                )}
                <span className="tax-note">Inclusive of all taxes</span>
              </div>
            </div>

            {/* Stock Availability */}
            <div className="stock-notice">
              <span className="stock-pulse-dot"></span>
              <span><b>Ready for Dispatch:</b> Hand-inspected and packed in signature boutique box.</span>
            </div>

            {/* Story / Description */}
            <div className="catalog-description">
              <p>{product.detail}</p>
            </div>

            {/* Detailed Specifications Dossier */}
            <div className="catalog-specs-box">
              <h4 className="specs-heading">
                <Sparkles size={14} /> Saree Craftsmanship & Specifications
              </h4>
              <dl className="specs-list">
                <div>
                  <dt>Fabric</dt>
                  <dd>{product.fabric || "Pure Mulberry Silk"}</dd>
                </div>
                <div>
                  <dt>Colour Hue</dt>
                  <dd>{product.colour || "As shown in photography"}</dd>
                </div>
                <div>
                  <dt>Dimensions</dt>
                  <dd>{product.specs?.length || "5.5 Meters Saree + 0.8 Meter Blouse Piece"}</dd>
                </div>
                <div>
                  <dt>Weave Artistry</dt>
                  <dd>{product.specs?.weave || "Authentic Handloom Technique"}</dd>
                </div>
                <div>
                  <dt>Zari Purity</dt>
                  <dd>{product.specs?.zari || "Tested Pure Metallic Gold Zari"}</dd>
                </div>
                <div>
                  <dt>Blouse Piece</dt>
                  <dd>{product.specs?.blouse || "Matching unstitched material included"}</dd>
                </div>
                <div>
                  <dt>Weaving Cluster</dt>
                  <dd>{product.specs?.origin || "Heritage Loom Co-operative"}</dd>
                </div>
                <div>
                  <dt>Wash & Care</dt>
                  <dd>{product.specs?.care || "Dry Clean Only"}</dd>
                </div>
              </dl>
            </div>

            {enquiryOpen ? (
              <form className="catalog-enquiry-form" onSubmit={handleEnquirySubmit}>
                <button
                  type="button"
                  className="catalog-enquiry-back"
                  onClick={() => setEnquiryOpen(false)}
                >
                  <ArrowLeft size={14} /> Back to catalog
                </button>
                <h3>Where can we reach you?</h3>
                <p>Your details will be included in the WhatsApp message and saved securely for the store team.</p>
                {enquiryError && <p className="auth-message error" role="alert">{enquiryError}</p>}
                {whatsappFallbackUrl && (
                  <a
                    className="button primary full-width wa-enquire-main"
                    href={whatsappFallbackUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle size={18} />
                    <span>Open WhatsApp</span>
                  </a>
                )}
                <label>
                  <span><User size={14} /> Your name</span>
                  <input
                    autoComplete="name"
                    required
                    maxLength={100}
                    value={customerName}
                    onChange={(event) => setCustomerName(event.target.value)}
                    placeholder="Enter your name"
                  />
                </label>
                <label>
                  <span><Phone size={14} /> Contact number</span>
                  <input
                    type="tel"
                    autoComplete="tel"
                    required
                    maxLength={20}
                    value={customerPhone}
                    onChange={(event) => setCustomerPhone(event.target.value)}
                    placeholder="+91 98765 43210"
                  />
                </label>
                <button
                  className="button primary full-width wa-enquire-main"
                  type="submit"
                  disabled={savingEnquiry || Boolean(whatsappFallbackUrl)}
                >
                  <MessageCircle size={18} />
                  <span>{savingEnquiry
                    ? "Saving your enquiry..."
                    : whatsappFallbackUrl
                      ? "Enquiry saved"
                      : "Save details & continue to WhatsApp"}</span>
                </button>
              </form>
            ) : (
              <div className="catalog-action-buttons">
                <button
                  className="button primary full-width wa-enquire-main"
                  onClick={() => setEnquiryOpen(true)}
                >
                  <MessageCircle size={18} />
                  <span>Enquire & Reserve on WhatsApp</span>
                </button>

                <button
                  className={`button secondary catalog-wish-btn ${wished ? "wished-active" : ""}`}
                  onClick={onToggleWishlist}
                  title="Add to Wishlist"
                >
                  <Heart size={18} fill={wished ? "currentColor" : "none"} />
                  <span>{wished ? "Saved in Wishlist" : "Save to Wishlist"}</span>
                </button>
              </div>
            )}

            <div className="catalog-guarantee-strip">
              <div>
                <Truck size={14} />
                <span>Express Pan-India Delivery</span>
              </div>
              <div>
                <Award size={14} />
                <span>100% Handloom Certified</span>
              </div>
              <div>
                <ShieldCheck size={14} />
                <span>Video Call Drape Available</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

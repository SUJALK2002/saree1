import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Storefront from "./components/Storefront";
import AdminDashboard from "./components/AdminDashboard";
import LoginModal from "./components/LoginModal";
import CustomerModal from "./components/CustomerModal";
import SareeCatalogModal from "./components/SareeCatalogModal";
import { initialSiteData } from "./data/initialData";
import { authenticate } from "./lib/auth";
import { adminLoginEmail, supabase, supabaseConfigured } from "./lib/supabase";

const STORAGE_KEY_WISH = "sareevira_wishlist";

export default function App() {
  const [siteData, setSiteData] = useState(initialSiteData);
  const [siteContentLoaded, setSiteContentLoaded] = useState(!supabaseConfigured);
  const [currentUser, setCurrentUser] = useState(null);
  const [authSession, setAuthSession] = useState(null);
  const [appError, setAppError] = useState("");
  const [inquiries, setInquiries] = useState([]);
  const [viewingAdminDashboard, setViewingAdminDashboard] = useState(false);
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_WISH);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Error reading wishlist", e);
    }
    return ["SR101", "SR103"];
  });

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [loginModalTab, setLoginModalTab] = useState("customer");
  const [passwordRecovery, setPasswordRecovery] = useState(false);
  const [customerModalOpen, setCustomerModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    if (!supabase) return undefined;
    let active = true;

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!active) return;
      setAuthSession(session);
      if (event === "PASSWORD_RECOVERY") {
        setPasswordRecovery(true);
        setLoginModalOpen(true);
      }
    });

    supabase.auth.getSession().then(({ data, error }) => {
      if (!active) return;
      if (error) {
        setAppError(`Could not restore your sign-in: ${error.message}`);
      } else {
        setAuthSession(data.session);
      }
    }).catch((error) => {
      if (!active) return;
      setAppError(`Could not restore your sign-in: ${error.message}`);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!supabase) return undefined;
    let active = true;

    if (!authSession?.user) {
      setCurrentUser(null);
      setViewingAdminDashboard(false);
      return () => {
        active = false;
      };
    }

    setCurrentUser(null);
    setViewingAdminDashboard(false);
    supabase
      .from("profiles")
      .select("id, email, full_name, phone, role, created_at")
      .eq("id", authSession.user.id)
      .single()
      .then(async ({ data, error }) => {
        if (!active) return;
        if (error) {
          const { error: signOutError } = await supabase.auth.signOut();
          if (!active) return;
          setAppError(
            signOutError
              ? `Could not load your account permissions (${error.message}) or sign out (${signOutError.message}).`
              : `Could not load your account permissions: ${error.message}`
          );
          return;
        }
        setAppError("");
        setCurrentUser({
          id: data.id,
          email: data.email,
          name: data.full_name,
          phone: data.phone || "",
          role: data.role,
          memberSince: new Date(data.created_at).toLocaleDateString(undefined, {
            month: "short",
            year: "numeric"
          }),
          orders: []
        });
        setViewingAdminDashboard(data.role === "admin");
      })
      .catch((error) => {
        if (active) setAppError(`Could not load your account permissions: ${error.message}`);
      });

    return () => {
      active = false;
    };
  }, [authSession]);

  useEffect(() => {
    if (!supabase) {
      setSiteContentLoaded(true);
      return undefined;
    }
    let active = true;

    supabase
      .from("store_content")
      .select("content")
      .eq("id", 1)
      .maybeSingle()
      .then(({ data, error }) => {
        if (!active) return;
        if (error) {
          setAppError(`Could not load store content: ${error.message}`);
        } else if (data?.content) {
          setSiteData(data.content);
        }
        setSiteContentLoaded(true);
      })
      .catch((error) => {
        if (!active) return;
        setAppError(`Could not load store content: ${error.message}`);
        setSiteContentLoaded(true);
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!supabase || !siteContentLoaded || currentUser?.role !== "admin") return undefined;
    const timeout = window.setTimeout(async () => {
      const { error } = await supabase
        .from("store_content")
        .upsert(
          { id: 1, content: siteData, updated_at: new Date().toISOString() },
          { onConflict: "id" }
        );
      if (error) {
        setAppError(`Store changes could not be saved: ${error.message}`);
      } else {
        setAppError("");
      }
    }, 400);
    return () => window.clearTimeout(timeout);
  }, [siteData, siteContentLoaded, currentUser]);

  useEffect(() => {
    if (!supabase || currentUser?.role !== "admin") {
      setInquiries([]);
      return undefined;
    }
    refreshInquiries();
    return undefined;
  }, [currentUser]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_WISH, JSON.stringify(wishlist));
    } catch (e) {
      console.error("Error syncing wishlist", e);
    }
  }, [wishlist]);

  const handleLogin = async (credentials) => {
    const result = await authenticate(credentials);
    if (result.profile) {
      const profile = result.profile;
      setCurrentUser({
        id: profile.id,
        email: profile.email,
        name: profile.full_name,
        phone: profile.phone || "",
        role: profile.role,
        memberSince: new Date(profile.created_at).toLocaleDateString(undefined, {
          month: "short",
          year: "numeric"
        }),
        orders: []
      });
      setViewingAdminDashboard(profile.role === "admin");
    }
    return result;
  };

  const handleLogout = async () => {
    if (supabase) {
      const { error } = await supabase.auth.signOut();
      if (error) {
        setAppError(`Could not sign out: ${error.message}`);
        return false;
      }
    }
    setViewingAdminDashboard(false);
    return true;
  };

  const handleToggleWishlist = (productId) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  async function refreshInquiries() {
    if (!supabase || currentUser?.role !== "admin") return;
    try {
      const { data, error } = await supabase
        .from("enquiries")
        .select("id, customer_name, phone, product_id, product_name, message, status, created_at")
        .order("created_at", { ascending: false })
        .limit(100);
      if (error) throw error;
      setInquiries(data.map((item) => ({
        id: item.id,
        customerName: item.customer_name,
        phone: item.phone,
        product: item.product_name,
        productId: item.product_id,
        message: item.message,
        status: item.status,
        time: new Date(item.created_at).toLocaleString()
      })));
      setAppError("");
    } catch (error) {
      setAppError(`Could not load customer enquiries: ${error.message}`);
    }
  }

  const handleCreateInquiry = async (inquiry) => {
    if (!supabase) {
      throw new Error("Enquiries are unavailable until the store database is configured.");
    }
    const { error } = await supabase.from("enquiries").insert({
      customer_name: inquiry.customerName,
      phone: inquiry.phone,
      product_id: inquiry.productId,
      product_name: inquiry.product,
      message: inquiry.message
    });
    if (error) {
      throw new Error(`Your enquiry could not be saved: ${error.message}`);
    }
    if (currentUser?.role === "admin") {
      await refreshInquiries();
    }
  };

  const handleResetToDefaults = () => {
    setSiteData(initialSiteData);
  };

  return (
    <div className="site-wrapper">
      {appError && (
        <div className="app-alert" role="alert">
          {appError}
        </div>
      )}
      {!siteContentLoaded ? (
        <div className="site-loading" role="status">Loading the latest store content…</div>
      ) : viewingAdminDashboard && currentUser?.role === "admin" ? (
        <AdminDashboard
          siteData={siteData}
          inquiries={inquiries}
          currentUser={currentUser}
          backendConfigured={supabaseConfigured}
          onRefreshInquiries={refreshInquiries}
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
                <b>Admin Mode Active:</b> You are previewing the live storefront.
              </div>
              <div className="admin-bar-actions">
                <button
                  className="bar-btn-dash"
                  onClick={() => setViewingAdminDashboard(true)}
                >
                  ⚡ Open Full Admin Dashboard
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
        onClose={() => {
          setLoginModalOpen(false);
          setPasswordRecovery(false);
        }}
        onLogin={handleLogin}
        initialTab={loginModalTab}
        adminEmail={adminLoginEmail}
        backendConfigured={supabaseConfigured}
        passwordRecovery={passwordRecovery}
      />

      {/* Customer Profile & Orders Modal */}
      <CustomerModal
        isOpen={customerModalOpen}
        onClose={() => setCustomerModalOpen(false)}
        customer={currentUser}
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
        enquiryName={currentUser?.name || ""}
        enquiryPhone={currentUser?.phone || ""}
      />
    </div>
  );
}
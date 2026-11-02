import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  CheckCircle,
  Key,
  Lock,
  Mail,
  Shield,
  User,
  X
} from "lucide-react";
import { sendPasswordReset, updatePassword } from "../lib/auth";

export default function LoginModal({
  isOpen,
  onClose,
  onLogin,
  initialTab = "customer",
  adminEmail = "",
  backendConfigured,
  passwordRecovery = false
}) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [customerMode, setCustomerMode] = useState("signin");
  const [recoveryPassword, setRecoveryPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [notice, setNotice] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recoveryMode, setRecoveryMode] = useState(passwordRecovery);

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
      setRecoveryPassword("");
      setPasswordConfirmation("");
      setEmail(initialTab === "admin" ? adminEmail : "");
      setPassword("");
      setRecoveryMode(passwordRecovery);
      setCustomerMode("signin");
      setErrorMessage("");
      setNotice("");
    }
  }, [isOpen, initialTab, adminEmail, passwordRecovery]);

  if (!isOpen) return null;

  const isSignup = !recoveryMode && activeTab === "customer" && customerMode === "signup";

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setNotice("");
    setIsSubmitting(true);

    try {
      const result = await onLogin({
        role: activeTab,
        mode: isSignup ? "signup" : "signin",
        email,
        password,
        fullName,
        phone
      });

      if (result?.requiresEmailVerification) {
        setNotice("Check your email to confirm your account, then sign in.");
        setPassword("");
        return;
      }

      onClose();
    } catch (error) {
      setErrorMessage(error.message || "Unable to complete sign-in. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePasswordReset = async () => {
    setErrorMessage("");
    setNotice("");
    if (!email.trim()) {
      setErrorMessage("Enter your account email first to reset your password.");
      return;
    }
    setIsSubmitting(true);
    try {
      await sendPasswordReset(email);
      setNotice("If the account exists, a password reset link has been sent.");
    } catch (error) {
      setErrorMessage(error.message || "Unable to send a password reset email.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePasswordUpdate = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    if (recoveryPassword !== passwordConfirmation) {
      setErrorMessage("The passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    try {
      await updatePassword(recoveryPassword);
      onClose();
    } catch (error) {
      setErrorMessage(error.message || "Unable to update your password.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const switchTab = (tab) => {
    setActiveTab(tab);
    setEmail(tab === "admin" ? adminEmail : "");
    setPassword("");
    setCustomerMode("signin");
    setErrorMessage("");
    setNotice("");
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-card auth-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close sign-in">
          <X size={20} />
        </button>

        <div className="modal-header">
          <div className="modal-badge">
            <span className="lotus">✿</span>
            <span>SAREEVIRA ACCOUNT</span>
          </div>
          <h2 id="auth-title">
            {recoveryMode ? "Choose a new password" : isSignup ? "Create your account" : "Welcome to SareeVira"}
          </h2>
          <p>
            {recoveryMode
              ? "Enter and confirm a new password for your account."
              : isSignup
              ? "Create an account to save your details and enjoy a personal shopping experience."
              : "Sign in to your customer or store administrator account."}
          </p>
        </div>

        {!recoveryMode && <div className="login-tab-pills" role="tablist" aria-label="Account type">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "customer"}
            className={`tab-pill ${activeTab === "customer" ? "active" : ""}`}
            onClick={() => switchTab("customer")}
          >
            <User size={16} /> Customer
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "admin"}
            className={`tab-pill ${activeTab === "admin" ? "active" : ""}`}
            onClick={() => switchTab("admin")}
          >
            <Shield size={16} /> Admin
          </button>
        </div>}

        {!recoveryMode && activeTab === "customer" && (
          <div className="auth-mode-toggle" aria-label="Customer account action">
            <button
              type="button"
              className={customerMode === "signin" ? "active" : ""}
              onClick={() => {
                setCustomerMode("signin");
                setErrorMessage("");
                setNotice("");
              }}
            >
              Sign in
            </button>
            <button
              type="button"
              className={customerMode === "signup" ? "active" : ""}
              onClick={() => {
                setCustomerMode("signup");
                setErrorMessage("");
                setNotice("");
              }}
            >
              Create account
            </button>
          </div>
        )}

        {!backendConfigured && (
          <div className="auth-message error" role="alert">
            Accounts are temporarily unavailable. The store administrator must configure the Supabase project before launch.
          </div>
        )}
        {errorMessage && <div className="auth-message error" role="alert">{errorMessage}</div>}
        {notice && <div className="auth-message success" role="status">{notice}</div>}

        <form onSubmit={recoveryMode ? handlePasswordUpdate : handleSubmit} className="auth-form">
          {recoveryMode ? (
            <>
              <div className="form-group">
                <label htmlFor="recovery-password"><Lock size={14} /> New password</label>
                <input
                  id="recovery-password"
                  name="new-password"
                  type="password"
                  autoComplete="new-password"
                  value={recoveryPassword}
                  onChange={(event) => setRecoveryPassword(event.target.value)}
                  minLength={8}
                  maxLength={128}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password-confirmation"><Lock size={14} /> Confirm new password</label>
                <input
                  id="password-confirmation"
                  name="password-confirmation"
                  type="password"
                  autoComplete="new-password"
                  value={passwordConfirmation}
                  onChange={(event) => setPasswordConfirmation(event.target.value)}
                  minLength={8}
                  maxLength={128}
                  required
                />
              </div>
            </>
          ) : (
            <>
              {isSignup && (
                <>
                  <div className="form-group">
                    <label htmlFor="signup-name"><User size={14} /> Full name</label>
                    <input
                      id="signup-name"
                      name="name"
                      autoComplete="name"
                      value={fullName}
                      onChange={(event) => setFullName(event.target.value)}
                      minLength={2}
                      maxLength={100}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="signup-phone">Phone number <span>(optional)</span></label>
                    <input
                      id="signup-phone"
                      name="tel"
                      type="tel"
                      autoComplete="tel"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      maxLength={20}
                    />
                  </div>
                </>
              )}

              <div className="form-group">
                <label htmlFor="account-email">
                  <Mail size={14} /> {activeTab === "admin" ? "Administrator email" : "Email address"}
                </label>
                <input
                  id="account-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  readOnly={activeTab === "admin" && Boolean(adminEmail)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="account-password">
                  {activeTab === "admin" ? <Key size={14} /> : <Lock size={14} />}
                  Password
                </label>
                <input
                  id="account-password"
                  name="password"
                  type="password"
                  autoComplete={isSignup ? "new-password" : "current-password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  minLength={8}
                  maxLength={128}
                  required
                />
              </div>
            </>
          )}

          {!recoveryMode && activeTab === "customer" && !isSignup && (
            <button
              type="button"
              className="auth-text-button"
              onClick={handlePasswordReset}
              disabled={isSubmitting || !backendConfigured}
            >
              Forgot password?
            </button>
          )}

          {!recoveryMode && activeTab === "admin" && (
            <p className="auth-admin-note">
              Administrator access is limited to the configured store account.
            </p>
          )}

          <button
            type="submit"
            className={`button ${!recoveryMode && activeTab === "admin" ? "admin-accent" : "primary"} full-width`}
            disabled={isSubmitting || !backendConfigured}
          >
            {isSubmitting
              ? "Please wait..."
              : recoveryMode
                ? "Update password"
                : isSignup
                ? "Create customer account"
                : activeTab === "admin"
                  ? "Sign in to admin"
                  : "Sign in"}
            {!isSubmitting && <ArrowRight size={15} />}
          </button>
        </form>

        <div className="modal-footer-notes">
          <CheckCircle size={13} />
          <span>Your password is handled securely by Supabase Authentication.</span>
        </div>
      </div>
    </div>
  );
}

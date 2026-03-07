import { useState } from "react";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=DM+Sans:wght@300;400;500&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --ink: #0d0d0d;
    --cream: #f5f0e8;
    --accent: #c8602a;
    --accent-light: #e8845a;
    --muted: #8a7f74;
    --border: #d4c9bc;
  }

  body { font-family: 'DM Sans', sans-serif; background: var(--cream); min-height: 100vh; }

  .page { min-height: 100vh; display: grid; grid-template-columns: 1fr 1fr; }

  .left {
    background: var(--ink);
    padding: 60px 56px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    overflow: hidden;
  }
  .left::before {
    content: ''; position: absolute; top: -120px; right: -120px;
    width: 420px; height: 420px; border-radius: 50%;
    background: radial-gradient(circle, rgba(200,96,42,0.18) 0%, transparent 70%);
    pointer-events: none;
  }
  .left::after {
    content: ''; position: absolute; bottom: -80px; left: -80px;
    width: 300px; height: 300px; border-radius: 50%;
    background: radial-gradient(circle, rgba(200,96,42,0.1) 0%, transparent 70%);
    pointer-events: none;
  }

  .logo { font-family: 'Playfair Display', serif; font-size: 22px; color: var(--cream); letter-spacing: 0.04em; display: flex; align-items: center; gap: 10px; }
  .logo-dot { width: 8px; height: 8px; background: var(--accent); border-radius: 50%; display: inline-block; }
  .left-main { z-index: 1; }
  .left-tag { font-size: 11px; font-weight: 500; letter-spacing: 0.18em; color: var(--accent); text-transform: uppercase; margin-bottom: 20px; }
  .left-headline { font-family: 'Playfair Display', serif; font-size: 52px; line-height: 1.1; color: var(--cream); font-weight: 700; margin-bottom: 24px; }
  .left-headline em { font-style: italic; color: var(--accent-light); }
  .left-desc { font-size: 15px; color: var(--muted); line-height: 1.7; max-width: 320px; font-weight: 300; }
  .testimonial { border-left: 2px solid var(--accent); padding-left: 20px; z-index: 1; }
  .testimonial-text { font-family: 'Playfair Display', serif; font-size: 16px; color: var(--cream); line-height: 1.6; font-style: italic; margin-bottom: 12px; opacity: 0.85; }
  .testimonial-author { font-size: 12px; color: var(--muted); letter-spacing: 0.08em; }

  .right { background: var(--cream); padding: 60px 56px; display: flex; flex-direction: column; justify-content: center; }
  .form-header { margin-bottom: 40px; }
  .form-title { font-family: 'Playfair Display', serif; font-size: 34px; color: var(--ink); font-weight: 700; margin-bottom: 8px; }
  .form-subtitle { font-size: 14px; color: var(--muted); font-weight: 300; }
  .form-subtitle a { color: var(--accent); text-decoration: none; font-weight: 500; border-bottom: 1px solid var(--accent-light); }

  .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
  .field { display: flex; flex-direction: column; gap: 7px; }
  .field.full { grid-column: 1 / -1; }

  label { font-size: 11px; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink); }

  input {
    background: white; border: 1px solid var(--border); border-radius: 6px;
    padding: 13px 16px; font-size: 14px; font-family: 'DM Sans', sans-serif;
    color: var(--ink); transition: border-color 0.2s, box-shadow 0.2s;
    outline: none; appearance: none; width: 100%;
  }
  input::placeholder { color: #c0b8af; }
  input:focus { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(200,96,42,0.1); }
  input.error { border-color: #c0392b; box-shadow: 0 0 0 3px rgba(192,57,43,0.08); }

  .error-msg { font-size: 11px; color: #c0392b; margin-top: 2px; }

  .password-wrap { position: relative; }
  .password-wrap input { padding-right: 54px; }
  .toggle-pw {
    position: absolute; right: 13px; top: 50%; transform: translateY(-50%);
    background: none; border: none; cursor: pointer; color: var(--muted);
    font-size: 13px; font-family: 'DM Sans', sans-serif; padding: 0; font-weight: 500;
  }
  .toggle-pw:hover { color: var(--accent); }

  .strength-bar { display: flex; gap: 4px; margin-top: 6px; }
  .strength-seg { flex: 1; height: 3px; border-radius: 2px; background: var(--border); transition: background 0.3s; }
  .strength-seg.active-1 { background: #c0392b; }
  .strength-seg.active-2 { background: #e67e22; }
  .strength-seg.active-3 { background: #f1c40f; }
  .strength-seg.active-4 { background: #27ae60; }
  .strength-label { font-size: 11px; color: var(--muted); margin-top: 4px; }

  .submit-btn {
    grid-column: 1 / -1; background: var(--accent); color: white; border: none;
    border-radius: 6px; padding: 15px 24px; font-size: 14px; font-weight: 500;
    font-family: 'DM Sans', sans-serif; letter-spacing: 0.06em; cursor: pointer;
    transition: background 0.2s, transform 0.15s, box-shadow 0.2s; margin-top: 8px;
  }
  .submit-btn:hover:not(:disabled) { background: #b5541f; box-shadow: 0 6px 24px rgba(200,96,42,0.3); transform: translateY(-1px); }
  .submit-btn:active:not(:disabled) { transform: translateY(0); }
  .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }

  .success-overlay {
    position: fixed; inset: 0; background: rgba(13,13,13,0.7); backdrop-filter: blur(4px);
    display: flex; align-items: center; justify-content: center; z-index: 100;
    animation: fadeIn 0.3s ease;
  }
  .success-card { background: var(--cream); border-radius: 16px; padding: 48px 56px; text-align: center; max-width: 380px; animation: slideUp 0.35s cubic-bezier(0.34, 1.56, 0.64, 1); }
  .success-icon { width: 64px; height: 64px; background: var(--accent); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px; font-size: 28px; color: white; }
  .success-title { font-family: 'Playfair Display', serif; font-size: 28px; color: var(--ink); margin-bottom: 10px; }
  .success-desc { font-size: 14px; color: var(--muted); line-height: 1.6; font-weight: 300; }

  @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
  @keyframes slideUp { from { opacity: 0; transform: translateY(24px) scale(0.97) } to { opacity: 1; transform: none } }

  @media (max-width: 860px) {
    .page { grid-template-columns: 1fr; }
    .left { display: none; }
    .right { padding: 48px 32px; }
    .form-grid { grid-template-columns: 1fr; }
    .field.full, .submit-btn { grid-column: 1; }
  }
`;

// ── Types ──────────────────────────────────────────────────────────────────────

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

type FormErrors = Partial<Record<keyof FormState, string>>;

// ── Helpers ────────────────────────────────────────────────────────────────────

function getStrength(pw: string): number {
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return s;
}

const strengthLabels = ["", "Weak", "Fair", "Good", "Strong"];

const INITIAL_FORM: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
};

// ── Component ──────────────────────────────────────────────────────────────────

export default function RegistrationPage() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPw, setShowPw] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const strength = getStrength(form.password);

  const update = (key: keyof FormState, value: string): void => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = (): FormErrors => {
    const e: FormErrors = {};
    if (!form.firstName.trim()) e.firstName = "Required";
    if (!form.lastName.trim()) e.lastName = "Required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.username.trim() || form.username.length < 3) e.username = "At least 3 characters";
    if (form.password.length < 8) e.password = "At least 8 characters";
    if (form.password !== form.confirmPassword) e.confirmPassword = "Passwords don't match";
    return e;
  };

  const handleSubmit = (): void => {
    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <>
      <style>{style}</style>
      <div className="page">

        {/* ── Left panel ── */}
        <div className="left">
          <div className="logo">
            <span className="logo-dot" />
            Meridian
          </div>
          <div className="left-main">
            <div className="left-tag">New Member Portal</div>
            <h1 className="left-headline">
              Your next<br /><em>chapter</em><br />starts here.
            </h1>
            <p className="left-desc">
              Join thousands of professionals who've built careers, teams, and
              products with Meridian's platform.
            </p>
          </div>
          <div className="testimonial">
            <p className="testimonial-text">
              "Signing up took two minutes. Within a week I had everything I needed."
            </p>
            <span className="testimonial-author">— SARAH K., PRODUCT DESIGNER</span>
          </div>
        </div>

        {/* ── Right panel ── */}
        <div className="right">
          <div className="form-header">
            <h2 className="form-title">Create account</h2>
            <p className="form-subtitle">
              Already a member? <a href="#">Sign in instead</a>
            </p>
          </div>

          <div className="form-grid">

            {/* First / Last name */}
            <div className="field">
              <label htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                placeholder="Jane"
                value={form.firstName}
                onChange={(e) => update("firstName", e.target.value)}
                className={errors.firstName ? "error" : ""}
              />
              {errors.firstName && <span className="error-msg">{errors.firstName}</span>}
            </div>

            <div className="field">
              <label htmlFor="lastName">Last Name</label>
              <input
                id="lastName"
                placeholder="Doe"
                value={form.lastName}
                onChange={(e) => update("lastName", e.target.value)}
                className={errors.lastName ? "error" : ""}
              />
              {errors.lastName && <span className="error-msg">{errors.lastName}</span>}
            </div>

            {/* Email */}
            <div className="field full">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="jane@company.com"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className={errors.email ? "error" : ""}
              />
              {errors.email && <span className="error-msg">{errors.email}</span>}
            </div>

            {/* Username */}
            <div className="field full">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                placeholder="janedoe"
                value={form.username}
                onChange={(e) => update("username", e.target.value)}
                className={errors.username ? "error" : ""}
              />
              {errors.username && <span className="error-msg">{errors.username}</span>}
            </div>

            {/* Password */}
            <div className="field full">
              <label htmlFor="password">Password</label>
              <div className="password-wrap">
                <input
                  id="password"
                  type={showPw ? "text" : "password"}
                  placeholder="Min. 8 characters"
                  value={form.password}
                  onChange={(e) => update("password", e.target.value)}
                  className={errors.password ? "error" : ""}
                />
                <button
                  type="button"
                  className="toggle-pw"
                  onClick={() => setShowPw((s) => !s)}
                >
                  {showPw ? "Hide" : "Show"}
                </button>
              </div>
              {form.password.length > 0 && (
                <>
                  <div className="strength-bar">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`strength-seg${strength >= i ? ` active-${strength}` : ""}`}
                      />
                    ))}
                  </div>
                  <span className="strength-label">{strengthLabels[strength]}</span>
                </>
              )}
              {errors.password && <span className="error-msg">{errors.password}</span>}
            </div>

            {/* Confirm Password */}
            <div className="field full">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Repeat your password"
                value={form.confirmPassword}
                onChange={(e) => update("confirmPassword", e.target.value)}
                className={errors.confirmPassword ? "error" : ""}
              />
              {errors.confirmPassword && (
                <span className="error-msg">{errors.confirmPassword}</span>
              )}
            </div>

            {/* Submit */}
            <button
              type="button"
              className="submit-btn"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Creating account…" : "Create Account →"}
            </button>

          </div>
        </div>
      </div>

      {/* Success overlay */}
      {submitted && (
        <div className="success-overlay">
          <div className="success-card">
            <div className="success-icon">✓</div>
            <h3 className="success-title">Welcome aboard!</h3>
            <p className="success-desc">
              Your account has been created successfully.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
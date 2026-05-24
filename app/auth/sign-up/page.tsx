"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signUpWithEmail, signInWithGoogle } from "@/lib/firebase/auth";
import BrandIcon from "@/app/components/BrandIcon";
import { FirebaseError } from "firebase/app";

function GoogleIcon() {
  return (
    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

function getStrength(pw: string) {
  if (!pw) return { label: "", pct: "0%", color: "bg-outline-variant" };
  if (pw.length < 6) return { label: "Weak", pct: "25%", color: "bg-error" };
  if (pw.length < 10 || !/[A-Z]/.test(pw) || !/[0-9]/.test(pw))
    return { label: "Fair", pct: "50%", color: "bg-secondary-container" };
  if (!/[^A-Za-z0-9]/.test(pw))
    return { label: "Good", pct: "75%", color: "bg-secondary" };
  return { label: "Strong", pct: "100%", color: "bg-primary-container" };
}

function firebaseMsg(err: FirebaseError) {
  switch (err.code) {
    case "auth/email-already-in-use": return "An account with this email already exists.";
    case "auth/invalid-email": return "Please enter a valid email address.";
    case "auth/weak-password": return "Password must be at least 6 characters.";
    default: return "Something went wrong. Please try again.";
  }
}

export default function SignUpPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const strength = getStrength(password);

  function validate() {
    const next: Record<string, string> = {};
    if (!fullName.trim()) next.fullName = "Full name is required.";
    if (!email) next.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Please enter a valid email address.";
    if (!password) next.password = "Password is required.";
    else if (password.length < 6) next.password = "Password must be at least 6 characters.";
    if (!confirmPassword) next.confirmPassword = "Please confirm your password.";
    else if (password !== confirmPassword) next.confirmPassword = "Passwords do not match.";
    return next;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next = validate();
    if (Object.keys(next).length) { setErrors(next); return; }
    setErrors({});
    setFormError("");
    setLoading(true);
    try {
      await signUpWithEmail(email, password);
      router.push("/");
    } catch (err) {
      setFormError(err instanceof FirebaseError ? firebaseMsg(err) : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setFormError("");
    setGoogleLoading(true);
    try {
      await signInWithGoogle();
      router.push("/");
    } catch (err) {
      setFormError(err instanceof FirebaseError ? firebaseMsg(err) : "Something went wrong.");
    } finally {
      setGoogleLoading(false);
    }
  }

  function inputClass(id: string) {
    return `w-full px-4 py-3 rounded-lg text-sm text-on-surface bg-surface-container-lowest focus:outline-none transition-colors ${
      errors[id]
        ? "border-2 border-error"
        : "border border-outline-variant focus:border-primary"
    }`;
  }

  return (
    <div className="min-h-screen flex flex-col bg-rose-tint-bg font-inter">
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-[480px]">

          {/* Header */}
          <header className="flex flex-col items-center text-center mb-8">
            <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center mb-4">
              <BrandIcon size={28} />
            </div>
            <h1 className="font-hanken text-2xl font-bold text-primary mb-1">Create your account</h1>
            <p className="text-sm text-on-surface-variant">Start your precision vitality journey today</p>
          </header>

          {/* Card */}
          <div className="bg-surface-container-lowest rounded-lg border border-outline-variant shadow-sm p-8">

            {formError && (
              <div className="rounded-lg px-4 py-3 mb-4 text-sm bg-error-container text-on-error-container">
                {formError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {/* Full Name */}
              <div className="space-y-1">
                <label htmlFor="fullName" className={`block font-mono text-xs font-medium tracking-wide ${errors.fullName ? "text-error" : "text-on-surface"}`}>
                  Full Name
                </label>
                <input
                  id="fullName" type="text" value={fullName} placeholder="Jane Doe"
                  onChange={(e) => { setFullName(e.target.value); setErrors((p) => ({ ...p, fullName: "" })); }}
                  className={inputClass("fullName")}
                />
                {errors.fullName && <p className="font-mono text-xs text-error">{errors.fullName}</p>}
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label htmlFor="email" className={`block font-mono text-xs font-medium tracking-wide ${errors.email ? "text-error" : "text-on-surface"}`}>
                  Email Address
                </label>
                <input
                  id="email" type="email" value={email} placeholder="you@example.com"
                  aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined}
                  onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: "" })); }}
                  className={inputClass("email")}
                />
                {errors.email && <p id="email-error" className="font-mono text-xs text-error">{errors.email}</p>}
              </div>

              {/* Password */}
              <div className="space-y-1">
                <label htmlFor="password" className={`block font-mono text-xs font-medium tracking-wide ${errors.password ? "text-error" : "text-on-surface"}`}>
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password" type={showPassword ? "text" : "password"} value={password} placeholder="••••••••"
                    onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: "" })); }}
                    className={`${inputClass("password")} pr-12`}
                  />
                  <button type="button" onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors focus:outline-none text-sm"
                    aria-label={showPassword ? "Hide password" : "Show password"}>
                    {showPassword ? "🙈" : "👁"}
                  </button>
                </div>
                {password && (
                  <div className="mt-1 space-y-1">
                    <div className="w-full h-1.5 rounded-full bg-surface-container-high overflow-hidden">
                      <div className={`h-full rounded-full transition-all duration-300 ${strength.color}`} style={{ width: strength.pct }} />
                    </div>
                    <p className="font-mono text-xs text-on-surface-variant text-right">{strength.label}</p>
                  </div>
                )}
                {errors.password && <p className="font-mono text-xs text-error">{errors.password}</p>}
              </div>

              {/* Confirm Password */}
              <div className="space-y-1">
                <label htmlFor="confirmPassword" className={`block font-mono text-xs font-medium tracking-wide ${errors.confirmPassword ? "text-error" : "text-on-surface"}`}>
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword" type={showConfirm ? "text" : "password"} value={confirmPassword} placeholder="••••••••"
                    onChange={(e) => { setConfirmPassword(e.target.value); setErrors((p) => ({ ...p, confirmPassword: "" })); }}
                    className={`${inputClass("confirmPassword")} pr-12`}
                  />
                  <button type="button" onClick={() => setShowConfirm((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors focus:outline-none text-sm"
                    aria-label={showConfirm ? "Hide password" : "Show password"}>
                    {showConfirm ? "🙈" : "👁"}
                  </button>
                </div>
                {errors.confirmPassword && <p className="font-mono text-xs text-error">{errors.confirmPassword}</p>}
              </div>

              <div className="pt-2 space-y-3">
                <button type="submit" disabled={loading}
                  className="w-full py-3 px-6 rounded-full bg-primary text-on-primary font-mono text-sm font-medium hover:bg-surface-tint transition-colors disabled:opacity-60">
                  {loading ? "Creating account…" : "Create Account"}
                </button>

                <div className="relative flex items-center py-1">
                  <div className="flex-grow border-t border-outline-variant" />
                  <span className="flex-shrink-0 mx-4 font-mono text-xs uppercase tracking-widest text-on-surface-variant">or</span>
                  <div className="flex-grow border-t border-outline-variant" />
                </div>

                <button type="button" onClick={handleGoogle} disabled={googleLoading}
                  className="w-full py-3 px-6 rounded-full border border-outline-variant bg-transparent text-on-surface font-mono text-sm font-medium hover:bg-surface-container-low transition-colors flex items-center justify-center gap-2 disabled:opacity-60">
                  <GoogleIcon />
                  {googleLoading ? "Redirecting…" : "Sign up with Google"}
                </button>
              </div>
            </form>
          </div>

          {/* Footer link */}
          <p className="text-center text-sm text-on-surface-variant mt-8">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-primary font-medium hover:underline">Sign in</Link>
          </p>
        </div>
      </main>

      <footer className="border-t border-outline-variant bg-surface-container-lowest py-6 px-4 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-on-surface-variant font-mono">
        <span className="font-hanken font-bold text-primary text-sm">Calorie Buddy</span>
        <span>© {new Date().getFullYear()} Calorie Buddy. Precision Vitality.</span>
        <div className="flex gap-4">
          <a href="#" className="hover:text-primary hover:underline transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-primary hover:underline transition-colors">Terms of Service</a>
        </div>
      </footer>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signInWithEmail, signInWithGoogle } from "@/lib/firebase/auth";
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

function firebaseMsg(err: FirebaseError) {
  switch (err.code) {
    case "auth/user-not-found":
    case "auth/wrong-password":
    case "auth/invalid-credential": return "Invalid email or password.";
    case "auth/too-many-requests": return "Too many attempts. Please try again later.";
    case "auth/user-disabled": return "This account has been disabled.";
    default: return "Something went wrong. Please try again.";
  }
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  function validateEmail(v: string) {
    if (!v) return "Email is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "Please enter a valid email address.";
    return "";
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const err = validateEmail(email);
    if (err) { setEmailError(err); return; }
    setEmailError("");
    setFormError("");
    setLoading(true);
    try {
      await signInWithEmail(email, password);
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

  return (
    <div className="min-h-screen flex flex-col bg-rose-tint-bg font-inter">
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-[480px] bg-surface-container-lowest rounded-lg border border-outline-variant shadow-sm p-8">

          {/* Header */}
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-12 h-12 rounded-lg bg-primary-container flex items-center justify-center mb-4">
              <span className="text-on-primary font-hanken font-bold text-lg">CB</span>
            </div>
            <h1 className="font-hanken text-2xl font-bold text-primary mb-1">Welcome back</h1>
            <p className="text-sm text-on-surface-variant">Sign in to continue tracking your goals</p>
          </div>

          {/* Global error */}
          {formError && (
            <div className="rounded-lg px-4 py-3 mb-4 text-sm bg-error-container text-on-error-container">
              {formError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Email */}
            <div className="space-y-1">
              <label htmlFor="email" className={`block font-mono text-xs font-medium tracking-wide ${emailError ? "text-error" : "text-on-surface"}`}>
                Email Address
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); if (emailError) setEmailError(validateEmail(e.target.value)); }}
                  onBlur={() => setEmailError(validateEmail(email))}
                  placeholder="you@example.com"
                  aria-invalid={!!emailError}
                  aria-describedby={emailError ? "email-error" : undefined}
                  className={`w-full px-4 py-3 rounded-lg text-sm text-on-surface bg-surface-container-lowest focus:outline-none transition-colors ${
                    emailError
                      ? "border-2 border-error bg-error-container/20"
                      : "border border-outline-variant focus:border-primary"
                  }`}
                />
                {emailError && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-error text-base select-none" aria-hidden="true">⚠</span>
                )}
              </div>
              {emailError && (
                <p id="email-error" className="font-mono text-xs text-error flex items-center gap-1">{emailError}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="font-mono text-xs font-medium tracking-wide text-on-surface">Password</label>
                <a href="#" className="font-mono text-xs text-primary hover:underline">Forgot?</a>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-12 rounded-lg text-sm text-on-surface border border-outline-variant bg-surface-container-lowest focus:outline-none focus:border-primary transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors focus:outline-none text-sm"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "🙈" : "👁"}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-6 rounded-full bg-primary-container text-on-primary font-mono text-sm font-medium hover:bg-primary transition-colors disabled:opacity-60 mt-2"
            >
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center py-5">
            <div className="flex-grow border-t border-outline-variant" />
            <span className="flex-shrink-0 mx-4 font-mono text-xs uppercase tracking-widest text-on-surface-variant">or</span>
            <div className="flex-grow border-t border-outline-variant" />
          </div>

          {/* Google */}
          <button
            type="button"
            onClick={handleGoogle}
            disabled={googleLoading}
            className="w-full py-3 px-6 rounded-full border border-outline-variant bg-transparent text-on-surface font-mono text-sm font-medium hover:bg-surface-container-low transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
          >
            <GoogleIcon />
            {googleLoading ? "Redirecting…" : "Continue with Google"}
          </button>

          {/* Footer link */}
          <p className="text-center text-sm text-on-surface-variant mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/auth/sign-up" className="text-primary font-medium hover:underline">Sign up</Link>
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

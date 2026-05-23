import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-rose-tint-bg font-inter">
      <header className="border-b border-outline-variant bg-surface-container-lowest px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-primary-container flex items-center justify-center">
            <span className="text-on-primary font-hanken font-bold text-sm">CB</span>
          </div>
          <span className="font-hanken font-bold text-primary text-lg">Calorie Buddy</span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/auth/login"
            className="font-mono text-sm text-primary hover:underline transition-colors"
          >
            Sign in
          </Link>
          <Link
            href="/auth/sign-up"
            className="font-mono text-sm bg-primary-container text-on-primary px-4 py-2 rounded-full hover:bg-primary transition-colors"
          >
            Get started
          </Link>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center px-6 py-16 text-center">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-primary-fixed text-on-primary-fixed font-mono text-xs px-3 py-1.5 rounded-full mb-8 border border-primary-fixed-dim">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-container inline-block" />
            Precision Vitality
          </div>

          <h1 className="font-hanken text-4xl md:text-5xl font-extrabold text-on-background leading-tight mb-6 tracking-tight">
            Track your calories.<br />
            <span className="text-primary-container">Fuel your goals.</span>
          </h1>

          <p className="text-base md:text-lg text-on-surface-variant leading-relaxed mb-10 max-w-xl mx-auto">
            Calorie Buddy gives you the precision of a nutrition scientist with the encouragement of a personal coach — all in one clean, focused dashboard.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/sign-up"
              className="font-mono text-sm bg-primary text-on-primary px-8 py-4 rounded-full hover:bg-surface-tint transition-colors font-medium"
            >
              Start for free
            </Link>
            <Link
              href="/auth/login"
              className="font-mono text-sm border border-outline-variant text-on-surface px-8 py-4 rounded-full hover:bg-surface-container-low transition-colors"
            >
              Sign in
            </Link>
          </div>
        </div>

        {/* Feature pills */}
        <div className="flex flex-wrap justify-center gap-3 mt-16">
          {["Calorie tracking", "Macro breakdown", "Daily goals", "Progress charts", "Meal logging"].map((f) => (
            <span
              key={f}
              className="bg-primary-fixed text-on-primary-fixed border border-primary-fixed-dim font-mono text-xs px-4 py-2 rounded-full"
            >
              {f}
            </span>
          ))}
        </div>
      </main>

      <footer className="border-t border-outline-variant bg-surface-container-lowest py-6 px-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-on-surface-variant font-mono">
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

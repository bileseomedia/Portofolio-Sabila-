"use client";
export default function Footer() {
  return (
    <footer className="relative border-t border-charcoal/10 py-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="font-serif text-lg text-charcoal">Sabila<span className="text-pastelpink">.</span></p>
        <p className="text-xs text-warmgray">© {new Date().getFullYear()} Sabila Alifia Sundawa. Crafted with care.</p>
        <a href="/admin" className="text-[11px] text-warmgray/70 hover:text-charcoal transition">Admin</a>
      </div>
    </footer>
  );
    }

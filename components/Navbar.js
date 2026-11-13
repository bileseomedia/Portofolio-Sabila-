"use client";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "organization", label: "Organization" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    LINKS.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) io.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  const go = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <nav
        className={`mx-auto max-w-6xl px-4 sm:px-6 ${
          scrolled ? "backdrop-blur-xl bg-warmwhite/75 shadow-[0_8px_40px_-24px_rgba(46,43,51,.25)]" : ""
        } rounded-full`}
      >
        <div className="flex items-center justify-between h-14">
          <button
            onClick={() => go("home")}
            className="font-serif text-xl tracking-wide text-charcoal"
          >
            Sabila<span className="text-pastelpink">.</span>
          </button>

          <ul className="hidden md:flex items-center gap-1">
            {LINKS.map((l) => (
              <li key={l.id}>
                <button
                  onClick={() => go(l.id)}
                  className={`relative px-3 py-2 text-sm transition-colors ${
                    active === l.id ? "text-charcoal" : "text-warmgray hover:text-charcoal"
                  }`}
                >
                  {l.label}
                  <span
                    className={`absolute left-3 right-3 -bottom-0.5 h-[2px] rounded-full bg-gradient-to-r from-pastelpink to-lavender transition-transform duration-300 origin-left ${
                      active === l.id ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </button>
              </li>
            ))}
          </ul>

          <button
            className="md:hidden p-2 rounded-full bg-white/70 border border-charcoal/10"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {open && (
          <div className="md:hidden pb-4">
            <ul className="grid gap-1">
              {LINKS.map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => go(l.id)}
                    className={`w-full text-left px-4 py-2.5 rounded-full text-sm transition-colors ${
                      active === l.id
                        ? "bg-pastelpink/70 text-charcoal"
                        : "hover:bg-lavender/50 text-warmgray"
                    }`}
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
      }

"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function Gallery({ data }) {
  const [active, setActive] = useState(null);
  const items = data.gallery || [];

  if (items.length === 0) return null;

  return (
    <section id="gallery" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-10">
          <p className="reveal text-xs tracking-[0.3em] uppercase text-warmgray">06 — Gallery</p>
          <h2 className="reveal font-serif text-4xl sm:text-5xl lg:text-6xl mt-4 text-charcoal">
            Photo <span className="italic">Diary</span>
          </h2>
        </div>

        <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 [&>*]:mb-3">
          {items.map((it) => (
            <motion.button
              key={it.id}
              onClick={() => setActive(it)}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative block w-full break-inside-avoid rounded-2xl overflow-hidden bg-pastelpink/30"
            >
              {it.type === "video" ? (
                <video src={it.src} className="w-full h-auto" muted playsInline />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={it.src} alt={it.title} className="w-full h-auto transition-transform duration-700 group-hover:scale-[1.03]" />
              )}
              {(it.title || it.caption) && (
                <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-charcoal/50 to-transparent text-white opacity-0 group-hover:opacity-100 transition">
                  {it.title && <p className="text-xs font-medium">{it.title}</p>}
                  {it.caption && <p className="text-[10px] opacity-80">{it.caption}</p>}
                </div>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-charcoal/70 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setActive(null)}
          >
            <button
              onClick={() => setActive(null)}
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white flex items-center justify-center"
              aria-label="Close"
            >
              <X size={18} />
            </button>
            <motion.div
              initial={{ scale: .95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl max-h-[88vh] w-full"
            >
              {active.type === "video" ? (
                <video src={active.src} controls autoPlay className="max-h-[80vh] mx-auto rounded-2xl" />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={active.src} alt="" className="max-h-[80vh] mx-auto rounded-2xl object-contain" />
              )}
              {(active.title || active.caption) && (
                <div className="text-center text-white mt-3">
                  {active.title && <p className="font-serif text-xl">{active.title}</p>}
                  {active.caption && <p className="text-sm opacity-80 mt-1">{active.caption}</p>}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

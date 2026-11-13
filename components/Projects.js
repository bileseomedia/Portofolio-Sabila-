"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function Projects({ data }) {
  const [selected, setSelected] = useState(null);
  const projects = data.projects;

  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div className="absolute left-0 top-40 w-[280px] h-[280px] rounded-full bg-babyblue/40 blur-3xl" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <p className="reveal text-xs tracking-[0.3em] uppercase text-warmgray">04 — Projects</p>
            <h2 className="reveal font-serif text-4xl sm:text-5xl lg:text-6xl mt-4 text-charcoal">
              Selected <span className="italic">Works</span>
            </h2>
          </div>
          <p className="reveal max-w-sm text-sm text-warmgray leading-relaxed">
            Kumpulan project dan dokumentasi — klik untuk melihat detail.
          </p>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 [&>*]:mb-5">
          {projects.map((pj, i) => (
            <motion.button
              key={pj.id}
              onClick={() => setSelected(pj)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: .6, delay: (i % 3) * .06 }}
              className="group block w-full text-left break-inside-avoid rounded-3xl overflow-hidden bg-white border border-charcoal/10 hover:border-charcoal/20 lift"
            >
              <div className={`relative ${i % 3 === 0 ? "aspect-[4/5]" : i % 3 === 1 ? "aspect-square" : "aspect-[4/3]"} bg-gradient-to-br from-lavender/40 via-pastelpink/40 to-butter/40`}>
                {pj.cover ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={pj.cover} alt={pj.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-serif italic text-charcoal/50 text-sm">Cover — /admin</span>
                  </div>
                )}
                <span className="absolute top-3 left-3 text-[10px] uppercase tracking-wider bg-white/85 backdrop-blur rounded-full px-3 py-1 text-charcoal">
                  {pj.category}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-serif text-xl text-charcoal leading-snug">{pj.title}</h3>
                <p className="mt-1.5 text-xs text-warmgray line-clamp-2">{pj.description}</p>
                <span className="mt-3 inline-flex text-[11px] tracking-wider uppercase text-charcoal/70 group-hover:text-charcoal">
                  View details →
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-charcoal/40 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 30, scale: .96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: .97 }}
              transition={{ duration: .4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-warmwhite shadow-2xl"
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white border border-charcoal/10 flex items-center justify-center hover:bg-pastelpink/50 transition"
                aria-label="Close"
              >
                <X size={16} />
              </button>

              <div className="aspect-[16/9] bg-gradient-to-br from-lavender/50 via-pastelpink/50 to-butter/50">
                {selected.cover ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={selected.cover} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-serif italic text-charcoal/50">Cover placeholder</div>
                )}
              </div>

              <div className="p-6 sm:p-9">
                <p className="text-[10px] uppercase tracking-[0.25em] text-warmgray">{selected.category}</p>
                <h3 className="font-serif text-3xl sm:text-4xl text-charcoal mt-2">{selected.title}</h3>

                <div className="mt-6 grid sm:grid-cols-2 gap-5">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-warmgray mb-1">Deskripsi</p>
                    <p className="text-sm text-charcoal/80 leading-relaxed whitespace-pre-line">{selected.description}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-warmgray mb-1">Peran Saya</p>
                    <p className="text-sm text-charcoal/80 leading-relaxed whitespace-pre-line">{selected.role}</p>
                  </div>
                  <div className="sm:col-span-2">
                    <p className="text-[10px] uppercase tracking-wider text-warmgray mb-1">Proses</p>
                    <p className="text-sm text-charcoal/80 leading-relaxed whitespace-pre-line">{selected.process}</p>
                  </div>
                </div>

                {selected.photos?.length > 0 && (
                  <div className="mt-7">
                    <p className="text-[10px] uppercase tracking-wider text-warmgray mb-2">Dokumentasi</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {selected.photos.map((src, k) => (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img key={k} src={src} alt="" className="aspect-square object-cover rounded-xl" />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

"use client";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

const ACCENTS = [
  "from-pastelpink/60 to-peach/40",
  "from-babyblue/60 to-lavender/40",
  "from-butter/60 to-pastelpink/40",
  "from-mint/60 to-babyblue/40",
  "from-lavender/60 to-pastelpink/40",
  "from-peach/60 to-butter/40",
];

export default function Experience({ data }) {
  return (
    <section id="experience" className="relative py-24 sm:py-32">
      <div className="absolute right-10 top-0 w-[260px] h-[260px] rounded-full bg-butter/40 blur-3xl" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <p className="reveal text-xs tracking-[0.3em] uppercase text-warmgray">02 — Experience</p>
            <h2 className="reveal font-serif text-4xl sm:text-5xl lg:text-6xl mt-4 text-charcoal">
              My <span className="italic">Experience</span>
            </h2>
          </div>
          <p className="reveal max-w-sm text-sm text-warmgray leading-relaxed">
            Jejak pengalaman di bidang e-commerce, live commerce, konten, dan media sosial.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.experience.map((exp, i) => (
            <motion.article
              key={exp.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: .6, delay: (i % 3) * .08 }}
              className={`lift group relative rounded-3xl p-6 bg-gradient-to-br ${ACCENTS[i % ACCENTS.length]} border border-white/60 shadow-[0_10px_40px_-24px_rgba(46,43,51,.15)] overflow-hidden`}
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/80 text-charcoal">
                  <Briefcase size={16} />
                </span>
                <span className="text-[10px] uppercase tracking-wider text-charcoal/60">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-5 font-serif text-2xl text-charcoal leading-tight">{exp.title}</h3>
              <p className="mt-1 text-xs text-charcoal/70">{exp.company}</p>
              <p className="text-[11px] text-charcoal/60 mt-0.5">{exp.period}</p>
              <p className="mt-3 text-sm text-charcoal/80 leading-relaxed">{exp.description}</p>

              {exp.photos?.length > 0 && (
                <div className="mt-4 grid grid-cols-3 gap-1.5">
                  {exp.photos.slice(0, 3).map((src, k) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={k}
                      src={src}
                      alt=""
                      className="aspect-square object-cover rounded-lg border border-white/70"
                    />
                  ))}
                </div>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
                                              }

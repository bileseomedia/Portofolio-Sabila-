"use client";
import { motion } from "framer-motion";

export default function Skills({ data }) {
  return (
    <section id="skills" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute right-0 top-20 w-[300px] h-[300px] rounded-full bg-peach/40 blur-3xl" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-12">
          <p className="reveal text-xs tracking-[0.3em] uppercase text-warmgray">05 — Skills</p>
          <h2 className="reveal font-serif text-4xl sm:text-5xl lg:text-6xl mt-4 text-charcoal">
            What I <span className="italic">Can Do</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="reveal">
            <p className="text-sm uppercase tracking-[0.2em] text-warmgray mb-4">Hard Skills</p>
            <div className="flex flex-wrap gap-2">
              {data.skills.hard.map((s, i) => (
                <motion.span
                  key={s}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * .04 }}
                  className="rounded-full bg-gradient-to-br from-babyblue/70 to-lavender/50 border border-white/70 px-4 py-2.5 text-sm text-charcoal"
                >
                  {s}
                </motion.span>
              ))}
            </div>
          </div>

          <div className="reveal">
            <p className="text-sm uppercase tracking-[0.2em] text-warmgray mb-4">Soft Skills</p>
            <div className="flex flex-wrap gap-2">
              {data.skills.soft.map((s, i) => (
                <motion.span
                  key={s}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * .04 }}
                  className="rounded-full bg-gradient-to-br from-pastelpink/70 to-butter/60 border border-white/70 px-4 py-2.5 text-sm text-charcoal"
                >
                  {s}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
    }

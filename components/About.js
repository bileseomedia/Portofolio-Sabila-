"use client";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

export default function About({ data }) {
  const edu = data.education;
  return (
    <section id="about" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute -left-20 top-10 w-[300px] h-[300px] rounded-full bg-mint/50 blur-3xl" />
      <div className="absolute right-0 bottom-10 w-[260px] h-[260px] rounded-full bg-lavender/50 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 grid md:grid-cols-12 gap-12">
        <div className="md:col-span-5">
          <p className="reveal text-xs tracking-[0.3em] uppercase text-warmgray">01 — About</p>
          <h2 className="reveal font-serif text-4xl sm:text-5xl lg:text-6xl mt-4 text-charcoal leading-[1.05]">
            A Little <br /><span className="italic">About</span> Me
          </h2>
          <div className="reveal mt-8 inline-flex items-center gap-3 rounded-2xl bg-white/80 border border-charcoal/10 px-5 py-4">
            <GraduationCap className="text-pastelpink" size={22} />
            <div>
              <p className="text-sm font-medium text-charcoal">{edu.university}</p>
              <p className="text-xs text-warmgray">{edu.degree} · {edu.period}</p>
            </div>
          </div>
        </div>

        <div className="md:col-span-7 space-y-5">
          {data.about.map((t, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: .7, delay: i * .1 }}
              className="text-base sm:text-lg leading-relaxed text-charcoal/80"
            >
              {t}
            </motion.p>
          ))}

          <div className="reveal pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {["Business", "E-Commerce", "Digital Marketing", "Communication", "Content", "Organization"].map((tag) => (
              <span
                key={tag}
                className="text-center text-xs sm:text-sm rounded-full bg-gradient-to-br from-white to-babyblue/40 border border-charcoal/5 px-3 py-2 text-charcoal/80"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
    }

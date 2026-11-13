"use client";
import { motion } from "framer-motion";
import { Blob, Sparkle, Ring } from "./Decorative";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero({ data }) {
  const p = data.profile;

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden">
      <Blob className="w-[520px] h-[520px] -top-40 -left-32 opacity-70" color="#D9EDFA" />
      <Blob className="w-[420px] h-[420px] top-20 -right-24 opacity-60" color="#F9DFE8" delay="2s" />
      <Blob className="w-[340px] h-[340px] bottom-0 left-1/3 opacity-50" color="#E8DFFA" delay="1s" />
      <Sparkle className="top-40 right-1/4 opacity-70" color="#FFF1CC" />
      <Sparkle className="bottom-32 left-10 opacity-60" color="#DDF1E5" />
      <Ring className="w-40 h-40 top-24 left-1/4 opacity-60" color="#FBE5D6" />

      <div className="relative mx-auto max-w-6xl w-full px-4 sm:px-6 grid md:grid-cols-12 gap-10 items-center">
        {/* Left: text */}
        <div className="md:col-span-7">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .7, delay: .1 }}
            className="inline-flex items-center gap-2 rounded-full bg-white/70 border border-charcoal/10 px-4 py-1.5 text-xs tracking-wider uppercase text-warmgray"
          >
            <Sparkles size={12} className="text-pastelpink" />
            Personal Portfolio · 2025
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .9, delay: .2 }}
            className="mt-5 font-serif text-5xl sm:text-6xl lg:text-7xl leading-[1.02] tracking-tight text-charcoal"
          >
            Sabila <br className="hidden sm:block" />
            <span className="italic text-charcoal/80">Alifia</span> Sundawa
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .9, delay: .35 }}
            className="mt-6 text-lg sm:text-xl text-charcoal/80 max-w-xl"
          >
            {p.headline}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: .9, delay: .5 }}
            className="mt-3 text-sm sm:text-base text-warmgray max-w-lg leading-relaxed"
          >
            {p.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .8, delay: .65 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-charcoal text-warmwhite px-6 py-3 text-sm font-medium hover:bg-charcoal/90 transition-all"
            >
              Explore My Work
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-white border border-charcoal/15 px-6 py-3 text-sm font-medium text-charcoal hover:border-charcoal/40 transition-all"
            >
              Let's Connect
            </a>
          </motion.div>
        </div>

        {/* Right: portrait */}
        <motion.div
          initial={{ opacity: 0, scale: .92, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: .3, ease: [0.22, 1, 0.36, 1] }}
          className="md:col-span-5 relative"
        >
          <div className="relative mx-auto w-[280px] sm:w-[340px] md:w-full max-w-[380px] aspect-[4/5]">
            <div className="absolute inset-0 rounded-[42%_58%_46%_54%/54%_46%_54%_46%] bg-gradient-to-br from-pastelpink via-lavender to-babyblue blur-[1px]" />
            <div className="absolute inset-2 rounded-[42%_58%_46%_54%/54%_46%_54%_46%] overflow-hidden bg-white shadow-[0_30px_80px_-40px_rgba(46,43,51,.35)]">
              {p.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.photo} alt={p.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-butter/60 to-peach/60">
                  <div className="text-center px-6">
                    <p className="font-serif italic text-2xl text-charcoal/70">Your photo</p>
                    <p className="text-xs text-warmgray mt-2">Upload di /admin</p>
                  </div>
                </div>
              )}
            </div>
            {/* floating badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: .8 }}
              className="absolute -bottom-4 -left-4 bg-warmwhite rounded-2xl px-4 py-3 shadow-lg border border-charcoal/5"
            >
              <p className="text-[10px] uppercase tracking-wider text-warmgray">Study</p>
              <p className="text-sm font-medium text-charcoal">S1 Manajemen</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.15, duration: .8 }}
              className="absolute -top-3 -right-3 bg-white rounded-full px-3 py-1.5 shadow-md border border-charcoal/5 text-xs text-charcoal animate-float"
            >
              ✦ Pradita University
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* scroll cue */}
      <div className="absolute bottom-6 inset-x-0 flex justify-center">
        <span className="text-[10px] tracking-[0.3em] uppercase text-warmgray/70">scroll</span>
      </div>
    </section>
  );
              }

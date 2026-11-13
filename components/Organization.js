"use client";
import { motion } from "framer-motion";
import { Users, Crown, Quote } from "lucide-react";

export default function Organization({ data }) {
  const lead = data.leadership;
  return (
    <section id="organization" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[600px] h-[600px] rounded-full bg-lavender/30 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center mb-14">
          <p className="reveal text-xs tracking-[0.3em] uppercase text-warmgray">03 — Beyond</p>
          <h2 className="reveal font-serif text-4xl sm:text-5xl lg:text-6xl mt-4 text-charcoal">
            Beyond the <span className="italic">Classroom</span>
          </h2>
        </div>

        {/* Organization card */}
        {data.organization.map((org) => (
          <motion.div
            key={org.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .7 }}
            className="rounded-[28px] bg-white/80 border border-charcoal/10 p-7 sm:p-10 shadow-[0_20px_60px_-40px_rgba(46,43,51,.25)] mb-8"
          >
            <div className="flex items-start gap-4">
              <span className="shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-mint text-charcoal">
                <Users size={20} />
              </span>
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl text-charcoal">{org.title}</h3>
                <p className="text-sm text-warmgray mt-1">{org.role}</p>
                <p className="mt-4 text-charcoal/80 leading-relaxed">{org.description}</p>
              </div>
            </div>
            {org.photos?.length > 0 && (
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2">
                {org.photos.map((src, k) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={k} src={src} alt="" className="aspect-[4/3] object-cover rounded-xl" />
                ))}
              </div>
            )}
          </motion.div>
        ))}

        {/* Leadership highlight */}
        <motion.div
          initial={{ opacity: 0, scale: .96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: .8 }}
          className="relative rounded-[32px] overflow-hidden bg-gradient-to-br from-butter via-pastelpink/70 to-lavender/70 p-1"
        >
          <div className="rounded-[28px] bg-warmwhite/90 backdrop-blur p-7 sm:p-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white text-charcoal shadow-sm">
                <Crown size={20} className="text-pastelpink" />
              </span>
              <p className="text-xs tracking-[0.25em] uppercase text-warmgray">Leadership Highlight</p>
            </div>
            <h3 className="font-serif text-3xl sm:text-4xl text-charcoal leading-tight">
              {lead.title}
            </h3>
            <div className="mt-5 flex items-start gap-3 bg-white/70 rounded-2xl p-4 border border-charcoal/5">
              <Quote size={20} className="text-lavender shrink-0 mt-0.5" />
              <p className="font-serif italic text-lg text-charcoal/85">"{lead.theme}"</p>
            </div>
            <p className="mt-5 text-charcoal/80 leading-relaxed">{lead.description}</p>

            {lead.photos?.length > 0 && (
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2">
                {lead.photos.map((src, k) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={k} src={src} alt="" className="aspect-[4/3] object-cover rounded-xl" />
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
    }

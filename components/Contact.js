"use client";
import { Mail, Instagram, Linkedin, Whatsaps, MapPin } from "lucide-react";

export default function Contact({ data }) {
  const c = data.contact;
  return (
    <section id="contact" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[500px] h-[500px] rounded-full bg-mint/40 blur-3xl" />
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 text-center">
        <p className="reveal text-xs tracking-[0.3em] uppercase text-warmgray">07 — Contact</p>
        <h2 className="reveal font-serif text-5xl sm:text-6xl lg:text-7xl mt-4 text-charcoal leading-[1.05]">
          Let's <span className="italic">Connect</span>
        </h2>
        <p className="reveal mt-5 text-charcoal/70 max-w-md mx-auto">
          Terbuka untuk kolaborasi, project, atau sekadar bertukar ide.
        </p>

        <div className="reveal mt-10 flex flex-wrap justify-center gap-3">
          {c.email && (
            <a href={`mailto:${c.email}`} className="inline-flex items-center gap-2 rounded-full bg-charcoal text-warmwhite px-5 py-3 text-sm hover:bg-charcoal/90 transition">
              <Mail size={16} /> {c.email}
            </a>
          )}
          {c.instagram && (
            <a href={c.instagram} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white border border-charcoal/15 px-5 py-3 text-sm hover:border-charcoal/40 transition">
              <Instagram size={16} /> Instagram
            </a>
          )}
          {c.linkedin && (
            <a href={c.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white border border-charcoal/15 px-5 py-3 text-sm hover:border-charcoal/40 transition">
              <Linkedin size={16} /> LinkedIn
            </a>
          )}
          {c.whatsapp && ( 
            <a href={c.whatsapp} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white border border-charcoal/15 px-5 py-3 text-sm hover:border-charcoal/40 transition">
              <Whatsapp size={16} /> Whatsapp
            </a>
          )}
        </div>

        {c.location && (
          <p className="reveal mt-8 inline-flex items-center gap-1.5 text-xs text-warmgray">
            <MapPin size={12} /> {c.location}
          </p>
        )}
      </div>
    </section>
  );
    }

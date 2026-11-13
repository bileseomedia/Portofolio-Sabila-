"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Organization from "@/components/Organization";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollAnimator from "@/components/ScrollAnimator";
import { loadData } from "@/lib/storage";
import { DEFAULT_DATA } from "@/lib/data";

export default function Home() {
  const [data, setData] = useState(DEFAULT_DATA);

  useEffect(() => {
    const refresh = () => setData(loadData());
    refresh();
    window.addEventListener("portfolio-updated", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("portfolio-updated", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  return (
    <main className="relative">
      <ScrollAnimator />
      <Navbar />
      <Hero data={data} />
      <About data={data} />
      <Experience data={data} />
      <Organization data={data} />
      <Projects data={data} />
      <Skills data={data} />
      <Gallery data={data} />
      <Contact data={data} />
      <Footer />
    </main>
  );
    }

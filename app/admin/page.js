"use client";
import { useEffect, useState, useRef } from "react";
import { loadData, saveData, fileToDataUrl, uid, resetData } from "@/lib/storage";
import { DEFAULT_DATA } from "@/lib/data";
import {
  Lock, LogOut, Save, Upload, Trash2, Plus, ChevronUp, ChevronDown,
  RotateCcw, ImagePlus, User, Briefcase, FolderKanban, Users, Award,
} from "lucide-react";

const ADMIN_PASSWORD = "sabila2025";
const TABS = [
  { id: "profile", label: "Profile", icon: User },
  { id: "education", label: "Education", icon: Award },
  { id: "about", label: "About Text", icon: User },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "organization", label: "Organization", icon: Users },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "gallery", label: "Gallery", icon: ImagePlus },
  { id: "contact", label: "Contact", icon: User },
];

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [tab, setTab] = useState("profile");
  const [data, setData] = useState(DEFAULT_DATA);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setData(loadData());
    if (sessionStorage.getItem("admin_authed") === "1") setAuthed(true);
  }, []);

  const login = (e) => {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) {
      sessionStorage.setItem("admin_authed", "1");
      setAuthed(true);
    } else {
      alert("Password salah");
    }
  };

  const persist = (next) => {
    setData(next);
    saveData(next);
    setSaved(true);
    setTimeout(() => setSaved(false), 1200);
  };

  const update = (patch) => persist({ ...data, ...patch });

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pastelpink/40 via-warmwhite to-lavender/40 p-4">
        <form onSubmit={login} className="w-full max-w-sm bg-white rounded-3xl p-8 shadow-xl border border-charcoal/5">
          <div className="w-12 h-12 rounded-2xl bg-lavender flex items-center justify-center mb-4">
            <Lock size={20} />
          </div>
          <h1 className="font-serif text-3xl text-charcoal">Admin Login</h1>
          <p className="text-xs text-warmgray mt-1">Kelola konten portfolio kamu</p>
          <input
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            placeholder="Password"
            className="mt-6 w-full rounded-xl border border-charcoal/15 px-4 py-3 text-sm focus:outline-none focus:border-charcoal/40"
          />
          <button className="mt-3 w-full rounded-xl bg-charcoal text-warmwhite py-3 text-sm font-medium hover:bg-charcoal/90 transition">
            Masuk
          </button>
          <p className="mt-4 text-[11px] text-warmgray">Default password: <code className="bg-butter/50 px-1.5 py-0.5 rounded">sabila2025</code></p>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warmwhite">
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-charcoal/10">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-serif text-lg text-charcoal">Admin · Sabila</span>
            {saved && <span className="text-[11px] bg-mint px-2 py-0.5 rounded-full">Saved ✓</span>}
          </div>
          <div className="flex items-center gap-2">
            <a href="/" target="_blank" className="text-xs px-3 py-1.5 rounded-full bg-white border border-charcoal/15 hover:border-charcoal/40 transition">View site</a>
            <button onClick={() => { sessionStorage.removeItem("admin_authed"); setAuthed(false); }} className="text-xs inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-pastelpink/60 hover:bg-pastelpink transition">
              <LogOut size={12} /> Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6 grid lg:grid-cols-[220px_1fr] gap-6">
        <aside className="lg:sticky lg:top-20 self-start">
          <nav className="grid gap-1">
            {TABS.map((t) => {
              const Icon = t.icon;
              return (
                <button key={t.id} onClick={() => setTab(t.id)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm text-left transition ${
                    tab === t.id ? "bg-charcoal text-warmwhite" : "hover:bg-lavender/40 text-charcoal/80"
                  }`}>
                  <Icon size={14} /> {t.label}
                </button>
              );
            })}
          </nav>
          <button onClick={() => { if(confirm("Reset semua data ke default? Aksi ini tidak bisa dibatalkan.")){ resetData(); setData(loadData()); } }}
            className="mt-6 w-full inline-flex items-center justify-center gap-1 px-3 py-2 rounded-xl text-xs bg-peach/50 hover:bg-peach transition">
            <RotateCcw size={12} /> Reset to default
          </button>
        </aside>

        <main className="bg-white rounded-3xl border border-charcoal/10 p-5 sm:p-7">
          {tab === "profile" && <ProfileTab data={data} update={update} />}
          {tab === "education" && <EducationTab data={data} update={update} />}
          {tab === "about" && <AboutTab data={data} update={update} />}
          {tab === "experience" && <ExperienceTab data={data} update={update} />}
          {tab === "organization" && <OrganizationTab data={data} update={update} />}
          {tab === "projects" && <ProjectsTab data={data} update={update} />}
          {tab === "gallery" && <GalleryTab data={data} update={update} />}
          {tab === "contact" && <ContactTab data={data} update={update} />}
        </main>
      </div>
    </div>
  );
}

/* ---------- Helpers ---------- */

function Field({ label, value, onChange, textarea, type = "text" }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-wider text-warmgray">{label}</span>
      {textarea ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={4}
          className="mt-1 w-full rounded-xl border border-charcoal/15 px-3 py-2 text-sm focus:outline-none focus:border-charcoal/40" />
      ) : (
        <input type={type} value={value} onChange={(e) => onChange(e.target.value)}
          className="mt-1 w-full rounded-xl border border-charcoal/15 px-3 py-2 text-sm focus:outline-none focus:border-charcoal/40" />
      )}
    </label>
  );
}

function FileButton({ onFiles, multiple, accept = "image/*", label = "Upload", icon: Icon = Upload }) {
  const ref = useRef();
  return (
    <>
      <button type="button" onClick={() => ref.current?.click()}
        className="inline-flex items-center gap-1.5 text-xs px-3 py-2 rounded-xl bg-lavender/60 hover:bg-lavender transition">
        <Icon size={14} /> {label}
      </button>
      <input ref={ref} type="file" accept={accept} multiple={multiple} hidden
        onChange={async (e) => {
          const files = Array.from(e.target.files || []);
          if (!files.length) return;
          const urls = await Promise.all(files.map(fileToDataUrl));
          onFiles(urls);
          e.target.value = "";
        }} />
    </>
  );
}

/* ---------- Tabs ---------- */

function ProfileTab({ data, update }) {
  const p = data.profile;
  const set = (k) => (v) => update({ profile: { ...p, [k]: v } });
  return (
    <div className="space-y-4">
      <h2 className="font-serif text-2xl">Profile</h2>
      <div className="flex items-center gap-4">
        <div className="w-24 h-24 rounded-2xl overflow-hidden bg-pastelpink/40 flex items-center justify-center">
          {p.photo ? <img src={p.photo} alt="" className="w-full h-full object-cover" /> : <User size={24} className="text-warmgray" />}
        </div>
        <div className="flex flex-col gap-2">
          <FileButton onFiles={([url]) => set("photo")(url)} label="Upload photo" />
          {p.photo && <button onClick={() => set("photo")("")} className="text-xs text-red-500 inline-flex items-center gap-1"><Trash2 size={12} /> Hapus</button>}
        </div>
      </div>
      <Field label="Nama" value={p.name} onChange={set("name")} />
      <Field label="Headline" value={p.headline} onChange={set("headline")} />
      <Field label="Tagline" value={p.tagline} onChange={set("tagline")} textarea />
    </div>
  );
}

function EducationTab({ data, update }) {
  const e = data.education;
  const set = (k) => (v) => update({ education: { ...e, [k]: v } });
  return (
    <div className="space-y-4">
      <h2 className="font-serif text-2xl">Education</h2>
      <Field label="University" value={e.university} onChange={set("university")} />
      <Field label="Degree" value={e.degree} onChange={set("degree")} />
      <Field label="Period" value={e.period} onChange={set("period")} />
    </div>
  );
}

function AboutTab({ data, update }) {
  const set = (i) => (v) => {
    const arr = [...data.about]; arr[i] = v; update({ about: arr });
  };
  return (
    <div className="space-y-4">
      <h2 className="font-serif text-2xl">About Text</h2>
      {data.about.map((t, i) => <Field key={i} label={`Paragraf ${i + 1}`} value={t} onChange={set(i)} textarea />)}
      <div className="flex gap-2">
        <button onClick={() => update({ about: [...data.about, ""] })} className="text-xs inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-mint/60"><Plus size={12} /> Tambah paragraf</button>
        {data.about.length > 1 && <button onClick={() => update({ about: data.about.slice(0, -1) })} className="text-xs inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-pastelpink/60"><Trash2 size={12} /> Hapus terakhir</button>}
      </div>
    </div>
  );
}

function ExperienceTab({ data, update }) {
  const list = data.experience;
  const edit = (id, patch) => update({ experience: list.map((x) => x.id === id ? { ...x, ...patch } : x) });
  const del = (id) => { if (confirm("Hapus pengalaman ini?")) update({ experience: list.filter((x) => x.id !== id) }); };
  const add = () => update({
    experience: [...list, { id: uid(), title: "Pengalaman Baru", company: "", period: "", description: "", photos: [] }]
  });
  const move = (id, dir) => {
    const i = list.findIndex((x) => x.id === id);
    const j = i + dir;
    if (j < 0 || j >= list.length) return;
    const arr = [...list]; [arr[i], arr[j]] = [arr[j], arr[i]];
    update({ experience: arr });
  };
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-2xl">Experience ({list.length})</h2>
        <button onClick={add} className="text-xs inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-charcoal text-warmwhite"><Plus size={12} /> Tambah</button>
      </div>
      {list.map((x) => (
        <div key={x.id} className="rounded-2xl border border-charcoal/10 p-4 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-warmgray truncate">{x.title || "(untitled)"}</span>
            <div className="flex items-center gap-1">
              <button onClick={() => move(x.id, -1)} className="p-1 hover:bg-lavender/50 rounded"><ChevronUp size={14} /></button>
              <button onClick={() => move(x.id, 1)} className="p-1 hover:bg-lavender/50 rounded"><ChevronDown size={14} /></button>
              <button onClick={() => del(x.id)} className="p-1 hover:bg-red-50 text-red-500 rounded"><Trash2 size={14} /></button>
            </div>
          </div>
          <Field label="Title" value={x.title} onChange={(v) => edit(x.id, { title: v })} />
          <div className="grid sm:grid-cols-2 gap-2">
            <Field label="Company" value={x.company} onChange={(v) => edit(x.id, { company: v })} />
            <Field label="Period" value={x.period} onChange={(v) => edit(x.id, { period: v })} />
          </div>
          <Field label="Description" value={x.description} onChange={(v) => edit(x.id, { description: v })} textarea />
          <PhotoStrip photos={x.photos} onChange={(photos) => edit(x.id, { photos })} />
        </div>
      ))}
    </div>
  );
}

function OrganizationTab({ data, update }) {
  const list = data.organization;
  const lead = data.leadership;
  const edit = (id, patch) => update({ organization: list.map((x) => x.id === id ? { ...x, ...patch } : x) });
  const del = (id) => { if (confirm("Hapus organisasi ini?")) update({ organization: list.filter((x) => x.id !== id) }); };
  const add = () => update({ organization: [...list, { id: uid(), title: "Organisasi Baru", role: "", description: "", photos: [] }] });
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-2xl">Organization</h2>
        <button onClick={add} className="text-xs inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-charcoal text-warmwhite"><Plus size={12} /> Tambah</button>
      </div>
      {list.map((x) => (
        <div key={x.id} className="rounded-2xl border border-charcoal/10 p-4 space-y-2">
          <div className="flex justify-end"><button onClick={() => del(x.id)} className="p-1 hover:bg-red-50 text-red-500 rounded"><Trash2 size={14} /></button></div>
          <Field label="Nama Organisasi" value={x.title} onChange={(v) => edit(x.id, { title: v })} />
          <Field label="Role / Divisi" value={x.role} onChange={(v) => edit(x.id, { role: v })} />
          <Field label="Deskripsi" value={x.description} onChange={(v) => edit(x.id, { description: v })} textarea />
          <PhotoStrip photos={x.photos} onChange={(photos) => edit(x.id, { photos })} />
        </div>
      ))}

      <div className="rounded-2xl border border-charcoal/10 p-4 space-y-2 bg-butter/20">
        <h3 className="font-serif text-lg">Leadership Highlight</h3>
        <Field label="Title" value={lead.title} onChange={(v) => update({ leadership: { ...lead, title: v } })} />
        <Field label="Theme" value={lead.theme} onChange={(v) => update({ leadership: { ...lead, theme: v } })} />
        <Field label="Description" value={lead.description} onChange={(v) => update({ leadership: { ...lead, description: v } })} textarea />
        <PhotoStrip photos={lead.photos} onChange={(photos) => update({ leadership: { ...lead, photos } })} />
      </div>
    </div>
  );
}

function ProjectsTab({ data, update }) {
  const list = data.projects;
  const edit = (id, patch) => update({ projects: list.map((x) => x.id === id ? { ...x, ...patch } : x) });
  const del = (id) => { if (confirm("Hapus project ini?")) update({ projects: list.filter((x) => x.id !== id) }); };
  const add = () => update({ projects: [{ id: uid(), title: "Project Baru", category: "Content Creation", cover: "", description: "", role: "", process: "", photos: [] }, ...list] });
  const move = (id, dir) => {
    const i = list.findIndex((x) => x.id === id); const j = i + dir;
    if (j < 0 || j >= list.length) return;
    const arr = [...list]; [arr[i], arr[j]] = [arr[j], arr[i]]; update({ projects: arr });
  };
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-2xl">Projects ({list.length})</h2>
        <button onClick={add} className="text-xs inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-charcoal text-warmwhite"><Plus size={12} /> Tambah</button>
      </div>
      {list.map((x) => (
        <div key={x.id} className="rounded-2xl border border-charcoal/10 p-4 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-warmgray truncate">{x.title || "(untitled)"}</span>
            <div className="flex items-center gap-1">
              <button onClick={() => move(x.id, -1)} className="p-1 hover:bg-lavender/50 rounded"><ChevronUp size={14} /></button>
              <button onClick={() => move(x.id, 1)} className="p-1 hover:bg-lavender/50 rounded"><ChevronDown size={14} /></button>
              <button onClick={() => del(x.id)} className="p-1 hover:bg-red-50 text-red-500 rounded"><Trash2 size={14} /></button>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-20 h-20 rounded-xl overflow-hidden bg-lavender/40 flex items-center justify-center">
              {x.cover ? <img src={x.cover} alt="" className="w-full h-full object-cover" /> : <ImagePlus size={20} className="text-warmgray" />}
            </div>
            <div className="flex flex-col gap-2">
              <FileButton onFiles={([url]) => edit(x.id, { cover: url })} label="Cover" />
              {x.cover && <button onClick={() => edit(x.id, { cover: "" })} className="text-xs text-red-500 inline-flex items-center gap-1"><Trash2 size={12} /> Hapus cover</button>}
            </div>
          </div>
          <Field label="Title" value={x.title} onChange={(v) => edit(x.id, { title: v })} />
          <Field label="Category" value={x.category} onChange={(v) => edit(x.id, { category: v })} />
          <Field label="Deskripsi" value={x.description} onChange={(v) => edit(x.id, { description: v })} textarea />
          <Field label="Peran Saya" value={x.role} onChange={(v) => edit(x.id, { role: v })} textarea />
          <Field label="Proses" value={x.process} onChange={(v) => edit(x.id, { process: v })} textarea />
          <PhotoStrip photos={x.photos} onChange={(photos) => edit(x.id, { photos })} />
        </div>
      ))}
    </div>
  );
}

function GalleryTab({ data, update }) {
  const items = data.gallery || [];
  const add = (urls, type = "image") => {
    const next = [
      ...items,
      ...urls.map((src) => ({ id: uid(), src, type, title: "", caption: "" })),
    ];
    update({ gallery: next });
  };
  const edit = (id, patch) => update({ gallery: items.map((x) => x.id === id ? { ...x, ...patch } : x) });
  const del = (id) => { if (confirm("Hapus dari galeri?")) update({ gallery: items.filter((x) => x.id !== id) }); };
  const move = (id, dir) => {
    const i = items.findIndex((x) => x.id === id); const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const arr = [...items]; [arr[i], arr[j]] = [arr[j], arr[i]]; update({ gallery: arr });
  };
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h2 className="font-serif text-2xl">Gallery ({items.length})</h2>
        <div className="flex gap-2">
          <FileButton multiple onFiles={(urls) => add(urls, "image")} label="Upload foto" icon={ImagePlus} />
          <FileButton multiple accept="video/*" onFiles={(urls) => add(urls, "video")} label="Upload video" />
        </div>
      </div>
      <p className="text-xs text-warmgray">Bisa pilih banyak file sekaligus. Urutan bisa diatur naik/turun.</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {items.map((it) => (
          <div key={it.id} className="rounded-2xl border border-charcoal/10 overflow-hidden">
            <div className="aspect-square bg-pastelpink/20">
              {it.type === "video" ? (
                <video src={it.src} className="w-full h-full object-cover" muted />
              ) : (
                <img src={it.src} alt="" className="w-full h-full object-cover" />
              )}
            </div>
            <div className="p-2 space-y-1">
              <input value={it.title} onChange={(e) => edit(it.id, { title: e.target.value })} placeholder="Judul"
                className="w-full text-xs rounded-lg border border-charcoal/10 px-2 py-1.5 focus:outline-none" />
              <input value={it.caption} onChange={(e) => edit(it.id, { caption: e.target.value })} placeholder="Caption"
                className="w-full text-xs rounded-lg border border-charcoal/10 px-2 py-1.5 focus:outlin

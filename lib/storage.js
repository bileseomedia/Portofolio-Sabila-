"use client";
import { DEFAULT_DATA } from "./data";

const KEY = "sabila_portfolio_v1";

export function loadData() {
  if (typeof window === "undefined") return DEFAULT_DATA;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return structuredClone(DEFAULT_DATA);
    const parsed = JSON.parse(raw);
    // deep-merge default to ensure new fields exist
    return deepMerge(structuredClone(DEFAULT_DATA), parsed);
  } catch {
    return structuredClone(DEFAULT_DATA);
  }
}

export function saveData(data) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(data));
  window.dispatchEvent(new Event("portfolio-updated"));
}

export function resetData() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
  window.dispatchEvent(new Event("portfolio-updated"));
}

export function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function deepMerge(target, source) {
  if (Array.isArray(source)) return source;
  if (typeof source !== "object" || source === null) return source ?? target;
  const out = { ...target };
  for (const k of Object.keys(source)) {
    out[k] =
      typeof source[k] === "object" && source[k] !== null && !Array.isArray(source[k])
        ? deepMerge(target?.[k] ?? {}, source[k])
        : source[k];
  }
  return out;
}

export function uid() {
  return Math.random().toString(36).slice(2, 10);
}

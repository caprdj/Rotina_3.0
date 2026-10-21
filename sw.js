// sw.js – Service Worker unificado e leve para Vida Fibro 3.0
const CACHE_NAME = "vida-fibro-v3.0";

const OFFLINE_URLS = [
  "./",
  "./index.html",
  "./style.css",
  "./dados.js",
  "./app.js",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await Promise.allSettled(
      OFFLINE_URLS.map((url) => cache.add(new Request(url, { cache: "reload" })))
    );
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)));
    await self.clients.claim();
  })());
});

// Escuta comando SKIP_WAITING vindo do botão Atualizar
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // Stale-While-Revalidate / Network-First tolerante para ter sempre versão fresca quando online
  event.respondWith((async () => {
    try {
      const fresh = await fetch(req);
      const cache = await caches.open(CACHE_NAME);
      cache.put(req, fresh.clone());
      return fresh;
    } catch {
      const cached = await caches.match(req);
      if (cached) return cached;
      const cachedPath = await caches.match(url.pathname);
      if (cachedPath) return cachedPath;
      return (await caches.match("./index.html")) || Response.error();
    }
  })());
});

const CACHE = "journix-v1";
const FILES = [
  "/",
  "/index.html",
  "/style.css",
  "/index.js",
  "/manifest.json",
  "/images/darkMode.svg",
  "/images/menuLight.svg",
  "/images/menuDark.svg",
  "/images/addNoteLight.svg",
  "/images/addNoteDark.svg",
  "/images/searchLight.svg",
  "/images/searchDark.svg",
  "/images/dropDownLight.svg",
  "/images/dropDownDark.svg",
  "/images/daySelectionLight.svg",
  "/images/daySelectionDark.svg",
  "/images/categoryIconLight.svg",
  "/images/categoryIconDark.svg",
  "/images/emptyNoteLight.svg",
  "/images/emptyNoteDark.svg",
  "/images/editNoteLight.svg",
  "/images/editNoteDark.svg",
  "/images/deleteLight.svg",
  "/images/deleteDark.svg",
  "/images/lightMode.svg",
  "/images/favicon.png"
];

// install → cache all files
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(FILES))
  );
});

// fetch → serve from cache, fallback to network
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});
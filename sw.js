const CACHE = "journix-v1";
const FILES = [
  "/journix/",
  "/journix/index.html",
  "/journix/style.css",
  "/journix/index.js",
  "/journix/manifest.json",
  "/journix/svgs/darkMode.svg",
  "/journix/svgs/menuLight.svg",
  "/journix/svgs/menuDark.svg",
  "/journix/svgs/addNoteLight.svg",
  "/journix/svgs/addNoteDark.svg",
  "/journix/svgs/searchLight.svg",
  "/journix/svgs/searchDark.svg",
  "/journix/svgs/dropDownLight.svg",
  "/journix/svgs/dropDownDark.svg",
  "/journix/svgs/daySelectionLight.svg",
  "/journix/svgs/daySelectionDark.svg",
  "/journix/svgs/categoryIconLight.svg",
  "/journix/svgs/categoryIconDark.svg",
  "/journix/svgs/emptyNoteLight.svg",
  "/journix/svgs/emptyNoteDark.svg",
  "/journix/svgs/editNoteLight.svg",
  "/journix/svgs/editNoteDark.svg",
  "/journix/svgs/deleteLight.svg",
  "/journix/svgs/deleteDark.svg",
  "/journix/svgs/lightMode.svg",
  "/journix/svgs/favicon.png"
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
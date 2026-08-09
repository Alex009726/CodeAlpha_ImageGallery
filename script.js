// ----- Data -----
const images = [
  { id: 1013, title: "Ridgeline",        category: "nature" },
  { id: 1015, title: "River Bend",       category: "nature" },
  { id: 1039, title: "Alpine Morning",   category: "nature" },
  { id: 1041, title: "Backroad",         category: "nature" },
  { id: 1011, title: "Concrete Grid",    category: "urban" },
  { id: 1027, title: "Night Market",     category: "urban" },
  { id: 1035, title: "Crosswalk",        category: "urban" },
  { id: 1062, title: "Skyline Study",    category: "urban" },
  { id: 1005, title: "Quiet Gaze",       category: "portrait" },
  { id: 1027, title: "Golden Hour",      category: "portrait" },
  { id: 1025, title: "Unposed",          category: "portrait" },
  { id: 1074, title: "Cathedral Line",   category: "architecture" },
  { id: 1076, title: "Spiral Stair",     category: "architecture" },
  { id: 1080, title: "Glass Facade",     category: "architecture" },
];

const gallery   = document.getElementById('gallery');
const filters   = document.getElementById('filters');
const lightbox  = document.getElementById('lightbox');
const lbImage   = document.getElementById('lbImage');
const lbTitle   = document.getElementById('lbTitle');
const lbIndex   = document.getElementById('lbIndex');
const lbClose   = document.getElementById('lbClose');
const lbPrev    = document.getElementById('lbPrev');
const lbNext    = document.getElementById('lbNext');

let activeSet = images;
let currentIndex = 0;

function imgUrl(id, w, h){
  return `https://picsum.photos/id/${id}/${w}/${h}`;
}

function renderGallery(list){
  gallery.innerHTML = '';
  list.forEach((item, i) => {
    const frame = document.createElement('article');
    frame.className = 'frame';
    frame.style.animationDelay = `${i * 0.05}s`;
    frame.innerHTML = `
      <div class="thumb-wrap">
        <img src="${imgUrl(item.id, 500, 380)}" alt="${item.title}" loading="lazy">
      </div>
      <div class="plate">
        <span class="plate-title">${item.title}</span>
        <span class="plate-cat">${item.category}</span>
      </div>
    `;
    frame.addEventListener('click', () => openLightbox(i));
    gallery.appendChild(frame);
  });
}

function openLightbox(index){
  currentIndex = index;
  updateLightbox();
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox(){
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

function updateLightbox(){
  const item = activeSet[currentIndex];
  lbImage.src = imgUrl(item.id, 1000, 720);
  lbImage.alt = item.title;
  lbTitle.textContent = item.title;
  lbIndex.textContent = `${currentIndex + 1} / ${activeSet.length}`;
}

function showNext(){
  currentIndex = (currentIndex + 1) % activeSet.length;
  updateLightbox();
}

function showPrev(){
  currentIndex = (currentIndex - 1 + activeSet.length) % activeSet.length;
  updateLightbox();
}

// Filters
filters.addEventListener('click', (e) => {
  const btn = e.target.closest('.filter-btn');
  if (!btn) return;
  filters.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  const category = btn.dataset.category;
  activeSet = category === 'all' ? images : images.filter(img => img.category === category);
  renderGallery(activeSet);
});

// Lightbox controls
lbClose.addEventListener('click', closeLightbox);
lbNext.addEventListener('click', showNext);
lbPrev.addEventListener('click', showPrev);
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

// Keyboard support
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') showNext();
  if (e.key === 'ArrowLeft') showPrev();
});

// Init
renderGallery(images);

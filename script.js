(() => {
  const gallery = document.getElementById('gallery');
  const empty = document.getElementById('empty');
  const error = document.getElementById('error');
  const count = document.getElementById('photo-count');
  const lightbox = document.getElementById('lightbox');
  const fullImage = document.getElementById('full-image');
  const fullName = document.getElementById('full-name');
  const downloadFull = document.getElementById('download-full');

  if (!Array.isArray(window.PHOTOS)) { error.hidden = false; return; }
  const photos = window.PHOTOS;
  count.textContent = `${photos.length} PHOTOS`;
  if (!photos.length) { empty.hidden = false; return; }

  let current = 0;

  // A plain same-origin anchor with the download attribute is the most reliable
  // option on GitHub Pages. Do not intercept its click with fetch/preventDefault.
  function makeDownloadLink(photo, label) {
    const link = document.createElement('a');
    link.className = 'download-button';
    link.href = photo.src;
    link.setAttribute('download', photo.name);
    link.textContent = label;
    link.addEventListener('click', () => {
      // Keep the browser's native download action; no preventDefault().
    });
    return link;
  }

  photos.forEach((photo, index) => {
    const card = document.createElement('article');
    card.className = 'photo-card';
    const open = document.createElement('button');
    open.className = 'photo-open';
    open.type = 'button';
    open.setAttribute('aria-label', `Открыть ${photo.name}`);
    const img = document.createElement('img');
    img.src = photo.src;
    img.alt = photo.name;
    img.loading = 'lazy';
    open.append(img);
    open.addEventListener('click', () => openPhoto(index));

    const bottom = document.createElement('div');
    bottom.className = 'card-bottom';
    const name = document.createElement('span');
    name.className = 'photo-name';
    name.textContent = photo.name;
    const download = makeDownloadLink(photo, '↓ Скачать');
    bottom.append(name, download);
    card.append(open, bottom);
    gallery.append(card);
  });

  function openPhoto(index) {
    current = (index + photos.length) % photos.length;
    const photo = photos[current];
    fullImage.src = photo.src;
    fullImage.alt = photo.name;
    fullName.textContent = photo.name;
    downloadFull.href = photo.src;
    downloadFull.setAttribute('download', photo.name);
    downloadFull.textContent = '↓ Скачать оригинал';
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closePhoto() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    fullImage.src = '';
    document.body.style.overflow = '';
  }
  document.getElementById('close').addEventListener('click', closePhoto);
  document.getElementById('prev').addEventListener('click', () => openPhoto(current - 1));
  document.getElementById('next').addEventListener('click', () => openPhoto(current + 1));
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closePhoto(); });
  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closePhoto();
    if (e.key === 'ArrowLeft') openPhoto(current - 1);
    if (e.key === 'ArrowRight') openPhoto(current + 1);
  });
})();
from pathlib import Path
import json
from urllib.parse import quote

BASE = Path(__file__).resolve().parent
PHOTO_DIR = BASE / "verloren_img"
ALLOWED = {".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"}
photos = []
for path in PHOTO_DIR.iterdir():
    if path.is_file() and path.suffix.lower() in ALLOWED:
        photos.append({"name": path.name, "src": "verloren_img/" + quote(path.name)})
photos.sort(key=lambda item: (PHOTO_DIR / item["name"]).stat().st_mtime, reverse=True)
(BASE / "photos.js").write_text(
    "window.PHOTOS = " + json.dumps(photos, ensure_ascii=False, indent=2) + ";\n",
    encoding="utf-8"
)
print(f"Готово: найдено фотографий — {len(photos)}")

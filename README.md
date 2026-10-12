# Katalog Demo Undangan Pernikahan

Satu repo berisi halaman katalog + 6 demo undangan digital full, siap di-host di GitHub Pages.

## Struktur

```
undangan-demo/
├── index.html            # halaman katalog (pilih desain)
├── assets/               # gambar preview tiap tema
├── floral/index.html     # demo tema Floral Elegan
├── islami/index.html     # demo tema Islami
├── jawa/index.html       # demo tema Adat Jawa
├── minimalis/index.html  # demo tema Modern Minimalis
├── rustic/index.html     # demo tema Rustic
└── luxury/index.html      # demo tema Luxury Gold
```

## Cara pasang ke GitHub Pages

1. Buat repo baru di GitHub (mis. `undangan-demo`), push seluruh isi folder ini ke branch `main`.
2. Buka repo → **Settings → Pages** → Source: **Deploy from a branch** → Branch: `main`, folder `/ (root)` → Save.
3. Tunggu 1-2 menit. Katalog bisa dibuka di `https://USERNAME.github.io/undangan-demo/`

## Fitur tiap demo

- Sampul dengan **nama tamu otomatis dari link**: `.../floral/?to=NamaTamu`
- Profil mempelai, hitung mundur (21 Desember 2026), detail akad & resepsi + tombol Google Maps
- Galeri, amplop digital (tombol salin nomor rekening), form RSVP via WhatsApp
- Animasi ringan per tema (canvas/CSS, mobile-friendly)

## Yang wajib diganti sebelum dipakai klien

1. Data dummy (nama mempelai, tanggal, venue, nomor rekening) di tiap `index.html`
2. Konstanta `CONFIG_WA` di tiap `index.html` — ganti `"6281234567890"` dengan nomor WhatsApp mempelai
3. Foto/galeri placeholder diganti foto asli klien

/* ====== EDIT DATA DI SINI ====== */
const WEDDING = {
  date: new Date('2027-06-12T08:00:00+07:00'),
  end:  new Date('2027-06-12T14:00:00+07:00'),
  title: 'Pernikahan Anindya & Bagus',
  place: 'Pendopo Jati, Jl. Kaliurang Km 8, Sleman, DIY',
  wa: '6281234567890',          // nomor WhatsApp tujuan RSVP (format 62...)
  music: ''                     // contoh: 'assets/musik.mp3' (kosongkan jika tidak ada)
};
/* ================================ */
const $ = s => document.querySelector(s);
const opening = $('#opening');

// Nama tamu dari link: index.html?to=Budi%20Santoso
const to = new URLSearchParams(location.search).get('to');
if (to) { $('#guestName').textContent = to; $('#rsvpNama').value = to; }

// Urutan animasi pembuka
setTimeout(() => opening.classList.add('open-gate'), 1600);
setTimeout(() => opening.classList.add('show-cover'), 4600);

let audio;
if (WEDDING.music) { audio = new Audio(WEDDING.music); audio.loop = true; $('#musicBtn').hidden = false; }

$('#openBtn').addEventListener('click', () => {
  opening.classList.add('gone');
  document.body.classList.remove('locked');
  window.scrollTo(0, 0);
  if (audio) { audio.play().then(() => $('#musicBtn').classList.add('on')).catch(() => {}); }
  setTimeout(() => opening.style.display = 'none', 1300);
});
$('#musicBtn').addEventListener('click', e => {
  if (!audio) return;
  if (audio.paused) { audio.play(); e.currentTarget.classList.add('on'); }
  else { audio.pause(); e.currentTarget.classList.remove('on'); }
});

// Hitung mundur
const pad = n => String(n).padStart(2, '0');
function tick() {
  let d = Math.max(0, WEDDING.date - Date.now()) / 1000;
  $('#cd-d').textContent = pad(Math.floor(d / 86400));
  $('#cd-h').textContent = pad(Math.floor(d % 86400 / 3600));
  $('#cd-m').textContent = pad(Math.floor(d % 3600 / 60));
  $('#cd-s').textContent = pad(Math.floor(d % 60));
}
tick(); setInterval(tick, 1000);

// Simpan ke kalender (.ics)
$('#calBtn').addEventListener('click', e => {
  e.preventDefault();
  const f = d => d.toISOString().replace(/[-:]|\.\d{3}/g, '');
  const ics = ['BEGIN:VCALENDAR','VERSION:2.0','BEGIN:VEVENT','DTSTART:' + f(WEDDING.date),'DTEND:' + f(WEDDING.end),
    'SUMMARY:' + WEDDING.title,'LOCATION:' + WEDDING.place,'END:VEVENT','END:VCALENDAR'].join('\r\n');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }));
  a.download = 'undangan.ics'; a.click();
});

// Salin nomor rekening
document.querySelectorAll('[data-copy]').forEach(b => b.addEventListener('click', () => {
  const t = $(b.dataset.copy).textContent;
  (navigator.clipboard ? navigator.clipboard.writeText(t) : Promise.reject()).catch(() => {
    const i = document.createElement('input'); i.value = t; document.body.appendChild(i); i.select(); document.execCommand('copy'); i.remove();
  });
  const o = b.textContent; b.textContent = 'Tersalin ✓'; setTimeout(() => b.textContent = o, 1500);
}));

// RSVP & ucapan
const KEY = 'wishes-anindya-bagus';
const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; } };
function render() {
  const esc = s => s.replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  $('#wishes').innerHTML = load().slice().reverse().map(w =>
    `<div class="wish"><b>${esc(w.nama)}</b><small>${esc(w.hadir)}</small><p>${esc(w.ucapan || '')}</p></div>`).join('');
}
render();
$('#rsvpForm').addEventListener('submit', e => {
  e.preventDefault();
  const d = Object.fromEntries(new FormData(e.target));
  const list = load(); list.push(d);
  try { localStorage.setItem(KEY, JSON.stringify(list)); } catch {}
  render();
  const msg = `Halo, saya ${d.nama}.%0AKonfirmasi: ${d.hadir}${d.jumlah ? ' (' + d.jumlah + ' orang)' : ''}%0A${encodeURIComponent(d.ucapan || '')}`;
  window.open(`https://wa.me/${WEDDING.wa}?text=${msg}`, '_blank');
  e.target.reset();
});

// Animasi muncul saat scroll
const io = new IntersectionObserver(es => es.forEach(x => { if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); } }), { threshold: .15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

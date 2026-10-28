let systemIndex = 0;
let selectedId = BOOK[0].parts[0].id;
let showLabels = true;
let speaking = false;
const $ = id => document.getElementById(id);
const speakerIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m11 4-6 5H2v6h3l6 5V4Zm4 4c3 2 3 6 0 8m3-11c5 4 5 10 0 14"/></svg>';
function icon(name) { return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name]}</svg>`; }
function stopSpeech() {
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  speaking = false;
  const button = $('speak-button');
  if (button) { button.setAttribute('aria-pressed', 'false'); button.setAttribute('aria-label', 'Lesa texta upp'); }
}
let turnTimer;
let lastTouch = null;
function chooseSystem(index, animate = true) {
  if (index < 0 || index >= BOOK.length || index === systemIndex) return;
  stopSpeech();
  const old = BOOK[systemIndex];
  const direction = index > systemIndex ? 'turn-next' : 'turn-previous';
  systemIndex = index;
  selectedId = BOOK[systemIndex].parts[0].id;
  render();
  if (window.matchMedia("(max-width:620px)").matches) $("explorer").scrollIntoView({behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",block:"start"});
  clearTimeout(turnTimer);
  $('book').classList.remove('turn-next', 'turn-previous');
  if (animate && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    $('turn-sheet').innerHTML = `<img src="assets/${old.asset}" alt=""><span>✳</span>`;
    void $('book').offsetWidth;
    $('book').classList.add(direction);
    turnTimer = setTimeout(() => $('book').classList.remove(direction), 650);
  }
}
function choosePart(id) {
  if (!BOOK[systemIndex].parts.some(part => part.id === id)) return;
  stopSpeech(); selectedId = id;
  document.querySelectorAll('#anatomy-stage [data-part]').forEach(element => {
    element.classList.toggle('selected', element.dataset.part === id);
    element.setAttribute('aria-pressed', element.dataset.part === id);
  });
  renderDetails();
}
function render() {
  const system = BOOK[systemIndex];
  document.documentElement.style.setProperty('--chapter-color', system.color);
  const shortLabels = ['Húðin','Vöðvar','Bein','Öndun','Blóðrás','Melting','Taugar'];
  $('systems').innerHTML = BOOK.map((s, i) => `<button class="chapter-tab" data-system="${i}" aria-label="${s.title}" aria-current="${i === systemIndex ? 'page' : 'false'}" style="--tab-color:${s.color};--tab-tint:${s.color}26"><span class="system-icon">${icon(s.icon)}</span><strong><span class="tab-full-label">${s.title}</span><span class="tab-short-label">${shortLabels[i]}</span></strong><span class="current-marker" aria-hidden="true">←</span></button>`).join('');
  $('system-number').textContent = `BLAÐ ${String(systemIndex + 1).padStart(2, '0')} / 07`;
  $('chapter-caption').textContent = system.chapter;
  $('system-title').textContent = system.title;
  $('system-description').textContent = system.description;
  $('discovery-question').textContent = system.question;
  $('next-discovery').textContent = system.next;
  $('page-progress').textContent = `${systemIndex + 1} af ${BOOK.length} blöðum`;
  $('left-page-number').textContent = String(systemIndex * 2 + 1).padStart(2, '0');
  $('right-page-number').textContent = String(systemIndex * 2 + 2).padStart(2, '0');
  $('previous').disabled = systemIndex === 0;
  $('next').disabled = systemIndex === BOOK.length - 1;
  $('page-dots').innerHTML = BOOK.map((s, i) => `<button data-system="${i}" aria-current="${i === systemIndex ? 'page' : 'false'}" aria-label="${s.title}"></button>`).join('');
  const hotspots = system.parts.map(p => {
    const [x,y,side] = HOTSPOTS[p.id];
    return `<button class="hotspot ${p.id === selectedId ? 'selected' : ''} ${side < 0 ? 'label-left' : 'label-right'}" data-part="${p.id}" style="left:${x}%;top:${y}%" aria-label="${p.name}" aria-pressed="${p.id === selectedId}"><span class="hotspot-dot" aria-hidden="true"></span><span class="hotspot-label" aria-hidden="true">${p.name}</span></button>`;
  }).join('');
  $('anatomy-stage').innerHTML = `<div class="figure-frame ${showLabels ? '' : 'hidden-labels'}"><img class="body-illustration" src="assets/${system.asset}" width="1024" height="1536" alt="${system.title}, myndskreyting af líkamanum að framan" fetchpriority="high">${hotspots}</div>`;
  const image = $('anatomy-stage').querySelector('img');
  image.addEventListener('error', () => { image.hidden = true; const warning = document.createElement('p'); warning.className = 'image-error'; warning.textContent = 'Myndin náðist ekki. Þú getur samt skoðað alla hlutana með heitunum á hægri síðunni.'; $('anatomy-stage').append(warning); });
  renderDetails();
  // Warm the next illustration without loading the whole book at startup.
  if (BOOK[systemIndex+1]) { const nextImage = new Image(); nextImage.src = `assets/${BOOK[systemIndex+1].asset}`; }
}
function renderDetails() {
  const system = BOOK[systemIndex];
  const part = system.parts.find(p => p.id === selectedId);
  $('organ-detail').innerHTML = `<article class="detail-card"><div class="detail-content"><p class="organ-tag">${part.tag}</p><div class="organ-title-row"><h3>${part.name}</h3><button class="speak" id="speak-button" aria-label="Lesa texta upp" aria-pressed="false">${speakerIcon}</button></div><p class="organ-description">${part.description}</p><h4>Helstu hlutverk</h4><ul class="functions">${part.functions.map(f => `<li>${f}</li>`).join('')}</ul><div class="did-you-know"><strong><span aria-hidden="true">✧</span> Vissir þú?</strong><p>${part.fact}</p></div><p id="speech-status" class="speech-status" role="status" hidden></p></div></article>`;
  $('parts-list').innerHTML = system.parts.map(p => `<button class="part-chip" data-part="${p.id}" aria-pressed="${p.id === selectedId}">${p.name}</button>`).join('');
  $('speak-button').addEventListener('click', () => speakPart(part));
}
function speakPart(part) {
  if (speaking) { stopSpeech(); return; }
  const status = $('speech-status');
  if (!('speechSynthesis' in window)) { status.hidden = false; status.textContent = 'Þessi vafri styður ekki upplestur.'; return; }
  const voice = window.speechSynthesis.getVoices().find(v => /^is(?:-|_|$)/i.test(v.lang));
  if (!voice) { status.hidden = false; status.textContent = 'Íslensk rödd fannst ekki í tækinu. Settu upp íslenska talrödd í stillingum tækisins til að nota upplestur.'; return; }
  status.hidden = true;
  const utterance = new SpeechSynthesisUtterance([part.name, part.description, ...part.functions, 'Vissir þú?', part.fact].join('. '));
  utterance.lang = 'is-IS'; utterance.voice = voice; utterance.rate = 0.87;
  utterance.onend = () => stopSpeech();
  utterance.onerror = () => { stopSpeech(); status.hidden = false; status.textContent = 'Upplestur tókst ekki. Prófaðu aftur.'; };
  window.speechSynthesis.cancel();
  speaking = true;
  $('speak-button').setAttribute('aria-pressed', 'true'); $('speak-button').setAttribute('aria-label', 'Stöðva upplestur');
  window.speechSynthesis.speak(utterance);
}
document.addEventListener('click', event => {
  const systemButton = event.target.closest('[data-system]');
  if (systemButton) { const focusIndex = Number(systemButton.dataset.system); const fromDots = !!systemButton.closest('.page-dots'); chooseSystem(focusIndex); document.querySelector(`${fromDots ? '.page-dots' : '#systems'} [data-system="${focusIndex}"]`)?.focus({preventScroll:true}); return; }
  const partButton = event.target.closest('[data-part]');
  if (partButton) { const fromImage = !!partButton.closest('#anatomy-stage'); const fromList = !!partButton.closest('#parts-list'); const id = partButton.dataset.part; choosePart(id); if (fromImage && window.matchMedia('(max-width:620px)').matches) $('organ-detail').scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',block:'start'}); if (fromList) $('parts-list').querySelector(`[data-part="${id}"]`)?.focus({preventScroll:true}); }
});
$('anatomy-stage').addEventListener('keydown', event => {
  const part = event.target.closest('.hotspot');
  if (part && (event.key === 'Enter' || event.key === ' ')) { event.preventDefault(); choosePart(part.dataset.part); }
});
$('previous').addEventListener('click', () => chooseSystem(systemIndex - 1));
$('next').addEventListener('click', () => chooseSystem(systemIndex + 1));
$('labels-button').addEventListener('click', () => { showLabels = !showLabels; $('labels-button').setAttribute('aria-pressed', showLabels); document.querySelector('.figure-frame').classList.toggle('hidden-labels', !showLabels); });
$('text-size').addEventListener('click', () => { const large = document.body.classList.toggle('large-text'); $('text-size').setAttribute('aria-pressed', large); $('text-size').setAttribute('aria-label', large ? 'Minnka texta' : 'Stækka texta'); });
$('about-button').addEventListener('click', () => $('about-dialog').showModal());
$('close-about').addEventListener('click', () => $('about-dialog').close());
$('about-dialog').addEventListener('click', event => { if (event.target === $('about-dialog')) { const bounds = event.target.getBoundingClientRect(); if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) event.target.close(); } });
document.addEventListener('keydown', event => {
  if ($('about-dialog').open || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || /INPUT|TEXTAREA|SELECT/.test(event.target.tagName)) return;
  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); chooseSystem(systemIndex + (event.key === 'ArrowRight' ? 1 : -1)); }
});
$('anatomy-stage').addEventListener('touchstart', event => { const touch = event.changedTouches[0]; lastTouch = {x:touch.clientX, y:touch.clientY}; }, {passive:true});
$('anatomy-stage').addEventListener('touchend', event => { if (!lastTouch) return; const touch = event.changedTouches[0], dx = touch.clientX-lastTouch.x, dy = touch.clientY-lastTouch.y; lastTouch = null; if (Math.abs(dx)>65 && Math.abs(dx)>Math.abs(dy)*1.5) chooseSystem(systemIndex + (dx<0 ? 1 : -1)); }, {passive:true});
window.addEventListener('pagehide', stopSpeech);
if ('speechSynthesis' in window) window.speechSynthesis.getVoices();
render();

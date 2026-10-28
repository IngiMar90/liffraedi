let systemIndex = 0;
let selectedId = SYSTEMS[0].parts[0].id;
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
function chooseSystem(index) {
  stopSpeech();
  systemIndex = (index + SYSTEMS.length) % SYSTEMS.length;
  selectedId = SYSTEMS[systemIndex].parts[0].id;
  render();
}
function choosePart(id) {
  if (!SYSTEMS[systemIndex].parts.some(part => part.id === id)) return;
  stopSpeech(); selectedId = id;
  renderAnatomySelection(); renderDetails();
}
function render() {
  const system = SYSTEMS[systemIndex];
  $('systems').innerHTML = SYSTEMS.map((s, i) => `<button class="system-button" data-system="${i}" aria-current="${i === systemIndex}"><span class="system-icon">${icon(s.icon)}</span><span><strong>${s.short}</strong><small>${s.subtitle}</small></span><span class="nav-arrow" aria-hidden="true">↗</span></button>`).join('');
  $('system-number').textContent = `KERFI ${String(systemIndex + 1).padStart(2, '0')} / 06`;
  $('system-title').textContent = system.title;
  $('system-description').textContent = system.description;
  $('page-dots').innerHTML = SYSTEMS.map((s, i) => `<button data-system="${i}" aria-current="${i === systemIndex}" aria-label="${s.title}"></button>`).join('');
  const drawing = system.parts.map(p => `<g class="anatomy-part ${p.id === selectedId ? 'selected' : ''}" role="button" tabindex="0" data-part="${p.id}" aria-label="${p.name}" aria-pressed="${p.id === selectedId}"><title>${p.name} — smelltu til að læra meira</title><g class="hit-area" aria-hidden="true">${p.art}</g><g class="art">${p.art}</g></g>`).join('');
  const labels = system.parts.map(p => {
    const width = Math.min(138, Math.max(90, p.name.length * 7.7 + 18));
    const x = Math.min(p.label[0], 394 - width), y = p.label[1];
    const endX = x < 100 ? x + width : x;
    return `<g class="diagram-label ${p.id === selectedId ? 'selected' : ''}" data-part="${p.id}" aria-hidden="true"><line x1="${p.point[0]}" y1="${p.point[1]}" x2="${endX}" y2="${y + 13}"/><circle cx="${p.point[0]}" cy="${p.point[1]}" r="4"/><rect x="${x}" y="${y - 4}" width="${width}" height="34" rx="10"/><text x="${x + width/2}" y="${y + 18}" text-anchor="middle">${p.name}</text></g>`;
  }).join('');
  $('anatomy-stage').innerHTML = `<svg class="anatomy-svg ${showLabels ? '' : 'hidden-labels'}" viewBox="0 0 400 700" xmlns="http://www.w3.org/2000/svg" role="group" aria-label="${system.title}, einfölduð skýringarmynd að framan">${BODY}${system.background || ''}${drawing}${labels}</svg>`;
  renderDetails();
}
function renderAnatomySelection() {
  document.querySelectorAll('.anatomy-stage [data-part]').forEach(element => {
    const selected = element.dataset.part === selectedId;
    element.classList.toggle('selected', selected);
    if (element.classList.contains('anatomy-part')) element.setAttribute('aria-pressed', selected);
  });
}
function renderDetails() {
  const system = SYSTEMS[systemIndex];
  const part = system.parts.find(p => p.id === selectedId);
  const number = system.parts.indexOf(part) + 1;
  $('organ-detail').innerHTML = `<article class="detail-card"><div class="organ-art"><span class="art-number">${String(number).padStart(2, '0')} / ${String(system.parts.length).padStart(2, '0')}</span><svg viewBox="${part.box.join(' ')}" aria-hidden="true"><g class="art">${part.art}</g></svg></div><div class="detail-content"><p class="organ-tag">${part.tag}</p><div class="organ-title-row"><h3>${part.name}</h3><button class="speak" id="speak-button" aria-label="Lesa texta upp" aria-pressed="false">${speakerIcon}</button></div><p class="organ-description">${part.description}</p><h4>Helstu hlutverk</h4><ul class="functions">${part.functions.map(f => `<li>${f}</li>`).join('')}</ul><div class="did-you-know"><strong><span aria-hidden="true">✧</span> Vissir þú?</strong><p>${part.fact}</p></div><p id="speech-status" class="speech-status" role="status" hidden></p></div></article>`;
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
  if (partButton) { const fromList = !!partButton.closest('#parts-list'); const id = partButton.dataset.part; choosePart(id); if (fromList) $('parts-list').querySelector(`[data-part="${id}"]`)?.focus({preventScroll:true}); }
});
$('anatomy-stage').addEventListener('keydown', event => {
  const part = event.target.closest('.anatomy-part');
  if (part && (event.key === 'Enter' || event.key === ' ')) { event.preventDefault(); choosePart(part.dataset.part); }
});
$('previous').addEventListener('click', () => chooseSystem(systemIndex - 1));
$('next').addEventListener('click', () => chooseSystem(systemIndex + 1));
$('labels-button').addEventListener('click', () => { showLabels = !showLabels; $('labels-button').setAttribute('aria-pressed', showLabels); document.querySelector('.anatomy-svg').classList.toggle('hidden-labels', !showLabels); });
$('text-size').addEventListener('click', () => { const large = document.body.classList.toggle('large-text'); $('text-size').setAttribute('aria-pressed', large); $('text-size').setAttribute('aria-label', large ? 'Minnka texta' : 'Stækka texta'); });
$('about-button').addEventListener('click', () => $('about-dialog').showModal());
$('close-about').addEventListener('click', () => $('about-dialog').close());
$('about-dialog').addEventListener('click', event => { if (event.target === $('about-dialog')) { const bounds = event.target.getBoundingClientRect(); if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) event.target.close(); } });
window.addEventListener('pagehide', stopSpeech);
if ('speechSynthesis' in window) window.speechSynthesis.getVoices();
render();

// Anonymous practice: progress lives in this page only, with no student accounts.
const KNOWLEDGE_QUESTIONS = [
 {system:'skin',question:'Hvað verndar líkamann að utan?',answer:'Húðin',options:['Húðin','Lungun','Maginn','Heilinn'],hint:'Þetta líffæri þekur allan líkamann.',explanation:'Húðin verndar líkamann og hjálpar til við að halda vatni inni í honum.'},
 {system:'skin',question:'Hvert er stærsta líffæri líkamans?',answer:'Húðin',options:['Hjartað','Lifrin','Húðin','Maginn'],hint:'Hugsaðu um það sem þekur líkamann.',explanation:'Húðin er stærsta líffæri líkamans.'},
 {system:'muscular',question:'Hvernig skapa vöðvar hreyfingu?',answer:'Með því að dragast saman',options:['Með því að melta mat','Með því að dragast saman','Með því að mynda gall','Með því að taka upp vatn'],hint:'Vöðvar toga í bein þegar þeir styttast.',explanation:'Vöðvar dragast saman og toga í bein. Þannig hjálpa þeir líkamanum að hreyfast.'},
 {system:'muscular',question:'Hvaða vöðvar hjálpa þér að rétta úr hné?',answer:'Fjórhöfðarnir',options:['Tvíhöfðarnir','Brjóstvöðvarnir','Kviðvöðvarnir','Fjórhöfðarnir'],hint:'Þessir vöðvar eru framan á lærunum.',explanation:'Fjórhöfðarnir eru framan á lærunum og hjálpa til við að rétta úr hnjánum.'},
 {system:'skeletal',question:'Hvað verndar heilann?',answer:'Höfuðkúpan',options:['Rifbeinin','Lærleggirnir','Höfuðkúpan','Mjaðmagrindin'],hint:'Þessi bein eru í höfðinu.',explanation:'Höfuðkúpan myndar vörn utan um heilann.'},
 {system:'skeletal',question:'Hvaða bein vernda hjartað og lungun?',answer:'Rifbeinin',options:['Lærleggirnir','Rifbeinin','Höfuðkúpan','Fingurbeinin'],hint:'Þessi bein mynda brjóstkassann.',explanation:'Rifbeinin verja viðkvæm líffæri í brjóstkassanum, þar á meðal hjartað og lungun.'},
 {system:'respiratory',question:'Hvar fer súrefni úr loftinu yfir í blóðið?',answer:'Í lungunum',options:['Í maganum','Í heilanum','Í ristlinum','Í lungunum'],hint:'Þessi líffæri fyllast af lofti þegar þú andar inn.',explanation:'Í lungunum fer súrefni úr loftinu yfir í blóðið.'},
 {system:'respiratory',question:'Hvað heitir loftvegurinn niður hálsinn til lungnanna?',answer:'Barkinn',options:['Vélindað','Barkinn','Hryggurinn','Ristillinn'],hint:'Hann greinist í tvær aðalberkjur, eina að hvoru lunga.',explanation:'Barkinn leiðir loft að lungunum og frá þeim.'},
 {system:'circulatory',question:'Hvað dælir blóði um líkamann?',answer:'Hjartað',options:['Lungun','Heilinn','Hjartað','Maginn'],hint:'Þú getur stundum fundið sláttinn frá þessu líffæri.',explanation:'Hjartað er vöðvi sem dælir blóði til lungnanna og um líkamann.'},
 {system:'circulatory',question:'Hvaða æðar flytja blóð frá hjartanu?',answer:'Slagæðar',options:['Bláæðar','Slagæðar','Loftvegir','Taugar'],hint:'Bláæðarnar fara hina leiðina, aftur til hjartans.',explanation:'Slagæðar flytja blóð frá hjartanu. Bláæðar skila blóðinu til hjartans.'},
 {system:'digestive',question:'Hvar byrjar meltingin?',answer:'Í munninum',options:['Í maganum','Í smáþörmunum','Í ristlinum','Í munninum'],hint:'Maturinn blandast þar munnvatni þegar þú tyggur.',explanation:'Meltingin byrjar í munninum þegar þú tyggur og munnvatn blandast matnum.'},
 {system:'digestive',question:'Hvar tekur líkaminn upp mest af næringunni úr matnum?',answer:'Í smáþörmunum',options:['Í hjartanu','Í lungunum','Í smáþörmunum','Í ristlinum'],hint:'Þessi hluti meltingarkerfisins er langur og samanbrotinn í kviðnum.',explanation:'Mest af næringunni úr matnum er tekin upp í smáþörmunum.'},
 {system:'nervous',question:'Hvaða líffæri hjálpar þér að hugsa, læra og muna?',answer:'Heilinn',options:['Maginn','Lifrin','Lungun','Heilinn'],hint:'Höfuðkúpan verndar þetta líffæri.',explanation:'Heilinn vinnur úr upplýsingum og hjálpar þér að hugsa, læra og muna.'},
 {system:'nervous',question:'Hvað flytur boð milli heilans og stórs hluta líkamans?',answer:'Mænan',options:['Barkinn','Vélindað','Mænan','Ristillinn'],hint:'Þessi hluti taugakerfisins liggur inni í hryggnum.',explanation:'Mænan flytur boð á milli heilans og stórs hluta líkamans.'}
];

(() => {
 const section = document.getElementById('knowledge-check');
 const setup = document.getElementById('quiz-setup');
 const stage = document.getElementById('quiz-stage');
 const topic = document.getElementById('quiz-topic');
 let round = [], index = 0, firstTryCount = 0, attempts = 0, answered = false;
 let usedChoices = new Set(), history = [];
 const shuffle = values => { const items = [...values]; for(let i=items.length-1;i>0;i--) { const j=Math.floor(Math.random()*(i+1)); [items[i],items[j]]=[items[j],items[i]]; } return items; };
 const systemName = id => BOOK.find(s=>s.id===id).title;
 if ('IntersectionObserver' in window) {
   const observer = new IntersectionObserver(([entry])=>document.body.classList.toggle('quiz-in-view',entry.isIntersecting),{rootMargin:'0px 0px -15% 0px'});
   observer.observe(section);
 }
 topic.innerHTML = '<option value="all">Öll kerfin · 7 spurningar</option>' + BOOK.map(s=>`<option value="${s.id}">${s.title} · 2 spurningar</option>`).join('');
 function start() {
   const ids = topic.value === 'all' ? BOOK.map(s=>s.id) : [topic.value];
   const questions = ids.flatMap(id=>{const matches=KNOWLEDGE_QUESTIONS.filter(q=>q.system===id);return topic.value==='all' ? [shuffle(matches)[0]] : shuffle(matches);});
   round = questions.map((q,i)=>{const options=shuffle(q.options.filter(o=>o!==q.answer));options.splice(i%4,0,q.answer);return {...q,options};});
   index=0;firstTryCount=0;history=[];setup.hidden=true;stage.hidden=false;renderQuestion();
 }
 function renderQuestion() {
   attempts=0;answered=false;usedChoices=new Set();
   const q=round[index];
   stage.innerHTML=`<div class="quiz-status"><span>Spurning ${index+1} af ${round.length}</span><span>${systemName(q.system)}</span></div><progress class="quiz-progress" value="${index}" max="${round.length}" aria-label="Framvinda spurninga"></progress><h3 id="quiz-question" tabindex="-1">${q.question}</h3><p class="quiz-instruction">Veldu eitt svar. Þú mátt prófa aftur.</p><div class="quiz-options" role="group" aria-labelledby="quiz-question">${q.options.map((o,i)=>`<button class="quiz-option" data-quiz-option="${i}"><span class="option-letter" aria-hidden="true">${'ABCD'[i]}</span><span>${o}</span><span class="option-verdict" aria-hidden="true"></span></button>`).join('')}</div><div id="quiz-feedback" class="quiz-feedback" role="status" aria-live="polite" aria-atomic="true"></div><details class="quiz-hint"><summary>Fá vísbendingu</summary><p>${q.hint}</p></details><div class="quiz-actions"><button class="quiz-read" data-quiz-review="${q.system}">Lesa kaflann ↗</button><button id="quiz-next" class="quiz-primary" disabled>${index===round.length-1?'Sjá niðurstöðu':'Næsta spurning'} <span aria-hidden="true">→</span></button></div><button class="quiz-reset" data-quiz-reset>Velja annað efni</button>`;
   document.getElementById('quiz-question').focus({preventScroll:true});
   stage.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});
 }
 function answer(choice) {
   if(answered||usedChoices.has(choice))return;
   const q=round[index],button=stage.querySelector(`[data-quiz-option="${choice}"]`),feedback=document.getElementById('quiz-feedback');
   attempts++;usedChoices.add(choice);
   if(q.options[choice]===q.answer){
     answered=true;if(attempts===1)firstTryCount++;
     history.push({question:q.question,answer:q.answer,system:q.system,firstTry:attempts===1});
     button.classList.add('is-correct');button.querySelector('.option-verdict').textContent='✓';
     stage.querySelectorAll('[data-quiz-option]').forEach(b=>b.disabled=true);
     feedback.className='quiz-feedback is-correct';feedback.textContent=`Rétt hjá þér! ${q.explanation}`;
     const next=document.getElementById('quiz-next');next.disabled=false;next.focus({preventScroll:true});
   } else {
     button.classList.add('is-incorrect');button.disabled=true;button.querySelector('.option-verdict').textContent='×';
     feedback.className='quiz-feedback is-incorrect';feedback.textContent='Prófaðu aftur. Þú getur fengið vísbendingu eða lesið kaflann.';
   }
 }
 function finish() {
   stage.innerHTML=`<div class="quiz-finish-symbol" aria-hidden="true">✳</div><p class="eyebrow">ÆFINGU LOKIÐ</p><h3 id="quiz-result" tabindex="-1">Þú kláraðir ${round.length} spurningar!</h3><p class="quiz-score">${firstTryCount} af ${round.length} rétt í fyrstu tilraun.</p><p class="quiz-result-note">Hvert svar er tækifæri til að læra. Hér geturðu rifjað upp rétt svör.</p><ol class="quiz-review">${history.map(q=>`<li><strong>${q.question}</strong><p>${q.answer}</p><button class="quiz-read" data-quiz-review="${q.system}">Lesa kaflann: ${systemName(q.system)} ↗</button></li>`).join('')}</ol><div class="quiz-actions"><button class="quiz-primary" data-quiz-restart>Prófa aftur <span aria-hidden="true">↻</span></button><button class="quiz-read" data-quiz-reset>Velja annað efni</button></div>`;
   document.getElementById('quiz-result').focus({preventScroll:true});
 }
 section.addEventListener('click',event=>{
   const option=event.target.closest('[data-quiz-option]');if(option){answer(Number(option.dataset.quizOption));return;}
   if(event.target.closest('#quiz-start')||event.target.closest('[data-quiz-restart]')){start();return;}
   if(event.target.closest('#quiz-next')&&answered){if(index<round.length-1){index++;renderQuestion();}else finish();return;}
   if(event.target.closest('[data-quiz-reset]')){setup.hidden=false;stage.hidden=true;stage.replaceChildren();document.getElementById('quiz-start').focus({preventScroll:true});return;}
   const review=event.target.closest('[data-quiz-review]');if(review){chooseSystem(BOOK.findIndex(s=>s.id===review.dataset.quizReview),false);document.getElementById('explorer').scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});document.querySelector(`#systems [data-system="${systemIndex}"]`).focus({preventScroll:true});}
 });
})();

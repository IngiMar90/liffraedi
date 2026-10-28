// Chapter order is an exploration route. The systems overlap in the real body.
const skinSystem = {
 id:'skin',title:'Húðin',short:'Húðin',icon:'skin',subtitle:'Ysta vörn líkamans',description:'Ferðin byrjar að utan. Húðin verndar þig og hjálpar þér að finna heiminn í kringum þig.',color:'#b57d63',parts:[
  {id:'skin',name:'Húðin',tag:'Ysta vörn líkamans',description:'Húðin þekur líkamann. Hún er lifandi vörn sem hjálpar til við að halda sýklum úti og vatni inni í líkamanum.',functions:['Verndar líkamann og dregur úr vatnstapi.','Hjálpar þér að finna snertingu og stjórna líkamshita.'],fact:'Húðin er stærsta líffæri líkamans.'},
  {id:'hair',name:'Hárið',tag:'Vex úr húðinni',description:'Hár vex úr hársekkjum í húðinni. Við erum með hár á höfðinu og fíngerð hár víða á líkamanum.',functions:['Hjálpar til við að vernda húðina.','Augnhár hjálpa til við að halda smáögnum frá augunum.'],fact:'Í lófum og á iljum eru engir hársekkir.'},
  {id:'sensation',name:'Snertiskynið',tag:'Húðin skynjar',description:'Í húðinni eru skynnemar sem bregðast meðal annars við snertingu, þrýstingi og hita. Taugar flytja boðin áfram til taugakerfisins.',functions:['Lætur þig finna áferð og snertingu.','Hjálpar þér að skynja hita og kulda.'],fact:'Húðin og taugakerfið vinna saman þegar þú finnur að eitthvað er mjúkt eða hrjúft.'}
 ]
};
ICONS.skin = '<path d="M3 8q3-4 6 0t6 0 6 0M3 12q3-4 6 0t6 0 6 0M3 16q3-4 6 0t6 0 6 0"/>';
const chapterConfig = {
 skin:{asset:'01-skin.webp',chapter:'Yst á líkamanum',question:'Strjúktu varlega yfir handarbakið. Hvernig líður snertingin?',next:'Hvað leynist undir húðinni?',color:'#b57d63'},
 muscular:{asset:'02-muscles.webp',chapter:'Kraftur undir húðinni',question:'Beygðu handlegginn hægt. Geturðu fundið tvíhöfðann spennast?',next:'Hvað heldur líkamanum uppi?',color:'#b86d66'},
 skeletal:{asset:'03-skeleton.webp',chapter:'Stoðirnar okkar',question:'Finndu varlega beinið við olnbogann. Hvers vegna er það hart?',next:'Hvert fer loftið sem við öndum að okkur?',color:'#a28b55'},
 respiratory:{asset:'04-lungs.webp',chapter:'Tökum andann',question:'Leggðu hönd á brjóstkassann. Hvað breytist þegar þú andar inn?',next:'Hvernig berst súrefnið um líkamann?',color:'#8e7eac'},
 circulatory:{asset:'05-circulation.webp',chapter:'Á stöðugri hreyfingu',question:'Leggðu hönd á brjóstkassann. Finnurðu hjartsláttinn?',next:'Hvernig fær líkaminn næringu?',color:'#ad6571'},
 digestive:{asset:'06-digestion.webp',chapter:'Ferðalag matarins',question:'Hugsaðu um epli. Hvar byrjar ferð þess um meltingarkerfið?',next:'Hvernig berast skilaboð um líkamann?',color:'#b27966'},
 nervous:{asset:'07-nerves.webp',chapter:'Skilaboðin að innan',question:'Hreyfðu einn fingur. Hvaða kerfi hjálpuðust að við hreyfinguna?',next:'Þú hefur kannað öll sjö blöðin!',color:'#b49751'}
};
const BOOK = [skinSystem, ...['muscular','skeletal','respiratory','circulatory','digestive','nervous'].map(id => SYSTEMS.find(s => s.id === id))].map(s => ({...s,...chapterConfig[s.id]}));
// Percent coordinates on the generated full-body artwork; anchor points, not anatomical boundaries.
const HOTSPOTS = {
 skin:[30,35,-1],hair:[50,4,1],sensation:[23,53,-1],
 biceps:[31,31,-1],pectorals:[60,25,1],abdominals:[51,35,1],quadriceps:[59,64,1],
 skull:[50,8,1],spine:[50,35,1],ribs:[40,25,-1],pelvis:[47,48,-1],femur:[58,64,1],
 lungs:[61,26,1],trachea:[50,18,-1],diaphragm:[50,33,1],
 heart:[54,28,1],arteries:[66,34,1],veins:[40,70,-1],
 stomach:[56,31,1],esophagus:[50,23,-1],liver:[43,30,-1],'small-intestine':[51,38,1],'large-intestine':[41,39,-1],
 brain:[50,7,1],'spinal-cord':[50,32,-1],nerves:[67,37,1]
};

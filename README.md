# Líffræði — Kannaðu líkamann

Gagnvirk íslensk flettibók fyrir nemendur. Sjö blöð og 26 upplýsingapunktar: húð, vöðvar, bein, öndun, blóðrás, melting og taugar. Nemendur byrja á húðinni og fletta inn í líkamann.

## Keyrsla

Engin uppsetning eða bygging er nauðsynleg. Opnaðu `dist/index.html` í vafra, eða keyrðu staðbundinn vefþjón:

```sh
python3 -m http.server 8000 --directory dist
```

Opnaðu síðan `http://localhost:8000`.

## Eiginleikar

- Sjö samræmdar myndskreytingar af líkamanum, með húðina fremst.
- Bókaropna með pappírsáferð og hreyfingu við flettingu; virðir reduced-motion stillingu.
- Merktir flipar niður með hægri jaðri bókarinnar hoppa beint á hvaða kerfi sem er; dökkur flipi sýnir opna blaðið.
- Fletting einnig með hnöppum, örvatökkum og láréttri stroku á líkamsmynd.
- Stuttar uppgötvunarspurningar og æfingar á hverju blaði.
- Kaflaheiti hafa eigið svæði fyrir ofan mynd svo þau hylja ekki líkamann.
- „Hvað veit ég?“: 14 spurningar í banka, sjö spurninga blönduð umferð eða tvær úr völdum kafla, fjórir svarkostir, vísbendingar, endurtilraun og niðurstaða. Svör eru aðeins í minni vafrasíðunnar og glatast við endurhleðslu.
- Smelltu á hluta myndarinnar, heiti eða hnapp fyrir neðan upplýsingaspjaldið.
- Flettu milli kerfa og feldu/sýndu heiti.
- Stærri upplýsingatexti og lyklaborðsstýring (Tab, Enter, bilslá).
- Upplestur með Speech Synthesis API ef íslensk talrödd er uppsett. Skýr skilaboð birtast ef rödd vantar; engin röng tungumálarödd er valin.
- Aðlagast símum, spjaldtölvum og tölvum.
- Engar ytri kóðasöfn, letur, reikningar, persónugögn eða netþjónn nauðsynleg fyrir notkun.

## Skrár og breytingar

- `dist/data.js`: íslenska námsefnið, líffærakerfi og upprunalegar SVG-myndir.
- `dist/book-data.js`: röð blaða, myndir, punktar og nýtt efni um húðina.
- `dist/assets/`: sjö upprunalegar PNG-myndir, léttar WebP-útgáfur, lýsingarskrá og myndgerðarprompt.
- `dist/app.js`: samskipti, fletting, val á hlutum og upplestur.
- `dist/quiz.js`: spurningabanki, efnisval, endurgjöf og nafnlaus þekkingaræfing.
- `dist/style.css`: útlit og skjástærðir.
- `dist/index.html`: uppbygging og heimildalisti í „Um verkefnið“.

Myndskreytingarnar eru búnar til með innbyggðri myndgerð. Upprunalegu myndirnar eru 1024 × 1536 PNG með gegnsæi; forritið notar WebP til að hlaða hraðar. Þær eru fræðslumyndir, ekki nákvæmir líffærafræðilegir atlasar. Röð blaðanna er könnunarleið; kerfin fléttast saman í raunverulegum líkama. Aldursstig og námsmarkmið hafa ekki verið skilgreind. Efnið má aðlaga þeim í næstu útgáfu. Heimildir námsefnis eru tengdar í forritinu (CDC, NHLBI, NIDDK, NINDS, NIAMS, NIH og Johns Hopkins).

## Hýsing

Allt í `dist/` má hýsa sem kyrrstæðan vef, þar á meðal með GitHub Pages. Sites-hýsing er skilgreind í `.openai/hosting.json`. Engin gögn nemenda eru vistuð.

## Myndasafn

Opnaðu `dist/assets/index.html` til að skoða og sækja upprunalegu myndirnar. Sjá `dist/assets/prompt-set.md` fyrir lýsingar myndgerðar.

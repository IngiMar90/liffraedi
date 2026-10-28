# Líffræði — Kannaðu líkamann

Gagnvirkt íslenskt líffræðiforrit fyrir nemendur. Sex líffærakerfi með 23 smellanlegum líkamshlutum, stuttum skýringum og einfölduðum SVG-skýringarmyndum að framan.

## Keyrsla

Engin uppsetning eða bygging er nauðsynleg. Opnaðu `dist/index.html` í vafra, eða keyrðu staðbundinn vefþjón:

```sh
python3 -m http.server 8000 --directory dist
```

Opnaðu síðan `http://localhost:8000`.

## Eiginleikar

- Blóðrásarkerfi, öndunarkerfi, meltingarkerfi, beinakerfi, vöðvakerfi og taugakerfi.
- Smelltu á hluta myndarinnar, heiti eða hnapp fyrir neðan upplýsingaspjaldið.
- Flettu milli kerfa og feldu/sýndu heiti.
- Stærri upplýsingatexti og lyklaborðsstýring (Tab, Enter, bilslá).
- Upplestur með Speech Synthesis API ef íslensk talrödd er uppsett. Skýr skilaboð birtast ef rödd vantar; engin röng tungumálarödd er valin.
- Aðlagast símum, spjaldtölvum og tölvum.
- Engar ytri kóðasöfn, letur, reikningar, persónugögn eða netþjónn nauðsynleg fyrir notkun.

## Skrár og breytingar

- `dist/data.js`: íslenska námsefnið, líffærakerfi og upprunalegar SVG-myndir.
- `dist/app.js`: samskipti, val á hlutum og upplestur.
- `dist/style.css`: útlit og skjástærðir.
- `dist/index.html`: uppbygging og heimildalisti í „Um verkefnið“.

Myndirnar eru einfaldaðar fræðslumyndir, ekki nákvæmir líffærafræðilegir atlasar. Aldursstig og námsmarkmið hafa ekki verið skilgreind. Efnið má aðlaga þeim í næstu útgáfu. Heimildir námsefnis eru tengdar í forritinu (CDC, NHLBI, NIDDK, NINDS og NIAMS).

## Hýsing

Allt í `dist/` má hýsa sem kyrrstæðan vef, þar á meðal með GitHub Pages. Sites-hýsing er skilgreind í `.openai/hosting.json`. Engin gögn nemenda eru vistuð.

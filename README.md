# Chalet Heidi – Beatenberg

Statische Website (6 Seiten) für das Ferienchalet Heidi in Beatenberg (Berner Oberland).
Warm, ruhig, alpin, viel Weissraum, mobile-first. Deutsch + Englisch mit Umschalter.

## Seiten

- `index.html` – Start: Hero-Panorama, Intro, Teaser-Karten, Gästestimmen
- `chalet.html` – Das Chalet: Zimmer & Aufteilung, Ausstattung
- `galerie.html` – Galerie mit allen 42 Fotos (Lightbox)
- `umgebung.html` – Wandern, Skifahren & Winter, Niederhorn, Thunersee
- `preise.html` – Saisonpreise, Verfügbarkeitskalender, Anfrageformular
- `kontakt.html` – Anfrageformular, Kontaktdaten, Karte (OpenStreetMap)

## Vor dem Livegang anpassen

1. **E-Mail-Adresse**: in `js/availability.js` oben `DEINE-EMAIL@BEISPIEL.CH`
   ersetzen (Buchungsanfragen gehen an diese Adresse). Auch in `kontakt.html`
   die angezeigte E-Mail ersetzen.
2. **Telefon**: in `kontakt.html` Platzhalter `+41 00 000 00 00` ersetzen.
3. **Preise**: in `preise.html` die Tabelle – momentan «auf Anfrage».
4. **Gästestimmen**: in `index.html` sind drei Beispiel-Zitate mit
   Platzhaltern («Beispielstimme») – durch echte Gäste-Reviews ersetzen.
5. **Belegte Zeiträume**: in `js/availability.js` im Array `blockedRanges`
   (Format `JJJJ-MM-TT`, `to` = Abreisetag, ist frei). Beispiel-Eintrag löschen.

## Fotos

Alle Bilder in `images/` (`photo-01.jpg` bis `photo-42.jpg`), bereits
aufgewertet (wärmer, mehr Kontrast). Neue Fotos als `photo-43.jpg` usw.
ablegen und in `js/main.js` die Zahl bei `PHOTOS` anpassen (aktuell 42).
Querformat-Fotos für die Galerie in `LANDSCAPE`-Liste eintragen.

## Veröffentlichen (GitHub Pages)

Repo öffentlich machen (Settings → Danger Zone → Change visibility → Public),
dann Settings → Pages → Source: *Deploy from a branch* → Branch: `main`,
Ordner: `/ (root)` → Save. Live unter
`https://olafderzweite730.github.io/Heidi-Chalet/`.

## Struktur

- `css/style.css` – Gestaltung (mobile-first, warme Creme/Lärche-Palette)
- `js/i18n.js` – englische Übersetzungen
- `js/main.js` – Kalender, Sprachumschalter, Galerie, Formular
- `js/availability.js` – E-Mail-Adresse und belegte Zeiträume

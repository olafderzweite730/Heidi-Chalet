# Chalet Heidi – Beatenberg

Statische Website für das Ferienchalet Heidi in Beatenberg (Berner Oberland).
Deutsch + Englisch, Verfügbarkeitskalender, Buchungsanfrage per E-Mail.

## Wichtig: Zwei Dinge einrichten

### 1. E-Mail-Adresse für Buchungsanfragen

In `js/availability.js` oben `DEINE-EMAIL@BEISPIEL.CH` durch die eigene
E-Mail-Adresse ersetzen. Anfragen öffnen dann das E-Mail-Programm des Gasts mit
vorausgefüllter Nachricht an diese Adresse.

### 2. Belegte Zeiträume pflegen

Ebenfalls in `js/availability.js` im Array `blockedRanges` eintragen.
Beispiel – vom 6. Februar bis inklusive 13. Februar 2027 belegt:

```js
const blockedRanges = [
  { from: "2026-12-20", to: "2027-01-06", note: "Weihnachten" },
  { from: "2027-02-06", to: "2027-02-13", note: "Winterferien" }
];
```

- Format: `JJJJ-MM-TT`
- `from` und `to` sind inklusive (belegte Nächte dazwischen, `to` = Abreisetag ist frei)
- Der Beispiel-Eintrag kann gelöscht werden.

## Fotos

Alle Bilder liegen in `images/` (`photo-01.jpg` bis `photo-42.jpg`).
Neue Fotos einfach als `photo-43.jpg` usw. dazulegen und in `js/main.js`
die Zahl bei `PHOTOS` anpassen (aktuell 42).

## Veröffentlichen (GitHub Pages)

Repo auf GitHub → **Settings → Pages** → Source: *Deploy from a branch* →
Branch: `main`, Ordner: `/ (root)` → Save.
Die Website ist dann unter `https://olafderzweite730.github.io/Heidi-Chalet/` erreichbar.

## Struktur

- `index.html` – Seiteninhalt (Texte zweisprachig über `data-i18n`-Attribute)
- `css/style.css` – Gestaltung (Alpine-Eleganz-Design)
- `js/main.js` – Kalender, Sprachumschalter, Galerie, Anfrage-Formular
- `js/availability.js` – E-Mail-Adresse und belegte Zeiträume

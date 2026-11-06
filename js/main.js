const PHOTO_ORDER = [34, 35, 33, 32, 41, 22, 28, 23, 27, 36, 12, 38, 42, 37, 39, 15, 19, 17, 30, 25, 26, 29, 40, 18, 24, 21, 20, 9, 5, 2, 10, 13, 4, 7, 11, 14, 16, 6, 1, 3, 8];
const PHOTOS = PHOTO_ORDER.map((n) => `images/photo-${String(n).padStart(2, "0")}.jpg`);
const LANDSCAPE = [1, 4, 5, 6, 7, 10, 14, 19, 34, 35, 36, 39, 41, 42];

let lang = "de";
let calDate = new Date();
calDate.setDate(1);
let selArrival = null;
let selDeparture = null;

function meta(key) {
  return lang === "en" ? I18N_EN[key] : DE_META[key];
}

function applyLanguage() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (lang === "en" && I18N_EN[key] !== undefined) {
      if (!el.dataset.deHtml) el.dataset.deHtml = el.innerHTML;
      el.innerHTML = I18N_EN[key];
    } else if (el.dataset.deHtml) {
      el.innerHTML = el.dataset.deHtml;
    }
  });
  document.documentElement.lang = lang;
  const toggle = document.getElementById("langToggle");
  if (toggle) toggle.textContent = lang === "de" ? "EN" : "DE";
  renderCalendar();
}

function toISO(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function isBlocked(dateStr) {
  return blockedRanges.some((r) => dateStr >= r.from && dateStr <= r.to);
}

function rangeHasBlocked(arrival, departure) {
  const d = new Date(arrival);
  const end = new Date(departure);
  end.setDate(end.getDate() - 1);
  while (d <= end) {
    if (isBlocked(toISO(d))) return true;
    d.setDate(d.getDate() + 1);
  }
  return false;
}

function renderCalendar() {
  const cal = document.getElementById("calendar");
  if (!cal) return;
  cal.innerHTML = "";
  const months = meta("months");
  const dows = meta("dows");

  const head = document.createElement("div");
  head.className = "cal-head";
  const prev = document.createElement("button");
  prev.className = "cal-nav";
  prev.textContent = "‹";
  prev.addEventListener("click", () => { calDate.setMonth(calDate.getMonth() - 1); renderCalendar(); });
  const title = document.createElement("div");
  title.className = "cal-title";
  title.textContent = `${months[calDate.getMonth()]} ${calDate.getFullYear()}`;
  const next = document.createElement("button");
  next.className = "cal-nav";
  next.textContent = "›";
  next.addEventListener("click", () => { calDate.setMonth(calDate.getMonth() + 1); renderCalendar(); });
  head.append(prev, title, next);
  cal.appendChild(head);

  const grid = document.createElement("div");
  grid.className = "cal-grid";
  dows.forEach((d) => {
    const el = document.createElement("div");
    el.className = "cal-dow";
    el.textContent = d;
    grid.appendChild(el);
  });

  const year = calDate.getFullYear();
  const month = calDate.getMonth();
  const firstDow = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < firstDow; i++) {
    const el = document.createElement("div");
    el.className = "cal-day empty";
    grid.appendChild(el);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const d = new Date(year, month, day);
    const iso = toISO(d);
    const el = document.createElement("div");
    el.className = "cal-day";
    el.textContent = day;
    if (d < today) el.classList.add("past");
    else if (isBlocked(iso)) el.classList.add("blocked");
    else {
      if (selArrival && iso === selArrival) el.classList.add("selected");
      if (selDeparture && iso === selDeparture) el.classList.add("selected");
      if (selArrival && selDeparture && iso > selArrival && iso < selDeparture) el.classList.add("in-range");
      el.addEventListener("click", () => selectDate(iso));
    }
    grid.appendChild(el);
  }
  cal.appendChild(grid);
}

function selectDate(iso) {
  const arrivalInput = document.getElementById("fArrival");
  const departureInput = document.getElementById("fDeparture");
  if (!arrivalInput || !departureInput) return;
  if (!selArrival || (selArrival && selDeparture)) {
    selArrival = iso;
    selDeparture = null;
    arrivalInput.value = iso;
    departureInput.value = "";
  } else {
    if (iso <= selArrival) {
      selArrival = iso;
      arrivalInput.value = iso;
    } else if (rangeHasBlocked(selArrival, iso)) {
      selArrival = iso;
      selDeparture = null;
      arrivalInput.value = iso;
      departureInput.value = "";
    } else {
      selDeparture = iso;
      departureInput.value = iso;
    }
  }
  renderCalendar();
}

function buildGallery() {
  const gallery = document.getElementById("gallery");
  if (!gallery) return;
  PHOTOS.forEach((src) => {
    const num = parseInt(src.match(/(\d+)/)[1], 10);
    const img = document.createElement("img");
    img.src = src;
    img.alt = "Chalet Heidi Beatenberg";
    img.loading = "lazy";
    img.className = LANDSCAPE.includes(num) ? "wide" : "tall";
    img.addEventListener("click", () => openLightbox(src));
    gallery.appendChild(img);
  });
}

function openLightbox(src) {
  const lb = document.createElement("div");
  lb.className = "lightbox";
  const img = document.createElement("img");
  img.src = src;
  lb.appendChild(img);
  lb.addEventListener("click", () => lb.remove());
  document.body.appendChild(lb);
}

function initForm() {
  const form = document.getElementById("bookingForm");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const arrival = document.getElementById("fArrival").value;
    const departure = document.getElementById("fDeparture").value;
    const err = document.getElementById("formError");
    if (!arrival || !departure || departure <= arrival) {
      err.hidden = false;
      return;
    }
    if (rangeHasBlocked(arrival, departure)) {
      err.hidden = false;
      return;
    }
    err.hidden = true;
    const name = document.getElementById("fName").value;
    const email = document.getElementById("fEmail").value;
    const guests = document.getElementById("fGuests").value;
    const message = document.getElementById("fMessage").value;
    const body = [
      `${meta("mail_name")}: ${name}`,
      `${meta("mail_email")}: ${email}`,
      `${meta("mail_arrival")}: ${arrival}`,
      `${meta("mail_departure")}: ${departure}`,
      `${meta("mail_guests")}: ${guests}`,
      "",
      `${meta("mail_message")}:`,
      message
    ].join("\n");
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(meta("mail_subject"))}&body=${encodeURIComponent(body)}`;
  });
}

const toggleBtn = document.getElementById("langToggle");
if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    lang = lang === "de" ? "en" : "de";
    applyLanguage();
  });
}

const burger = document.getElementById("burger");
if (burger) {
  burger.addEventListener("click", () => document.getElementById("navLinks").classList.toggle("open"));
}

document.querySelectorAll(".nav-links a").forEach((a) => {
  a.addEventListener("click", () => document.getElementById("navLinks").classList.remove("open"));
});

buildGallery();
renderCalendar();
initForm();

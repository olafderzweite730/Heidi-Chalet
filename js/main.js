const I18N = {
  en: {
    nav_chalet: "The Chalet",
    nav_gallery: "Gallery",
    nav_location: "Location",
    nav_availability: "Availability",
    nav_contact: "Enquire",
    hero_kicker: "Beatenberg · Bernese Oberland · 1250 m a.s.l.",
    hero_sub: "Holiday chalet with a unique view of the Eiger, Mönch and Jungfrau",
    hero_btn_availability: "Check availability",
    hero_btn_book: "Booking enquiry",
    fact_altitude: "Altitude",
    fact_interlaken: "from Interlaken",
    fact_rooms: "Rooms",
    fact_view: "View",
    chalet_eyebrow: "Welcome",
    chalet_title: "What you will love about this place",
    chalet_p1: "Our Chalet Heidi is located in the beautiful Bernese Oberland near Beatenberg. The simple but lovingly furnished house offers a unique view of the Eiger, Mönch and Jungfrau.",
    chalet_p2: "Whether a family holiday or a relaxing retreat – car-free and with its own little forest – Chalet Heidi is the perfect base to explore the picturesque Bernese Oberland. Peace and nature will shape your holiday.",
    chalet_p3: "The chalet is very quiet, in the middle of nature, with meadows all around the house. The garden with a fireplace and a barbecue spot in the forest invites you to linger.",
    features_title: "Amenities",
    feature_1: "3 rooms on the 1st floor with bath and WC",
    feature_2: "Living room with TV on the ground floor",
    feature_3: "Bedroom and kitchen on the ground floor",
    feature_4: "Shower/WC on the ground floor",
    feature_5: "Balcony with a beautiful view",
    feature_6: "Garden with fireplace and barbecue spot in the forest",
    feature_7: "Simple kitchen with everything you need",
    feature_8: "Own little forest, car-free",
    gallery_eyebrow: "Pictures",
    gallery_title: "Gallery",
    location_eyebrow: "The surroundings",
    location_title: "What you will love about the neighbourhood",
    location_p1: "There are only a few neighbours – tranquillity is guaranteed. From the nearest bus stop it is a 20-minute walk, from the car park about 10 minutes on foot. The path leads along a hiking trail: a backpack and good shoes are a must.",
    location_p2: "Beatenberg lies at about 1250 m above sea level; the drive from Interlaken takes about 15 minutes. The village is the ideal starting point for hikes, trips to the Niederhorn and the whole Interlaken region.",
    cal_eyebrow: "Dates",
    cal_title: "Availability",
    cal_hint: "Click your arrival and departure dates to select your preferred dates. Booked periods are marked in red.",
    legend_free: "available",
    legend_blocked: "booked",
    legend_selected: "your selection",
    contact_eyebrow: "Reservation",
    contact_title: "Booking enquiry",
    contact_intro: "Send us your enquiry – we will get back to you as soon as possible.",
    form_name: "Name",
    form_email: "Email",
    form_arrival: "Arrival",
    form_departure: "Departure",
    form_guests: "Guests",
    form_message: "Message",
    form_submit: "Send enquiry",
    form_error: "The selected period contains booked days. Please choose different dates.",
    footer_region: "Bernese Oberland, Switzerland",
    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    dows: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    mail_subject: "Booking enquiry Chalet Heidi",
    mail_body_name: "Name",
    mail_body_email: "Email",
    mail_body_arrival: "Arrival",
    mail_body_departure: "Departure",
    mail_body_guests: "Guests",
    mail_body_message: "Message"
  }
};

const DE = {
  months: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
  dows: ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"],
  mail_subject: "Buchungsanfrage Chalet Heidi",
  mail_body_name: "Name",
  mail_body_email: "E-Mail",
  mail_body_arrival: "Anreise",
  mail_body_departure: "Abreise",
  mail_body_guests: "Personen",
  mail_body_message: "Nachricht"
};

const PHOTOS = Array.from({ length: 42 }, (_, i) => `images/photo-${String(i + 1).padStart(2, "0")}.jpg`);
const LANDSCAPE = [1, 4, 5, 6, 7, 10, 14, 19, 34, 35, 36, 39, 41, 42];

let lang = "de";
let calDate = new Date();
calDate.setDate(1);
let selArrival = null;
let selDeparture = null;

function t(key) {
  if (lang === "de") return key.startsWith("mail_") || key === "months" || key === "dows" ? DE[key] : null;
  return I18N.en[key];
}

function applyLanguage() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (lang === "en" && I18N.en[key] !== undefined) {
      if (!el.dataset.deHtml) el.dataset.deHtml = el.innerHTML;
      el.innerHTML = I18N.en[key];
    } else if (el.dataset.deHtml) {
      el.innerHTML = el.dataset.deHtml;
    }
  });
  document.documentElement.lang = lang;
  document.getElementById("langToggle").textContent = lang === "de" ? "EN" : "DE";
  renderCalendar();
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

function toISO(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function renderCalendar() {
  const cal = document.getElementById("calendar");
  cal.innerHTML = "";
  const months = lang === "en" ? I18N.en.months : DE.months;
  const dows = lang === "en" ? I18N.en.dows : DE.dows;

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
  if (!selArrival || (selArrival && selDeparture)) {
    selArrival = iso;
    selDeparture = null;
    arrivalInput.value = iso;
    departureInput.value = "";
  } else {
    if (iso <= selArrival) {
      selArrival = iso;
      arrivalInput.value = iso;
    } else {
      if (rangeHasBlocked(selArrival, iso)) {
        selArrival = iso;
        selDeparture = null;
        arrivalInput.value = iso;
        departureInput.value = "";
      } else {
        selDeparture = iso;
        departureInput.value = iso;
      }
    }
  }
  renderCalendar();
}

function buildGallery() {
  const gallery = document.getElementById("gallery");
  PHOTOS.forEach((src) => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = "Chalet Heidi Beatenberg";
    img.loading = "lazy";
    img.className = LANDSCAPE.includes(PHOTOS.indexOf(src) + 1) ? "wide" : "tall";
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

document.getElementById("langToggle").addEventListener("click", () => {
  lang = lang === "de" ? "en" : "de";
  applyLanguage();
});

document.getElementById("burger").addEventListener("click", () => {
  document.getElementById("navLinks").classList.toggle("open");
});

document.querySelectorAll('.nav-links a').forEach((a) => {
  a.addEventListener("click", () => document.getElementById("navLinks").classList.remove("open"));
});

document.getElementById("bookingForm").addEventListener("submit", (e) => {
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
  const subject = t("mail_subject");
  const body = [
    `${t("mail_body_name")}: ${name}`,
    `${t("mail_body_email")}: ${email}`,
    `${t("mail_body_arrival")}: ${arrival}`,
    `${t("mail_body_departure")}: ${departure}`,
    `${t("mail_body_guests")}: ${guests}`,
    "",
    `${t("mail_body_message")}:`,
    message
  ].join("\n");
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

buildGallery();
renderCalendar();

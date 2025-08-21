// // --- START --- //
const today = new Date();
const dateToday = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate()
);
let dateSelected = dateToday;
const monthNames = [
  "Januar",
  "Februar",
  "März",
  "April",
  "Mai",
  "Juni",
  "Juli",
  "August",
  "September",
  "Oktober",
  "November",
  "Dezember",
];

const back = document
  .getElementById("buttonBackwards")
  .addEventListener("click", () => {
    changeMonth(-1);
  });
const forward = document
  .getElementById("buttonForward")
  .addEventListener("click", () => {
    changeMonth(1);
  });

function generateCalender(date) {
  const year = date.getFullYear();
  const monthIndex = date.getMonth();
  const monthName = monthNames[monthIndex];
  const dayNumber = date.getDate();
  const weekDayNumber = date.getDay();
  generateHeader(year, monthName, dayNumber);
  generateInfotext(date, year, monthName, dayNumber, weekDayNumber, monthIndex);
  generateTableHeader(monthName, year);
  createCalendarTable(date, dateToday, year, monthIndex);
  generateHistoryHeader(dayNumber, monthName);
  generateHistoryList(monthIndex, dayNumber, 5);
}

function generateCalendarTable(date) {
  const year = date.getFullYear();
  const monthIndex = date.getMonth();
  const monthName = monthNames[monthIndex];
  generateTableHeader(monthName, year);
  createCalendarTable(date, dateToday, year, monthIndex);
}

function generateHeader(year, monthName, day) {
  const headline = document.getElementsByClassName("headline")[0];
  headline.innerText = `Kalenderblatt vom ${day}. ${monthName} ${year}`;
}

function generateInfotext(
  date,
  year,
  monthName,
  day,
  weekDayNumber,
  monthIndex
) {
  const lastDayInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const dayNames = [
    "Sonntag",
    "Montag",
    "Dienstag",
    "Mittwoch",
    "Donnerstag",
    "Freitag",
    "Samstag",
  ];
  const dayName = dayNames[weekDayNumber];
  const holiday = isHoliday(date)
    ? isHoliday(date)
    : "kein gesetzlicher Feiertag";
  const remainingDaysOfYear = getRemainingDaysOfYear(date);
  const ordinalWeekday = getOrdinalWeekday(day);
  const dayCount = getPassedDaysOfYear(date);

  const infoText = document.getElementsByClassName("infoText")[0];
  infoText.innerText = `Der ${day}. ${monthName} ${year} ist ein ${dayName}\
    und zwar der ${ordinalWeekday} ${dayName} im ${monthName} des Jahres ${year}.\
    Es handelt sich um den ${dayCount}. Tag des Jahres, was bedeutet,\
    dass es noch ${remainingDaysOfYear} Tage bis zum Jahresende sind.\
    Der ${monthName} hat insgesamt ${lastDayInMonth} Tage.\
    Heute ist ${holiday} in Deutschland.`;
}

function generateTableHeader(monthName, year) {
  const captionTitle = document.getElementsByClassName("captionTitle")[0];
  captionTitle.innerText = `${monthName} ${year}`;
}

function createCalendarTable(date, today, year, monthIndex) {
  let calendarFirstInMonth = new Date(year, monthIndex, 1);
  let calendarFirstInMonthWeekday = calendarFirstInMonth.getDay();
  let calendarFirstDay = new Date(
    year,
    monthIndex,
    1 - ((calendarFirstInMonthWeekday - 1 + 7) % 7)
  );
  let calendarLastInMonth = new Date(year, monthIndex + 1, 0);
  let calendarLastDay = new Date(
    year,
    monthIndex,
    calendarLastInMonth.getDate() + ((7 - calendarLastInMonth.getDay()) % 7)
  );
  const calendarTable = document.getElementById("calendarTableBody");
  calendarTable.innerHTML = "";
  let tr;
  while (calendarFirstDay <= calendarLastDay) {
    if (calendarFirstDay.getDay() === 1) {
      tr = document.createElement("tr");
    }
    let td = document.createElement("td");
    td.textContent = calendarFirstDay.getDate();
    if (calendarFirstDay.getMonth() !== date.getMonth()) {
      td.classList.add("otherMonth");
    }
    if (today.getTime() === calendarFirstDay.getTime()) {
      td.classList.add("today");
    }
    if (isHoliday(calendarFirstDay)) {
      td.classList.add("holiday");
    }
    tr.appendChild(td);
    if (calendarFirstDay.getDay() === 0) {
      calendarTable.appendChild(tr);
    }
    calendarFirstDay.setDate(calendarFirstDay.getDate() + 1);
  }
}

function generateHistoryHeader(day, monthName) {
  const headline = document.getElementsByClassName("headline")[1];
  headline.innerText = `Historische Ereignisse am: ${day}. ${monthName}`;
}

async function generateHistoryList(monthIndex, day, count) {
  const list = document.getElementById("listData");
  for (let i = 0; i < count; i++) {
    const listItem = document.createElement("li");
    try {
      const response = await fetch(
        `https://history.muffinlabs.com/date/${monthIndex + 1}/${day}`
      );
      const data = await response.json();
      const historicalEvent = data.data.Events[data.data.Events.length - i - 1];
      listItem.innerText = `${historicalEvent.year}: ${historicalEvent.text}`;
    } catch (error) {
      console.error("Fehler beim Laden:", error);
      throw error;
    }
    list.appendChild(listItem);
  }
}

function getRemainingDaysOfYear(date) {
  const year = date.getFullYear();
  const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  const totalDaysInYear = isLeapYear ? 366 : 365;
  return totalDaysInYear - getPassedDaysOfYear(date);
}
function getPassedDaysOfYear(date) {
  const year = date.getFullYear();
  const dateStart = new Date(year, 0, 1);
  const diffInMS = date - dateStart;
  return Math.floor(diffInMS / 86400000) + 1;
}

// // Berechnung von Ostersonntag nach Gauß:
function getEasterSunday(year) {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const n = (h + l - 7 * m + 114) % 31;
  const day = n + 1;
  const month = Math.floor((h + l - 7 * m + 114) / 31) - 1;
  return new Date(year, month, day);
}
function getAscensionDay(year) {
  const easterSunday = getEasterSunday(year);
  return new Date(easterSunday.getTime() + 39 * 24 * 60 * 60 * 1000);
}
function getPentecostSunday(year) {
  const easterSunday = getEasterSunday(year);
  return new Date(easterSunday.getTime() + 49 * 24 * 60 * 60 * 1000);
}
function isHoliday(date) {
  const year = date.getFullYear();

  // Feste Feiertage:
  const newYearsDay = new Date(year, 0, 1);
  const laborDay = new Date(year, 4, 1);
  const germanUnityDay = new Date(year, 9, 3);
  const fistChristmasDay = new Date(year, 11, 25);
  const secondChristmasDay = new Date(year, 11, 26);

  // Bewegliche Feiertage:
  const easterSunday = getEasterSunday(year);
  const easterMonday = new Date(easterSunday);
  easterMonday.setDate(easterMonday.getDate() + 1);
  const corpusChristi = new Date(easterSunday);
  corpusChristi.setDate(corpusChristi.getDate() + 60);
  const goodFriday = new Date(easterSunday);
  goodFriday.setDate(goodFriday.getDate() - 2);
  const pentecostSunday = getPentecostSunday(year);
  const pentecostMonday = new Date(pentecostSunday);
  pentecostMonday.setDate(pentecostMonday.getDate() + 1);
  const AscensionDay = getAscensionDay(year);

  // Array für die Feiertage:
  const holidays = [
    { date: newYearsDay, name: "Neujahr" },
    { date: laborDay, name: "Tag der Arbeit" },
    { date: germanUnityDay, name: "Tag der Deutschen Einheit" },
    { date: fistChristmasDay, name: "der erste Weihnachtstag" },
    { date: secondChristmasDay, name: "der zweite Weihnachtstag" },
    { date: easterSunday, name: "Ostersonntag" },
    { date: easterMonday, name: "Ostermontag" },
    { date: corpusChristi, name: "Fronleichnam" },
    { date: goodFriday, name: "Karfreitag" },
    { date: pentecostSunday, name: "Pfingstsonntag" },
    { date: pentecostMonday, name: "Pfingstmontag" },
    { date: AscensionDay, name: "Christi Himmelfahrt" },
  ];
  const currentHoliday = holidays.find(
    (holiday) => holiday.date.getTime() === date.getTime()
  );

  return currentHoliday ? currentHoliday.name : false;
}

function getOrdinalWeekday(day) {
  if (day < 8) return "erste";
  if (day < 15) return "zweite";
  if (day < 22) return "dritte";
  if (day < 29) return "vierte";
  return "fünfte";
}

function changeMonth(direction) {
  const year = dateSelected.getFullYear();
  const month = dateSelected.getMonth();
  dateSelected = new Date(year, month + direction, 1);
  generateCalendarTable(dateSelected);
}

generateCalender(dateToday);

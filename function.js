// // --- START --- //
const today = new Date();
const dateToday = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate()
);
let dateSelected = dateToday;

function generateCalender(date) {
  const year = date.getFullYear();
  const monthIndex = date.getMonth();
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
  const monthName = monthNames[monthIndex];
  const day = date.getDate();
  const dayNumber = date.getDay();
  generateHeader(year, monthName, day);
  generateInfotext(date, year, monthName, day, dayNumber, monthIndex);
  generateTableHeader(monthName, year);
  createCalendarTable(date, dateToday, year, monthIndex);
  generateHistoryHeader(day, monthName);
  generateHistoryList(monthIndex, day, 5);
}

function generateHeader(year, monthName, day) {
  const headline = document.getElementsByClassName("headline")[0];
  headline.innerText = `Kalenderblatt vom ${day}. ${monthName} ${year}`;
}

function generateInfotext(date, year, monthName, day, dayNumber, monthIndex) {
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
  const dayName = dayNames[dayNumber];
  const holiday = isHoliday(date)
    ? isHoliday(date)
    : "kein gesetzlicher Feiertag";
  const ordinalWeekday = "xxx";
  const remainingDaysOfYear = "xxx";
  const dayCount = "xxx";

  const infoText = document.getElementsByClassName("infoText")[0];
  infoText.innerText = `Der ${day}. ${monthName} ${year} ist ein ${dayName} und zwar
  der ${ordinalWeekday} ${dayName} im ${monthName} des Jahres ${year}. Es handelt sich um den ${dayCount} Tag des
  Jahres, was bedeutet, dass es noch ${remainingDaysOfYear} Tage bis zum Jahresende sind. Der ${monthName} hat
  insgesamt ${lastDayInMonth} Tage. Heute ist ${holiday} in Deutschland`;
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
// createCalendarTable(dateSelected);

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

// let isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
// let daysInYear = getDaysInYear(year);

// function getDaysInYear() {
//   if (isLeapYear === true) return 366;
//   else return 365;
// }
// document.querySelectorAll('[data-role="year"]').forEach((el) => {
//   el.textContent = year;
// });

// // Um herauszufinden wie viele Tage vergangen sind,
// // vergleiche ich das aktuelle Datum mit dem 01.01 diesen Jahres
// // und ermittle die Differenz:
// const dateStart = new Date(year, 0, 1);
// let diffInMS = dateToday - dateStart;
// let diffInDays = Math.floor(diffInMS / 86400000) + 1;
// let finalDiffInDays = diffInDays + ".";
// document.getElementById("diffStart").textContent = finalDiffInDays;

// // Um herauszufinden wie viele Tage es noch bis zum Jahresende sind,
// // ziehe ich die aktuellen Tage von den gesamten Tagen im Jahr ab:
// let remainingDays = daysInYear - diffInDays;
// document.getElementById("remainingDays").textContent = remainingDays;

// // Der wievielte des tages ist es in dem Monat:
// let day = dateToday.getDate();
// let wievielte = getWievielte(day);
// document.getElementById("wievielte").textContent = wievielte;

// // Damit das Datum korrekt ausgegeben wird, füge ich ein "." nach jedem Tag hinzu:

// const datePeriod = finalDatePeriod() + ".";
// document.querySelectorAll('[data-role="day"]').forEach((el) => {
//   el.textContent = datePeriod;
// });

// // Ermittlung des letzten Tages im aktuellen Monat:
// const lastDayInMonth = new Date(year, month + 1, 0).getDate();
// document.getElementById("lastDayInMonth").textContent = lastDayInMonth;

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
// Berechnung Christi Himmelfahrt anhand von Ostersonntag:
function getAscensionDay(year) {
  const easterSunday = getEasterSunday(year);
  return new Date(easterSunday.getTime() + 39 * 24 * 60 * 60 * 1000);
}
// Berechnung von Pfingstsonntag anhand von Ostersonntag:
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

// // --- Funktionen --- //

// function clickMonthButton() {
//   const monthButtonForward = document.getElementById("buttonForward");
//   const monthButtonBackwards = document.getElementById("buttonBackwards");
//   monthButtonForward.addEventListener("click", getNextMonth);
//   monthButtonBackwards.addEventListener("click", getPreviousMonth);
// }

// function getNextMonth() {
//   let nextMonth = new Date(year, month + 1, 1);
//   let nextMonth1 = createCalendarTable(nextMonth);
//   return nextMonth1;
// }

// function getPreviousMonth() {
//   let previousMonth = new Date(year, month - 1, 1);
//   let previousMonth1 = createCalendarTable(previousMonth);
//   return previousMonth1;
// }

// clickMonthButton();

// // Damit einzelne Zahlen sich nicht von den doppelten unterscheiden,
// // füge ich eine "0" vor die einzelnen Zahlen hinzu:
// function finalDatePeriod() {
//   if (day < 10) return "0" + day;
//   else return day;
// }
// // Der wievielte Wochentag im Monat:
// function getWievielte() {
//   if (day < 8) return "erste";
//   if (day < 15) return "zweite";
//   if (day < 22) return "dritte";
//   if (day < 29) return "vierte";
//   else return "fünfte";
// }

generateCalender(dateToday);

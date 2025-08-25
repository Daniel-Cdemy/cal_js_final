// // --- START --- //
const today = new Date();
let dateSelected = today;

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

const dayNames = [
  "Sonntag",
  "Montag",
  "Dienstag",
  "Mittwoch",
  "Donnerstag",
  "Freitag",
  "Samstag",
];

function render(date) {
  dateSelected = date;
  generateHeader(date);
  generateInfotext(date);
  generateTableHeader(date);
  generateTableButtons(date);
  createCalendarTable(date);
  generateHistoryHeader(date);
  generateHistoryList(date);
}

function changeMonth(direction) {
  const year = dateSelected.getFullYear();
  const month = dateSelected.getMonth();
  dateSelected = new Date(year, month + direction);
  render(dateSelected);
}

function main(initialDate = dateSelected) {
  const backBtn = document.getElementById("buttonBackwards");
  const fwdBtn = document.getElementById("buttonForward");

  backBtn.onclick = () => changeMonth(-1);
  fwdBtn.onclick = () => changeMonth(1);

  render(initialDate);
}

function generateHeader(date) {
  const year = date.getFullYear();
  const monthName = monthNames[date.getMonth()];
  const day = date.getDate();

  const headline = document.getElementsByClassName("headline")[0];
  headline.innerText = `Kalenderblatt vom
  ${day}. ${monthName} ${year}`;
}

function generateInfotext(date) {
  const year = date.getFullYear();
  const monthIndex = date.getMonth();
  const monthName = monthNames[monthIndex];
  const day = date.getDate();
  const weekDayNumber = date.getDay();

  const lastDayInMonth = new Date(year, monthIndex + 1, 0).getDate();
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

function generateTableHeader(date) {
  const year = date.getFullYear();
  const monthName = monthNames[date.getMonth()];
  const captionTitle = document.getElementsByClassName("captionTitle")[0];
  captionTitle.innerText = `${monthName} ${year}`;
}

function generateTableButtons(date) {
  const months = monthNames;
  const year = date.getFullYear();
  const monthIndex = date.getMonth();

  const buttonBackwards = document.getElementById("buttonBackwards");
  const buttonForward = document.getElementById("buttonForward");

  const prevIndex = (monthIndex - 1 + 12) % 12;
  const prevYear = monthIndex === 0 ? year - 1 : year;
  buttonBackwards.innerText = `${months[prevIndex]} ${prevYear}`;

  const nextIndex = (monthIndex + 1) % 12;
  const nextYear = monthIndex === 11 ? year + 1 : year;
  buttonForward.innerText = `${months[nextIndex]} ${nextYear}`;
}

function createCalendarTable(date) {
  const year = date.getFullYear();
  const monthIndex = date.getMonth();

  const calendarFirstInMonth = new Date(year, monthIndex, 1);
  const calendarFirstInMonthWeekday = calendarFirstInMonth.getDay();

  let dateCount = new Date(
    year,
    monthIndex,
    1 - ((calendarFirstInMonthWeekday - 1 + 7) % 7)
  );

  const calendarLastInMonth = new Date(year, monthIndex + 1, 0);
  const calendarLastDay = new Date(
    year,
    monthIndex,
    calendarLastInMonth.getDate() + ((7 - calendarLastInMonth.getDay()) % 7)
  );

  const calendarTable = document.getElementById("calendarTableBody");
  calendarTable.innerHTML = "";

  while (dateCount <= calendarLastDay) {
    const currentDate = new Date(dateCount);

    if (dateCount.getDay() === 1) {
      tr = document.createElement("tr");
    }

    const td = document.createElement("td");
    td.addEventListener("click", () => {
      dateSelected = currentDate;
      render(currentDate);
    });

    if (dateSelected.getTime() === dateCount.getTime()) {
      td.classList.add("dateSelected");
    }

    if (today.getTime() === dateCount.getTime()) {
      td.classList.add("today");
    }

    td.textContent = dateCount.getDate();

    if (dateCount.getMonth() !== date.getMonth()) {
      td.classList.add("otherMonth");
    }
    if (isHoliday(dateCount)) {
      td.classList.add("holiday");
    }

    tr.appendChild(td);

    if (dateCount.getDay() === 0) {
      calendarTable.appendChild(tr);
    }

    dateCount.setDate(dateCount.getDate() + 1);
  }
}

function generateHistoryHeader(date) {
  const day = date.getDate();
  const monthName = monthNames[date.getMonth()];
  const headline = document.getElementsByClassName("headline")[1];
  headline.innerText = `Historische Ereignisse am
  ${day}. ${monthName}:`;
}

async function generateHistoryList(date) {
  const monthIndex = date.getMonth() + 1;
  const day = date.getDate();

  const list = document.getElementById("listData");
  list.innerHTML = "";

  for (let i = 0; i < 5; i++) {
    const listItem = document.createElement("li");
    try {
      const response = await fetch(
        `https://history.muffinlabs.com/date/${monthIndex}/${day}`
      );
      const data = await response.json();
      const historicalEvent = data.data.Events[data.data.Events.length - i - 1];
      if (historicalEvent.text.length > 250) {
        historicalEvent.text = `${historicalEvent.text.substring(0, 250)}...`;
      }
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

  const newYearsDay = new Date(year, 0, 1);
  const laborDay = new Date(year, 4, 1);
  const germanUnityDay = new Date(year, 9, 3);
  const fistChristmasDay = new Date(year, 11, 25);
  const secondChristmasDay = new Date(year, 11, 26);
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

document.addEventListener("DOMContentLoaded", () => main());

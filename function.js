// // --- START --- //

// const dateToday = new Date();
// const weekday = dateToday.getDay();
// // Array für Wochentagnamen:
// const dayNames = [
//   "Sonntag",
//   "Montag",
//   "Dienstag",
//   "Mittwoch",
//   "Donnerstag",
//   "Freitag",
//   "Samstag",
// ];
// const dayName = dayNames[weekday];
// document.querySelectorAll('[data-role="dayname"]').forEach((el) => {
//   el.textContent = dayNames[weekday];
// });

// const month = dateToday.getMonth();
// // Array für Monatsnamen:
// const monthNames = [
//   "Januar",
//   "Februar",
//   "März",
//   "April",
//   "Mai",
//   "Juni",
//   "Juli",
//   "August",
//   "September",
//   "Oktober",
//   "November",
//   "Dezember",
// ];
// const monthName = monthNames[month];
// document.querySelectorAll('[data-role="monthname"]').forEach((el) => {
//   el.textContent = monthNames[month];
// });

// const year = dateToday.getFullYear();
// Um die vergangenen und verbleibenden Tage richtig zu berechnen,
// nutze ich eine Formel für die Schaltjahre:
// let isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
// let daysInYear = getDaysInYear(year);
// document.querySelectorAll('[data-role="year"]').forEach((el) => {
//   el.textContent = year;
// });

// Um herauszufinden wie viele Tage vergangen sind,
// vergleiche ich das aktuelle Datum mit dem 01.01 diesen Jahres
// und ermittle die Differenz:
// const dateStart = new Date(year, 0, 1);
// let diffInMS = dateToday - dateStart;
// let diffInDays = Math.floor(diffInMS / 86400000) + 1;
// let finalDiffInDays = diffInDays + ".";
// document.getElementById("diffStart").textContent = finalDiffInDays;

// Um herauszufinden wie viele Tage es noch bis zum Jahresende sind,
// ziehe ich die aktuellen Tage von den gesamten Tagen im Jahr ab:
// let remainingDays = daysInYear - diffInDays;
// document.getElementById("remainingDays").textContent = remainingDays;

// // Der wievielte des tages ist es in dem Monat:
// let day = dateToday.getDate();
// let wievielte = getWievielte(day);
// document.getElementById("wievielte").textContent = wievielte;

// Damit das Datum korrekt ausgegeben wird, füge ich ein "." nach jedem Tag hinzu:
// datePeriod = finalDatePeriod() + ".";
// document.querySelectorAll('[data-role="day"]').forEach((el) => {
//   el.textContent = datePeriod;
// });

// // Ermittlung des letzten Tages im aktuellen Monat:
// const lastDayInMonth = new Date(year, month + 1, 0).getDate();
// document.getElementById("lastDayInMonth").textContent = lastDayInMonth;

// // Feste Feiertage:

// const newYearsDay = new Date(year, 0, 1);
// const laborDay = new Date(year, 4, 1);
// const germanUnityDay = new Date(year, 9, 3);
// const fistChristmasDay = new Date(year, 11, 25);
// const secondChristmasDay = new Date(year, 11, 26);

// // Bewegliche Feiertage:

// const easterSunday = getEasterSunday(year);
// // Berechnung Ostermontag anhand von Ostersonntag:
// const easterMonday = new Date(easterSunday);
// easterMonday.setDate(easterMonday.getDate() + 1);
// // Berechnung von Fronleichnam anhand von Ostersonntag:
// const corpusChristi = new Date(easterSunday);
// corpusChristi.setDate(corpusChristi.getDate() + 60);
// // Berechnung Karfreitag anhand von Ostersonntag:
// const goodFriday = new Date(easterSunday);
// goodFriday.setDate(goodFriday.getDate() - 2);
// const pentecostSunday = getPentecostSunday(year);
// // Pfingstmontag anhand von Pfingstsonntag:
// const pentecostMonday = new Date(pentecostSunday);
// pentecostMonday.setDate(pentecostMonday.getDate() + 1);
// document.getElementById("holiday").textContent = isHoliday();

// // Array für die Feiertage:
// let holiday = [
//   newYearsDay,
//   laborDay,
//   germanUnityDay,
//   fistChristmasDay,
//   secondChristmasDay,
//   easterSunday,
//   easterMonday,
//   corpusChristi,
//   goodFriday,
//   pentecostSunday,
//   pentecostMonday,
// ];

// // Funktion um das Kalenderblatt im HTML zu generieren:
// function createCalendarTable(today) {
//   let year = today.getFullYear();
//   let month = today.getMonth();
//   // Den ersten Tag des aktuellen Monats feststellen:
//   let calendarFirstInMonth = new Date(year, month, 1);
//   // Was ist der erste für ein Wochentag:
//   let calendarFirstInMonthWeekday = calendarFirstInMonth.getDay();
//   // Montag auf "0" setzen, damit der Kalender an einem Montag beginnt.
//   // (1-), damit der Kalender soviele Zellen zurück geht, bis ein Montag erreicht wird
//   let calendarFirstDay = new Date(
//     year,
//     month,
//     1 - ((calendarFirstInMonthWeekday - 1 + 7) % 7)
//   );
//   let calendarLastInMonth = new Date(year, month + 1, 0);
//   // Der Kalender endet pro Reihe auf einen Sonntag. Falls der Monat nicht
//   // an einem Sonntag endet, werden so viele Zellen addiert, bis Sonntag erreicht ist.
//   let calendarLastDay = new Date(
//     year,
//     month,
//     calendarLastInMonth.getDate() + ((7 - calendarLastInMonth.getDay()) % 7)
//   );
//   let datum = new Date(
//     calendarFirstDay.getFullYear(),
//     calendarFirstDay.getMonth(),
//     calendarFirstDay.getDate()
//   );
//   const calendarTable = document.getElementById("calendarTableBody");
//   // Variable tr anfangs leer, weil sie erst erzeugt wird, sobald eine neue Woche beginnt
//   let tr;
//   // Schleife starten, die so lange läuft bis der letzte tag
//   // in der Kalenderblattreihe erreicht oder überschritten wird:
//   while (datum <= calendarLastDay) {
//     // neue Tabellenreihe, wenn Montag ist:
//     if (datum.getDay() === 1) {
//       tr = document.createElement("tr");
//     }
//     let td = document.createElement("td");
//     // Text in Zelle auf aktuelle Tage im Monat setzen:
//     td.textContent = datum.getDate();
//     // prüfen, ob die Tage zu einem anderen Monat gehören:
//     if (datum.getMonth() !== today.getMonth()) {
//       td.classList.add("otherMonth");
//     }
//     // Prüfung ob das heutige Datum dieser Tag ist
//     if (
//       today.getMonth() === datum.getMonth() &&
//       today.getDate() === datum.getDate()
//     ) {
//       td.classList.add("today");
//     }
//     // Feiertage im Array durchgehen und prüfen ob Datum übereinstimmt:
//     for (let h of holiday) {
//       if (
//         h.getFullYear() === datum.getFullYear() &&
//         h.getMonth() === datum.getMonth() &&
//         h.getDate() === datum.getDate()
//       ) {
//         td.classList.add("holiday");
//       }
//     }
//     tr.appendChild(td);
//     // Wenn Sonntag erreicht ist, Reihe zu Ende:
//     if (datum.getDay() === 0) {
//       calendarTable.appendChild(tr);
//     }
//     // Datum um einen Tag erhöhen, um Schleife auf nächsten
//     // Kalendertag zu verschieben:
//     datum.setDate(datum.getDate() + 1);
//   }
// }
// // Funktion mit aktuellem Datum ausführen:
// createCalendarTable(dateToday);

// // --- Funktionen --- //

// Damit einzelne Zahlen sich nicht von den doppelten unterscheiden,
// füge ich eine "0" vor die einzelnen Zahlen hinzu:
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
// // Ausgabe ob Schaltjahr:
// function getDaysInYear() {
//   if (isLeapYear === true) return 366;
//   else return 365;
// }
// // Berechnung von Ostersonntag nach Gauß:
// function getEasterSunday(year) {
//   const a = year % 19;
//   const b = Math.floor(year / 100);
//   const c = year % 100;
//   const d = Math.floor(b / 4);
//   const e = b % 4;
//   const f = Math.floor((b + 8) / 25);
//   const g = Math.floor((b - f + 1) / 3);
//   const h = (19 * a + b - d - g + 15) % 30;
//   const i = Math.floor(c / 4);
//   const k = c % 4;
//   const l = (32 + 2 * e + 2 * i - h - k) % 7;
//   const m = Math.floor((a + 11 * h + 22 * l) / 451);
//   const n = (h + l - 7 * m + 114) % 31;
//   const day = n + 1;
//   const month = Math.floor((h + l - 7 * m + 114) / 31) - 1;
//   return new Date(year, month, day);
// }
// // Berechnung Christi Himmelfahrt anhand von Ostersonntag:
// function getAscensionDay(year) {
//   const easterSunday = getEasterSunday(year);
//   return new Date(easterSunday.getTime() + 39 * 24 * 60 * 60 * 1000);
// }
// // Berechnung von Pfingstsonntag anhand von Ostersonntag:
// function getPentecostSunday(year) {
//   const easterSunday = getEasterSunday(year);
//   return new Date(easterSunday.getTime() + 49 * 24 * 60 * 60 * 1000);
// }
// // Überprüfen ob heute ein Feiertag ist:
// function isHoliday() {
//   if (
//     dateToday.getDate() === newYearsDay.getDate() &&
//     dateToday.getMonth() === newYearsDay.getMonth() &&
//     dateToday.getFullYear() === newYearsDay.getFullYear()
//   ) {
//     return "ist Neujahr";
//   }
//   if (
//     dateToday.getDate() === corpusChristi.getDate() &&
//     dateToday.getMonth() === corpusChristi.getMonth() &&
//     dateToday.getFullYear() === corpusChristi.getFullYear()
//   ) {
//     return "ist Fronleichnam";
//   }
//   if (
//     dateToday.getDate() === pentecostMonday.getDate() &&
//     dateToday.getMonth() === pentecostMonday.getMonth() &&
//     dateToday.getFullYear() === pentecostMonday.getFullYear()
//   ) {
//     return "ist Pfingstmontag";
//   }
//   if (
//     dateToday.getDate() === fistChristmasDay.getDate() &&
//     dateToday.getMonth() === fistChristmasDay.getMonth() &&
//     dateToday.getFullYear() === fistChristmasDay.getFullYear()
//   ) {
//     return "ist der erste Weihnachtstag";
//   }
//   if (
//     dateToday.getDate() === secondChristmasDay.getDate() &&
//     dateToday.getMonth() === secondChristmasDay.getMonth() &&
//     dateToday.getFullYear() === secondChristmasDay.getFullYear()
//   ) {
//     return "ist der zweite Weihnachtstag";
//   }
//   if (
//     dateToday.getDate() === goodFriday.getDate() &&
//     dateToday.getMonth() === goodFriday.getMonth() &&
//     dateToday.getFullYear() === goodFriday.getFullYear()
//   ) {
//     return "ist Karfreitag";
//   }
//   if (
//     dateToday.getDate() === easterMonday.getDate() &&
//     dateToday.getMonth() === easterMonday.getMonth() &&
//     dateToday.getFullYear() === easterMonday.getFullYear()
//   ) {
//     return "ist Ostermontag";
//   }
//   if (
//     dateToday.getDate() === laborDay.getDate() &&
//     dateToday.getMonth() === laborDay.getMonth() &&
//     dateToday.getFullYear() === laborDay.getFullYear()
//   ) {
//     return "ist Tag der Arbeit";
//   }
//   if (
//     dateToday.getDate() === germanUnityDay.getDate() &&
//     dateToday.getMonth() === germanUnityDay.getMonth() &&
//     dateToday.getFullYear() === germanUnityDay.getFullYear()
//   ) {
//     return "ist Tag der Deutschen Einheit";
//   }
//   if (
//     dateToday.getDate() === getEasterSunday(year).getDate() &&
//     dateToday.getMonth() === getEasterSunday(year).getMonth() &&
//     dateToday.getFullYear() === getEasterSunday(year).getFullYear()
//   ) {
//     return "ist Ostersonntag";
//   }
//   if (
//     dateToday.getDate() === getAscensionDay(year).getDate() &&
//     dateToday.getMonth() === getAscensionDay(year).getMonth() &&
//     dateToday.getFullYear() === getAscensionDay(year).getFullYear()
//   ) {
//     return "ist Christi Himmelfahrt";
//   }
//   if (
//     dateToday.getDate() === getPentecostSunday(year).getDate() &&
//     dateToday.getMonth() === getPentecostSunday(year).getMonth() &&
//     dateToday.getFullYear() === getPentecostSunday(year).getFullYear()
//   ) {
//     return "ist Pfingstsonntag";
//   } else {
//     return "ist kein gesetzlicher Feiertag";
//   }
// }

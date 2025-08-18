// Funktion erstellen, um meine Datum-variablen zu definieren
export function myDateVariables() {
  const dateToday = new Date("2025-12-25");
  const year = dateToday.getFullYear();
  const month = dateToday.getMonth();
  const day = dateToday.getDate();
  const weekday = dateToday.getDay();
  return { dateToday, year, month, day, weekday }; // Return um die Datum-variablen als Keys an die Funktion zurück zu geben
}

// Funktion erstellen, um Wochentage als selbstdefinierten String und nicht als Zahl auszugeben
export function getWeekdayName(weekdayNumber) {
  const dayNames = [
    "Sonntag",
    "Montag",
    "Dienstag",
    "Mittwoch",
    "Donnerstag",
    "Freitag",
    "Samstag",
  ];
  return dayNames[weekdayNumber]; // Return um die umgewandelten Daten (int to str) an die Funktion zurück zu geben
}
// Funktion erstellen, um Monatsnamen als selbstdefinierten String und nicht als Zahl auszugeben
export function getMonthName(monthNumber) {
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
  return monthNames[monthNumber]; // Return um die umgewandelten Daten (int to str) an die Funktion zurück zu geben
}

// Funktion um Schaltjahr zu berechnen
export function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

// Funktion um die Tage im Jahr, wegen dem Schaltjahr zu ermitteln
export function daysInYear(year) {
  return isLeapYear(year) ? 366 : 365; // Boolean: True = 366, False = 365
}

// Der wievielte Wochentag im Monat:
export function getWievielte(day) {
  if (day < 8) return "erste";
  if (day < 15) return "zweite";
  if (day < 22) return "dritte";
  if (day < 29) return "vierte";
  else return "fünfte";
}

// Berechnung von Ostersonntag nach Gauß:
export function getEasterSunday(year) {
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

// Feste Feiertage:
export function getFixedHolidays(year) {
  return {
    newYearsDay: new Date(year, 0, 1),
    laborDay: new Date(year, 4, 1),
    germanUnityDay: new Date(year, 9, 3),
    firstChristmasDay: new Date(year, 11, 25),
    secondChristmasDay: new Date(year, 11, 26),
  };
}

// Bewegliche Feiertage:
export function getMovableHolidays(year) {
  const easterSunday = getEasterSunday(year);
  const easterMonday = new Date(easterSunday);
  easterMonday.setDate(easterMonday.getDate() + 1);
  const goodFriday = new Date(easterSunday);
  goodFriday.setDate(goodFriday.getDate() - 2);
  const corpusChristi = new Date(easterSunday);
  corpusChristi.setDate(corpusChristi.getDate() + 60);
  const pentecostSunday = new Date(easterSunday);
  pentecostSunday.setDate(pentecostSunday.getDate() + 49);
  const pentecostMonday = new Date(pentecostSunday);
  pentecostMonday.setDate(pentecostMonday.getDate() + 1);
  const ascensionDay = new Date(easterSunday);
  ascensionDay.setDate(ascensionDay.getDate() + 39);
  return {
    easterSunday,
    easterMonday,
    goodFriday,
    corpusChristi,
    pentecostSunday,
    pentecostMonday,
    ascensionDay,
  };
}

// Funktion um zu vergleichen ob Datum A == Datum B ist:
function isSameDate(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

// Funktion um Feiertage mit dem heutigen Tag zu vergleichen und
// auszugeben welcher Feiertag ist, falls es einer ist.
export function isHoliday(today, fixedHolidays, movableHolidays) {
  const {
    newYearsDay,
    laborDay,
    germanUnityDay,
    firstChristmasDay,
    secondChristmasDay,
  } = fixedHolidays;

  const {
    easterSunday,
    easterMonday,
    goodFriday,
    corpusChristi,
    pentecostSunday,
    pentecostMonday,
    ascensionDay,
  } = movableHolidays;

  if (isSameDate(today, newYearsDay)) return "ist Neujahr";
  if (isSameDate(today, goodFriday)) return "ist Karfreitag";
  if (isSameDate(today, easterSunday)) return "ist Ostersonntag";
  if (isSameDate(today, easterMonday)) return "ist Ostermontag";
  if (isSameDate(today, ascensionDay)) return "ist Christi Himmelfahrt";
  if (isSameDate(today, pentecostSunday)) return "ist Pfingstsonntag";
  if (isSameDate(today, pentecostMonday)) return "ist Pfingstmontag";
  if (isSameDate(today, corpusChristi)) return "ist Fronleichnam";
  if (isSameDate(today, laborDay)) return "ist Tag der Arbeit";
  if (isSameDate(today, germanUnityDay)) return "ist Tag der Deutschen Einheit";
  if (isSameDate(today, firstChristmasDay))
    return "ist der erste Weihnachtstag";
  if (isSameDate(today, secondChristmasDay))
    return "ist der zweite Weihnachtstag";

  return "ist kein gesetzlicher Feiertag";
}

// Funktion um das heutige Datum mit dem 01.01. des Jahres zu vergleichen und
// daraus die Differenz zu ermitteln
export function dayOfYear(date) {
  const start = new Date(Date.UTC(date.getFullYear(), 0, 1));
  const current = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  return Math.floor((current - start) / 86_400_000) + 1;
}

// Funktion um das Kalenderblatt im HTML zu generieren:
export function createCalendarTable(today) {
  let year = today.getFullYear();
  let month = today.getMonth();
  const holidayDates = [
    Object.values(getFixedHolidays(year)),
    Object.values(getMovableHolidays(year)),
  ];
  // Den ersten Tag des aktuellen Monats feststellen:
  let calendarFirstInMonth = new Date(year, month, 1);
  // Was ist der erste für ein Wochentag:
  let calendarFirstInMonthWeekday = calendarFirstInMonth.getDay();
  // Montag auf "0" setzen, damit der Kalender an einem Montag beginnt.
  // (1-), damit der Kalender soviele Zellen zurück geht, bis ein Montag erreicht wird
  let calendarFirstDay = new Date(
    year,
    month,
    1 - ((calendarFirstInMonthWeekday - 1 + 7) % 7)
  );
  let calendarLastInMonth = new Date(year, month + 1, 0);
  // Der Kalender endet pro Reihe auf einen Sonntag. Falls der Monat nicht
  // an einem Sonntag endet, werden so viele Zellen addiert, bis Sonntag erreicht ist.
  let calendarLastDay = new Date(
    year,
    month,
    calendarLastInMonth.getDate() + ((7 - calendarLastInMonth.getDay()) % 7)
  );
  let datum = new Date(
    calendarFirstDay.getFullYear(),
    calendarFirstDay.getMonth(),
    calendarFirstDay.getDate()
  );
  const calendarTable = document.getElementById("calendarTableBody");
  // Variable tr anfangs leer, weil sie erst erzeugt wird, sobald eine neue Woche beginnt
  let tr;
  // Schleife starten, die so lange läuft bis der letzte tag
  // in der Kalenderblattreihe erreicht oder überschritten wird:
  while (datum <= calendarLastDay) {
    // neue Tabellenreihe, wenn Montag ist:
    if (datum.getDay() === 1) {
      tr = document.createElement("tr");
    }
    let td = document.createElement("td");
    // Text in Zelle auf aktuelle Tage im Monat setzen:
    td.textContent = datum.getDate();
    // prüfen, ob die Tage zu einem anderen Monat gehören:
    if (datum.getMonth() !== today.getMonth()) {
      td.classList.add("otherMonth");
    }
    // Prüfung ob das heutige Datum dieser Tag ist
    if (
      today.getMonth() === datum.getMonth() &&
      today.getDate() === datum.getDate()
    ) {
      td.classList.add("today");
    }
    for (let h of holidayDates) {
      if (
        h === datum.getFullYear() &&
        h === datum.getMonth() &&
        h === datum.getDate()
      ) {
        td.classList.add("holiday");
      }
    }
    tr.appendChild(td);
    // Wenn Sonntag erreicht ist, Reihe zu Ende:
    if (datum.getDay() === 0) {
      calendarTable.appendChild(tr);
    }
    // Datum um einen Tag erhöhen, um Schleife auf nächsten
    // Kalendertag zu verschieben:
    datum.setDate(datum.getDate() + 1);
  }
}

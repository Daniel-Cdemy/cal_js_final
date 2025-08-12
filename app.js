// --- Start ---
import {
  myDateVariables,
  getWeekdayName,
  getMonthName,
  getWievielte,
  createCalendarTable,
  isHoliday,
  getFixedHolidays,
  getMovableHolidays,
  daysInYear,
  dayOfYear,
} from "./functions.js";

// Variable mit dem Inhalt meiner Funktion fürs Datum
const { dateToday, year, month, day, weekday } = myDateVariables();
const fixedHolidays = getFixedHolidays(year);
const movableHolidays = getMovableHolidays(year);
const passedDays = dayOfYear(dateToday);
const totalDays = daysInYear(year);
const remainingDays = totalDays - passedDays;

document.querySelectorAll('[data-role="day"]').forEach((el) => {
  el.textContent = String(day).padStart(2, "0") + ".";
});

document.querySelectorAll('[data-role="dayname"]').forEach((el) => {
  el.textContent = getWeekdayName(weekday); // Ich hole mir die Ausgabe aus der Funktion(getWeekdayName) in Kombination
}); // mit meiner Variable (calendarData == Variable) und einem Key(.weekday == Key)
// Funktion erstellen, um Wochentage als selbstdefinierten String und nicht als Zahl auszugeben

document.querySelectorAll('[data-role="monthname"]').forEach((el) => {
  el.textContent = getMonthName(month); // Ich hole mir die Ausgabe aus der Funktion(getMonthName) in Kombination
}); // mit meiner Variable (calendarData == Variable) und einem Key(.month == Key)

document.querySelectorAll('[data-role="year"]').forEach((el) => {
  el.textContent = year; // // Ich hole mir die Ausgabe aus meiner Variable (calendarData == Variable) und einem Key(.year == Key)
});

// Ermittlung des letzten Tages im aktuellen Monat:
const lastDayInMonth = new Date(year, month + 1, 0).getDate();
document.getElementById("lastDayInMonth").textContent = lastDayInMonth;

document.getElementById("wievielte").textContent = getWievielte(day);

document.getElementById("holiday").textContent = isHoliday(
  dateToday,
  fixedHolidays,
  movableHolidays
);

document.getElementById("diffStart").textContent = passedDays + ".";

document.getElementById("remainingDays").textContent = remainingDays;

createCalendarTable(dateToday);

const dateToday = new Date();
const dateStart = new Date("2025-01.01");
    let diffInMS = dateToday - dateStart;
        let diffInDays = Math.floor(diffInMS / 86400000) + 1;
            let finalDiffInDays = diffInDays + ".";

    document.getElementById("diffStart").textContent = finalDiffInDays;

    let weekday = dateToday.getDay();
        let dayName = getDayName(weekday);

        function getDayName() {
            if (weekday === 0) 
                return "Sonntag";
            else if (weekday === 1) 
                return "Montag";
            else if (weekday === 2) 
                return "Dienstag";
            else if (weekday === 3) 
                return "Mittwoch";
            else if (weekday === 4) 
                return "Donnerstag";
            else if (weekday === 5) 
                return "Freitag";
            else if (weekday === 6) 
                return "Samstag";
            }

    document.getElementById("weekDay").textContent = dayName;
    document.getElementById("weekDay1").textContent = dayName;

    let month = dateToday.getMonth();
        let monthName = getMonthName(month);

        function getMonthName() {
            if (month === 0)
                return "Januar";
            if (month === 1)
                return "Februar";
            if (month === 2)
                return "März";
            if (month === 3)
                return "April";
            if (month === 4)
                return "Mai";
            if (month === 5)
                return "Juni";
            if (month === 6)
                return "Juli";
            if (month === 7)
                return "August";
            if (month === 8)
                return "September";
            if (month === 9)
                return "Oktober";
            if (month === 10)
                return "November";
            if (month === 11)
                return "Dezember";
        }

    document.getElementById("fullMonth").textContent = monthName
    document.getElementById("fullMonth1").textContent = monthName
    document.getElementById("fullMonth2").textContent = monthName
    document.getElementById("fullMonth3").textContent = monthName
    document.getElementById("fullMonth4").textContent = monthName
    document.getElementById("fullMonth5").textContent = monthName

    let year = dateToday.getFullYear();
        let isLeapYear = ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0)
            let daysInYear = getDaysInYear ();

            function getDaysInYear(){
                if (isLeapYear === true)
                    return 366;
                if (isLeapYear === false)
                    return 365;
            }

    let remainingDays = daysInYear - diffInDays;
    document.getElementById("remainingDays").textContent = remainingDays;


    document.getElementById("yearDig").textContent = year
    document.getElementById("yearDig1").textContent = year
    document.getElementById("yearDig2").textContent = year
    document.getElementById("yearDig3").textContent = year

    let day = dateToday.getDate();
        let wievielte = getWievielte (day);
    datePeriod = day + "."

        function getWievielte() {
            if (day < 8) 
                return "erste";
            if (day < 15)
                return "zweite";
            if (day < 22)
                return "dritte";
            if (day < 29)
                return "vierte";
            if (day > 29)
                return "fünfte";
        }

    document.getElementById("day").textContent = datePeriod
    document.getElementById("day1").textContent = datePeriod
    document.getElementById("day2").textContent = datePeriod
    document.getElementById("wievielte").textContent = wievielte

    console.log (dateToday - dateStart)

    /* Ich will jetzt noch:
    wie viele tage sind es noch bis zum jahresende?
    wie viele tage hat jeder monat? 
    ist ein feiertag? */


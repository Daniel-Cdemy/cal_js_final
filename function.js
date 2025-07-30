const dateToday = new Date();
    let day = dateToday.getDay();
        let dayName = getDayName(day);
           
        function getDayName() {
            if (day === 0) 
                return "Sonntag";
            else if (day === 1) 
                return "Montag";
            else if (day === 2) 
                return "Dienstag";
            else if (day === 3) 
                return "Mittwoch";
            else if (day === 4) 
                return "Donnerstag";
            else if (day === 5) 
                return "Freitag";
            else if (day === 6) 
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
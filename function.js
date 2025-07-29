const dateToday = new Date();
    let day = dateToday.getDay();
        let dayName = getDayName();
            document.getElementById("weekDay").textContent = dayName;
            document.getElementById("weekDay1").textContent = dayName;

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
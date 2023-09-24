document.getElementById("submit-btn").addEventListener("click", displayAge);

function displayAge() {

    // variables to store birthdate input values
    const birthYear = document.getElementById("year").value.trim();
    const birthMonth = document.getElementById("month").value.trim();
    const birthDay = document.getElementById("day").value.trim();

    // variables to store required ID
    const yearRequired = document.getElementById("year-required");
    const monthRequired = document.getElementById("month-required");
    const dayRequired = document.getElementById("day-required");

    // variables to store invalid ID
    const yearInvalid = document.getElementById("year-invalid");
    const monthInvalid = document.getElementById("month-invalid");
    const dayInvalid = document.getElementById("day-invalid");
    const dateInvalid = document.getElementById("date-invalid");

    // variables to store input class
    const inputYear = document.getElementById("input-year");
    const inputMonth = document.getElementById("input-month");
    const inputDay = document.getElementById("input-day");

    // objects to store inputs
    const inputFields = [
        { field: birthYear, requiredMessage: yearRequired, validMessage: yearInvalid, inputElement: inputYear },
        { field: birthMonth, requiredMessage: monthRequired, validMessage: monthInvalid, inputElement: inputMonth },
        { field: birthDay, requiredMessage: dayRequired, validMessage: dayInvalid, inputElement: inputDay },
    ];
    
    // flags
    let empty = false;
    let validCounter = 0;
    let nonNum = true;
    
    // checks if input field is empty or contain non numeric characters
    for (const input of inputFields) {
        if (input.field === "") {
            input.requiredMessage.style.display = "block";
            input.validMessage.style.display = "none";
            input.inputElement.classList.add("invalid");
            empty = true;
        } else if (isNaN(input.field)) {
            input.requiredMessage.style.display = "none";
            input.validMessage.style.display = "block";
            input.inputElement.classList.add("invalid");
            nonNum = false;
        } else {
            input.requiredMessage.style.display = "none";
            input.validMessage.style.display = "none";
            input.inputElement.classList.remove("invalid");
        }
    }
    
    // checks for input validity
    if (!empty && nonNum) {
        const day = parseInt(birthDay);
        const month = parseInt(birthMonth);
        const year = parseInt(birthYear);

        // checks if day is valid
        if (day < 1 || day > 31) {
            dayInvalid.style.display = "block";
            inputDay.classList.add("invalid");
            valid = false;
        } else {
            dayInvalid.style.display = "none";
            inputDay.classList.remove("invalid");
            validCounter ++;
        }

        // checks if month is valid
        if (month < 1 || month > 12) {
            monthInvalid.style.display = "block";
            inputMonth.classList.add("invalid");
            valid = false;
        } else {
            monthInvalid.style.display = "none";
            inputMonth.classList.remove("invalid");
            validCounter++;
        }


        const currentDate = new Date();
        const birthDate = new Date(year, month - 1, day);
        
        //checks if year is of past and if the date is valid
        if (birthDate > currentDate) {
            yearInvalid.style.display = "block";
            dateInvalid.style.display = "none";
            inputYear.classList.add("invalid");
            valid = false;
        } else if (birthDate.getDate() !== day || birthDate.getMonth() !== month - 1) {
            dateInvalid.style.display = "block";
            yearInvalid.style.display = "none";
            inputDay.classList.add("invalid");

            valid = false;
        } else {
            dateInvalid.style.display = "none";
            yearInvalid.style.display = "none";
            inputDay.classList.remove("invalid");
            inputYear.classList.remove("invalid");
            validCounter++;
        }
    }

    // if flags pass then calculates age and displays it
    if (!empty && validCounter == 3 && nonNum) {
        const birthDate = new Date(birthYear, birthMonth - 1, birthDay);
        const age = calculateAge(birthDate);

        document.getElementById("years").innerHTML = age.years;
        document.getElementById("months").innerHTML = age.months;
        document.getElementById("days").innerHTML = age.days;
    }
      

}

// calculates age
function calculateAge(birthDate) {
    const today = new Date();
    const birth = new Date(birthDate);
  
    let ageYears = today.getFullYear() - birth.getFullYear();
    let ageMonths = today.getMonth() - birth.getMonth();
    let ageDays = today.getDate() - birth.getDate();
  
    if (ageDays < 0) {
      const prevMonthLastDay = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
      ageDays += prevMonthLastDay;
      ageMonths--;
    }
  
    if (ageMonths < 0) {
      ageMonths += 12;
      ageYears--;
    }
  
    return {
      years: ageYears,
      months: ageMonths,
      days: ageDays,
    };
}
  
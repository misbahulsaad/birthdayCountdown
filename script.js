// Define your birthday as a variable (month and day only)
const birthday = '10-12'; // October 12th

// Define your birthday message as a variable
const birthdayMessage = "Happy Birthday, Urbi!";

// Function to get the timestamp of the next birthday
function getNextBirthday() {
    const today = new Date();
    const year = today.getFullYear();
    
    // Extract month and day from the birthday variable
    const [birthdayMonth, birthdayDay] = birthday.split('-').map(Number); // Convert to numbers
    
    // Set the next birthday date for this year
    let nextBirthday = new Date(year, birthdayMonth - 1, birthdayDay); // Months are 0-indexed in JavaScript

    // If the birthday has already passed this year, set the target to next year
    if (today > nextBirthday) {
        nextBirthday.setFullYear(year + 1); // Move to next year
    }
    
    return nextBirthday.getTime(); // Return the timestamp of the next birthday
}

// Get the end of the birthday date (24 hours after the birthday starts)
function getBirthdayEnd() {
    const nextBirthday = new Date(getNextBirthday());
    nextBirthday.setHours(24, 0, 0, 0); // Set to the next day at midnight
    return nextBirthday.getTime(); // Return the timestamp for 24 hours after the birthday starts
}

// Get the target date for the next birthday
let targetDate = getNextBirthday();
let birthdayEndDate = getBirthdayEnd();

// Check if today is the birthday
const today = new Date();
const [birthdayMonth, birthdayDay] = birthday.split('-').map(Number); // Extract month and day again
const isTodayBirthday = today.getMonth() + 1 === birthdayMonth && today.getDate() === birthdayDay; // Months are 0-indexed

// If today is the birthday, display the birthday message immediately
if (isTodayBirthday) {
    document.body.innerHTML = `<div class='birthday-message'><h1>${birthdayMessage}</h1></div>`;

    // Apply styles for the birthday message
    document.body.style.backgroundColor = '#ffcccc';  // Change background color
    document.body.style.display = 'flex';
    document.body.style.justifyContent = 'center';
    document.body.style.alignItems = 'center';
    document.body.style.height = '100vh'; // Make sure the height covers the whole page
    document.body.style.margin = '0';

    // Add additional styles to the message
    const message = document.querySelector('.birthday-message');
    message.style.fontSize = '50px';
    message.style.fontWeight = 'bold';
    message.style.color = '#333';
    message.style.textAlign = 'center';

    // Trigger confetti celebration
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });

    // Optional: Make the confetti repeat
    setInterval(function() {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    }, 2000); // Repeat every 2 seconds

    // Set another interval to check when the birthday day ends
    const birthdayMessageInterval = setInterval(() => {
        const now = new Date().getTime();

        // If the birthday day ends (now > birthdayEndDate), reset countdown for the next year
        if (now > birthdayEndDate) {
            clearInterval(birthdayMessageInterval);
            targetDate = getNextBirthday(); // Reset the countdown for the next year
            birthdayEndDate = getBirthdayEnd(); // Update the end date
            location.reload(); // Reload the page to restart the countdown
        }
    }, 1000);

} else {
    // Otherwise, run the countdown as usual
    const countdown = setInterval(function() {
        const now = new Date().getTime();
        const timeLeft = targetDate - now;

        // Time calculations for days, hours, minutes, and seconds
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        // Display the result in the respective elements
        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours;
        document.getElementById('minutes').textContent = minutes;
        document.getElementById('seconds').textContent = seconds;

        // If the countdown reaches the birthday (timeLeft < 0)
        if (timeLeft < 0) {
            clearInterval(countdown);

            // Display the birthday message for the entire day
            document.body.innerHTML = `<div class='birthday-message'><h1>${birthdayMessage}</h1></div>`;

            // Apply styles for the birthday message
            document.body.style.backgroundColor = '#ffcccc';  // Change background color
            document.body.style.display = 'flex';
            document.body.style.justifyContent = 'center';
            document.body.style.alignItems = 'center';
            document.body.style.height = '100vh'; // Make sure the height covers the whole page
            document.body.style.margin = '0';

            // Add additional styles to the message
            const message = document.querySelector('.birthday-message');
            message.style.fontSize = '50px';
            message.style.fontWeight = 'bold';
            message.style.color = '#333';
            message.style.textAlign = 'center';

            // Trigger confetti celebration
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });

            // Optional: Make the confetti repeat
            setInterval(function() {
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 }
                });
            }, 2000); // Repeat every 2 seconds

            // Set another interval to check when the birthday day ends
            const birthdayMessageInterval = setInterval(() => {
                const now = new Date().getTime();

                // If the birthday day ends (now > birthdayEndDate), reset countdown for the next year
                if (now > birthdayEndDate) {
                    clearInterval(birthdayMessageInterval);
                    targetDate = getNextBirthday(); // Reset the countdown for the next year
                    birthdayEndDate = getBirthdayEnd(); // Update the end date
                    location.reload(); // Reload the page to restart the countdown
                }
            }, 1000);
        }
    }, 1000);
}

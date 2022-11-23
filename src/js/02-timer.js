// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

const selectorInput = document.getElementById('datetime-picker');
const btnStart = document.querySelector("button[data-start]");
const clockDays = document.querySelector("span[data-days]");
const clockHours = document.querySelector("span[data-hours]");
const clockMinutes = document.querySelector("span[data-minutes]");
const clockSeconds = document.querySelector("span[data-seconds]");

let selectedTime = 1;


btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {  
    selectedTime = selectedDates[0].getTime();
    if ( selectedDates[0] <= options.defaultDate) {
        window.alert("Please choose a date in the future")
        btnStart.disabled = true;
        } else {    
        btnStart.disabled = false;
        }
  },
};

const currentTime = options.defaultDate.getTime();

flatpickr(selectorInput, options);


btnStart.addEventListener("click", () => {
    btnStart.disabled = true;
    const timer = {
         start() {
            this.intervalID = setInterval(() => {
                const counterTime = Date.now() - currentTime;
                const deltaTime = selectedTime - currentTime;
                let resultTime = deltaTime - counterTime;
                if (resultTime <  1000) {
                    timer.stop()
                    }
                const { days, hours, minutes, seconds } = convertMs(resultTime);
                updateClockface({ days, hours, minutes, seconds })
                console.log(days + '::' + hours + ':' + minutes + ':' + seconds);
                }, 1000);
            },
            stop() {
                    clearInterval(this.intervalID)
                }
         };
        timer.start();
    });

function pad(value) {
    return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
};

function updateClockface({ days, hours, minutes, seconds }) {
    clockDays.textContent = days;
    clockHours.textContent = hours;
    clockMinutes.textContent = minutes;
    clockSeconds.textContent = seconds;
}


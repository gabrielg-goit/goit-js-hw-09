import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const startButton = document.querySelector('[data-start]');
const datetimePicker = document.querySelector('#datetime-picker');

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate > new Date()) {
      startButton.disabled = false;
    } else {
      Notiflix.Notify.failure('Please choose a date in the future');
    }
    console.log(selectedDates[0]);
  },
});

const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

startButton.addEventListener('click', functionStart);
function functionStart() {
  const selectedDate = new Date(datetimePicker.value).getTime();
  const currentTime = new Date().getTime();
  const timeDifference = selectedDate - currentTime;
  if (timeDifference <= 0) {
    return;
  }
  const intervalID = setInterval(() => {
    const remainingTime = convertMs(selectedDate - new Date().getTime());
    days.textContent = addLeadingZero(remainingTime.days);
    hours.textContent = addLeadingZero(remainingTime.hours);
    minutes.textContent = addLeadingZero(remainingTime.minutes);
    seconds.textContent = addLeadingZero(remainingTime.seconds);
    if (selectedDate - new Date().getTime() <= 0) {
      clearInterval(intervalID);
    }
  }, 1000);
  startButton.disabled = true;
}

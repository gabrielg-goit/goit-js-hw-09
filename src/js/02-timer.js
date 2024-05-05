import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
//For style
const timerContainer = document.querySelector('.timer');
timerContainer.style.display = 'flex';
timerContainer.style.flexDirection = 'row';
timerContainer.style.alignItems = 'center';
timerContainer.style.gap = '25px';

const fieldContainer = document.querySelectorAll('.field');
for (const container of fieldContainer) {
  container.style.display = 'flex';
  container.style.flexDirection = 'column';
  container.style.alignItems = 'center';
  container.style.justifyContent = 'center';
}

const valuesSpace = document.querySelectorAll('.value');
for (const values of valuesSpace) {
  values.style.font = 'bold 30px roboto,serif';
}

const detailSpace = document.querySelectorAll('.label');
for (const detail of detailSpace) {
  detail.style.font = '15px roboto,serif';
  detail.style.textTransform = 'uppercase';
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log('Val:', selectedDates[0]);
  },
};
flatpickr('#datetime-picker', options);

//Identification for dynamic elements
const inputData = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');

//disable initial Start button
startBtn.disabled = true;

//enable Start button on valid input
function validateInput() {
  inputData.addEventListener('change', () => {
    const minData = new Date();
    console.log(minData);
    const selectedData = new Date(inputData.value);
    console.log(selectedData);
    if (selectedData >= minData) {
      startBtn.disabled = false; //disable buton start
    } else {
      Notiflix.Notify.failure('Please choose a date in the future');
    }
  });
}
validateInput();

//Start behaviour
startBtn.addEventListener('click', () => {
  startBtn.disabled = true; //disable  start  button

  const timerId = setInterval(() => {
    // Number of milliseconds per unit of time
    const targetDate = new Date(inputData.value);

    // Get the current date and time
    const currentDate = new Date();

    // Calculate the time difference between the target date and the current date
    const timeDifference = targetDate.getTime() - currentDate.getTime();

    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(timeDifference / day);
    // Remaining hours
    const hours = Math.floor((timeDifference % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((timeDifference % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor(
      (((timeDifference % day) % hour) % minute) / second
    );

    console.log(days, hours, minutes, seconds); //de verificare
    //return { days, hours, minutes, seconds };

    // For stop countdown at 0ms
    if (timeDifference < 1000) {
      clearInterval(timerId);
      console.log('Timp expirat'); //de verificare
    }

    // Add 0 function at start of number if length < 2
    const leadingZero = value => value.toString().padStart(2, '0');

    dataDays.textContent = leadingZero(days);
    dataHours.textContent = leadingZero(hours);
    dataMinutes.textContent = leadingZero(minutes);
    dataSeconds.textContent = leadingZero(seconds);
  }, 1000);
});

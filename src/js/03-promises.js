import Notiflix from 'notiflix';

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
const form = document.querySelector('.form');
const firstInput = document.querySelector('input[name="delay"]');
const secondInput = document.querySelector('input[name="step"]');
const thirdInput = document.querySelector('input[name="amount"]');

form.addEventListener('submit', e => {
  e.preventDefault();
  const firstDelay = parseInt(firstInput.value);
  const delayStep = parseInt(secondInput.value);
  const amount = parseInt(thirdInput.value);

  const promises = [];
  for (let i = 0; i < amount; i++) {
    const position = i + 1;
    const delay = firstDelay + i * delayStep;
    promises.push(createPromise(position, delay));
  }

  promises.forEach(promise => {
    promise
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  });
});

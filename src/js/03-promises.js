const filterForm = document.querySelector('.form');

filterForm.addEventListener('submit', e => {
  e.preventDefault();
  const { delay, step, amount } = e.target.elements;
  let delayElement = Number(delay.value);
  let stepElement = Number(step.value);
  let amountElement = Number(amount.value);

  for (let i = 1; i <= amountElement; i++) {
    createPromise(i, delayElement)
    .then(resolve => {
      console.log(`✅ Fulfilled promise ${resolve.position} in ${resolve.delay}ms`);
    })
    .catch(reject => {
    console.log(`❌ Rejected promise ${reject.position} in ${reject.delay}ms`);
    });
    delayElement += stepElement;
  }
});


function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({
          position,
          delay
        })
      } else {
        reject({
          position,
          delay
        })
    }
    }, delay);
  }) 
}







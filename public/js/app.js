const weatherForm = document.querySelector('form');
const searchInput = weatherForm.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const location = searchInput.value;
  messageOne.textContent = 'Searching weather...';
  messageTwo.textContent = '';
  
  fetch(`/weather?address=${location}`).then(response => {
    response.json().then((data) => {
      if (data.error) {
        return messageOne.textContent = data.error;
      }
  
      messageOne.textContent = data.location;
      messageTwo.textContent = `Description - ${data.forecast.description}, temperature: ${data.forecast.temperature}, feels like: ${data.forecast.feelslike}, the humidity is: ${data.forecast.humidity}`;
    })
  });
});

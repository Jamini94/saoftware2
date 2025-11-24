// API URL
const apiUrl = 'https://api.chucknorris.io/jokes/random';

const button = document.getElementById('getJokeBtn');
const jokeElement = document.getElementById('joke');


button.addEventListener('click', () => {
  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // Parse JSON
    })
    .then(data => {
      jokeElement.textContent = data.value; // Show joke on page
    })
    .catch(error => {
      jokeElement.textContent = 'Oops! Something went wrong.';
      console.error('Error fetching the joke:', error);
    });
});

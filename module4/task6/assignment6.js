const form = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const jokesContainer = document.getElementById('jokesContainer')

form.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent page reload

  const query = searchInput.value.trim();
  if (!query) return;

  const apiUrl = `https://api.chucknorris.io/jokes/search?query=${query}`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      jokesContainer.innerHTML = '';

      if (data.total === 0) {
        jokesContainer.innerHTML = `<p>No jokes found for "${query}".</p>`;
        return;
      }

      // Loop through each joke and create article
      data.result.forEach(joke => {
        const article = document.createElement('article');
        article.innerHTML = `<p>${joke.value}</p>`;
        jokesContainer.appendChild(article);
      });
    })
    .catch(error => {
      jokesContainer.innerHTML = '<p>Oops! Something went wrong.</p>';
      console.error('Error fetching jokes:', error);
    });
});

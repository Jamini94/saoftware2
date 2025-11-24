document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();

  const query = document.getElementById("query").value.trim();

  if (!query) {
    console.log("Please enter a TV show name.");
  } else {
    fetch(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`)
      .then(response => response.json())
      .then(data => {
        console.log("Search results:", data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }
});

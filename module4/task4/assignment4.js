document.getElementById("searchForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const query = document.getElementById("query").value.trim();
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = ""; // clear previous results

  let output = ""; // single return point approach

  if (query === "") {
    output = "Please enter a TV show name.";
    resultsDiv.innerHTML = output;
  } else {
    fetch(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`)
      .then(response => response.json())
      .then(data => {
        if (data.length === 0) {
          output = "No results found.";
        } else {
          data.forEach(item => {
            const show = item.show;
            const defaultImage = "https://placehold.co/210x295?text=Not%20Found";

            output += `
              <article>
                <h2>${show.name}</h2>
                <a href="${show.url}" target="_blank">View Details</a>
                <img src="${(show.image && show.image.medium) ? show.image.medium : defaultImage}" alt="${show.name}">
                <div>${show.summary || "No summary available."}</div>
              </article>
            `;
          });
        }

        resultsDiv.innerHTML = output; // single return point
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        resultsDiv.innerHTML = "Error fetching data.";
      });
  }
});

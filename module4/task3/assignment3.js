document.getElementById("searchForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const query = document.getElementById("query").value.trim();
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = ""; // clear previous results

  if (query === "") {
    resultsDiv.textContent = "Please enter a TV show name.";
  } else {
    fetch(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`)
      .then(response => response.json())
      .then(data => {
        if (data.length === 0) {
          resultsDiv.textContent = "No results found.";
          return;
        }

        data.forEach(item => {
          const show = item.show;

          const article = document.createElement("article");

          // Name
          const h2 = document.createElement("h2");
          h2.textContent = show.name;
          article.appendChild(h2);

          // URL link
          const link = document.createElement("a");
          link.href = show.url;
          link.target = "_blank";
          link.textContent = "View Details";
          article.appendChild(link);

          // Image with default if missing
          const img = document.createElement("img");
          const defaultImage = "https://placehold.co/210x295?text=Not%20Found";
          img.src = (show.image && show.image.medium) ? show.image.medium : defaultImage;
          img.alt = show.name;
          article.appendChild(img);

          // Summary
          const summaryDiv = document.createElement("div");
          summaryDiv.innerHTML = show.summary || "No summary available.";
          article.appendChild(summaryDiv);

          resultsDiv.appendChild(article);
        });
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        resultsDiv.textContent = "Error fetching data.";
      });
  }
});

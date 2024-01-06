document.addEventListener('DOMContentLoaded', function () {

  const searchForm = document.querySelector('.searchForm');

  searchForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const searchInput = document.querySelector('.searchInput');

    // build my url to use the search API
    let url = 'https://article-searcher.onrender.com/search?q=' + encodeURIComponent(searchInput.value);

    // make the request to the API
    fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // do something with the data
        console.log(data);
        displayResults(data);
      })
      .catch(function (error) {
        console.log(error);
      });

      searchInput.value = '';
  });

  function displayResults(results) {
    let showResults = document.querySelector('.showResults');
    
    // clean up the results from previus search
    showResults.innerHTML = '';

    // loop over the results
    results.forEach(result => {
      const article = document.createElement('li');
      
      const title = document.createElement('h3');
      title.textContent = result.title;
      const link = document.createElement('a');
      link.href = result.link;
      link.textContent = 'Visit page';
      const snippet = document.createElement('p');
      snippet.textContent = result.snippet;

      article.appendChild(title);
      article.appendChild(snippet);
      article.appendChild(link);

      showResults.appendChild(article);
    });

  }
});
document.addEventListener('DOMContentLoaded', function () {

  const searchForm = document.querySelector('.searchForm');
  const previousButton = document.querySelector('.previousR');
  const nextButton = document.querySelector('.nextR');

  // index to controll showing results
  let start_index = 1;

  // create variable for the setTimeOut counter to avoid multiple calls to the API
  let debounceTimer;

  searchForm.addEventListener('input', function (e) {
    e.preventDefault();

    // clear the timer when function is called
    clearTimeout(debounceTimer);

    // set a timer to call the API after 1 second
    debounceTimer = setTimeout(function () {
      updateSearch(start_index)
    }, 1000);
  });

  // manage previuos resutls
  previousButton.addEventListener('click', function (e) {
    if (start_index > 1) {
      updateSearch(start_index - 10)
    }
  });

  nextButton.addEventListener('click', function (e) {
    updateSearch(start_index + 10)
  });


  // update index and fetch data

  function updateSearch(newIndex) {
    start_index = newIndex;

    const searchInput = document.querySelector('.searchInput').value.trim();

    // build my url to use the search API
    let url = 'https://article-searcher.onrender.com/search?q=' + encodeURIComponent(searchInput) + `&start_index=${start_index}`;
    console.log(url);
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

    // searchInput.value = '';
  }

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
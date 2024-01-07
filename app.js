document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.querySelector('.searchForm');
  const previousButton = document.querySelector('.previousR');
  const nextButton = document.querySelector('.nextR');

  // index to controll showing results
  let startIndex = 1;

  // create variable for the setTimeOut counter to avoid multiple calls to the API
  let debounceTimer;

  function displayResults(results) {
    const showResults = document.querySelector('.showResults');

    // clean up the results from previus search
    showResults.innerHTML = '';

    // loop over the results
    results.forEach((result) => {
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

  // update index and fetch data

  function updateSearch(newIndex) {
    startIndex = newIndex;

    const searchInput = document.querySelector('.searchInput').value.trim();

    // build my url to use the search API
    const url = `https://still-savannah-41464-80046a64bd89.herokuapp.com/search?q=${encodeURIComponent(searchInput)}&startIndex=${startIndex}`;
    // console.log(url);
    // make the request to the API
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // do something with the data
        // console.log(data);
        displayResults(data);
      })
      .catch((error) => {
        console.log(error);
      });

    // searchInput.value = '';
  }

  // manage previuos resutls
  previousButton.addEventListener('click', () => {
    if (startIndex > 1) {
      updateSearch(startIndex - 10);
    }
  });

  nextButton.addEventListener('click', () => {
    updateSearch(startIndex + 10);
  });

  searchForm.addEventListener('input', (e) => {
    e.preventDefault();

    // clear the timer when function is called
    clearTimeout(debounceTimer);

    // set a timer to call the API after 1 second
    debounceTimer = setTimeout(() => {
      updateSearch(startIndex);
    }, 1000);
  });
});

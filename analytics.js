document.addEventListener('DOMContentLoaded', function () {

  const analyticsTerms = document.querySelector('.uList');

  fetch('http://127.0.0.1:3000/most_searched_terms')
    .then(response => response.json())
    .then(data => {

      console.log(data);
      analyticsTerms.innerHTML = '';

      // iterate over the data to create the list
      data.forEach(function (term) {
        const listItem = document.createElement('li');
        listItem.className = 'w-100 d-flex justify-content-around align-items-center text-center';

        const termName = document.createElement('h3');
        termName.textContent = term.term;

        const termCounter = document.createElement('h3');
        termCounter.textContent = term.searched_counter;

        const termTime = document.createElement('h3');
        termTime.textContent = 'since: ' + formatDate(term.created_at);

        const termLastTime = document.createElement('h3');
        termLastTime.textContent = 'last time: ' + formatDate(term.updated_at);

        listItem.appendChild(termName);
        listItem.appendChild(termCounter);
        listItem.appendChild(termTime);
        listItem.appendChild(termLastTime);

        analyticsTerms.appendChild(listItem);
      });
    })
    .catch(error => console.log('Error fetching most searched terms:', error));

  function formatDate(date) {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    };
    return new Intl.DateTimeFormat('en-US', options ).format(new Date(date));
  }

});
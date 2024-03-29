document.addEventListener('DOMContentLoaded', () => {
  const analyticsTerms = document.querySelector('.uList');

  function formatDate(date) {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
    return new Intl.DateTimeFormat('en-US', options).format(new Date(date));
  }

  fetch('https://still-savannah-41464-80046a64bd89.herokuapp.com/query_histories/')
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      analyticsTerms.innerHTML = '';

      // iterate over the data to create the list
      data.forEach((term) => {
        const listItem = document.createElement('li');
        listItem.className = 'w-100 d-flex justify-content-around align-items-center text-center';

        const termName = document.createElement('h3');
        termName.textContent = term.query;

        const termCounter = document.createElement('h3');
        termCounter.textContent = term.count;

        const termTime = document.createElement('h3');
        termTime.textContent = `Since: ${formatDate(term.created_at)}`;

        const termLastTime = document.createElement('h3');
        termLastTime.textContent = `Last Time: ${formatDate(term.updated_at)}`;

        listItem.appendChild(termName);
        listItem.appendChild(termCounter);
        listItem.appendChild(termTime);
        listItem.appendChild(termLastTime);

        analyticsTerms.appendChild(listItem);
      });
    })
    .catch((error) => console.log('Error fetching most searched terms:', error));
});
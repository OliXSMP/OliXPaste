// public/app.js (Client-side)
document.addEventListener('DOMContentLoaded', () => {
  const createButton = document.getElementById('create-button');
  const pasteContent = document.getElementById('paste-content');
  const pasteList = document.getElementById('paste-list');

  // Function to fetch and update the paste list
  const fetchAndUpdatePastes = () => {
    fetch('/pastes')
      .then(response => response.json())
      .then(allPastes => {
        // Clear the current paste list
        pasteList.innerHTML = '';

        // Update the paste list on the client side
        allPastes.forEach(paste => {
          const listItem = document.createElement('li');
          listItem.textContent = paste.content;
          pasteList.appendChild(listItem);
        });
      })
      .catch(error => console.error('Error fetching pastes:', error));
  };

  // Fetch and update the initial list of pastes when the page loads
  fetchAndUpdatePastes();

  createButton.addEventListener('click', () => {
    const content = pasteContent.value.trim();

    if (content) {
      fetch('/pastes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      })
        .then(response => response.json())
        .then(newPaste => {
          // Fetch and update the paste list after creating a new paste
          fetchAndUpdatePastes();

          // Clear the textarea
          pasteContent.value = '';
        })
        .catch(error => console.error('Error creating paste:', error));
    }
  });
});

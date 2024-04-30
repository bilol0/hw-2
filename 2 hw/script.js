document.addEventListener("DOMContentLoaded", function() {
  const userIdInput = document.getElementById('userId');
  const getDataButton = document.getElementById('getData');
  const userInfoDiv = document.getElementById('userInfo');

  getDataButton.addEventListener('click', function() {
      const userId = userIdInput.value.trim();
      if (userId === '' || isNaN(userId) || userId < 1 || userId > 10) {
          alert('Please enter a valid user ID between 1 and 10.');
          return;
      }
      fetchUserData(userId);
  });

  userIdInput.addEventListener('keypress', function(event) {
      if (event.key === 'Enter') {
          getDataButton.click();
      }
  });

  function fetchUserData(userId) {
      fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
          .then(response => response.json())
          .then(data => {
              const { name, username, phone } = data;
              userInfoDiv.innerHTML = `
                  <p><strong>Name:</strong> ${name}</p>
                  <p><strong>Username:</strong> ${username}</p>
                  <p><strong>Phone:</strong> ${phone}</p>
              `;
          })
          .catch(error => {
              console.error('Error fetching user data:', error);
              userInfoDiv.innerHTML = '<p>Error fetching user data. Please try again later.</p>';
          });
  }
});
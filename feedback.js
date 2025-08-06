document.getElementById('feedbackForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    document.getElementById('status').innerText = 'Please fill out all fields.';
    return;
  }

  const feedbackData = {
    name,
    email,
    message,
    timestamp: new Date().toISOString()
  };

  firebase.database().ref('feedbacks').push(feedbackData)
    .then(() => {
      document.getElementById('status').innerText = 'Thank you for your feedback!';
      document.getElementById('feedbackForm').reset();
    })
    .catch((error) => {
      console.error('Error saving feedback:', error);
      document.getElementById('status').innerText = 'Something went wrong. Try again.';
    });
});

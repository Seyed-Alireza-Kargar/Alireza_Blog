// Function to get current date and time (only hours and minutes)
function getFormattedDateTime() {
  const now = new Date();
  const date = now.toLocaleDateString(); // Get the current date
  const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Get time in HH:MM format
  return `${date} at ${time}`;
}

// Set the blog post date and time when the page loads
window.addEventListener('load', function() {
  const postDateElement = document.getElementById('post-date');
  postDateElement.textContent = `Published on: ${getFormattedDateTime()}`;

  // Load comments from localStorage
  const comments = JSON.parse(localStorage.getItem('comments')) || [];
  const commentList = document.getElementById('comments-list');
  
  comments.forEach(comment => {
    const newComment = document.createElement('li');
    newComment.textContent = `${comment.name} (${comment.date}): ${comment.text}`;
    commentList.appendChild(newComment);
  });
});

// Add new comment with name and date
document.getElementById('submit-comment').addEventListener('click', function() {
  const nameInput = document.getElementById('name-input').value.trim();
  const commentInput = document.getElementById('comment-input').value.trim();
  
  if (nameInput && commentInput) {
    const commentList = document.getElementById('comments-list');
    
    // Get current date and time
    const dateTime = getFormattedDateTime();

    // Add the comment to the list
    const newComment = document.createElement('li');
    x = 'said '
    newComment.innerHTML = `(${dateTime})<br>${nameInput} ${x}: <br>${commentInput}`;
    commentList.appendChild(newComment);
    
    // Save the comment to localStorage
    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    comments.push({ name: nameInput, text: commentInput, date: dateTime });
    localStorage.setItem('comments', JSON.stringify(comments));
    
    // Clear the input fields
    document.getElementById('name-input').value = '';
    document.getElementById('comment-input').value = '';
  }
});

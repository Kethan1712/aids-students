// Fetch all users and populate the dropdown
window.onload = function () {
  fetch('http://localhost:8080/users')
  .then(response => response.json())
  .then(users => {
      const userSelect = document.getElementById('userSelect');
      users.forEach(user => {
          let option = document.createElement('option');
          option.value = user.id;
          option.textContent = user.name;
          userSelect.appendChild(option);
      });
  });
}

// Fetch and display selected user's details for editing
document.getElementById('userSelect').addEventListener('change', function () {
  const userId = this.value;
  if (userId) {
      fetch(`http://localhost:8080/users/${userId}`)
      .then(response => response.json())
      .then(user => {
          document.getElementById('studentDetails').innerHTML = `
              <p>ID: ${user.id}</p>
              <p>Name: <input type="text" id="editName" value="${user.name}"></p>
              <p>Gender: <select id="editGender">
                  <option value="Male" ${user.gender === 'Male' ? 'selected' : ''}>Male</option>
                  <option value="Female" ${user.gender === 'Female' ? 'selected' : ''}>Female</option>
                  <option value="Other" ${user.gender === 'Other' ? 'selected' : ''}>Other</option>
              </select></p>
          `;
      });
  }
});

// Edit student data
function editStudent() {
  const userId = document.getElementById('userSelect').value;
  const name = document.getElementById('editName').value;
  const gender = document.getElementById('editGender').value;

  fetch(`http://localhost:8080/users/${userId}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, gender })
  })
  .then(response => response.json())
  .then(() => {
      alert('Student details updated');
      window.location.href = 'view-user.html';  // Redirect to view users
  })
  .catch(error => {
      console.error('Error updating student:', error);
      alert('Failed to update student');
  });
}

// Delete student data
function deleteStudent() {
  const userId = document.getElementById('userSelect').value;

  fetch(`http://localhost:8080/users/${userId}`, {
      method: 'DELETE'
  })
  .then(response => response.json())
  .then(() => {
      alert('Student deleted');
      window.location.href = 'view-user.html';  // Redirect to view users
  })
  .catch(error => {
      console.error('Error deleting student:', error);
      alert('Failed to delete student');
  });
}

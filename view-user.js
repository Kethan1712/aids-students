// Function to load and display students
function loadStudents() {
  const studentsContainer = document.querySelector(".students-container");

  // Fetch student data from the server
  fetch('/api/students') // Make sure this URL matches your back-end endpoint
      .then(response => response.json())
      .then(students => {
          if (students.length === 0) {
              studentsContainer.innerHTML = "<p>No students data found!</p>";
          } else {
              studentsContainer.innerHTML = ""; // Clear existing content

              // Loop through students and create boxes
              students.forEach((student) => {
                  const studentBox = document.createElement("div");
                  studentBox.classList.add("student-box");

                  // Add student information inside the box
                  studentBox.innerHTML = `
                      <h2>${student.name}</h2>
                      <p><strong>ID:</strong> ${student.id}</p>
                      <p><strong>Gender:</strong> ${student.gender}</p>
                  `;

                  // Append student box to the container
                  studentsContainer.appendChild(studentBox);
              });
          }
      })
      .catch(error => {
          console.error('Error loading students:', error);
          studentsContainer.innerHTML = "<p>Failed to load student data.</p>";
      });
}

// Call the loadStudents function when the page loads
window.addEventListener('DOMContentLoaded', loadStudents);

// Function to add a student (send data to server)
function addStudent(event) {
  event.preventDefault(); // Prevent form submission

  // Get input values
  const studentName = document.querySelector("#student-name").value;
  const studentId = document.querySelector("#student-id").value;
  const studentGender = document.querySelector("#student-gender").value;

  // Check if inputs are not empty
  if (studentName && studentId && studentGender) {
      const studentData = {
          name: studentName,
          id: studentId,
          gender: studentGender
      };

      // Send data to the server using fetch (POST request)
      fetch('/api/students', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(studentData)
      })
      .then(response => response.json())
      .then(data => {
          alert("Student added successfully!");
          loadStudents(); // Refresh the student list after adding
      })
      .catch(error => {
          console.error('Error adding student:', error);
          alert("Error adding student!");
      });
  } else {
      alert("Please fill in all fields!");
  }
}

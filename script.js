document.addEventListener("DOMContentLoaded", () => {
  const selectButton = document.getElementById("select-student");
  const resultDiv = document.getElementById("result");
  let students = [];

  // Fetch and parse the CSV file
  fetch("data.csv")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch student data.");
      }
      return response.text();
    })
    .then((csvText) => {
      Papa.parse(csvText, {
        header: true,
        complete: (result) => {
          students = result.data.filter(
            (student) => student.Name && student.RollNo && student.Course
          ); // Filter out incomplete rows
          console.log("Students loaded:", students);
        },
        error: (err) => {
          console.error("Error parsing CSV:", err);
          showError("Failed to load student data. Please try again later.");
        },
      });
    })
    .catch((err) => {
      console.error("Error fetching CSV:", err);
      showError("Failed to fetch student data. Please check your connection.");
    });

  // Handle button click to select a random student
  selectButton.addEventListener("click", () => {
    if (students.length === 0) {
      showError("No student data available. Please ensure data.csv is loaded.");
      return;
    }

    const randomIndex = Math.floor(Math.random() * students.length);
    const selectedStudent = students[randomIndex];

    // Display the selected student's details
    resultDiv.innerHTML = `
            <h3>Selected Student</h3>
            <p><strong>Name:</strong> ${selectedStudent.Name}</p>
            <p><strong>Roll No:</strong> ${selectedStudent.RollNo}</p>
            <p><strong>Course:</strong> ${selectedStudent.Course}</p>
        `;
    resultDiv.classList.remove("hidden");
  });

  // Function to display error messages
  function showError(message) {
    resultDiv.innerHTML = `<p style="color: #FF0000;">Error: ${message}</p>`;
    resultDiv.classList.remove("hidden");
  }
});

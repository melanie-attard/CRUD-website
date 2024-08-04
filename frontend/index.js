document.addEventListener("DOMContentLoaded", function () {
  fetch("http://127.0.0.1:5000/")
    .then((response) => response.json())
    .then((data) => {
      // retrieve show data and populate table
      console.log(data);
      const table = document.querySelector("#showsTable tbody");

      data.forEach((show) => {
        const row = document.createElement("tr");

        Object.values(show).forEach((text, index, array) => {
          const cell = document.createElement("td");
          cell.textContent = text;
          row.appendChild(cell);

          // append delete button to the last cell
          if (index === array.length - 1) {
            addBtns(cell);
          }
        });

        table.appendChild(row);
      });
    })
    .catch((error) => console.error("Error fetching data:", error));
});

function addBtns(cell) {
  // add a container for the buttons
  const buttonContainer = document.createElement("div");
  buttonContainer.className = "button-container";

  // add a delete button
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.onclick = function () {
    fetch(`/delete/${show.id}`, { method: "DELETE" })
      .then((response) => response.json())
      .then((result) => {
        alert(result.message);
        row.remove(); // remove the row from the table
      })
      .catch((error) => console.error("Error deleting data:", error));
  };

  buttonContainer.appendChild(deleteButton);

  // add an edit button

  // append the container to the cell
  cell.appendChild(buttonContainer);
}

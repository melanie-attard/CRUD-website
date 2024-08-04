let popupOverlay, closeButton, confirmButton, confirmHandler;

document.addEventListener("DOMContentLoaded", function () {
  // retrieve popup elements
  popupOverlay = document.getElementById("popupOverlay");
  closeButton = document.getElementById("closeButton");
  confirmButton = document.getElementById("confirmButton");

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
            addBtns(cell, show.id, row);
          }
        });

        table.appendChild(row);
      });
    })
    .catch((error) => console.error("Error fetching data:", error));

  // listener to close the popup if the user presses 'ESC' key
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closePopup();
    }
  });

  // listener to close popup if user clicks outside the popup window
  popupOverlay.addEventListener("click", function (event) {
    if (event.target === popupOverlay) {
      closePopup();
    }
  });

  closeButton.addEventListener("click", closePopup);

  confirmButton.addEventListener("click", function () {
    if (confirmHandler) {
      confirmHandler();
    }
    closePopup();
  });
});

function addBtns(cell, showId, row) {
  // add a container for the buttons
  const buttonContainer = document.createElement("div");
  buttonContainer.className = "button-container";

  // add a delete button
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.onclick = function () {
    console.log(`Delete button clicked for show ID: ${showId}`);
    openPopup({
      title: "Confirm Deletion",
      body: "<p>Are you sure you want to delete this item?</p>",
      confirmBtnText: "Delete",
      onConfirm: function () {
        fetch(`http://127.0.0.1:5000/delete/${showId}`, { method: "DELETE" })
          .then((response) => response.json())
          .then((result) => {
            alert(result.message);
            row.remove(); // remove the row from the table
          })
          .catch((error) => console.error("Error deleting data:", error));
      },
    });
  };

  buttonContainer.appendChild(deleteButton);

  // add an edit button

  // append the container to the cell
  cell.appendChild(buttonContainer);
}

function openPopup({ title, body, confirmBtnText, onConfirm }) {
  document.getElementById("popupTitle").textContent = title;
  document.getElementById("popupBody").innerHTML = body;
  confirmButton.textContent = confirmBtnText;

  confirmHandler = onConfirm;

  popupOverlay.style.display = "flex";
}

function closePopup() {
  popupOverlay.style.display = "none";
}

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
            addBtns(cell, show, row);
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

  document.getElementById("addBtn").addEventListener("click", addNewShow);
});

function addBtns(cell, show, row) {
  // add a container for the buttons
  const buttonContainer = document.createElement("div");
  buttonContainer.className = "button-container";

  // add a delete button
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.onclick = function () {
    console.log(`Delete button clicked for show ID: ${show.id}`);
    openPopup({
      title: "Confirm Deletion",
      body: "<p>Are you sure you want to delete this item?</p>",
      confirmBtnText: "Delete",
      onConfirm: function () {
        fetch(`http://127.0.0.1:5000/delete/${show.id}`, { method: "DELETE" })
          .then((response) => response.json())
          .then((result) => {
            // alert(result.message);
            row.remove(); // remove the row from the table
          })
          .catch((error) => console.error("Error deleting data:", error));
      },
    });
  };

  // add an edit button
  const editButton = document.createElement("button");
  editButton.id = "editBtn";
  editButton.textContent = "Edit";
  editButton.onclick = function () {
    console.log(`Edit button clicked for show ID: ${show.id}`);

    // display the popup with a form
    openPopup({
      title: "Edit Show",
      body: document.getElementById("formTemplate").innerHTML,
      confirmBtnText: "",
      onConfirm: function () {
        // store the new values in a dictionary to send to the API
        const updatedShow = {
          id: show.id,
          name: document.getElementById("name").value,
          genre: document.getElementById("genre").value,
          status: document.getElementById("status").value,
          premiered: document.getElementById("premiered").value,
          network: document.getElementById("network").value,
        };

        // call the update endpoint from the API
        fetch(`http://127.0.0.1:5000/update/${show.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedShow),
        })
          .then((response) => response.json())
          .then((result) => {
            // update table row with new data
            row.cells[1].textContent = updatedShow.name;
            row.cells[2].textContent = updatedShow.genre;
            row.cells[3].textContent = updatedShow.status;
            row.cells[4].textContent = updatedShow.premiered;
            row.cells[5].textContent = updatedShow.network;
          })
          .catch((error) => console.error("Error updating data:", error));
      },
      isForm: true,
    });
  };

  // append buttons to container
  buttonContainer.appendChild(editButton);
  buttonContainer.appendChild(deleteButton);

  // append the container to the cell
  cell.appendChild(buttonContainer);
}

function addNewShow() {
  console.log("Add Btn Clicked");
}

function openPopup({ title, body, confirmBtnText, onConfirm, isForm = false }) {
  document.getElementById("popupTitle").textContent = title;
  document.getElementById("popupBody").innerHTML = body;

  confirmButton.textContent = confirmBtnText;
  confirmHandler = onConfirm;

  if (isForm) {
    confirmButton.style.display = "none";

    // add an event listener for the submit button
    document.getElementById("submitBtn").addEventListener("click", function () {
      if (confirmHandler) {
        confirmHandler();
      }
      closePopup();
    });
  } else {
    confirmButton.style.display = "inline-block";
  }

  popupOverlay.style.display = "flex";
}

function closePopup() {
  popupOverlay.style.display = "none";
}

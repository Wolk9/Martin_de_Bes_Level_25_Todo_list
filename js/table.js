const displayData = (data) => {
  //   console.log("displayData", data);
  createTableDiv.setAttribute("id", "tablediv");
  grabSection.append(createTableDiv);

  // flush the Table when records exist to prevent double display (in Chrome)
  if (document.getElementById("tablediv").firstChild != null) {
    document.getElementById("tablediv").firstChild.innerHTML = "";
  }

  createTableDiv.append(createTable);

  let count = 1;

  for (i = 0; i < data.length; i++) {
    let idValue = data[i]._id;
    // console.log(count);
    count++;
    // console.log(data[i]);
    const tableRow = document.createElement("tr"); // Create Table Row
    const createDoneCell = document.createElement("td"); // Create Done Cell
    const createDescriptionCell = document.createElement("td"); // Create Description Cell
    const createDeleteCell = document.createElement("td"); // Create Delete Cell
    const createTrashCanButton = document.createElement("button"); // Create Delete Button
    const createTrashCan = document.createElement("i"); // Create Icon Element
    const createCheckbox = document.createElement("input"); // Create label element for checkbox Done;

    // checkbox Done Bolean
    createCheckbox.setAttribute("type", "checkbox");
    createCheckbox.setAttribute("name", "done");
    createCheckbox.setAttribute("id", "done");
    createDoneCell.setAttribute("width", "auto");
    if (data[i].done === "true" || data[i].done === true) {
      createCheckbox.setAttribute("checked", ""); // set checkbox checked if true
      createDescriptionCell.style.textDecoration = "line-through"; // strike-trhu a done todo record
    } else if (data[i].done === "false" || data[i].done === false) {
      createCheckbox.removeAttribute("checked"); // set checkbox uncheckt if false
    }
    createCheckbox.addEventListener("change", function (evt) {
      // see if the check is removed or applied and change it in the database
      if (evt.target.checked) {
        editData("", true, idValue);
      } else {
        editData("", false, idValue);
      }
    });
    // ------------ End checkbox Done Bolean

    createDescriptionCell.setAttribute("width", "400px");

    // create the delete /trashcan posibility:

    createTrashCan.classList.add("fa", "fa-trash"); // make it a trashcan
    createTrashCanButton.append(createTrashCan); // append trashcan as the button
    createTable.appendChild(tableRow);

    tableRow.setAttribute("id", idValue); // set the id to the id, so that is know which record to edit
    tableRow.append(createDoneCell); // append the Done Cell to the row
    tableRow.append(createDescriptionCell); // append the Description Cell to the row
    tableRow.append(createDeleteCell); // append the Delete Cell to the row
    createDoneCell.append(createCheckbox); // append the checkbox to the Done Cell
    createDescriptionCell.innerText = data[i].description;
    createDeleteCell.append(createTrashCanButton);
    createTrashCanButton.append(createTrashCan);
    createTrashCanButton.addEventListener("mousedown", function () {
      deleteData(idValue);
    });

    // make the existing records editable by clicking on the line:

    createDescriptionCell.addEventListener("mousedown", function () {
      createDescriptionCell.setAttribute("contenteditable", "true");
      createDescriptionCell.addEventListener("keydown", function (event) {
        if (event.key != "Enter") {
        } else {
          createDescriptionCell.removeAttribute("contenteditable");
          let editedText = createDescriptionCell.innerText;
          let status = createDoneCell.innerText;

          editData(editedText, status, idValue);
        }
      });
    });
  }
};

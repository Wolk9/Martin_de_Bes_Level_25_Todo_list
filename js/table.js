const displayData = (data) => {
  //   console.log(data);
  createTableDiv.setAttribute("id", "tablediv");
  grabSection.append(createTableDiv);

  createTableDiv.append(createTable);

  let count = 1;
  for (i = 0; i < data.length; i++) {
    // console.log(count);
    count++;
    // console.log(data[i]);
    const tableRow = document.createElement("tr"); // Create Table Row
    const createDoneCell = document.createElement("td"); // Create Done Cell
    const createDescriptionCell = document.createElement("td"); // Create Description Cell
    const createDeleteCell = document.createElement("td"); // Create Delete Cell
    const createTrashCanButton = document.createElement("button"); // Create Delete Button

    const createTrashCan = document.createElement("i"); // Create Icon Element
    createDoneCell.setAttribute("width", "auto");
    createDescriptionCell.setAttribute("width", "400px");
    createTrashCan.classList.add("fa", "fa-trash"); // make it a trashcan
    createTrashCanButton.append(createTrashCan); // append trashcan as the button
    createTable.appendChild(tableRow);
    let idValue = data[i]._id;
    tableRow.setAttribute("id", idValue);
    tableRow.append(createDoneCell); // append the Done Cell to the row
    tableRow.append(createDescriptionCell); // append the Description Cell to the row
    tableRow.append(createDeleteCell); // append the Delete Cell to the row
    createDoneCell.innerText = data[i].done;
    createDescriptionCell.innerText = data[i].description;
    createDeleteCell.append(createTrashCanButton);
    createTrashCanButton.append(createTrashCan);
    createTrashCanButton.addEventListener("mousedown", function () {
      //   console.log("clicked detele " + idValue);
      deleteData(idValue);
    });
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

    // break;
  }

  //   console.log("display some data in a table");
};

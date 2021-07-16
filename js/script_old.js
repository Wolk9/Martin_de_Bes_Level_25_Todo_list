// DOM Basic Setup

const listPlace = document.getElementById("todo");
const createDiv = document.createElement("div");
const createTable = document.createElement("table");
createDiv.setAttribute("id", "tablediv");
listPlace.appendChild(createDiv);
createDiv.appendChild(createTable);
const tableDiv = document.getElementById("tablediv");
const table = document.querySelector("table");

catchData();

const inputForm = () => {
  console.log("inputForm");
  const selectSection = document.querySelector("section");
  const newDiv = document.createElement("div");
  const todoDiv = document.getElementById("todo");
  newDiv.setAttribute("id", "inputField");
  selectSection.insertBefore(newDiv, todoDiv);
  const inputFormPlace = document.getElementById("inputField");
  const createInputForm = document.createElement("form");
  createInputForm.setAttribute("id", "inputForm");
  inputFormPlace.appendChild(createInputForm);
  const createInputField = document.createElement("input");
  createInputField.setAttribute("type", "text");
  createInputField.setAttribute("name", "newTask");
  createInputField.setAttribute("placeholder", "Type a task...");
  createInputForm.appendChild(createInputField);
  // document.querySelector("input").focus();
  const submitButton = document.createElement("button");
  submitButton.setAttribute("id", "submit");
  createInputForm.appendChild(submitButton);
  submitButton.innerText = "Create Task";
  submitButton.addEventListener("click", function () {
    const input = document.querySelector("input").value;
    createData(input);
    catchData();
  });
  createInputField.addEventListener("keydown", function (event) {
    if (event.key != "Enter") {
      console.log(event.key + " is geen Enter");
    } else {
      const input = document.querySelector("input").value;
      createData(input);
      catchData();
    }
  });
};

// error TypeError: NetworkError when attempting to fetch resource.

async function createData(input) {
  console.log("createData");
  console.log(input);
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    description: input,
    done: false
  });

  console.log(raw);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  await fetch("http://localhost:3000/", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      console.log(result);
    })
    .catch((error) => console.log("error", error));
}

async function catchData() {
  console.log("catchData");
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
  };

  await fetch("http://localhost:3000/", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      displayData(result);
    })
    .catch((error) => console.log("error", error));
}

async function deleteData(id) {
  console.log("deleteData");
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = "";

  const requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  await fetch("http://localhost:3000/" + id, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      console.log(result);
      catchData();
    })
    .catch((error) => console.log("error", error));
}

const displayData = (data) => {
  let count = 1;
  console.log("displayData");
  console.log(table, tableDiv);
  const tableRow = document.createElement("tr"); // Create Table Row
  const createDoneCell = document.createElement("td"); // Create Done Cell
  const createDescriptionCell = document.createElement("td"); // Create Description Cell
  const createDeleteCell = document.createElement("td"); // Create Delete Cell
  const createTrashCanButton = document.createElement("button"); // Create Delete Button
  createTrashCanButton.classList.add("btn");
  // doneCell.setAttribute("width", "80px");
  // descriptionCell.setAttribute("width", "400px");
  createDoneCell.setAttribute("width", "80px");
  createDescriptionCell.setAttribute("width", "400px");

  data.forEach((item) => {
    console.log(item);
    const doneCell = tableRow.appendChild(createDoneCell); // Append Done Cell to Table Row
    const descriptionCell = tableRow.appendChild(createDescriptionCell); // Append Description Cell to Table Row
    const deleteCell = tableRow.appendChild(createDeleteCell); // Append Delete Cell to Table Row
    const idValue = item._id;
    createTrashCanButton.addEventListener("mousedown", function () {
      console.log("Clicked Delete " + idValue);
      deleteData(idValue);
    });

    const createTrashCan = document.createElement("i"); // Create Icon Element
    createTrashCan.classList.add("fa", "fa-trash"); // make it a Trashcan with icon class
    deleteCell.appendChild(createTrashCanButton); // Append Delete Button to Delete Cell
    createTrashCanButton.appendChild(createTrashCan); // Append Icon Element to Delete Button

    count++;
    console.log(count);
    doneCell.innerText = item.done;
    descriptionCell.innerText = item.description;
    table.appendChild(tableRow);
  });
  tableDiv.appendChild(table);
};

inputForm();

// function createTable(tableData) {
//   var table = document.createElement("table");
//   var tableBody = document.createElement("tbody");

//   tableData.forEach(function (rowData) {
//     var row = document.createElement("tr");

//     rowData.forEach(function (cellData) {
//       var cell = document.createElement("td");
//       cell.appendChild(document.createTextNode(cellData));
//       row.appendChild(cell);
//     });

//     tableBody.appendChild(row);
//   });

//   table.appendChild(tableBody);
//   document.body.appendChild(table);
// }

// versie 2

// if (data.length < 1) {

// } else if (data.length >= 1) {
//   console.log(data.length);
//   const listPlace = document.getElementById("todo");
//   const createDiv = document.createElement("div");
//   const createTable = document.createElement("table");
//   createDiv.setAttribute("id", "tablediv");
//   listPlace.appendChild(createDiv);
//   createDiv.appendChild(createTable);
//   console.log(data.length);
//   data.forEach((item) => {
//     const table = document.querySelector("table");
//     const row = table.insertRow();
//     const doneCell = row.insertCell();
//     const taskCell = row.insertCell();
//     const deleteCell = row.insertCell();
//     const createTrashCanButton = document.createElement("button");
//     createTrashCanButton.classList.add("btn");
//     const idValue = item._id;
//     createTrashCanButton.addEventListener("mousedown", function () {
//       deleteData(idValue);
//     });
//     const createTrashCan = document.createElement("i");
//     createTrashCan.classList.add("fa", "fa-trash");
//     deleteCell.appendChild(createTrashCanButton);
//     taskCell.innerText = item.description;
//     doneCell = item.done;
//     table.appendChild(row);
//   });
// }

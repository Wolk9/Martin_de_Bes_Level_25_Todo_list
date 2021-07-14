const data = 0;
const baseUrl = "http://localhost:3000/";
const id2 = "cd61b1d1-560d-4102-8cc7-85c614f8753c";
const id = "";

catchData()
  .then((response) => {
    console.log("well done!");
    console.log(response);
  })
  .catch((error) => {
    console.log("error!");
    console.error(error);
  });

const inputForm = () => {
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
  });
  createInputField.addEventListener("keydown", function (event) {
    if (event.key != "Enter") {
      console.log(event.key + " is geen Enter");
    } else {
      const input = document.querySelector("input").value;
      createData(input);
    }
  });
};

async function createData(input) {
  console.log(input);
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    description: input,
    done: false
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  await fetch(baseUrl, requestOptions)
    .then((response) => {
      response.text();
    })
    .then((result) => {
      console.log(result);
      // catchData();
    })
    .catch((error) => console.log("error", error));
}

async function catchData() {
  const response = await fetch(baseUrl + id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
  const json = await response.json();
  console.log(response);
  console.log(json);
  return displayData(json);
}

async function deleteData(id) {
  const response = await fetch(baseUrl + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  });
  const blob = await response.blob();
  console.log(response);
  console.log(blob);
  return catchData(blob);
}

const displayData = (data) => {
  console.log(data, data.length);

  const displayRow = () => {
    data.forEach((item) => {
      const tableDiv = document.getElementById("tablediv");
      const table = document.getElementById("table");
      const tableRow = document.createElement("tr");
      const idValue = item._id;
      const createDoneCell = document.createElement("td");
      const createDescriptionCell = document.createElement("td");
      const createDeleteCell = document.createElement("td");
      const doneCell = tableRow.appendChild(createDoneCell);
      doneCell.setAttribute("width", "80px");
      const descriptionCell = tableRow.appendChild(createDescriptionCell);
      descriptionCell.setAttribute("width", "400px");
      const deleteCell = tableRow.appendChild(createDeleteCell);

      const createTrashCanButton = document.createElement("button");
      createTrashCanButton.classList.add("btn");
      createTrashCanButton.addEventListener("mousedown", function () {
        deleteData(idValue);
      });
      const createTrashCan = document.createElement("i");
      createTrashCan.classList.add("fa", "fa-trash");
      deleteCell.appendChild(createTrashCanButton);
      createTrashCanButton.appendChild(createTrashCan);
      doneCell.innerText = item.done;
      descriptionCell.innerText = item.description;
      table.appendChild(tableRow);
      tableDiv.appendChild(table);
    });
  };

  if (data.length <= 1) {
    const listPlace = document.getElementById("todo");
    const createDiv = document.createElement("div");
    const createTable = document.createElement("table");
    createDiv.setAttribute("id", "tablediv");
    createTable.setAttribute("id", "table");
    listPlace.appendChild(createDiv);
    createDiv.appendChild(createTable);

    displayRow();
  } else if (data.length > 1) {
    displayRow();
  }
};

inputForm();

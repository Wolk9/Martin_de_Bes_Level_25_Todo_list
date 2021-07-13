const data = { description: "buy oatmeal", done: false };
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
  createInputField.setAttribute("value", "new task");
  createInputForm.appendChild(createInputField);
  const submitButton = document.createElement("button");
  submitButton.setAttribute("id", "submit");
  createInputForm.appendChild(submitButton);
  submitButton.innerText = "create";
  submitButton.addEventListener("mousedown", function () {
    createData(input);
  });
};

// hier ben ik gebleven!

async function createData(input) {
  const content = {
    "'description'": input,
    "'done'": false
  }.json;
  const response = await fetch(baseUrl + id, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: content
  });
  const json = await response.json();
  console.log(response);
  console.log(json);
  return displayData(json);
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
  const listPlace = document.getElementById("todo");

  if (document.getElementById("todo").children.length >= 1) {
    console.log(document.getElementById("todo").children.length);
    const div = document.getElementById("todo");
    div.children[0].remove();
  }
  console.log(document.getElementById("todo").children.length);
  const div = document.createElement("div");
  const table = document.createElement("table");
  div.setAttribute("id", "tablediv");
  table.setAttribute("id", "table");
  listPlace.appendChild(div);
  div.appendChild(table);

  data.forEach((item) => {
    const div = document.getElementById("todo");
    const table = document.getElementById("tablediv");
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
  });
};

inputForm();

// fetch(baseUrl, {
//   method: "POST",
//   body: JSON.stringify(data),
//   headers: {
//     "Content-Type": "application/json"
//   }
// });

// console.log(data);

// async function getList() {
// const dataList =  fetch.get() =>

// }
// console.log(dataList);

// // Example POST method implementation:
// async function postData(url = "", data = {}) {
//   // Default options are marked with *
//   const response = await fetch(url, {
//     method: "POST", // *GET, POST, PUT, DELETE, etc.
//     mode: "cors", // no-cors, *cors, same-origin
//     cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
//     credentials: "same-origin", // include, *same-origin, omit
//     headers: {
//       "Content-Type": "application/json"
//       // 'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     redirect: "follow", // manual, *follow, error
//     referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//     body: JSON.stringify(data) // body data type must match "Content-Type" header
//   });
//   return response.json(); // parses JSON response into native JavaScript objects
// }

// postData("https://example.com/answer", { answer: 42 }).then((data) => {
//   console.log(data); // JSON data parsed by `data.json()` call
// });

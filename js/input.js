// inputfield:
const inputField = () => {
  createInputDiv.setAttribute("id", "inputdiv");
  grabSection.append(createInputDiv);
  const createInputField = document.createElement("input"); // set focus on field;
  createInputField.setAttribute("type", "text");
  createInputField.setAttribute("name", "newTask");
  createInputField.setAttribute("placeholder", "Type a task...");
  createInputDiv.append(createInputField);

  // eventListener to keyboard and ENTER to submit
  document.querySelector("input").focus();
  createInputField.addEventListener("keydown", function (event) {
    if (event.key != "Enter") {
      console.log(event.key + " is geen Enter");
    } else {
      const input = document.querySelector("input").value;
      //   console.log("Create data please per keyboard Enter");
      createData(input);
      // catchData();
    }
  });

  // button to submit:

  const submitButton = document.createElement("button");
  submitButton.setAttribute("id", "submit");
  createInputDiv.appendChild(submitButton);
  submitButton.innerText = "Create Task";

  // eventListner to mouseclick to submit

  submitButton.addEventListener("click", function () {
    const input = document.querySelector("input").value;
    // console.log("Create data please per mouseclick");
    createData(input);
    //   catchData();
  });
};

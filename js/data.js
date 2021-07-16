async function createData(input) {
  // create record function
  //   console.log("createData", input);
  //   console.log(input);
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    description: input,
    done: false
  });

  //   console.log(raw);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  await fetch("http://localhost:3000/", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      //   console.log(result);
      catchData(result);
    });
  // .catch((error) => console.log("error", error));
}

async function catchData() {
  // get the records function
  //   console.log("catchData");
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
      //   console.log(result);
      displayData(result);
    });
  // .catch((error) => console.log("error", error));
}

async function deleteData(id) {
  // delete 1 record function
  console.log("deleteData", id);
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
      //   console.log(result);
      catchData();
    });
  // .catch((error) => console.log("error", error));
}

async function editData(input, done, id) {
  // edit record function (both done or descripion)
  //   console.log("editData", input, done, id);
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  if (input != "") {
    var raw = JSON.stringify({
      description: input,
      done: "false"
    });
  } else {
    var raw = JSON.stringify({
      done: done
    });
  }

  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch("http://localhost:3000/" + id, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      //   console.log(result);
      catchData();
    })
    .catch((error) => console.log("error", error));
}

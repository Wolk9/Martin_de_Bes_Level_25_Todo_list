async function createData(input) {
  //   console.log("createData");
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
    });
  // .catch((error) => console.log("error", error));
}

async function catchData() {
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
  //   console.log("deleteData");
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
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    description: input,
    done: done
  });

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

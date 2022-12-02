const listEl = document.querySelector("#list-test-data");

async function fetchAllEmployees() {
  try {
    let URL = `http://localhost:7000/directory`;
    let payload = await fetch(URL);
    let data = await payload.json();
    return data;
  } catch (e) {
    console.error(`Oh no, we couldn't fetch the data for all employees!`);
  }
}

async function fetchSingleEmployee(employeeName) {
  try {
    let URL = `http://localhost:7000/directory/${employeeName}`;
    let payload = await fetch(URL);
    let data = await payload.json();
    return data;
  } catch (e) {
    console.error(
      `Oh no, we couldn't fetch the data for this particular employee!`
    );
  }
}

async function displayAllEmployees() {
  let testData = await fetchTest();
  testData.forEach((datum) => {
    let {
      person_name: { last_name, first_name },
      person_department,
      person_email_address,
    } = datum;
    let listItemsHTML = `
    <li class="list-test-data-item">Name: ${first_name} ${last_name}</li>
    <li class="list-test-data-item">Department: ${person_department}</li>
    <li class="list-test-data-item">Email: ${person_email_address}</li>
    `;
    listEl.innerHTML += listItemsHTML;
  });
}

displayAllEmployees();

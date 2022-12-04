const listEl = document.querySelector("#list-test-data");
const employeeSearchInput = document.querySelector("#input-employee-search");

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

async function fetchSpecificEmployee(employeeName) {
  try {
    let URL = `http://localhost:7000/directory/${employeeName}`;
    let payload = await fetch(URL);

    if (payload) {
      let data = await payload.json();
      if (data.length > 0) {
        return data;
      }
    }
    return null;
  } catch (e) {
    console.error(
      `Oh no, we couldn't fetch the data for this particular employee!`
    );
  }
}

async function displayAllEmployees() {
  let data = await fetchAllEmployees();
  data.forEach((result) => {
    addFetchedResultToList(result);
  });
}

async function displaySpecificEmployees(employeeName) {
  clearResultsList();

  let data = await fetchSpecificEmployee(employeeName);
  if (!data) {
    listEl.innerHTML = `<li class="list-item-empty-result">No results found!</li>`;
    return;
  }

  data.forEach((result) => {
    console.log("got result", result);
    addFetchedResultToList(result);
  });
}

function clearResultsList() {
  listEl.innerHTML = "";
}

function addFetchedResultToList(result) {
  let {
    person_name: { last_name, first_name },
    person_department,
    person_email_address,
  } = result;

  let nameListItem = document.createElement("li");
  nameListItem.textContent = `${first_name} ${last_name}`;

  let departmentListItem = document.createElement("li");
  departmentListItem.textContent = `${person_department}`;

  let emailListItem = document.createElement("li");
  emailListItem.textContent = `${person_email_address}`;

  [nameListItem, departmentListItem, emailListItem].forEach((item) => {
    item.classList = "list-item-data-result";
    listEl.appendChild(item);
  });
}

employeeSearchInput.addEventListener("change", (e) => {
  displaySpecificEmployees(e.target.value);
});
// displayAllEmployees();
// displaySpecificEmployees("Christopher");

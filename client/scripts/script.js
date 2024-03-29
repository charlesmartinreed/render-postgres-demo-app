const listEl = document.querySelector("#list-test-data");
const listAdminEl = document.querySelector("#list-admin-test-data");

const btnLoginToggle = document.querySelector("#btn-login");
const btnLoginSubmit = document.querySelector("#btn-submit-login");

const employeeListingContainers =
  document.querySelectorAll(".employee-listing");

const employeeResultDividerDiv = document.querySelector(
  "#page-divider-left-side"
);

const employeeSearchInput = document.querySelector("#input-employee-search");
const inputForUsername = document.querySelector("#login-username");
const passwordInputEl = document.querySelector("#login-password");
const loginModal = document.querySelector("#login-modal");

const baseRemoteURL = "http://localhost:7000";

async function init() {
  let employeeList = await fetchAllEmployees();

  if (employeeList) {
    // console.log("all names", names);
    setupContainers(employeeList);
  }
}

function setupContainers(employees) {
  for (const [k, v] of Object.entries(employees)) {
    console.log(k, v);
  }
  // let letters = Array.from(
  //   new Set(nameList.map((n) => n.person_name.last_name.slice(0, 1)))
  // );

  // for (let letter of letters) {
  //   employeeResultDividerDiv.innerHTML += `
  //   <div class="employee-search-results-container">
  //         <div class="employee-group-container" id="employer-letter-${letter}">
  //           <div class="employee-group-letter-container">
  //             <p class="employee-group-letter-text">${letter}</p>
  //           </div>
  //         </div>
  //       </div>
  //       `;
  // }

  // const div = document.getElementById("e");

  // for (let name of nameList) {
  //   let {
  //     person_name: { last_name, first_name },
  //     employee_id,
  //   } = name;

  //   employeeResultDividerDiv.innerHTML += `
  //   <div class="employee-group-listings">
  //   <div class="employee-listing" data-group-letter="${letter}">
  //     <a href="#" class="employee-name-link" data-employee-id="${employee_id}"> ${first_name} ${last_name} </a>
  //   </div>
  // </div>
  //   `;

  // let letter = last_name.slice(0, 1);
  // }
  // console.log("letters are", letters);
}

async function fetchAllEmployees() {
  try {
    let URL = `http://localhost:7000/directory`;
    let payload = await fetch(URL);
    let data = await payload.json();
    return data;
  } catch (e) {
    console.error(`Oh no, we couldn't fetch the data for all employees!`);
    return null;
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

async function displaySpecificEmployees(employeeName) {
  clearResultsList();

  let data = await fetchSpecificEmployee(employeeName);
  if (!data) {
    listEl.innerHTML = `<li class="list-item-empty-result">No results found!</li>`;
    return;
  }

  data.forEach((result) => {
    addFetchedResultToList(listEl, result);
  });
}

function clearResultsList() {
  listEl.innerHTML = "";
}

function addFetchedResultToList(list, result) {
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
    list.appendChild(item);
  });
}

// employeeSearchInput.addEventListener("change", (e) => {
//   displaySpecificEmployees(e.target.value);
// });

function displayAlert(msg) {
  console.log("displaying alert", msg);

  let alertDiv = document.createElement("div");
  alertDiv.classList.add("modal", "alert-modal", "displaying");
  alertDiv.textContent = msg;

  let alertDivContents = document.createElement("div");
  alertDivContents.classList.add("modal-contents");

  let closeBtn = document.createElement("button");
  closeBtn.classList.add("modal-close-btn");
  closeBtn.type = "submit";
  closeBtn.textContent = "OK";

  alertDivContents.appendChild(closeBtn);
  alertDiv.appendChild(alertDivContents);

  document.querySelector("body").appendChild(alertDiv);

  closeBtn.addEventListener("click", () => {
    alertDiv.classList.toggle("displaying");
  });
}

function toggleModal(modal) {
  modal.classList.toggle("displaying");
}

btnLoginSubmit.addEventListener("click", async (e) => {
  let username = inputForUsername.value;
  let password = passwordInputEl.value;

  if (username === "" || password === "") return;

  let encodedAuthCredentials = encodeToBase64(`${username}:${password}`);

  try {
    let URL = `${baseRemoteURL}/directory`;
    let res = await fetch(URL, {
      method: "GET",
      "Content-Type": "application/json",
      headers: {
        Authorization: `Basic ${encodedAuthCredentials}`,
      },
    });

    if (res.status !== 200) {
      let data = await res.json();

      // TODO: replace this with a modal
      displayAlert(`${data.msg}`);
      return;
    }

    if (res.status === 200) {
      let data = await res.json();
      data.forEach((result) => {
        addFetchedResultToList(listAdminEl, result);
      });
    }
  } catch (e) {
    console.error(e);
  }
});

document.querySelector("body").addEventListener("click", (e) => {
  // TODO: make this adaptive to the displayed modal, not just the login modal
  let modalChildren = Array.from(loginModal.children);

  if (
    e.target.matches(".modal-contents") ||
    e.target.matches(".modal.displaying") ||
    modalChildren.includes(e.target)
  ) {
    console.log("inner modal clicked");
    console.log("is child or loginModal itself");
    return;
  }

  if (e.target.matches("#btn-login")) {
    console.log("login area clicked");
    toggleModal(loginModal);
    return;
  }

  if (e.target.matches("input")) {
    console.log("input area clicked");
    return;
  }

  if (loginModal.classList.contains("displaying")) {
    console.log("body or body element clicked");
    toggleModal(loginModal);
  }

  // if (e.target.classList !== btnLoginToggle.classList) {
  //   if (loginModal.classList.contains("displaying")) {
  //     toggleModal(loginModal);
  //   }
  // }
});

function encodeToBase64(unencodedValue) {
  return btoa(unencodedValue);
}

init();

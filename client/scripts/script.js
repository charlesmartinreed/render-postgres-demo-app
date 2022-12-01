const listEl = document.querySelector("#list-test-data");

async function fetchTest() {
  try {
    let URL = `http://localhost:7000/api`;
    let payload = await fetch(URL);
    let data = await payload.json();
    return data;
  } catch (e) {
    console.error(`Oh no, we couldn't fetch the data!`);
  }
}

window.addEventListener("DOMContentLoaded", async () => {
  let testData = await fetchTest();
  testData.forEach((datum) => {
    let { name, department, email_address } = datum;
    let listItemsHTML = `
    <li class="list-test-data-item">Name: ${name}</li>
    <li class="list-test-data-item">Department: ${department}</li>
    <li class="list-test-data-item">Email: ${email_address}</li>
    `;
    listEl.innerHTML += listItemsHTML;
  });
});

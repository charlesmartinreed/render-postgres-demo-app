// import { namePaths, generateRandomName } from "./utils.js";

class Employee {
  constructor(
    person_name,
    employee_id,
    department,
    email_address,
    phone_number,
    start_date,
    last_updated_date
  ) {
    const {
      person_name,
      employee_id,
      department,
      email_address,
      phone_number,
      start_date,
      last_updated_date,
    } = this;
  }
}

const employeeList = [
  new Employee(
    { last_name: "mctesterson", first_name: "testy" },
    122525252,
    "merchandise",
    "testy@averyrealcompany.co",
    "111-222-3333",
    Date(01 - 15 - 2015),
    Date(06 - 30 - 2019)
  ),
];

const createNewEmployee = () => {
  // TODO
}

// export const staticEmployeeData = [
//   {
//     person_name: {
//       last_name: generateRandomName(namePaths.Last),
//       first_name: generateRandomName(namePaths.First),
//     },
//     employee_id: uuidv4(),
//     department: "Engineering",
//     email_address: "charles@averyrealcompany.co",
//     phone_number: generateNewPhoneNumber(),
//     start_date: "7/01/2018",
//     last_updated_date: null,
//   },
//   {
//     person_name: {
//       last_name: generateRandomName(namePaths.Last),
//       first_name: generateRandomName(namePaths.First),
//     },
//     department: "QA",
//     employee_id: uuidv4(),
//     email_address: "martin@averyrealcompany.co",
//     phone_number: generateNewPhoneNumber(),
//     start_date: "6/15/2020",
//     last_updated_date: null,
//   },
//   {
//     person_name: {
//       last_name: generateRandomName(namePaths.Last),
//       first_name: generateRandomName(namePaths.First),
//     },
//     employee_id: uuidv4(),
//     department: "Executive",
//     email_address: "donna@averyrealcompany.co",
//     phone_number: generateNewPhoneNumber(),
//     start_date: "3/22/2013",
//     last_updated_date: null,
//   },
//   {
//     person_name: {
//       last_name: generateRandomName(namePaths.Last),
//       first_name: generateRandomName(namePaths.First),
//     },
//     employee_id: uuidv4(),
//     department: "Human Resources",
//     email_address: "christopher@averyrealcompany.co",
//     phone_number: generateNewPhoneNumber(),
//     start_date: "7/01/2018",
//     last_updated_date: null,
//   },
// ];

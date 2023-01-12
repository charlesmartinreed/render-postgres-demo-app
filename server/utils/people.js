import {
  generateEmployeeName,
  generateEmployeeID,
  generateEmployeeDepartment,
  generateEmployeeContactNumber,
} from "./utils.js";

export class Employee {
  #country_of_residence = null;
  #start_date = null;
  #last_updated_date = null;

  #person_name = generateEmployeeName();
  #employee_id = generateEmployeeID();
  #department = generateEmployeeDepartment();

  get person_name() {
    let { firstName, lastName } = this.#person_name;
    return `${lastName}, ${firstName}`;
  }

  get employee_id() {
    return this.#employee_id;
  }

  get employee_department() {
    let { department } = this.#department;
    return `${department}`;
  }

  #email_address = [
    this.#person_name.lastName.toLowerCase(),
    "_",
    this.#person_name.firstName.toLowerCase(),
    String(Math.floor(Math.random() * (999 - 1) + 1)),
    "@",
    "atotallyrealcompany.co",
  ].join("");

  get email_address() {
    return this.#email_address;
  }

  #contact_number = generateEmployeeContactNumber();

  get contact_number() {
    return this.#contact_number;
  }

  // TODO LIST
  // CREATE RANDOM START DATE GENERATOR
  // CREATE SETTER TO SET LAST UPDATED DATE AS NEEDED
}

// export const staticEmployeeData = [
//   {
//     person_name: {
//       last_name: generateEmployeeName(namePaths.Last),
//       first_name: generateEmployeeName(namePaths.First),
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
//       last_name: generateEmployeeName(namePaths.Last),
//       first_name: generateEmployeeName(namePaths.First),
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
//       last_name: generateEmployeeName(namePaths.Last),
//       first_name: generateEmployeeName(namePaths.First),
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
//       last_name: generateEmployeeName(namePaths.Last),
//       first_name: generateEmployeeName(namePaths.First),
//     },
//     employee_id: uuidv4(),
//     department: "Human Resources",
//     email_address: "christopher@averyrealcompany.co",
//     phone_number: generateNewPhoneNumber(),
//     start_date: "7/01/2018",
//     last_updated_date: null,
//   },
// ];

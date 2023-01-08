import { namePaths, generateRandomName } from "./utils.js";

export class Employee {
  #employee_id = null;
  #department = null;
  #email_address = null;
  #phone_number = null;
  #start_date = null;
  #last_updated_date = null;

  #person_name = {
    last: generateRandomName(namePaths.Last),
    first: generateRandomName(namePaths.First),
  };

  get person_name() {
    return this.#person_name;
  }

  // TODO LIST

  // REIMPLMEENT UUID ID GENERATOR
  // CREATE FILE FOR DEPARTMENT LISTS
  // CREATE METHOD TO GENERATE EMAIL ADDY FROM GENERATED NAME
  // REIMPLEMENT PHONE NUMBER GENERATOR
  // CREATE RANDOM START DATE GENERATOR
  // CREATE SETTER TO SET LAST UPDATED DATE AS NEEDED
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

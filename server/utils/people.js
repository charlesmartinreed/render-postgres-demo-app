import {
  generateEmployeeName,
  generateEmployeeID,
  generateEmployeeDepartment,
  generateEmployeeContactInformation,
  generateEmployeeStartDate,
} from "./utils.js";

export class Employee {
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

  #contact_information = generateEmployeeContactInformation();

  get contact_information() {
    let { location, contactNumber } = this.#contact_information;
    return `location is ${location} | phone number is ${contactNumber}`;
  }

  #start_date = generateEmployeeStartDate();

  get start_date() {
    return this.#start_date;
  }
}

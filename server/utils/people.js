import {
  generateEmployeeName,
  generateEmployeeID,
  generateEmployeeDepartment,
  generateEmployeeEmail,
  generateEmployeeContactInformation,
  generateEmployeeStartDate,
  getLastUpdatedTimestamp,
} from "./utils.js";

export class Employee {
  #person_name = generateEmployeeName();
  get person_name() {
    let { firstName, lastName } = this.#person_name;
    return `${lastName}, ${firstName}`;
  }

  #employee_id = generateEmployeeID();
  get employee_id() {
    return this.#employee_id;
  }

  #department = generateEmployeeDepartment();
  get employee_department() {
    let { department } = this.#department;
    return `${department}`;
  }

  #email_address = generateEmployeeEmail(this.#person_name);

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

  #last_updated_date = getLastUpdatedTimestamp(
    this.#employee_id,
    this.#start_date
  );

  get last_update_date() {
    return this.#last_updated_date;
  }
}

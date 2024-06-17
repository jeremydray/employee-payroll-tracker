// Get a reference to the #add-employees-btn element
const addEmployeesBtn = document.querySelector('#add-employees-btn');

// Collect employee data

const employeesArray = []
const collectEmployees = function () {
  // TODO: Get user input to create and return an array of employee objects
  // Add roadblock if a Name fields are blank or if Salary amount is blank/not a number
  let firstName = window.prompt("Enter First Name:");
  while (firstName == "") {
    firstName = window.prompt("First Name Cannot Be Blank:")
  };
  let lastName = window.prompt("Enter Last Name:");
  while (lastName == "") {
    lastName = window.prompt("Last Name Cannot Be Blank:");
  };

  let salary = window.prompt("Enter Salary:");
  while (isNaN(salary) || salary <= 0) {
    salary = window.prompt("Please Enter Numerical Salary Amount:")
  };
  let addEmployee = window.confirm("Would you like to add another employee?")
  const employees = {
    // Added formatting to Array items to properly capitalize regardless of whether input was done that way
    firstName: firstName.charAt(0).toUpperCase() + firstName.substring(1, firstName.length),
    lastName: lastName.charAt(0).toUpperCase() + lastName.substring(1, lastName.length),
    salary: parseInt(salary),
  }
  employeesArray.push(employees);
  // Allow the user to add more employees/restart the function if necessary; otherwise ends the input option
  while (addEmployee) {
    collectEmployees();
    break;
  }
  return employeesArray;
}

// Display the average salary
const displayAverageSalary = function (employeesArray) {
  // TODO: Calculate and display the average salary
  let averageSalary = 0;
  for (let i = 0; i < employeesArray.length; i++) {
    averageSalary += Math.round(employeesArray[i].salary / (employeesArray.length));
  }
  console.log(`The average employee salary between our ${employeesArray.length} employee(s) is $${averageSalary.toFixed(2)}.`);
}

// Select a random employee
const getRandomEmployee = function (employeesArray) {
  // TODO: Select and display a random employee
  let randomizedEmployee = [Math.floor(Math.random() * employeesArray.length)];
  winnerFirstName = employeesArray[randomizedEmployee].firstName;
  winnerLastName = employeesArray[randomizedEmployee].lastName;
  console.log(`Congratulations to ${winnerFirstName} ${winnerLastName}, our random drawing winner!`);
}

/*
  ====================
  STARTER CODE
  Do not modify any of the code below this line:
*/

// Display employee data in an HTML table
const displayEmployees = function (employeesArray) {
  // Get the employee table
  const employeeTable = document.querySelector('#employee-table');

  // Clear the employee table
  employeeTable.innerHTML = '';

  // Loop through the employee data and create a row for each employee
  for (let i = 0; i < employeesArray.length; i++) {
    const currentEmployee = employeesArray[i];

    const newTableRow = document.createElement("tr");

    const firstNameCell = document.createElement("td");
    firstNameCell.textContent = currentEmployee.firstName;
    newTableRow.append(firstNameCell);

    const lastNameCell = document.createElement("td");
    lastNameCell.textContent = currentEmployee.lastName;
    newTableRow.append(lastNameCell);

    const salaryCell = document.createElement("td");
    // Format the salary as currency
    salaryCell.textContent = currentEmployee.salary.toLocaleString("en-US", {
      style: "currency",
      currency: "USD"
    });

    newTableRow.append(salaryCell);

    employeeTable.append(newTableRow);
  }
}

const trackEmployeeData = function () {
  const employees = collectEmployees();

  console.table(employees);

  displayAverageSalary(employees);

  console.log('==============================');

  getRandomEmployee(employees);

  employees.sort(function (a, b) {
    if (a.lastName < b.lastName) {
      return -1;
    } else {
      return 1;
    }
  });

  displayEmployees(employees);
}

// Add event listener to 'Add Employees' button
addEmployeesBtn.addEventListener('click', trackEmployeeData);

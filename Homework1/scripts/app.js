// [Selectors]
const tableContainer = document.querySelector("#table-container");
const searchInput = document.querySelector("#search-input");
const searchBtn = document.querySelector("#search-btn");
const resetBtn = document.querySelector("#reset-btn");

// [Constructor]
function User(firstName, lastName, age, city, country, spouse, pets) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.fullName = `${firstName} ${lastName}`;
  this.age = age;
  this.city = city;
  this.country = country;
  this.spouse = spouse;
  this.pets = pets;
  this.checkIfMarried = function () {
    if (this.spouse) {
      this.isMarried = true;
    } else {
      this.isMarried = false;
    }
  };
  this.checkIfMarried();
}

// [Data]
let usersData = [
  new User(
    "Dimitar",
    "Spiroski",
    23,
    "Struga",
    "Macedonia",
    "Magdalena Kochoska",
    ["Bak", "Kaia"]
  ),
  new User("John", "Doe", 27, "Boston", "USA", "", []),
  new User("Jessica", "Johnson", 21, "New York", "USA", "Johnatan Johnson", [
    "Tobby",
  ]),
  new User("Kai", "Sato", 18, "Tokyo", "Japan", "", []),
  new User("Bjorn", "Larsen", 31, "Oslo", "Norway", "Astrid Larsen", ["Einar"]),
];

function checkMarriage(user) {
  if (user.isMarried) {
    return "Yes";
  } else {
    return "No";
  }
}

function searchUser(input) {
  tableContainer.innerHTML = `<thead><td>First Name</td>
    <td>Last Name</td>
    <td>Full Name</td>
    <td>Age</td>
    <td>City</td>
    <td>Country</td>
    <td>Spouse</td>
    <td>Pets</td>
    <td>Marriage Status</td>
    </thead>`;
  for (const user of usersData) {
    if (input.toLowerCase() === user.fullName.toLowerCase()) {
      tableContainer.innerHTML += `<tr><td>${user.firstName}</td>
        <td>${user.lastName}</td>
        <td>${user.fullName}</td>
        <td>${user.age}</td>
        <td>${user.city}</td>
        <td>${user.country}</td>
        <td>${user.spouse}</td>
        <td>${user.pets.join(", ")}</td>
        <td>${checkMarriage(user)}</td></tr>`;
    }
  }
}

function printUsers() {
  tableContainer.innerHTML = `<thead><td>First Name</td>
    <td>Last Name</td>
    <td>Full Name</td>
    <td>Age</td>
    <td>City</td>
    <td>Country</td>
    <td>Spouse</td>
    <td>Pets</td>
    <td>Marriage Status</td>
    </thead>`;
  for (const user of usersData) {
    tableContainer.innerHTML += `<tr><td>${user.firstName}</td>
    <td>${user.lastName}</td>
    <td>${user.fullName}</td>
    <td>${user.age}</td>
    <td>${user.city}</td>
    <td>${user.country}</td>
    <td>${user.spouse}</td>
    <td>${user.pets.join(", ")}</td>
    <td>${checkMarriage(user)}</td></tr>`;
  }
}

printUsers();

searchBtn.addEventListener("click", () => {
  searchUser(searchInput.value);
});

resetBtn.addEventListener("click", () => {
  printUsers();
});

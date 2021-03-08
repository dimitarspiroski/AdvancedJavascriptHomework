// [Selectors]
const tableContainer = document.querySelector("#table-container");
const searchInput = document.querySelector("#search-input");
const searchBtn = document.querySelector("#search-btn");
const resetBtn = document.querySelector("#reset-btn");
const firstNameInput = document.querySelector("#fname-input");
const lastNameInput = document.querySelector("#lname-input");
const ageInput = document.querySelector("#age-input");
const cityInput = document.querySelector("#city-input");
const countryInput = document.querySelector("#country-input");
const spouseInput = document.querySelector("#spouse-input");
const petsInput = document.querySelector("#pets-input");
const submitButton = document.querySelector("#submit-button");
const errorMessage = document.querySelector("#error-message");
const formPage = document.querySelector("#form-section");
const tablePage = document.querySelector("#table-section");
const ascendBtn = document.querySelector("#ascend-btn");
const descendBtn = document.querySelector("#descend-btn");
const resetSortBtn = document.querySelector("#reset-sort");
const headerLinks = Array.from(document.querySelectorAll(".nav-link"));

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
  this.userID = Math.floor(Math.random() * 8999 + 1000);
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

let originalUsersData = usersData.slice();

const inputData = [
  searchInput,
  firstNameInput,
  lastNameInput,
  ageInput,
  cityInput,
  countryInput,
  spouseInput,
  petsInput,
];

const requiredInputs = [
  firstNameInput,
  lastNameInput,
  ageInput,
  cityInput,
  countryInput,
];

let editIndex = null;
let isEditing = false;

// [Functions]
function defaultPage() {
  formPage.style.display = "block";
  tablePage.style.display = "none";
  headerLinks[1].classList.remove("active");
  headerLinks[0].classList.add("active");
}

function inputValidation() {
  for (let input of requiredInputs) {
    if (!input.value) {
      return false;
    }
  }
  return true;
}

function checkMarriage(user) {
  if (user.isMarried) {
    return "Yes";
  } else {
    return "No";
  }
}

function createUser(firstName, lastName, age, city, country, spouse, pets) {
  const newUser = new User(
    firstName,
    lastName,
    age,
    city,
    country,
    spouse,
    pets
  );
  usersData.push(newUser);
  originalUsersData.push(newUser);
  printUsers(usersData);
}

function printUsers(dataArray) {
  tableContainer.innerHTML = "";
  dataArray.forEach(user => {
    tableContainer.innerHTML += `<tr><td>${user.firstName}</td>
    <td>${user.lastName}</td>
    <td>${user.fullName}</td>
    <td>${user.age}</td>
    <td>${user.city}</td>
    <td>${user.country}</td>
    <td>${user.spouse}</td>
    <td>${user.pets}</td>
    <td>${checkMarriage(user)}</td>
    <td>${user.userID}</td>
    <td><span class="edit">Edit</span><span class="remove">X</span></td>
    </tr>`;
    editUserButtons(usersData);
    deleteUser(usersData, null);
  });
}

function sortUsers(dataArray) {
  dataArray.sort((a, b) => (a.lastName > b.lastName ? 1 : -1));
}
function searchUser(input) {
  tableContainer.innerHTML = "";
  usersData.forEach(user => {
    if (
      input.toLowerCase() === user.fullName.toLowerCase() ||
      parseInt(input) === parseInt(user.userID)
    ) {
      tableContainer.innerHTML += `<tr><td>${user.firstName}</td>
      <td>${user.lastName}</td>
      <td>${user.fullName}</td>
      <td>${user.age}</td>
      <td>${user.city}</td>
      <td>${user.country}</td>
      <td>${user.spouse}</td>
      <td>${user.pets}</td>
      <td>${checkMarriage(user)}</td>
      <td>${user.userID}</td>
      <td><span class="edit">Edit</span><span class="remove">X</span></td>
      </tr>`;
      const foundUserIndex = usersData.findIndex(element => element === user);
      editUserButtons(usersData);
      deleteUser(usersData, foundUserIndex);
    }
  });
}

function editUserButtons(dataArray) {
  const editButton = Array.from(document.querySelectorAll(".edit"));
  editButton.forEach((button, index) => {
    button.addEventListener("click", () => {
      isEditing = true;
      editIndex = index;
      formPage.style.display = "block";
      tablePage.style.display = "none";
      headerLinks[1].classList.remove("active");
      headerLinks[0].classList.add("active");
      //Repopulating inputs with selected user
      firstNameInput.value = dataArray[index].firstName;
      lastNameInput.value = dataArray[index].lastName;
      ageInput.value = dataArray[index].age;
      cityInput.value = dataArray[index].city;
      countryInput.value = dataArray[index].country;
      spouseInput.value = dataArray[index].spouse;
    });
  });
}

function editUser(dataArray) {
  dataArray[editIndex].firstName = firstNameInput.value;
  dataArray[editIndex].lastName = lastNameInput.value;
  dataArray[editIndex].fullName =
    firstNameInput.value + " " + lastNameInput.value;
  dataArray[editIndex].age = ageInput.value;
  dataArray[editIndex].city = cityInput.value;
  dataArray[editIndex].country = countryInput.value;
  dataArray[editIndex].spouse = spouseInput.value;
  printUsers(dataArray);
}

function deleteUser(dataArray, foundIndex) {
  const removeButton = Array.from(document.querySelectorAll(".remove"));
  removeButton.forEach((button, index) => {
    button.addEventListener("click", () => {
      if (!foundIndex) {
        dataArray.splice(index, 1);
      } else {
        dataArray.splice(foundIndex, 1);
      }
      printUsers(dataArray);
    });
  });
}

function cleanInput() {
  inputData.forEach(element => {
    element.value = "";
  });
}

// [Event Handlers]
searchBtn.addEventListener("click", () => {
  searchUser(searchInput.value);
  cleanInput();
});

resetBtn.addEventListener("click", () => printUsers(usersData));

ascendBtn.addEventListener("click", () => {
  usersData.sort((a, b) => (a.lastName > b.lastName ? 1 : -1));
  printUsers(usersData);
});

descendBtn.addEventListener("click", () => {
  usersData.sort((a, b) => (b.lastName > a.lastName ? 1 : -1));
  printUsers(usersData);
});

resetSortBtn.addEventListener("click", () => printUsers(originalUsersData));

submitButton.addEventListener("click", () => {
  if (inputValidation()) {
    errorMessage.innerHTML = "";
    if (!isEditing) {
      createUser(
        firstNameInput.value,
        lastNameInput.value,
        ageInput.value,
        cityInput.value,
        countryInput.value,
        spouseInput.value,
        Array.from(petsInput.selectedOptions)
          .map(element => element.value)
          .join()
      );
      cleanInput();
    } else {
      editUser(usersData);
      isEditing = false;
      cleanInput();
    }
  } else {
    errorMessage.innerHTML = "Please fill all the required information!";
  }
});
headerLinks[0].addEventListener("click", () => {
  formPage.style.display = "block";
  tablePage.style.display = "none";
  headerLinks[1].classList.remove("active");
  headerLinks[0].classList.add("active");
});
headerLinks[1].addEventListener("click", () => {
  tablePage.style.display = "block";
  formPage.style.display = "none";
  headerLinks[0].classList.remove("active");
  headerLinks[1].classList.add("active");
});

// [Initialization]
(() => {
  defaultPage();
  printUsers(usersData);
})();

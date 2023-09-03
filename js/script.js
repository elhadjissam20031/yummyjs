const menuIcon = document.querySelector(".open-close-icon");
const leftSide = document.querySelector(".left-side-menu");
const searchByNameInput = document.getElementById("searchByNameInput");
const searchByFristLetterInput = document.getElementById(
  "searchByFristLetterInput"
);

const container = document.querySelector(".content-yummy");
// const container = document.getElementById(".container");

const categoriesContainer = document.getElementById("categoriesContainer");
const byCategoriesContainer = document.getElementById("byCategorieContainer");
const instructionsContainer = document.getElementById("instructionsContainer");
const areasContainer = document.getElementById("areaContainer");
const byAreasContainer = document.getElementById("byAreasContainer");
const ingredientsContainer = document.getElementById("ingredientsContainer");
const byIngredientsContainer = document.getElementById(
  "byIngredientsContainer"
);
const yummyContainer = document.getElementById("yummyContainer");
const searchContainer = document.getElementById("searchContainer");

const navLinks = document.querySelectorAll(".nav-links");
const BASE_URL = "https://www.themealdb.com/api/json/v1/1/";
const spinner = document.querySelector(".spinner");

// ########################
function toggleSpinner() {
  spinner.classList.toggle("d-none");
}
// ############################
container.addEventListener("click", function (event) {
  const idMeal = event.target.getAttribute("data-id");
  const idCategory = event.target.getAttribute("data-category");
  const idArea = event.target.getAttribute("data-area");
  const idIngredient = event.target.getAttribute("data-ingredient");

  if (event.target.classList.contains("layer-content")) {
    getInstruction(idMeal);
  }
  if (event.target.classList.contains("layer-content")) {
    getByCategories(idCategory);
  }
  if (event.target.classList.contains("area")) {
    getByArea(idArea);
  }
  if (event.target.classList.contains("ingredient")) {
    getByIngredient(idIngredient);
  }
});

async function getMeals() {
  searchByNameValue = "a";
  try {
    toggleSpinner();

    const res = await fetch(`${BASE_URL}search.php?s=${searchByNameValue}`);
    const data = await res.json();
    displayMeals(data);

    if (!res.ok) {
      throw new Error("Failed to fetch the data");
    }
  } catch (err) {
    console.log(err);
  } finally {
    toggleSpinner();
  }
}
function displayMeals(data) {
  let allHTMLContent = ``;
  for (let i = 0; i < data.meals.length; i++) {
    allHTMLContent += `<div class="col-md-3 bigItem">
          <div class="item">
            <div class="img-item">
              <img src="${data.meals[i].strMealThumb}" alt="${data.meals[i].strMeal}" class="w-100" />
            </div>
            <div class="layer">
              <div class="layer-content" data-id=${data.meals[i].idMeal}>
                <h3>${data.meals[i].strMeal}</h3>
              </div>
            </div>
          </div>
        </div>`;
    page1.style.display = "none";
  }

  page0.style.display = "block";
  mealContainer.innerHTML = allHTMLContent;
}
getMeals();
/////////////////////////
async function getCategories() {
  try {
    const res = await fetch(`${BASE_URL}categories.php`);

    const data = await res.json();
    const result = data.categories;
    if (!res.ok) {
      throw new Error("Failed to fetch the data");
    }
    displayCategories(result);
  } catch (err) {
    console.log(err);
  }
}

function displayCategories(result) {
  let allHTMLContent = ``;
  for (let i = 0; i < result.length; i++) {
    allHTMLContent += `<div class="col-md-3">
    <div class="item">
      <div class="img-item">
        <img src="${result[i].strCategoryThumb}" alt="${result[i].strCategory}" class="w-100" />
      </div>
      <div class="layer">
        <div class="layer-content" data-category="${result[i].strCategory}" data-id="${result[i].idMeal}">
          <h3>${result[i].strCategory}</h3>
          <p class="category-p">${result[i].strCategoryDescription}</p>
        </div>
      </div>
    </div>
  </div>`;
  }

  page2.style.display = "block";
  page1.style.display = "none";
  page3.style.display = "none";
  page4.style.display = "none";
  page5.style.display = "none";

  categoriesContainer.innerHTML = allHTMLContent;
}

////////////////////////////////
async function getByCategories(idCategory) {
  try {
    toggleSpinner();
    const res = await fetch(`${BASE_URL}filter.php?c=${idCategory}`);

    const data = await res.json();
    const result = data.meals;
    if (!res.ok) {
      throw new Error("Failed to fetch the data");
    }
    displayByCategories(result);
  } catch (err) {
    console.log(err);
  } finally {
    toggleSpinner();
  }
}

function displayByCategories(result) {
  let allHTMLContent = ``;
  for (let i = 0; i < result.length; i++) {
    allHTMLContent += `<div class="col-md-3">
    <div class="item">
      <div class="img-item">
        <img src="${result[i].strMealThumb}" alt="${result[i].strMeal}" class="w-100" />
      </div>
      <div class="layer">
        <div class="layer-content" data-category="${result[i].strCategory}" data-id=${result[i].idMeal}>
          <h3>${result[i].strMeal}</h3>
         </div>
      </div>
    </div>
  </div>`;
  }
  page7.style.display = "block";

  page6.style.display = "none";

  page8.style.display = "none";
  page9.style.display = "none";
  page2.style.display = "none";
  page1.style.display = "none";
  page3.style.display = "none";
  page4.style.display = "none";
  page5.style.display = "none";
  page0.style.display = "none";

  byCategoriesContainer.innerHTML = allHTMLContent;
}

// ################################

async function getArea() {
  try {
    toggleSpinner();
    const res = await fetch(`${BASE_URL}list.php?a=list`);

    const data = await res.json();
    const result = data.meals;
    if (!res.ok) {
      throw new Error("Failed to fetch the data");
    }
    displayArea(result);
  } catch (err) {
    console.log(err);
  } finally {
    toggleSpinner();
  }
}
function displayArea(result) {
  let allHTMLContent = ``;
  for (let i = 0; i < result.length; i++) {
    allHTMLContent += `
    <div class="col-md-3" id="areaContainer">
    <div class="area text-center" data-area=${result[i].strArea}>
        <i class="fa-solid fa-house-laptop fa-4x"></i>
        <h3>${result[i].strArea}</h3>
    </div>
  </div>`;
  }
  page3.style.display = "block";
  page2.style.display = "none";
  page1.style.display = "none";
  page4.style.display = "none";
  page5.style.display = "none";
  page6.style.display = "none";
  page0.style.display = "none";

  areasContainer.innerHTML = allHTMLContent;
}

// ###################################
async function getByArea(idArea) {
  try {
    const res = await fetch(`${BASE_URL}filter.php?a=${idArea}`);

    const data = await res.json();
    const result = data.meals;
    if (!res.ok) {
      throw new Error("Failed to fetch the data");
    }
    displayByArea(result);
  } catch (err) {
    console.log(err);
  } finally {
    toggleSpinner();
  }
}
function displayByArea(result) {
  let allHTMLContent = ``;
  for (let i = 0; i < result.length; i++) {
    allHTMLContent += `
    <div class="col-md-3">
    <div class="item">
      <div class="img-item">
        <img src="${result[i].strMealThumb}" alt="${result[i].strMeal}" class="w-100" />
      </div>
      <div class="layer">
        <div class="layer-content" data-category="${result[i].idMeal}" data-id="${result[i].idMeal}">
          <h3>${result[i].strMeal}</h3>
        </div>
      </div>
    </div>
  </div>`;
  }
  page8.style.display = "block";

  page7.style.display = "none";
  page3.style.display = "none";
  page2.style.display = "none";
  page1.style.display = "none";
  page4.style.display = "none";
  page5.style.display = "none";
  page6.style.display = "none";
  page0.style.display = "none";

  byAreasContainer.innerHTML = allHTMLContent;
}
// ###################################
async function getIngredient() {
  try {
    toggleSpinner();
    const res = await fetch(`${BASE_URL}list.php?i=list`);

    const data = await res.json();
    const result = data.meals;
    if (!res.ok) {
      throw new Error("Failed to fetch the data");
    }
    displayIngredient(result);
  } catch (err) {
    console.log(err);
  } finally {
    toggleSpinner();
  }
}
function displayIngredient(result) {
  let allHTMLContent = ``;
  for (let i = 0; i < result.length; i++) {
    if (result[i].strDescription !== null) {
      allHTMLContent += `
      <div class="col-md-3">
      <div class="ingredient text-center" data-ingredient=${result[i].strIngredient}>
        
          <i class="fa-solid fa-drumstick-bite fa-4x"></i>
          <h3>${result[i].strIngredient}</h3>
          <p class="ingredient-text">
            ${result[i].strDescription}</p>
      </div>
    </div>`;
    } else {
      break;
    }
  }
  page4.style.display = "block";

  page9.style.display = "none";

  page2.style.display = "none";
  page1.style.display = "none";
  page3.style.display = "none";
  page5.style.display = "none";
  page6.style.display = "none";
  page7.style.display = "none";
  page0.style.display = "none";

  ingredientsContainer.innerHTML = allHTMLContent;
}
// ###########################
async function getByIngredient(idIngredient) {
  try {
    toggleSpinner();
    const res = await fetch(`${BASE_URL}filter.php?i=${idIngredient}`);

    const data = await res.json();
    const result = data.meals;
    if (!res.ok) {
      throw new Error("Failed to fetch the data");
    }
    displayByIngredient(result);
  } catch (err) {
    console.log(err);
  } finally {
    toggleSpinner();
  }
}
function displayByIngredient(result) {
  let allHTMLContent = ``;
  for (let i = 0; i < result.length; i++) {
    allHTMLContent += `
    <div class="col-md-3">
    <div class="item">
      <div class="img-item">
        <img src="${result[i].strMealThumb}" alt="${result[i].strMeal}" class="w-100" />
      </div>
      <div class="layer">
        <div class="layer-content" data-category="${result[i].idMeal}" data-id="${result[i].idMeal}">
          <h3>${result[i].strMeal}</h3>
        </div>
      </div>
    </div>
  </div>`;
  }
  page9.style.display = "block";
  page8.style.display = "none";
  page7.style.display = "none";
  page3.style.display = "none";
  page2.style.display = "none";
  page1.style.display = "none";
  page4.style.display = "none";
  page5.style.display = "none";
  page6.style.display = "none";
  page0.style.display = "none";

  byIngredientsContainer.innerHTML = allHTMLContent;
}

// ###############################
async function getSearchByName() {
  searchByNameValue = searchByNameInput.value;
  try {
    toggleSpinner();
    const res = await fetch(`${BASE_URL}search.php?s=${searchByNameValue}`);
    const data = await res.json();
    displaySearchByName(data);

    if (!res.ok) {
      throw new Error("Failed to fetch the data");
    }
  } catch (err) {
    console.log(err);
  } finally {
    toggleSpinner();
  }
}
function displaySearchByName(data) {
  let allHTMLContent = ``;
  for (let i = 0; i < data.meals.length; i++) {
    allHTMLContent += `<div class="col-md-3">
          <div class="item">
            <div class="img-item">
              <img src="${data.meals[i].strMealThumb}" alt="${data.meals[i].strMeal}" class="w-100" />
            </div>
            <div class="layer">
              <div class="layer-content" data-id=${data.meals[i].idMeal}>
                <h3>${data.meals[i].strMeal}</h3>
              </div>
            </div>
          </div>
        </div>`;
  }
  page1.style.display = "block";

  page2.style.display = "none";
  page3.style.display = "none";
  page4.style.display = "none";
  page5.style.display = "none";
  page6.style.display = "none";
  page0.style.display = "none";

  searchContainer.innerHTML = allHTMLContent;
}
async function getSearchByFirstLetter() {
  searchByFirstLetterValue = searchByFristLetterInput.value;
  try {
    toggleSpinner();

    const res = await fetch(
      `${BASE_URL}search.php?f=${searchByFirstLetterValue}`
    );
    const data = await res.json();
    displaySearchByFirstLetter(data);
    if (!res.ok) {
      throw new Error("Failed to fetch the data");
    }
  } catch (err) {
    console.log(err);
  } finally {
    toggleSpinner();
  }
}
function displaySearchByFirstLetter(data) {
  let allHTMLContent = ``;
  for (let i = 0; i < data.meals.length; i++) {
    allHTMLContent += `<div class="col-md-3">
          <div class="item">
            <div class="img-item">
              <img src="${data.meals[i].strMealThumb}" alt="${data.meals[i].strMeal}" class="w-100" />
            </div>
            <div class="layer">
              <div class="layer-content" data-id=${data.meals[i].idMeal}>
                <h3>${data.meals[i].strMeal}</h3>
              </div>
            </div>
          </div>
        </div>`;
  }

  searchContainer.innerHTML = allHTMLContent;
}
searchByFristLetterInput.addEventListener("keydown", getSearchByFirstLetter);
searchByNameInput.addEventListener("keydown", getSearchByName);

// ########################

async function getMeal() {
  try {
    toggleSpinner();
    const res = await fetch(`${BASE_URL}categories.php`);

    const data = await res.json();
    const result = data.categories;
    if (!res.ok) {
      throw new Error("Failed to fetch the data");
    }
    displayCategories(result);
  } catch (err) {
    console.log(err);
  } finally {
    toggleSpinner();
  }
}

function displayMeal(result) {
  let allHTMLContent = ``;
  for (let i = 0; i < result.length; i++) {
    allHTMLContent += `<div class="col-md-3">
    <div class="item">
      <div class="img-item">
        <img src="${result[i].strCategoryThumb}" alt="${result[i].strCategory}" class="w-100" />
      </div>
      <div class="layer">
        <div class="layer-content">
          <h3>${result[i].strCategory}</h3>
          <p>${result[i].strCategoryDescription}</p>
        </div>
      </div>
    </div>
  </div>`;
  }
  container.innerHTML = allHTMLContent;
}

// #######################

async function getInstruction(id) {
  try {
    toggleSpinner();
    const res = await fetch(`${BASE_URL}lookup.php?i=${id}`);

    const data = await res.json();
    const result = data.meals[0];

    if (!res.ok) {
      throw new Error("Failed to fetch the data");
    }
    displayInstruction(result);
  } catch (err) {
    console.log(err);
  } finally {
    toggleSpinner();
  }
}

function displayInstruction(result) {
  let tags = result.strTags.split(",");
  let ingredient = [
    result.strIngredient1,
    result.strIngredient2,
    result.strIngredient3,
    result.strIngredient4,
    result.strIngredient5,
    result.strIngredient6,
    result.strIngredient7,
    result.strIngredient8,
    result.strIngredient9,
  ];
  let measure = [
    result.strMeasure1,
    result.strMeasure2,
    result.strMeasure3,
    result.strMeasure4,
    result.strMeasure5,
    result.strMeasure6,
    result.strMeasure7,
    result.strMeasure8,
    result.strMeasure9,
  ];
  let recipe = [
    measure[0] + " " + ingredient[0],
    measure[1] + " " + ingredient[1],
    measure[2] + " " + ingredient[2],
    measure[3] + " " + ingredient[3],
    measure[4] + " " + ingredient[4],
    measure[5] + " " + ingredient[5],
    measure[6] + " " + ingredient[6],
    measure[7] + " " + ingredient[7],
    measure[8] + " " + ingredient[8],
    measure[9] + " " + ingredient[9],
  ];
  let allHTMLContent = `  <div class="col-sm-12 col-md-5">
    <div class="meal">
      <img src="${result.strMealThumb}" alt="${result.strMeal}" class="w-100" />
      <h3 class="mt-3">${result.strMeal}</h3>
    </div>
  </div>
  <div class=" col-sm-12 col-md-5 ms-md-5 ms-1">
    <h2>Instructions</h2>
    <p>
      ${result.strInstructions}
    </p>
    <div class="more">
      <div class="area fs-3">
        <span class="fw-bold">Area : </span><span>${result.strArea}</span>
      </div>
      <div class="category fs-3">
        <span class="fw-bold">Category : </span><span>${
          result.strCategory
        }</span>
      </div>
      <div class="recipes">
        <span class="fs-3">Recipes : </span>
        <div class="recipes-content my-2">${recipe.map((element) => {
          return `<div class="badgeRecipe m-2 p-1">${element}</div>`;
        })}
      
        </div>
      </div>
      <div class="tags my-2">
        <span class="fs-3">Tags : </span>

        <div class="tags-content my-2">${tags.map(
          (element) =>
            `<div class="alert alert-danger badgeTag m-2 p-1">${element}</div>`
        )}
      
        </div>
      </div>
      <div class="links mt-4">
        <a href="${result.strMealThumb}" class="btn btn-success">Source</a>
        <a href="${result.strYoutube}" class="btn btn-danger">Youtube</a>
      </div>
    </div>
  </div>`;

  page6.style.display = "block";
  page7.style.display = "none";
  page8.style.display = "none";
  page9.style.display = "none";
  page2.style.display = "none";
  page1.style.display = "none";
  page3.style.display = "none";
  page4.style.display = "none";
  page5.style.display = "none";
  page0.style.display = "none";
  instructionsContainer.innerHTML = allHTMLContent;
}

// ##############################
let leftSideMenuWidth = $(".left-side-menu").innerWidth();
let left = false;
$(".open-close").click(() => {
  if (left) {
    $(".open-close-icon").addClass("fa-align-justify");

    $(".side-menu").animate({ left: `-${leftSideMenuWidth}` }, 700);
    $("#t").animate({ top: "-10px" }, 500);
    $("#tt").animate({ top: "-20px" }, 600);
    $("#ttt").animate({ top: "-30px" }, 700);
    $("#tttt").animate({ top: "-40px" }, 800);
    $("#ttttt").animate({ top: "-50px" }, 900);

    left = false;
  } else {
    $(".open-close-icon").addClass("fa-x");

    $(".side-menu").animate({ left: 0 }, 700);
    $("#t").animate({ top: "10px" }, 500);
    $("#tt").animate({ top: "20px" }, 600);
    $("#ttt").animate({ top: "30px" }, 700);
    $("#tttt").animate({ top: "40px" }, 800);
    $("#ttttt").animate({ top: "50px" }, 900);
    left = true;
  }
});
$(".nav-list").click(() => {
  if (left) {
    $(".side-menu").animate({ left: `-${leftSideMenuWidth}` }, 500);
    $(".open-close-icon").addClass("fa-align-justify");

    left = false;
  } else {
    $(".open-close-icon").addClass("fa-x");

    $(".side-menu").animate({ left: 0 }, 500);
    left = true;
  }
});
/////////////////////////////////////////

//////////////////////////////////
t.addEventListener("click", getSearchByName);

tt.addEventListener("click", getCategories);

ttt.addEventListener("click", getArea);

tttt.addEventListener("click", getIngredient);
ttttt.addEventListener("click", function () {
  page5.style.display = "block";
  page6.style.display = "none";
  page7.style.display = "none";
  page8.style.display = "none";
  page9.style.display = "none";

  page2.style.display = "none";
  page1.style.display = "none";
  page3.style.display = "none";
  page4.style.display = "none";
  page0.style.display = "none";
});
////////////////////regex for contact form /////////////////
let fadeName;
let fadeEmail;
let fadeAge;
let fadeNumber;
let fadePassword;
let fadeRePassword;
function checkName() {
  const regexName = /^[A-Za-z]+$/;
  if (!regexName.test(inputName.value) || inputName.value == "") {
    errName.style.display = "block";
    fadeName = false;
  } else {
    errName.style.display = "none";
    fadeName = true;
  }
  return fadeName;
}
function checkEmail() {
  const regexEmail = /^\S+@\S+\.\S+$/;

  if (!regexEmail.test(inputEmail.value) || inputEmail.value == "") {
    errEmail.style.display = "block";
    fadeEmail = false;
  } else {
    errEmail.style.display = "none";
    fadeEmail = true;
  }
  return fadeEmail;
}
function checkAge() {
  if (inputAge.value == "") {
    errAge.style.display = "block";
    fadeAge = false;
  } else {
    errAge.style.display = "none";
    fadeAge = true;
  }
  return fadeAge;
}

function checkNumber() {
  const regexNumber =
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

  if (!regexNumber.test(inputNumber.value) || inputNumber.value == "") {
    errNumber.style.display = "block";
    fadeNumber = false;
  } else {
    errNumber.style.display = "none";
    fadeNumber = true;
  }
  return fadeNumber;
}
function checkPassword() {
  const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (inputPassword.value == "") {
    errPass.style.display = "block";
    fadePassword = false;
  } else {
    errPass.style.display = "none";
    fadePassword = true;
  }
  return fadePassword;
}

function checkRePassword() {
  if (
    inputRePassword.value !== inputPassword.value ||
    inputRePassword.value == ""
  ) {
    errRePass.style.display = "block";
    fadeRePassword = false;
  } else {
    errRePass.style.display = "none";
    fadeRePassword = true;
  }
  return fadeRePassword;
}
inputName.addEventListener("keyup", checkName);
inputEmail.addEventListener("keyup", checkEmail);
inputAge.addEventListener("keyup", checkAge);
inputNumber.addEventListener("keyup", checkNumber);
inputPassword.addEventListener("keyup", checkPassword);
inputRePassword.addEventListener("keyup", checkRePassword);

formContact.addEventListener("input", () => {
  if (
    checkAge() &&
    checkEmail() &&
    checkName() &&
    checkPassword() &&
    checkNumber() &&
    checkRePassword()
  ) {
    btnSubmit.removeAttribute("disabled");
  } else {
    btnSubmit.setAttribute("disabled", "true");
  }
});

//////////////////////////////

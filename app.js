const searchBtn = document.querySelector(".search-btn")
const closeBtn = document.querySelector(".cancel-btn")
const searchBox = document.querySelector(".meal-search-box")
const mealList = document.getElementById("meal")
const mealDetailsContent = document.querySelector('.meal-details-content')
const recipeCloseBtn = document.getElementById('recipe-close-btn')

searchBtn.addEventListener('click', getMeals);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
  mealDetailsContent.parentElement.classList.remove('showRecipe')
})

// get meal list
function getMeals(){
  let serchTxt = document.getElementById("search-input").value.trim();
   //loader animation 
  if(serchTxt.length !== 0){
    let myVar;
    function loader() {
      myVar = setTimeout(showPage, 1000);
      function showPage() {
        document.getElementById("loader").style.display = "block";
        document.getElementById("meal").style.display = "none";
      }
    }
      function loaderEnd(){
        myVar = setTimeout(closePage, 2800);
        function closePage(){
          if(document.getElementById("loader").style.display == "block"){
            document.getElementById("loader").style.display = "none";
            document.getElementById("meal").style.display = "";
          }
        }
      }
    loader()
    loaderEnd()
   }
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${serchTxt}`)
  .then(res => res.json())
  .then(data => {
    let html = "";
    if(data.meals){
      data.meals.forEach(meal => {
           html += `
             <div class="meal-item" data-id = "${meal.idMeal}">
             <div class="meal-img">
                 <img src="${meal.strMealThumb}" alt="food">
             </div>
             <div class="meal-name">
                 <h3>${meal.strMeal}</h3>
                 <a href="#" class="repice-btn">recipe</a>
             </div>
         </div>
          `;
         mealList.classList.remove('notFound')
      });
    } else {
      html = "Sorry, the food you were looking for was not found!"
      mealList.classList.add('notFound')
     }
  mealList.innerHTML = html;
  })
}

// get recipe of the meal
function getMealRecipe(e) {
  e.preventDefault()

  if (e.target.classList.contains('repice-btn')) {
      let mealItem = e.target.parentElement.parentElement;       
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
          .then(res => res.json())
          .then(data => mealRecipeModal(data.meals));
  }
}

function mealRecipeModal(meal) {
  meal = meal[0];
  let html = `
  <h2 class="recipe-title">${meal.strMeal}</h2>
  <p class="recipe-category">${meal.strCategory}</p>
  <div class="recipe-instruct">
      <h3>contents</h3>
     
      <p>${meal.strInstructions}</p>
  </div>
  <div class="recipe-meal-img">
      <img src="${meal.strMealThumb}" alt="">
  </div>
  <div class="recipe-link">
      <a href="${meal.strYoutube}" target="_blank">watch video</a>
  </div>
  `;
  mealDetailsContent.innerHTML = html;
  mealDetailsContent.parentElement.classList.add('showRecipe')
}


// search input animation 
searchBtn.onclick = () => {
    searchBox.classList.add("active");
  }

  closeBtn.onclick = () => {
    searchBox.classList.remove("active");
  }





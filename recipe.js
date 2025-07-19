const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipeList = document.querySelector('.recipe-container');

const recipeDetailsContent = document.querySelector('.recipe-details-content'); 
const recipeCloseBtn = document.querySelector('.recipe-close-btn');




const fetchRecipes =  async (query) => {
    recipeList.innerHTML = "<h2>Fetching recipes...</h2>"; // Show loading message
   const data =await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
   const response =await  data.json();
   
    recipeList.innerHTML = ''; // Clear previous results

   response.meals.forEach((meal) => {
    const recipeDiv = document.createElement('div');
    recipeDiv.classList.add('recipe');//adding class name
    recipeDiv.innerHTML=`
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
    <h3>${meal.strMeal}</h3>
    <p><span>${meal.strArea} </span>Dish</p>
    <p>Belongs to <span>${meal.strCategory}</span> Category</p>
    `
    const button= document.createElement('button');
    button.textContent = 'View Recipe';
    recipeDiv.appendChild(button);

    //adding event listener to button
    button.addEventListener('click', () => {
        openRecipePopup(meal);
    });

    recipeList.appendChild(recipeDiv);
   })
   
   //console.log(response.meals[0]);
}

const fetchIngredients = (meal) => {

     let ingredientsList = '';
     for(let i=1; i<=20; i++){

        const ingredient= meal[`strIngredient${i}`];
        if(ingredient){
           let measure=meal[`strMeasure${i}`];
           ingredientsList += `<li> ${measure} ${ingredient} </li>`;
        }
        else{
            break; // Stop if no more ingredients
        }
     }
     return ingredientsList;
}


const openRecipePopup = (meal) => {
    recipeDetailsContent.innerHTML=`
    <h2 class="recipeName">${meal.strMeal}</h2>
    <h3 >Ingredients:</h3>
    <ul class="ingredientsList">${fetchIngredients(meal)}</ul>

    <div class="recipeInstructions">
          <h3>Instructions:</h3>
          <p >${meal.strInstructions}</p>
    </div>
    `
    recipeDetailsContent.parentElement.style.display = 'block'; // Show the popup
}

recipeCloseBtn.addEventListener('click', () => {
    recipeDetailsContent.parentElement.style.display = 'none'; // Hide the popup
})


//function to fetch ingredients

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    fetchRecipes(searchInput);
    console.log("Button clicked");


})

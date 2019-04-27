import { elements } from './DOMelements'

export const clearRecipe = () => {
  elements.recipe.innerHTML = ''
}

const createIngredient = ({ id, amount, name, unit }) => {
  return `
    <li class="recipe__item">
      <div class="recipe__icon">
          <i class="far fa-check-circle fa-lg"></i>
      </div>
      <div class="recipe__ingredient">
      ${name}
      </div>
      <div class="recipe__count">(${amount} ${unit})</div>
    </li>
    `
}

export const renderRecipe = (
  { ingredients, readyInMinutes, servings, title, id, image },
  isLiked
) => {
  const icon = isLiked
    ? '<i class="far fa-heart fa-2x"></i>'
    : ` <i class="far fa-heart"></i>`
  const recipeHTML = `
    <figure class="recipe__fig">
    <img src=${image} class='recipe__img' />
    <h1 class="recipe__title">
      <span>${title}</span>
    </h1>
  </figure>
  <div class="recipe__details">
    <div class="recipe__info">
    <div class="recipe__info-icon">
    <i class="far fa-clock fa-lg"></i>
    </div>
      <span class="recipe__info-data recipe__info-data--minutes">${readyInMinutes}</span>
      <span class="recipe__info-text"> minutes</span>
    </div>
    <div class="recipe__info">
      <div class="recipe__info-icon">
         <i class="fas fa-male fa-lg"></i>
      </div>
      <span class="recipe__info-data recipe__info-data--people">${servings}</span>
      <span class="recipe__info-text">servings</span>
      <div class="recipe__info-buttons">
        <button class="btn-tiny btn-decrement">
        <i class="fas fa-minus-circle fa-lg"></i>
        </button>
        <button class="btn-tiny btn-increment">
        <i class="fas fa-plus-circle fa-lg"></i>
        </button>
      </div>
    </div>
    <button class="recipe__love">
      <div class="header__likes">
      ${icon}
      </div>
    </button>
  </div>
  <div class="recipe__ingredients">
    <ul class="recipe__ingredient-list">
    ${ingredients.map(el => createIngredient(el)).join('')}
    </ul>
    <button class="btn-small recipe__btn recipe__btn--add">
      <div class="search__icon">
      <i class="fas fa-cart-arrow-down fa-lg"></i>
      </div>
      <span>Add to shopping list</span>
    </button>
  </div>
  <div class="recipe__directions">
    <h2 class="heading-2">How to cook it</h2>

    <a
      class="btn-small recipe__btn"
      href=${image}
      target="_blank"
    >
      <span>Get directions</span>
      <div class="search__icon">
      <i class="fas fa-directions fa-lg"></i>
      </div>
    </a>
  </div>
  `
  elements.recipe.insertAdjacentHTML('beforeend', recipeHTML)
}

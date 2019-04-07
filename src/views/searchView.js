import { elements } from './DOMelements'

export const getInput = () => elements.searchInput.value
export const clearInput = () => {
  elements.searchInput.value = ''
}

export const clearResults = () => {
  elements.searchResList.innerHTML = ''
}

const renderRecipe = ({ title, id, thumbnail }) => {
  // console.log(title, href)

  const listItem = `
  <li>
    <a class="results__link results__link--active" href="#${id}">
      <figure class="results__fig">
        <img src=${thumbnail} />
      </figure>
      <div class="results__data">
        <h4 class="results__name">${title}</h4>
        <p class="results__author">The Pioneer Woman</p>
      </div>
    </a>
  </li>
`
  elements.searchResList.insertAdjacentHTML('beforeend', listItem)
}

export const renderRecipeList = recipes => {
  console.log('recipes', recipes)
  recipes.forEach(renderRecipe)
}

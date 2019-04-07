import { elements } from './DOMelements'

export const getInput = () => elements.searchInput.value
export const clearInput = () => {
  elements.searchInput.value = ''
}

export const clearResults = () => {
  elements.searchResList.innerHTML = ''
}

const limitRecipeTitle = title => {
  const limitedTitle = []
  if (title.length > 17) {
    title.split(' ').reduce((acc, next) => {
      if (acc + next.length < 17) {
        limitedTitle.push(next)
      }
      return (acc += next.length)
    }, 0)
    return `${limitedTitle.join(' ')}...`
  }
  return title
}

const renderRecipe = ({ recipe: { label, image, url, calories } }) => {
  const listItem = `
  <li>
    <a class="results__link" href="#${url}">
      <figure class="results__fig">
        <img src=${image} />
      </figure>
      <div class="results__data">
        <h4 class="results__name">${limitRecipeTitle(label)}</h4>
        <p class="results__author">${Math.round(calories)} Cal</p>
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

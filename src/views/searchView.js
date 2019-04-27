import { elements } from './DOMelements'

export const getInput = () => elements.searchInput.value
export const clearInput = () => {
  elements.searchInput.value = ''
}

export const clearResults = () => {
  elements.searchResList.innerHTML = ''
  elements.resultsPages.innerHTML = ''
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

const renderRecipe = ({ image, id, title }) => {
  const listItem = `
  <li>
    <a class="results__link" href="#${id}">
      <figure class="results__fig">
        <img src=${image} />
      </figure>
      <div class="results__data">
        <h4 class="results__name">${limitRecipeTitle(title)}</h4>
        <p class="results__author"></p>
      </div>
    </a>
  </li>
`
  elements.searchResList.insertAdjacentHTML('beforeend', listItem)
}
const createButton = (page, type) => `
<button class="btn-inline results__btn--${type}" data-goto=${
  type === 'prev' ? page - 1 : page + 1
} >Page ${type === 'prev' ? page - 1 : page + 1} </button>
`

const renderButtons = (page, resNum, resPerPage) => {
  const pages = Math.ceil(resNum / resPerPage)
  let button
  if (page === 1 && pages > 1) {
    button = createButton(page, 'next')
  } else if (page < pages) {
    button = `
      ${createButton(page, 'prev')}
      ${createButton(page, 'next')}
    `
  } else if (page === pages && pages > 1) {
    button = createButton(page, 'prev')
  }

  elements.resultsPages.insertAdjacentHTML('afterbegin', button)
}

export const renderRecipeList = (recipes, page = 1, resPerPage = 10) => {
  const start = (page - 1) * resPerPage
  const end = page * resPerPage

  if (recipes.length > 0) {
    recipes.slice(start, end).forEach(renderRecipe)
    renderButtons(page, recipes.length, resPerPage)
  }
}

export const highlightSelected = id => {
  const allLinks = Array.from(document.querySelectorAll('.results__link'))
  allLinks.forEach(link => {
    link.classList.remove('results__link--active')
  })

  document
    .querySelector(`.results__link[href*='#${id}']`)
    .classList.add('results__link--active')
}

export const updateIngredients = recipe => {
  // Update Servings
  document.querySelector('.recipe__info-data--people').textContent =
    recipe.servings

  const ingWeights = Array.from(document.querySelectorAll('.recipe__count'))
  ingWeights.forEach((el, i) => {
    el.textContent = `(${recipe.ingredients[i].amount} ${
      recipe.ingredients[i].unit
    })`
  })
}

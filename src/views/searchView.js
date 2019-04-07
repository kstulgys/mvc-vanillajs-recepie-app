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

const getDescription = (calories, digest, ppl) => {
  console.log(ppl)
  const cal = `${Math.round(calories / ppl)} Cal`

  const res = digest.map(({ label, total }, i) => {
    if (label === 'Fat' || label === 'Carbs' || label === 'Protein') {
      return `${label[0]} ${Math.round(total / ppl)}g /`
    }
  })

  return [...res, cal].join(' ')
}

const renderRecipe = ({
  recipe: { label, image, uri, calories, digest, yield: ppl }
}) => {
  const id = uri.split('_')[1]
  const listItem = `
  <li>
    <a class="results__link" href="#${id}">
      <figure class="results__fig">
        <img src=${image} />
      </figure>
      <div class="results__data">
        <h4 class="results__name">${limitRecipeTitle(label)}</h4>
        <p class="results__author">${getDescription(calories, digest, ppl)}</p>
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
  recipes.slice(start, end).forEach(renderRecipe)
  renderButtons(page, recipes.length, resPerPage)
}

// <!-- <button class="btn-inline results__btn--prev">
// <svg class="search__icon">
//   <use href="assets/img/icons.svg#icon-triangle-left"></use>
// </svg>
// <span>Page 1</span>
// </button>
// <button class="btn-inline results__btn--next">
// <span>Page 3</span>
// <svg class="search__icon">
//   <use href="assets/img/icons.svg#icon-triangle-right"></use>
// </svg>
// </button> -->

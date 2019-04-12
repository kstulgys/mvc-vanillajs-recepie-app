import Search from './models/Search'
import Recipe from './models/Recipe'

import * as searchView from './views/searchView'
import * as recipeView from './views/recipeView'

import { elements, renderLoader, clearLoader } from './views/DOMelements'

const state = {
  // search: { recipes: [{}.{}]}
}

/**
 * SEARCH CONTROLLER
 */
const handleRecipesSearch = async () => {
  const query = searchView.getInput()

  if (query) {
    state.search = new Search(query)
    searchView.clearInput()
    searchView.clearResults()
    renderLoader(elements.resultsLoader)
    await state.search.getRecipes()
    // console.log('state.search.results', state.search.results)
    searchView.renderRecipeList(state.search.results)
    clearLoader()
  }
}

elements.searchForm.addEventListener('submit', e => {
  e.preventDefault()
  handleRecipesSearch()
})

elements.resultsPages.addEventListener('click', e => {
  const btn = e.target.closest('.btn-inline')
  if (btn) {
    const goToPage = Number(btn.dataset.goto)
    searchView.clearResults()
    searchView.renderRecipeList(state.search.results, goToPage)
  }
})

/**
 * RECIPE CONTROLLER
 */

const handleRecipeSearch = async () => {
  console.log('here')

  const id = window.location.hash.replace('#', '')
  if (id) {
    recipeView.clearRecipe()
    renderLoader(elements.recipe)

    state.recipe = new Recipe(id)
    await state.recipe.getRecipe()
    recipeView.renderRecipe(state.recipe)
    console.log('state.recipe', state.recipe)
    clearLoader()

    // searchView.clearInput()
    // searchView.clearResults()
    // renderLoader(elements.resultsLoader)
    // console.log('state.search.results', state.search.results)
    // searchView.renderRecipeList(state.search.results)
    // clearLoader()
  }
}
window.addEventListener('hashchange', handleRecipeSearch)
window.addEventListener('load', handleRecipeSearch)

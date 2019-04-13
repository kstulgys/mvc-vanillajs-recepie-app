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
    try {
      await state.search.getRecipes()
      // console.log('state.search.results', state.search.results)
      searchView.renderRecipeList(state.search.results)
      clearLoader()
    } catch (e) {
      clearLoader()
      console.error(
        `${query} from Search Controller  has Failed`,
        e.name,
        e.message
      )
      // alert('Hold on, you are clicking around too often! Take it easy :)')
    }
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
  const id = window.location.hash.replace('#', '')
  if (id) {
    recipeView.clearRecipe()
    renderLoader(elements.recipe)
    if (state.recipe) searchView.highlightSelected(id)
    state.recipe = new Recipe(id)
    try {
      await state.recipe.getRecipe()
      clearLoader()
      recipeView.renderRecipe(state.recipe)
    } catch (e) {
      clearLoader()
      console.log(e.message)
    }
  }
}
window.addEventListener('hashchange', handleRecipeSearch)
window.addEventListener('load', handleRecipeSearch)

elements.recipe.addEventListener('click', e => {
  if (e.target.matches('.btn-decrement, .btn-decrement *')) {
    if (state.recipe.servings > 1) {
      state.recipe.updateServings('dec')
      searchView.updateIngredients(state.recipe)
    }
  } else if (e.target.matches('.btn-increment, .btn-increment *')) {
    state.recipe.updateServings('inc')
    searchView.updateIngredients(state.recipe)
  }
})

import dotenv from 'dotenv'
dotenv.config()
import Search from './models/Search'
import Recipe from './models/Recipe'
import ShoppingList from './models/ShoppingList'

// import recipesController from './controllers/recipesController'
// import recipeController from './controllers/recipeController'
// import listController from './controllers/listController'

import * as searchView from './views/searchView'
import * as recipeView from './views/recipeView'

import { elements, renderLoader, clearLoader } from './views/DOMelements'

/**
 * state = {
 *  recipes:[{},{}],
 *  recipe: {},
 *  list: [{},{}]
 * }
 */

const state = {}

/**
 * SEARCH/Recipes CONTROLLER
 */

const recipesController = async () => {
  const query = searchView.getInput()

  if (query) {
    state.search = new Search(query)
    searchView.clearInput()
    searchView.clearResults()
    renderLoader(elements.resultsLoader)
    try {
      await state.search.getRecipes()
      searchView.renderRecipeList(state.search.results)
      clearLoader()
    } catch (e) {
      clearLoader()
      console.log(
        `${query} from Search Controller has Failed`,
        e.name,
        e.message
      )
    }
  }
}

elements.searchForm.addEventListener('submit', e => {
  e.preventDefault()
  recipesController()
})

// Handle Recipes pagination clicks
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

const recipeController = async () => {
  const id = window.location.hash.replace('#', '')
  if (id) {
    recipeView.clearRecipe()
    renderLoader(elements.recipe)
    if (state.recipe) searchView.highlightSelected(id)
    state.recipe = new Recipe(id)
    try {
      await state.recipe.getRecipe()
      clearLoader()
      console.log('state.recipe :', state.recipe)
      recipeView.renderRecipe(state.recipe)
    } catch (e) {
      clearLoader()
      console.log(e.message)
    }
  }
}
window.addEventListener('hashchange', recipeController)
window.addEventListener('load', recipeController)

/**
 * List CONTROLLER
 */

const listController = () => {
  if (!state.list) {
    state.list = new ShoppingList()
  }

  state.recipe.ingredients.forEach(({ amount, unit, originalName }) => {
    state.list.addItem({ amount, unit, originalName })
  })
}

// Handle Recipe buttons clicks
elements.recipe.addEventListener('click', e => {
  if (e.target.matches('.btn-decrement, .btn-decrement *')) {
    if (state.recipe.servings > 1) {
      state.recipe.updateServings('dec')
      searchView.updateIngredients(state.recipe)
    }
  } else if (e.target.matches('.btn-increment, .btn-increment *')) {
    state.recipe.updateServings('inc')
    searchView.updateIngredients(state.recipe)
  } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
    listController()
  }
})

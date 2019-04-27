import dotenv from 'dotenv'
dotenv.config()
import Search from './models/Search'
import Recipe from './models/Recipe'
import ShoppingList from './models/ShoppingList'
import Likes from './models/Likes'

import * as searchView from './views/searchView'
import * as recipeView from './views/recipeView'
import * as shoppingListView from './views/shoppingListView'
import * as likesView from './views/likesView'

import { elements, renderLoader, clearLoader } from './views/DOMelements'

/** GLOBAL APP STATE
 * - Search Object
 * - Current recipe Object
 * - Shopping list Object
 * - Liked recipes Object
 */

const state = {}

/**
 * SEARCH/Recipes CONTROLLER
 *
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
      console.log(e.message)
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
 *
 */

const recipeController = async () => {
  let id = window.location.hash.replace('#', '')
  if (id) {
    recipeView.clearRecipe()
    renderLoader(elements.recipe)
    if (state.recipe) searchView.highlightSelected(id)
    state.recipe = new Recipe(id)
    try {
      await state.recipe.getRecipe()
      clearLoader()
      id = parseInt(id, 10)
      recipeView.renderRecipe(state.recipe, state.likes.isLiked(id))
    } catch (e) {
      clearLoader()
      console.log(e.message)
    }
  }
}
window.addEventListener('hashchange', recipeController)
window.addEventListener('load', recipeController)

/**
 * SHOPPING LIST CONTROLLER
 *
 */

const shoppingListController = () => {
  if (!state.shoppingList) {
    state.shoppingList = new ShoppingList()
  }
  state.recipe.ingredients.forEach(({ amount, unit, name }) => {
    state.shoppingList.addItem({ amount, unit, name })
  })
  shoppingListView.renderListItems(state.shoppingList.items)
}

/**
 * LIKES CONTROLLER
 *
 */

const likesController = () => {
  // if (!state.likes) {
  //   state.likes = new Likes()
  // }
  const isLiked = state.likes.isLiked(state.recipe.id)
  const { id, title, image } = state.recipe
  //if recipe is NOT liked yed
  if (!isLiked) {
    //add to liked
    state.likes.addLike({ id, title, image })
    //toggle like button
    likesView.renderLikeBtn(true)
    //update the likes UI list
    likesView.renderLike({ id, title, image })
  }
  //if recipe is liked
  if (isLiked) {
    //remove from liked
    state.likes.removeLike(id)
    //toggle like button
    likesView.renderLikeBtn(false)
    //update the likes UI list
    likesView.deleteLike(id)
  }
}

window.addEventListener('load', () => {
  state.likes = new Likes()
  state.likes.readData()

  state.likes.liked.forEach(el => {
    likesView.renderLike(el)
  })
})

// Handle delete and update shopping list items
elements.shoppingList.addEventListener('click', e => {
  let id = e.target.closest('.shopping__item').dataset.itemid
  id = parseInt(id, 10)
  //Handle delete item
  if (e.target.matches('.shopping__delete,.shopping__delete *')) {
    // Delete from state
    state.shoppingList.removeItem(id)
    //Delete from UI
    shoppingListView.removeItemFromUI(id)
  }
  if (e.target.matches('.shopping__count--value')) {
    // Convert value to numbers
    const value = parseFloat(e.target.value, 10)
    //Update item amount
    state.shoppingList.updateAmount(id, value)
  }
})

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
    shoppingListController()
  } else if (e.target.matches('.recipe__love, .recipe__love *')) {
    likesController()
  }
})

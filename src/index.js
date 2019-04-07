import Search from './models/Search'
import * as searchView from './views/searchView'
import { elements, renderLoader, clearLoader } from './views/DOMelements'

const state = {
  // search: { recipes: [{}.{}]}
}

const handleRecpesSearch = async () => {
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
  handleRecpesSearch()
})

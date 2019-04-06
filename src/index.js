import './styles.css'
import Search from './models/Search'
import * as searchView from './views/searchView'
import { elements } from './views/DOMelements'

const state = {
  // search: { recipes: [{}.{}]}
}

const handleRecpesSearch = async () => {
  const query = searchView.getInput()

  if (query) {
    state.search = new Search(query)
    await state.search.getRecipes()
    console.log(state.search.recipes)
  }
}

elements.searchForm.addEventListener('submit', e => {
  e.preventDefault()
  handleRecpesSearch()
})

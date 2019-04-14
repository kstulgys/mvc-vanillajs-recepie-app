// import Search from './models/Search'
// import Recipe from './models/Recipe'
// import ShoppingList from './models/ShoppingList'

// /**
//  * SEARCH CONTROLLER
//  */

// export default (recipesController = async () => {
//   const query = searchView.getInput()

//   if (query) {
//     state.search = new Search(query)
//     searchView.clearInput()
//     searchView.clearResults()
//     renderLoader(elements.resultsLoader)
//     try {
//       await state.search.getRecipes()
//       // console.log('state.search.results', state.search.results)
//       searchView.renderRecipeList(state.search.results)
//       clearLoader()
//     } catch (e) {
//       clearLoader()
//       console.error(
//         `${query} from Search Controller  has Failed`,
//         e.name,
//         e.message
//       )
//     }
//   }
// })

// elements.searchForm.addEventListener('submit', e => {
//   e.preventDefault()
//   recipesController()
// })

// // Handle Recipes pagination clicks
// elements.resultsPages.addEventListener('click', e => {
//   const btn = e.target.closest('.btn-inline')
//   if (btn) {
//     const goToPage = Number(btn.dataset.goto)
//     searchView.clearResults()
//     searchView.renderRecipeList(state.search.results, goToPage)
//   }
// })

import loader from '../../assets/img/loadergif.gif'

export const elements = {
  searchForm: document.querySelector('.search'),
  searchInput: document.querySelector('.search__field'),
  searchResList: document.querySelector('.results__list'),
  resultsLoader: document.querySelector('.results'),
  resultsPages: document.querySelector('.results__pages'),
  recipe: document.querySelector('.recipe'),
  shoppingList: document.querySelector('.shopping__list'),
  likedList: document.querySelector('.likes__list')
}

export const renderLoader = parent => {
  const loaderHTML = `
    <div class='loader'>
      <img class='loader__img' src=${loader} alt="Loading...">
    </div>
  `
  parent.insertAdjacentHTML('afterBegin', loaderHTML)
}

export const clearLoader = () => {
  const loader = document.querySelector('.loader')
  if (loader) {
    loader.parentElement.removeChild(loader)
  }
}

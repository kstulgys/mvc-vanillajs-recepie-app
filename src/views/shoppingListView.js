import { elements } from './DOMelements'

export const renderListItem = item => {
  return `
	<li class="shopping__item" data-itemid=${item.id}>
		<div class="shopping__count">
			<input type="number" value=${item.amount}
				step=${item.amount}  class="shopping__count--value"/>
			<p>${item.unit} </p>
		</div>
		<p class="shopping__description">${item.name}</p>
		<button class="shopping__delete btn-tiny">
			<p>X</p>
		</button>
	</li>`
  elements.shoppingList.insertAdjacentHTML('afterbegin', markup)
}

export const removeItemFromUI = id => {
  const item = document.querySelector(`[data-itemid="${id}"]`)
  item.parentElement.removeChild(item)
}

export const clearView = () => {
  elements.shoppingList.innerHTML = ''
}

export const renderListItems = listItems => {
  clearView()
  listItems.forEach(item => {
    elements.shoppingList.insertAdjacentHTML('beforeend', renderListItem(item))
  })
}

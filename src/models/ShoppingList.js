export default class ShoppingList {
  constructor() {
    this.items = []
  }

  addItem(item) {
    const itemWithId = {
      ...item,
      id: Math.floor(Math.random() * 9999999999999999)
    }
    this.items.push(itemWithId)
    return itemWithId
  }

  removeItem(id) {
    this.items = this.items.filter(item => item.id !== id)
  }

  updateAmount(id, newAmount) {
    this.items.find(item => item.id === id).amount = newAmount
  }
}

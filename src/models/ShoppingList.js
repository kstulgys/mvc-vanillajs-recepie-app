export default class ShoppingList {
  constructor() {
    this.items = []
  }

  addItem(item) {
    this.items.push(item)
  }

  removeItem(id) {
    this.items.filter(item => item.id !== id)
  }
}

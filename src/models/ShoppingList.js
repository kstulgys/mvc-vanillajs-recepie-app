export default class ShoppingList {
  constructor() {
    this.items = []
  }

  getId() {
    return Math.round(performance.now())
  }

  addItem(item) {
    const itemWithId = {
      ...item,
      id: this.getId()
    }

    const findItem = this.items.findIndex(el => el.name == item.name) > -1
    if (findItem) {
      this.items.find(el => el.name === item.name).amount += item.amount
    } else if (!findItem) {
      this.items.push(itemWithId)
    }
    return itemWithId
  }

  removeItem(id) {
    this.items = this.items.filter(item => item.id !== id)
  }

  updateAmount(id, newAmount) {
    this.items.find(item => item.id === id).amount = newAmount
  }
}

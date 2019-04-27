export default class Likes {
  constructor() {
    this.liked = []
  }

  addLike(item) {
    this.liked.push(item)
    this.persistData()
    return item
  }

  removeLike(id) {
    this.liked = this.liked.filter(item => item.id !== id)
    this.persistData()
  }

  isLiked(id) {
    return this.liked.findIndex(el => el.id === id) > -1
  }

  getLikesCount(id) {
    return this.liked.length
  }

  persistData() {
    window.localStorage.setItem('likes', JSON.stringify(this.liked))
  }

  readData() {
    const data = JSON.parse(window.localStorage.getItem('likes'))
    if (data) {
      this.liked = data
    }
  }
}

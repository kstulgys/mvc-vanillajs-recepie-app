export default class Search {
  constructor(query) {
    this.query = query
  }

  async getRecipes() {
    const API_KEY = '3bc71cb982e58200a98fe5dfe33b8cfd'
    const proxy = 'http://cors-anywhere.herokuapp.com/'
    const url1 = `${proxy}http://www.recipepuppy.com/api/?&q=${this.query}&p=1`
    const url2 = `${proxy}https://www.food2fork.com/api/search?key=${API_KEY}&q=${
      this.query
    }&page=1`

    try {
      const { results = [] } = await fetch(url1).then(res => res.json())
      this.results = results
      console.log(this.results)
    } catch (e) {
      console.log(e)
    }
  }
}

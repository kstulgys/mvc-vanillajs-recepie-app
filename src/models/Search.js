export default class Search {
  constructor(query) {
    this.query = query
  }

  async getRecipes() {
    const proxy = 'http://cors-anywhere.herokuapp.com/'
    const edamam_ID = 'e7849e8e'
    const edamam_KEY = 'd2c3e26378ca90e6c49ee71233f93871'

    const url = `${proxy}https://api.edamam.com/search?q=${
      this.query
    }&app_id=${edamam_ID}&app_key=${edamam_KEY}&from=0&to=30&calories=500-1000&health=alcohol-free`

    try {
      const { hits } = await fetch(url).then(res => res.json())
      this.results = hits
    } catch (e) {
      console.log(e)
      alert('Something went wrong :(')
    }
  }
}
